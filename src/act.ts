import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import type { CDPSession, Locator, Page } from "@playwright/test";
import type { Recorder } from "./capture";
import type { Mark, Span } from "./edit";
import type { Format } from "./formats";
import type { Page$ } from "./overlay";

const sleep = (ms: number) => new Promise((done) => setTimeout(done, ms));
const now = () => Date.now() / 1000;
const ease = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2);
/** The caption's fade in `overlay.ts` (240 ms) plus a paint. */
const CAPTION_FADE_MS = 280;

/**
 * Whether the camera keeps what happens: on stage it does; off stage the time from `since` is cut
 * once the scene is back on stage. A scene starts off stage (the first load is never shown).
 */
type Camera = { on: true } | { on: false; since: number };

/** What the app needs from the director: when a page is settled, and where its content lives. */
export type Stage = {
  /** Resolves once the page is settled after a load or an off-camera navigation. */
  ready: (page: Page) => Promise<void>;
  /** The page's main region, a CSS selector. */
  main: string;
};

/**
 * What a scene says, in the order a viewer sees it. Every call is on stage (kept in the video)
 * except `visit` and `offstage`, whose time is cut. The pointer moves like a hand: eased, along a
 * slight arc, at a speed set by the distance; a press dips the cursor and leaves a ripple; typing
 * has a human rhythm. Targets are Playwright locators, so a scene reads like an e2e spec. Durations
 * are the video's: on stage, the scene runs `pace` times slower (`pace.ts`) and the editor speeds
 * it back up.
 */
export class Act {
  readonly page: Page;
  readonly format: Format;
  readonly cuts: Span[] = [];
  readonly holds: Span[] = [];
  readonly marks: Mark[] = [];
  private camera: Camera = { on: false, since: now() };
  /** Where the pointer is; null until its first move, which enters from the right edge. */
  private pos: { x: number; y: number } | null = null;
  private stills = 0;

  constructor(
    page: Page,
    format: Format,
    private readonly recorder: Recorder,
    private readonly stage: Stage,
    private readonly outDir: string,
    private readonly cdp: CDPSession,
    private readonly pace: number,
  ) {
    this.page = page;
    this.format = format;
  }

  /** The page's main region, where most targets live. */
  get main() {
    return this.page.locator(this.stage.main).first();
  }

  // ── Off stage ────────────────────────────────────────────────────────────────────────────────

  /** Loads a page off camera; the video starts on the settled page. */
  async visit(path: string) {
    this.offstageStart();
    await this.page.goto(path);
    await this.ready();
    // Without a viewport tag a phone lays the page out at 980px and shrinks it: the video would
    // show an unreadable desktop page, and its raster never matches the check's screenshot.
    if (
      this.format.pointer === "touch" &&
      !(await this.page.evaluate(() => Boolean(document.querySelector("meta[name=viewport]"))))
    )
      throw new Error(
        `${path} has no <meta name="viewport">, so a phone shows it as a shrunken desktop page. Add the tag, or record desktop only (formats: ["desktop"] in the config, or --project=desktop).`,
      );
  }

  /** Runs work the viewer shouldn't see (seeding a state, switching a user, a slow load). Follow a
   *  navigation inside it with `ready()`. */
  async offstage(work: () => Promise<unknown>) {
    this.offstageStart();
    await work();
  }

  /** The app settled (the stage's `ready`), fonts in, the paced clock back on, motion done. */
  async ready() {
    await this.stage.ready(this.page);
    // Chromium keeps the rate across loads today (same-site and cross-site); set it again anyway,
    // so a build that resets it on a new document can't play CSS motion at full speed.
    await this.cdp.send("Animation.setPlaybackRate", { playbackRate: 1 / this.pace });
    await this.page.evaluate(() => document.fonts.ready);
    await this.beat(600);
  }

  // ── On stage ─────────────────────────────────────────────────────────────────────────────────

  /**
   * Glides the pointer to a target (no-op for touch, which has no pointer between taps). `at` picks
   * the point instead, in CSS px from the target's top-left corner (it may lie outside the box):
   * a place to rest beside a result rather than on its text.
   */
  async move(
    target: Locator,
    { duration, at }: { duration?: number; at?: { x: number; y: number } } = {},
  ) {
    await this.onstage();
    await this.reveal(target);
    if (this.format.pointer === "touch") return;
    const box = (await target.boundingBox())!;
    // Wide targets (rows, fields) are aimed near their start, where the eye reads them.
    const point = at
      ? { x: box.x + at.x, y: box.y + at.y }
      : { x: box.x + Math.min(box.width / 2, 64), y: box.y + box.height / 2 };
    await this.glide(point, duration);
  }

  async click(target: Locator, { after = 450 }: { after?: number } = {}) {
    await this.move(target);
    if (this.format.pointer === "touch") {
      await this.beat(320);
      await target.tap();
    } else {
      await this.beat(80);
      await this.page.mouse.down();
      await this.beat(90);
      await this.page.mouse.up();
    }
    await this.beat(after);
  }

