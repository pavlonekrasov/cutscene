import { mkdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { Browser } from "@playwright/test";
import { ffmpeg } from "./edit";

/**
 * The self-check: a still at every mark and a contact sheet across the whole video, so a reviewer
 * (human or agent) sees each beat landed without scrubbing.
 */
export async function review(
  video: string,
  duration: number,
  marks: { label: string; at: number }[],
  dir: string,
) {
  await mkdir(dir, { recursive: true });
  marks.forEach((mark, i) => {
    const name = `${String(i + 1).padStart(2, "0")}-${mark.label.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.jpg`;
    ffmpeg([
      ...["-ss", Math.max(0, Math.min(mark.at, duration - 0.05)).toFixed(3), "-i", video],
      ...["-frames:v", "1", "-q:v", "2", join(dir, name)],
    ]);
  });
  const step = Math.max(duration / 16, 0.25);
  ffmpeg([
    ...["-i", video, "-vf", `fps=1/${step.toFixed(3)},scale=480:-2,tile=4x4:padding=6`],
    ...["-frames:v", "1", "-q:v", "3", join(dir, "contact.jpg")],
  ]);
}

export type Fidelity = {
  /** Peak signal-to-noise ratio of the app region against the lossless screenshot, in dB. */
  psnr: number;
  /** Mean signed difference per channel (R, G, B), 0–255: a colour shift shows here. */
  shift: [number, number, number];
  /** Share of pixels off by more than 16 in any channel. */
  off: number;
  /** Whether a frame of the video was decoded and compared. */
  decoded: boolean;
  /**
   * Who decoded it: the browser (`<video>`, as a viewer's browser would) or, when this Chromium has
   * no H.264, ffmpeg with the BT.709 limited-range matrix the video is tagged with.
   */
  decoder?: "browser" | "ffmpeg";
};

/** Below this the video no longer reads as the app: text softens, colours drift. */
export const FIDELITY_MIN = { psnr: 38, shift: 1.5, off: 0.005 };

/**
 * Proves the video shows the app as the browser painted it: decodes a frame of the finished MP4 the
 * way a viewer's browser does (`<video>` → canvas; ffmpeg when this Chromium build has no H.264) and
 * compares the app region with a lossless screenshot of the same moment, pixel by pixel. Only the
 * pixels the frame leaves open count: a rounded window or screen corner covers the app's corner on
 * purpose.
 */
export async function fidelity(
  browser: Browser,
  video: string,
  at: number,
  reference: Buffer,
  /** The frame PNG; its transparent hole is what the viewer sees of the app. */
  frame: Buffer | null,
  rect: { x: number; y: number; width: number; height: number },
): Promise<Fidelity> {
  // Not the scene's project options (a phone's `isMobile`, its density): a plain desktop page.
  const context = await browser.newContext({
    viewport: { width: 640, height: 360 },
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
  });
  const page = await context.newPage();
  const origin = "http://fidelity.check";
  const bytes = await readFile(video);
  await page.route(`${origin}/**`, (route) => {
    const { pathname } = new URL(route.request().url());
    if (pathname === "/video.mp4") return route.fulfill({ body: bytes, contentType: "video/mp4" });
    if (pathname === "/reference.png")
      return route.fulfill({ body: reference, contentType: "image/png" });
    if (pathname === "/frame.png" && frame)
      return route.fulfill({ body: frame, contentType: "image/png" });
    return route.fulfill({ body: "<!doctype html><title>check</title>", contentType: "text/html" });
  });
  await page.goto(`${origin}/`);
  const h264 = await page.evaluate(() =>
    document.createElement("video").canPlayType('video/mp4; codecs="avc1.640033"'),
  );
  let decodedPng: Buffer | null = null;
  if (!h264) {
    const file = join(tmpdir(), `cutscene-decoded-${Date.now()}.png`);
    ffmpeg([
      ...["-ss", at.toFixed(3), "-i", video, "-frames:v", "1"],
      ...["-vf", "scale=in_color_matrix=bt709:in_range=tv:flags=accurate_rnd+full_chroma_int"],
      ...["-pix_fmt", "rgb24", file],
    ]);
    decodedPng = await readFile(file);
    await rm(file, { force: true });
    await page.route(`${origin}/decoded.png`, (route) =>
      route.fulfill({ body: decodedPng!, contentType: "image/png" }),
    );
  }
  try {
    return await page.evaluate(
      async ({ at, rect, framed, browserDecodes }) => {
        let source: CanvasImageSource;
        if (browserDecodes) {
          const video = document.createElement("video");
          video.muted = true;
          video.src = URL.createObjectURL(await (await fetch("/video.mp4")).blob());
          const loaded = await new Promise<boolean>((done) => {
            video.onloadeddata = () => done(true);
            video.onerror = () => done(false);
          });
          if (!loaded) return { psnr: 0, shift: [0, 0, 0], off: 0, decoded: false };
          video.currentTime = at;
          await new Promise((done) => (video.onseeked = done));
          source = video;
        } else source = await createImageBitmap(await (await fetch("/decoded.png")).blob());
        const image = await createImageBitmap(await (await fetch("/reference.png")).blob());
        const canvas = new OffscreenCanvas(rect.width, rect.height);
        const context = canvas.getContext("2d", { willReadFrequently: true })!;
        context.drawImage(
          source,
          rect.x,
          rect.y,
          rect.width,
          rect.height,
          0,
          0,
          rect.width,
          rect.height,
        );
        const got = context.getImageData(0, 0, rect.width, rect.height).data;
        context.clearRect(0, 0, rect.width, rect.height);
        context.drawImage(image, 0, 0);
        const want = context.getImageData(0, 0, rect.width, rect.height).data;
        let open: Uint8ClampedArray | null = null;
        if (framed) {
          context.clearRect(0, 0, rect.width, rect.height);
          const frame = await createImageBitmap(await (await fetch("/frame.png")).blob());
          context.drawImage(frame, -rect.x, -rect.y);
          open = context.getImageData(0, 0, rect.width, rect.height).data;
        }
        let squared = 0;
        let off = 0;
        let pixels = 0;
        const shift = [0, 0, 0];
        for (let i = 0; i < got.length; i += 4) {
          if (open && open[i + 3] !== 0) continue;
          pixels++;
          let worst = 0;
          for (let c = 0; c < 3; c++) {
            const d = got[i + c]! - want[i + c]!;
            squared += d * d;
            shift[c]! += d;
            worst = Math.max(worst, Math.abs(d));
          }
          if (worst > 16) off++;
        }
        const mse = squared / (pixels * 3);
        return {
          psnr: Number((mse ? 10 * Math.log10((255 * 255) / mse) : 99).toFixed(1)),
          shift: shift.map((sum) => Number((sum / pixels).toFixed(2))) as [number, number, number],
          off: Number((off / pixels).toFixed(4)),
          decoded: true,
          decoder: browserDecodes ? "browser" : "ffmpeg",
        };
      },
      { at, rect, framed: Boolean(frame), browserDecodes: Boolean(h264) },
    );
  } finally {
    await context.close();
  }
}

export function fidelityProblem(result: Fidelity) {
  if (!result.decoded) return null;
  const shift = Math.max(...result.shift.map(Math.abs));
  if (
    result.psnr < FIDELITY_MIN.psnr ||
    shift > FIDELITY_MIN.shift ||
    result.off > FIDELITY_MIN.off
  )
    return `The video drifts from the app: PSNR ${result.psnr} dB (min ${FIDELITY_MIN.psnr}), colour shift ${result.shift.join(" / ")} (max ±${FIDELITY_MIN.shift}), ${(result.off * 100).toFixed(2)}% of pixels off by more than 16.`;
  return null;
}
