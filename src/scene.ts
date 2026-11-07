import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";
import { test as base, type BrowserContext, type Page } from "@playwright/test";
import { Act } from "./act";
import { Recorder } from "./capture";
import { fidelity, fidelityProblem, review } from "./check";
import { buildTimeline, encode, frameSize } from "./edit";
import { appSize, FORMATS, type Format } from "./formats";
import { DEFAULT_FRAME, layout, renderFrame, type FrameStyle } from "./frame";
import { installOverlay } from "./overlay";
import { installPace } from "./pace";

export type Theme = "light" | "dark";

/** The dev-tools badges Next.js draws over a page in development. */
export const NEXT_DEV_TOOLS = ["nextjs-portal", "[data-nextjs-toast]", "[data-next-badge-root]"];

export type SceneOptions<Extra extends object> = {
  /** Where videos go: `<outDir>/<scene>-<project>-<theme>/`. `CUTSCENE_OUT` wins. */
  outDir?: string;
  /** Before the first load: cookies, storage, a signed-in state, a recording mode, a locale. */
  setup?: (context: BrowserContext, info: { baseURL: string; theme: Theme }) => Promise<void>;
  /** Resolves once the app is settled after a load (hydrated, data in). Default: network idle. */
  ready?: (page: Page) => Promise<void>;
  /** The page's main region, a CSS selector; `act.main` and `act.scroll(distance)` use it. */
  main?: string;
  /** CSS selectors hidden while recording: dev-only badges, toolbars, cookie banners. */
  hide?: string[];
  /** The frame's look: backdrop, shadow, title bar, phone bezel, corners. */
  frame?: FrameStyle;
  /** Project helpers merged onto `act` (a role switch, translations); can't shadow Act's own. */
  extend?: (act: Act) => Extra;
};

export type CutsceneFixtures = {
  /** What the scene is shot at (a project sets it; see `FORMATS`). */
  format: Format;
  /** How many times slower than life a scene records (`pace.ts`); the edit plays it at 1×. */
  pace: number;
  /** Longest a still stretch may last in the video, in seconds (`act.wait` is exempt). */
  idleCap: number;
};

/** Median paint rate over gaps shorter than 0.25 s. */
function motionFps(times: number[]) {
  const gaps = times
    .slice(1)
    .map((t, i) => t - times[i]!)
    .filter((gap) => gap > 0 && gap < 0.25)
    .sort((a, b) => a - b);
  const median = gaps[Math.floor(gaps.length / 2)];
  return median ? Number((1 / median).toFixed(1)) : 0;
}

/**
 * `scene(title, run)`: a Playwright test whose `act` records the page and, when the scene passes,
 * cuts, frames and encodes it into `<outDir>/<scene>-<project>-<theme>/`, then proves the video
 * matches the app (`check/`, `manifest.json`) and fails the scene when it doesn't.
 */