  async hover(target: Locator, { after = 500 }: { after?: number } = {}) {
    await this.move(target);
    await this.beat(after);
  }

  /** Clicks a field and types into it at a human rhythm. */
  async type(target: Locator, text: string, { after = 350, perChar = 55 } = {}) {
    await this.click(target, { after: 180 });
    let i = 0;
    for (const char of text) {
      await this.page.keyboard.type(char);
      // A steady rhythm with a little variation, the same on every run.
      await this.beat(perChar * (0.7 + ((i++ * 7919) % 11) / 18) + (char === " " ? 40 : 0));
    }
    await this.beat(after);
  }

  async press(key: string, { after = 400 }: { after?: number } = {}) {
    await this.onstage();
    await this.page.keyboard.press(key);
    await this.beat(after);
  }

  /** Scrolls smoothly, by a distance or until a target is in the middle of the view. */
  async scroll(target: Locator | number, { after = 300 }: { after?: number } = {}) {
    await this.onstage();
    if (typeof target === "number")
      await this.page.evaluate(
        (distance) => (window as Page$).__cutscene.scrollBy(distance),
        target,
      );
    else await target.evaluate((node) => (window as Page$).__cutscene.scrollTo(node));
    await this.beat(after);
  }

  /** A held beat: kept at full length, never shortened as idle. */
  async wait(ms: number) {
    await this.onstage();
    const from = now();
    await this.beat(ms);
    this.holds.push([from, now()]);
  }

  /** A caption at the bottom of the frame (who is acting, what happens); null clears it. A new
   *  caption finishes fading in (240 ms, `overlay.ts`) before the scene moves on, so a mark right
   *  after it shows the whole line; clearing fades out alongside the next beat. */
  async caption(text: string | null) {
    await this.onstage();
    await this.page.evaluate((value) => (window as Page$).__cutscene.caption(value), text);
    if (text) await this.beat(CAPTION_FADE_MS);
  }

  /** A named beat: the self-check pulls a still from the video here. */
  mark(label: string) {
    this.marks.push({ label, t: now() });
  }

  /** A lossless PNG of the page (or one element), without the overlay. Cut from the video. */
  async shot(name: string, target?: Locator) {
    const from = now();
    const file = join(
      this.outDir,
      "stills",
      `${String(++this.stills).padStart(2, "0")}-${name}.png`,
    );
    await mkdir(join(this.outDir, "stills"), { recursive: true });
    await this.overlay(false);
    try {
      if (target) await target.screenshot({ path: file, animations: "disabled" });
      else await this.page.screenshot({ path: file });
    } finally {
      await this.overlay(true);
    }
    await this.recorder.settle();
    this.cuts.push([from, now()]);
  }

  // ── Internals ────────────────────────────────────────────────────────────────────────────────

  /** Waits a span of video time: `pace` times as long while recording. */
  private beat(ms: number) {
    return sleep(ms * this.pace);
  }

  private async overlay(on: boolean) {
    await this.page.evaluate((value) => (window as Page$).__cutscene.visible(value), on);
  }

  private offstageStart() {
    if (this.camera.on) this.camera = { on: false, since: now() };
  }

  /** Ends an off-stage stretch once the screen shows its result. */
  private async onstage() {
    if (this.camera.on) return;
    const { since } = this.camera;
    await this.recorder.settle();
    this.cuts.push([since, now()]);
    this.camera = { on: true };
  }

  /** Scrolls a target into view, as one paced motion, when it's off screen or under the edge. */
  private async reveal(target: Locator) {
    await target.waitFor({ state: "visible", timeout: 20_000 });
    const box = await target.boundingBox();
    const { height } = this.format.viewport;
    if (box && box.y >= 64 && box.y + box.height <= height - 32) return;
    await target.evaluate((node) => (window as Page$).__cutscene.scrollTo(node));
  }

  private async glide(to: { x: number; y: number }, duration?: number) {
    // The first move comes in from the right edge, so nothing shows a hover the viewer didn't see
    // the pointer reach (the overlay keeps it hidden until then), however the page was loaded.
    const { width, height } = this.format.viewport;
    const from = this.pos ?? { x: width - 4, y: Math.round(height * 0.72) };
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.hypot(dx, dy);
    const ms = (duration ?? Math.min(1000, Math.max(320, 260 + distance * 0.45))) * this.pace;
    // A slight arc: the control point sits off the straight line, to the side of travel.
    const bend = Math.min(distance * 0.12, 60);
    const cx = (from.x + to.x) / 2 - (dy / (distance || 1)) * bend;
    const cy = (from.y + to.y) / 2 + (dx / (distance || 1)) * bend;
    const start = performance.now();
    for (;;) {
      const k = Math.min(1, (performance.now() - start) / ms);
      const e = ease(k);
      const x = (1 - e) ** 2 * from.x + 2 * (1 - e) * e * cx + e ** 2 * to.x;
      const y = (1 - e) ** 2 * from.y + 2 * (1 - e) * e * cy + e ** 2 * to.y;
      await this.page.mouse.move(x, y);
      if (k === 1) break;
      await sleep(6);
    }
    this.pos = to;
  }
}
