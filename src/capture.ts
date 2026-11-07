import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { CDPSession, Page } from "@playwright/test";

/** One captured frame: the file and when it reached the screen (seconds, wall clock). */
export type Frame = { file: string; t: number };

/**
 * Records the page through Chrome's screencast: an image each time the compositor paints, stamped
 * with its time, at the page's full device resolution. Nothing paints while the page is still, so a frame
 * lasts until the next one; the editor turns that into a constant-rate video. It runs alongside the
 * real browser, so what the video shows is what the app did.
 */
export class Recorder {
  readonly frames: Frame[] = [];
  private session?: CDPSession;
  private writes: Promise<void>[] = [];

  constructor(
    private readonly page: Page,
    private readonly dir: string,
    private readonly size: { width: number; height: number },
    /** `png` is lossless; `jpeg` (quality 100) paints faster on a slow machine. */
    private readonly image: "png" | "jpeg" = "png",
  ) {}

  async start() {
    await mkdir(this.dir, { recursive: true });
    this.session = await this.page.context().newCDPSession(this.page);
    this.session.on("Page.screencastFrame", ({ data, metadata, sessionId }) => {
      const now = Date.now() / 1000;
      // The paint time when Chrome reports one on the same clock; else the arrival time.
      const stamp = metadata.timestamp;
      const t = stamp && Math.abs(stamp - now) < 2 ? stamp : now;
      const file = join(this.dir, `${String(this.frames.length).padStart(6, "0")}.${this.image}`);
      this.frames.push({ file, t });
      this.writes.push(writeFile(file, Buffer.from(data, "base64")));
      void this.session?.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
    });
    await this.session.send("Page.startScreencast", {
      format: this.image,
      ...(this.image === "jpeg" ? { quality: 100 } : {}),
      maxWidth: this.size.width,
      maxHeight: this.size.height,
      everyNthFrame: 1,
    });
  }

  /** Waits for a fresh paint, so a scene's first or last moment is on record. */
  async settle(timeout = 1500) {
    const count = this.frames.length;
    // A still page sends nothing: nudge one paint, then wait for it.
    await this.page.evaluate(
      () => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))),
    );
    const until = Date.now() + timeout;
    while (this.frames.length === count && Date.now() < until)
      await new Promise((done) => setTimeout(done, 30));
  }

  async stop() {
    await this.session?.send("Page.stopScreencast").catch(() => {});
    await Promise.all(this.writes);
    await this.session?.detach().catch(() => {});
    return { frames: this.frames, end: Date.now() / 1000 };
  }
}
