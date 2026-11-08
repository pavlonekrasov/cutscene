import { readFileSync, rmSync } from "node:fs";
import { mkdir, readFile } from "node:fs/promises";
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
  /**
   * Who decoded the frame: the browser (`<video>`, as a viewer's browser would) or, when this
   * Chromium has no H.264 or can't play the file, ffmpeg with the BT.709 limited-range matrix the
   * video is tagged with. A frame is always decoded: a video neither can read fails the scene.
   */
  decoder: "browser" | "ffmpeg";
  /** Peak signal-to-noise ratio of the app region against the lossless screenshot, in dB. */
  psnr: number;
  /** Mean signed difference per channel (R, G, B), 0–255: a colour shift shows here. */
  shift: [number, number, number];
  /**
   * Share of pixels whose brightness (BT.709 luma, 0–255) is off by more than 16. Brightness only:
   * 4:2:0 keeps colour at half resolution, and a browser's decode smears it a pixel or two across a
   * saturated edge (a bright bar on a dark track), which no faithful H.264 take avoids. A colour
   * drift still fails on `shift` and `psnr`.
   */
  off: number;
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
  let decoded: Buffer | null = null;
  await page.route(`${origin}/**`, (route) => {
    const { pathname } = new URL(route.request().url());
    if (pathname === "/video.mp4") return route.fulfill({ body: bytes, contentType: "video/mp4" });
    if (pathname === "/reference.png")
      return route.fulfill({ body: reference, contentType: "image/png" });
    if (pathname === "/frame.png" && frame)
      return route.fulfill({ body: frame, contentType: "image/png" });
    if (pathname === "/decoded.png" && decoded)
      return route.fulfill({ body: decoded, contentType: "image/png" });
    return route.fulfill({ body: "<!doctype html><title>check</title>", contentType: "text/html" });
  });
  try {
    await page.goto(`${origin}/`);
    const h264 = await page.evaluate(() =>
      document.createElement("video").canPlayType('video/mp4; codecs="avc1.640033"'),
    );
    // The browser first, as a viewer would see it; ffmpeg when it can't, which throws on a video
    // it can't read either.
    for (const decoder of h264 ? (["browser", "ffmpeg"] as const) : (["ffmpeg"] as const)) {
      if (decoder === "ffmpeg") decoded = decodeFrame(video, at);
      const result = await page.evaluate(compare, { at, rect, framed: Boolean(frame), decoder });
      if (result) return result;
    }
    throw new Error(`Neither the browser nor ffmpeg decoded ${video}.`);
  } finally {
    await context.close();
  }
}

/** A frame of the video as a PNG, decoded by ffmpeg with the matrix and range it's tagged with. */
function decodeFrame(video: string, at: number) {
  const file = join(tmpdir(), `cutscene-decoded-${process.pid}-${Date.now()}.png`);
  try {
    ffmpeg([
      ...["-ss", at.toFixed(3), "-i", video, "-frames:v", "1"],
      ...["-vf", "scale=in_color_matrix=bt709:in_range=tv:flags=accurate_rnd+full_chroma_int"],
      ...["-pix_fmt", "rgb24", file],
    ]);
    return readFileSync(file);
  } finally {
    rmSync(file, { force: true });
  }
}

/**
 * In the check page: the decoded frame's app region against the screenshot. `null` when the
 * browser can't load or seek the video (within 20 s), so the caller falls back to ffmpeg.
 */
async function compare({
  at,
  rect,
  framed,
  decoder,
}: {
  at: number;
  rect: { x: number; y: number; width: number; height: number };
  framed: boolean;
  decoder: "browser" | "ffmpeg";
}): Promise<Fidelity | null> {
  const within = <T>(work: Promise<T>, fallback: T) =>
    Promise.race([work, new Promise<T>((done) => setTimeout(() => done(fallback), 20_000))]);
  let source: CanvasImageSource;
  if (decoder === "browser") {
    const video = document.createElement("video");
    video.muted = true;
    video.src = URL.createObjectURL(await (await fetch("/video.mp4")).blob());
    const loaded = await within(
      new Promise<boolean>((done) => {
        video.onloadeddata = () => done(true);
        video.onerror = () => done(false);
      }),
      false,
    );
    if (!loaded) return null;
    const seeked = within(
      new Promise<boolean>((done) => (video.onseeked = () => done(true))),
      false,
    );
    video.currentTime = at;
    if (!(await seeked)) return null;
    source = video;
  } else source = await createImageBitmap(await (await fetch("/decoded.png")).blob());
  const image = await createImageBitmap(await (await fetch("/reference.png")).blob());
  const canvas = new OffscreenCanvas(rect.width, rect.height);
  const context = canvas.getContext("2d", { willReadFrequently: true })!;
  context.drawImage(source, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
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
    for (let c = 0; c < 3; c++) {
      const d = got[i + c]! - want[i + c]!;
      squared += d * d;
      shift[c]! += d;
    }
    const luma =
      0.2126 * (got[i]! - want[i]!) +
      0.7152 * (got[i + 1]! - want[i + 1]!) +
      0.0722 * (got[i + 2]! - want[i + 2]!);
    if (Math.abs(luma) > 16) off++;
  }
  const mse = squared / (pixels * 3);
  return {
    decoder,
    psnr: Number((mse ? 10 * Math.log10((255 * 255) / mse) : 99).toFixed(1)),
    shift: shift.map((sum) => Number((sum / pixels).toFixed(2))) as [number, number, number],
    off: Number((off / pixels).toFixed(4)),
  };
}

export function fidelityProblem(result: Fidelity) {
  const shift = Math.max(...result.shift.map(Math.abs));
  if (
    result.psnr < FIDELITY_MIN.psnr ||
    shift > FIDELITY_MIN.shift ||
    result.off > FIDELITY_MIN.off
  )
    return `The video drifts from the app: PSNR ${result.psnr} dB (min ${FIDELITY_MIN.psnr}), colour shift ${result.shift.join(" / ")} (max ±${FIDELITY_MIN.shift}), ${(result.off * 100).toFixed(2)}% of pixels off in brightness by more than 16.`;
  return null;
}