export function createScene<Extra extends object = Record<never, never>>(
  options: SceneOptions<Extra> = {},
) {
  const main = options.main ?? "main, [role=main]";
  const style = options.frame ?? DEFAULT_FRAME;
  const ready =
    options.ready ??
    (async (page: Page) => {
      await page.waitForLoadState("load");
      await page.waitForLoadState("networkidle");
    });
  const OUT = process.env.CUTSCENE_OUT ?? options.outDir ?? join(homedir(), "Videos", "cutscene");

  return base.extend<CutsceneFixtures & { act: Act & Extra }>({
    format: [FORMATS.desktop, { option: true }],
    pace: [Number(process.env.CUTSCENE_PACE) || 2, { option: true }],
    idleCap: [1.2, { option: true }],

    act: async (
      { page, context, browser, format: projectFormat, pace, colorScheme, idleCap, baseURL },
      run,
      info,
    ) => {
      const format: Format = { ...projectFormat };
      if (process.env.CUTSCENE_FRAME === "none") format.frame = "none";
      const theme: Theme = colorScheme === "dark" ? "dark" : "light";
      const slug = info.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      const outDir = join(OUT, `${slug}-${info.project.name}-${theme}`);
      const workDir = join(tmpdir(), "cutscene", `${slug}-${Date.now()}`);
      await options.setup?.(context, { baseURL: baseURL ?? "", theme });
      await context.addInitScript(installPace, pace);
      await context.addInitScript(installOverlay, {
        pointer: format.pointer,
        hide: options.hide ?? [],
        main,
      });
      const cdp = await context.newCDPSession(page);
      await cdp.send("Animation.enable");

      const app = appSize(format);
      const image = process.env.CUTSCENE_CAPTURE === "jpeg" ? "jpeg" : "png";
      const recorder = new Recorder(page, join(workDir, "frames"), app, image);
      await rm(outDir, { recursive: true, force: true });
      await mkdir(outDir, { recursive: true });
      await recorder.start();
      const act = new Act(page, format, recorder, { ready, main }, outDir, cdp, pace);
      const extra = options.extend?.(act) ?? ({} as Extra);
      for (const key of Object.keys(extra))
        if (key in act) throw new Error(`extend: "${key}" would shadow act.${key}.`);

      await run(Object.assign(act, extra));

      await act.wait(900); // the end state, held
      // What the screen shows now, losslessly: the reference the finished video is checked against.
      const reference = await page.screenshot();
      const { frames, end } = await recorder.stop();
      try {
        if (info.status !== info.expectedStatus) return;
        if (!frames.length) throw new Error("No frames were captured.");
        const captured = frameSize(frames[0]!.file);
        if (captured.width !== app.width || captured.height !== app.height)
          throw new Error(
            `Captured ${captured.width}×${captured.height}, expected the app's ${app.width}×${app.height}: the video would be resampled. Launch Chrome with --force-device-scale-factor (cutsceneConfig does).`,
          );
        const timeline = buildTimeline(frames, end, {
          cuts: act.cuts,
          holds: act.holds,
          idleCap,
          pace,
        });
        const framePng = format.frame === "none" ? null : join(workDir, "frame.png");
        if (framePng) await renderFrame(browser, format, style[theme], style, framePng);
        const video = join(outDir, `${slug}.mp4`);
        await encode({ entries: timeline.entries, format, framePng, workDir, file: video });
        const marks = act.marks.map((mark) => ({ label: mark.label, at: timeline.map(mark.t) }));
        await review(video, timeline.duration, marks, join(outDir, "check"));
        const rect = layout(format);
        const match = await fidelity(
          browser,
          video,
          Math.max(0, timeline.duration - 0.1),
          reference,
          framePng ? await readFile(framePng) : null,
          rect,
        );
        const raw = end - frames[0]!.t;
        await writeFile(
          join(outDir, "manifest.json"),
          JSON.stringify(
            {
              scene: info.title,
              file: info.file,
              project: info.project.name,
              theme,
              canvas: rect.canvas,
              app: { ...app, x: rect.x, y: rect.y, scale: format.scale },
              capture: image,
              duration: Number(timeline.duration.toFixed(2)),
              recorded: Number(raw.toFixed(2)),
              frames: frames.length,
              pace,
              capturedFps: Number((frames.length / raw).toFixed(1)),
              // The paint rate while something moves (still stretches send no frames), in the
              // video: captured rate × pace. 60 or more is every frame of a 60 fps video.
              motionFps: Number((motionFps(frames.map((frame) => frame.t)) * pace).toFixed(1)),
              // The last frame as Chrome decodes it against a lossless screenshot of that moment.
              fidelity: match,
              marks,
            },
            null,
            2,
          ),
        );
        const problem = fidelityProblem(match);
        if (problem) {
          // The screenshot it was held against, to open beside `check/`'s last still.
          await writeFile(join(outDir, "check", "reference.png"), reference);
          throw new Error(problem);
        }
        console.log(
          `\n  ${info.title}: ${video} (${timeline.duration.toFixed(1)} s, ${match.decoded ? `PSNR ${match.psnr} dB` : "fidelity not checked: no H.264 in this browser"})\n`,
        );
      } finally {
        if (!process.env.CUTSCENE_KEEP) await rm(workDir, { recursive: true, force: true });
      }
    },
  });
}
