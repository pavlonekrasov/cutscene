import { copyFile, link, mkdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import type { Browser, BrowserContext, Page } from "@playwright/test";
import { ffmpeg } from "../edit";
import { stage, view, type Cam } from "./camera";
import type { Take } from "./take";

/** An image drawn onto the frame: the whole source, placed at a fractional rectangle. */
type Layer = { url: string; x: number; y: number; width: number; height: number };

/** One frame of the reel, as the page draws it. Two frames with the same paint are the same image. */
export type Paint = {
  width: number;
  height: number;
  /** The app, then its window frame, under the camera. */
  layers: Layer[];
  /** A card over (or instead of) the layers: a fill in the colour of `sample`'s corner, and lines. */
  card?: {
    sample: string;
    fill: number;
    lines: { url: string; x: number; y: number; alpha: number; blur: number }[];
  };
  /** Only this part of the frame, for the fidelity gate. */
  crop?: { x: number; y: number; width: number; height: number };
};

/** The reel's pixels per canvas CSS px and its size, from a take's canvas. */
export function output(take: Take, scale: number) {
  const on = stage(take);
  return { scale, width: Math.round(on.width * scale), height: Math.round(on.height * scale) };
}

/**
 * What the camera sees of a take's frame: the app's capture and the window frame, each placed where
 * the camera's view puts it. The capture is denser than the reel, so a zoom shows more of its
 * pixels rather than stretching them.
 */
export function shot(take: Take, dir: string, file: string, cam: Cam, scale: number): Paint {
  const on = stage(take);
  const out = output(take, scale);
  const seen = view(cam, on);
  // Reel pixels per pixel of the take.
  const k = out.width / (seen.width * on.density);
  const place = (x: number, y: number, width: number, height: number) => ({
    x: (x - seen.x * on.density) * k,
    y: (y - seen.y * on.density) * k,
    width: width * k,
    height: height * k,
  });
  const { layout } = take;
  const layers: Layer[] = [
    { url: source(join(dir, file)), ...place(layout.x, layout.y, layout.width, layout.height) },
  ];
  if (take.frame)
    layers.push({
      url: source(join(dir, take.frame)),
      ...place(0, 0, layout.canvas.width, layout.canvas.height),
    });
  return { width: out.width, height: out.height, layers };
}

/** Where the app shows in a shot, in the reel's pixels, shrunk onto whole even pixels. */
export function appRect(take: Take, cam: Cam, scale: number) {
  const paint = shot(take, "", "", cam, scale);
  const app = paint.layers[0]!;
  const even = (n: number, up: boolean) => (up ? Math.ceil(n / 2) : Math.floor(n / 2)) * 2;
  const x = even(Math.max(0, app.x), true);
  const y = even(Math.max(0, app.y), true);
  const right = even(Math.min(paint.width, app.x + app.width), false);
  const bottom = even(Math.min(paint.height, app.y + app.height), false);
  return { x, y, width: right - x, height: bottom - y };
}

const ORIGIN = "http://reel.render";
const source = (path: string) => `${ORIGIN}/file/${encodeURIComponent(path)}`;

/**
 * Draws the reel's frames in a Chromium canvas. `drawImage` places a source at fractional
 * coordinates, so a slow push or pan moves between whole pixels instead of stepping across them
 * (ffmpeg's `zoompan` rounds). A shot at rest sits on whole pixels (`camera.ts`), and where a
 * capture pixel then lands on exactly one reel pixel it is copied, not resampled.
 */
export class Renderer {
  private context!: BrowserContext;
  private page!: Page;

  constructor(private readonly browser: Browser) {}

  async open() {
    this.context = await this.browser.newContext({
      viewport: { width: 640, height: 360 },
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
    });
    this.page = await this.context.newPage();
    await this.page.route(`${ORIGIN}/**`, async (route) => {
      const { pathname } = new URL(route.request().url());
      if (!pathname.startsWith("/file/"))
        return route.fulfill({
          body: "<!doctype html><title>reel</title>",
          contentType: "text/html",
        });
      const body = await readFile(decodeURIComponent(pathname.slice("/file/".length)));
      return route.fulfill({ body, contentType: "image/png" });
    });
    await this.page.goto(`${ORIGIN}/`);
  }

  /** One frame as a PNG. */
  async paint(spec: Paint): Promise<Buffer> {
    const data = await this.page.evaluate(draw, spec);
    return Buffer.from(data, "base64");
  }

  async close() {
    await this.context?.close();
  }
}

/** In the render page: draws one frame and returns it as a base64 PNG. */
async function draw(spec: Paint): Promise<string> {
  type Store = {
    images: Map<string, ImageBitmap>;
    colours: Map<string, string>;
    canvas: HTMLCanvasElement;
  };
  const scope = window as typeof window & { __reel?: Store };
  const store = (scope.__reel ??= {
    images: new Map(),
    colours: new Map(),
    canvas: document.createElement("canvas"),
  });
  const load = async (url: string) => {
    const hit = store.images.get(url);
    if (hit) {
      // Most recently used last.
      store.images.delete(url);
      store.images.set(url, hit);
      return hit;
    }
    const image = await createImageBitmap(await (await fetch(url)).blob());
    store.images.set(url, image);
    // A take's frames are large: keep a handful, drop the oldest.
    while (store.images.size > 6) {
      const [oldest, bitmap] = store.images.entries().next().value!;
      bitmap.close();
      store.images.delete(oldest);
    }
    return image;
  };
  const crop = spec.crop ?? { x: 0, y: 0, width: spec.width, height: spec.height };
  const { canvas } = store;
  if (canvas.width !== crop.width || canvas.height !== crop.height) {
    canvas.width = crop.width;
    canvas.height = crop.height;
  }
  const context = canvas.getContext("2d", { alpha: false })!;
  context.setTransform(1, 0, 0, 1, -crop.x, -crop.y);
  context.globalAlpha = 1;
  context.filter = "none";
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.fillStyle = "#000";
  context.fillRect(0, 0, spec.width, spec.height);
  for (const layer of spec.layers)
    context.drawImage(await load(layer.url), layer.x, layer.y, layer.width, layer.height);
  if (spec.card) {
    let colour = store.colours.get(spec.card.sample);
    if (!colour) {
      const probe = new OffscreenCanvas(1, 1).getContext("2d")!;
      probe.drawImage(await load(spec.card.sample), 0, 0);
      const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
      colour = `rgb(${r} ${g} ${b})`;
      store.colours.set(spec.card.sample, colour);
    }
    context.globalAlpha = spec.card.fill;
    context.fillStyle = colour;
    context.fillRect(0, 0, spec.width, spec.height);
    for (const line of spec.card.lines) {
      if (line.alpha <= 0) continue;
      context.globalAlpha = line.alpha;
      context.filter = line.blur > 0.05 ? `blur(${line.blur.toFixed(2)}px)` : "none";
      context.drawImage(await load(line.url), line.x, line.y);
    }
  }
  return canvas.toDataURL("image/png").slice("data:image/png;base64,".length);
}

/** A card's lines, stacked and centred. */
export function cardLayout(
  dir: string,
  lines: { file: string; width: number; height: number }[],
  size: { width: number; height: number },
) {
  const total = lines.reduce((sum, line) => sum + line.height, 0);
  let y = Math.round((size.height - total) / 2);
  return lines.map((line) => {
    const placed = {
      url: source(join(dir, line.file)),
      x: Math.round((size.width - line.width) / 2),
      y,
    };
    y += line.height;
    return placed;
  });
}

/**
 * Frames → the reel's MP4, with the encode a scene uses: RGB to YUV once, BT.709 limited range,
 * tagged BT.709 / sRGB. The frames go in as a numbered sequence read at 60 per second, one file
 * per frame of the video (a repeated frame is a hard link): a concat list of images carries their
 * times on a 1/25 s clock, which would turn a smooth move into steps.
 */
export async function encodeReel(
  entries: { file: string; frames: number }[],
  workDir: string,
  file: string,
) {
  const sequence = join(workDir, `sequence-${Date.now()}`);
  await mkdir(sequence, { recursive: true });
  let total = 0;
  for (const entry of entries)
    for (let i = 0; i < entry.frames; i++) {
      const frame = join(sequence, `${String(total++).padStart(6, "0")}.png`);
      await link(entry.file, frame).catch(() => copyFile(entry.file, frame));
    }
  try {
    ffmpeg([
      ...["-framerate", "60", "-start_number", "0", "-i", join(sequence, "%06d.png")],
      "-vf",
      "format=gbrp,scale=out_color_matrix=bt709:out_range=tv:flags=accurate_rnd+full_chroma_int,format=yuv420p",
      ...["-c:v", "libx264", "-preset", "slow", "-crf", "16", "-r", "60"],
      ...["-frames:v", String(total)],
      ...["-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "iec61966-2-1"],
      ...["-color_range", "tv", "-movflags", "+faststart", file],
    ]);
  } finally {
    await rm(sequence, { recursive: true, force: true });
  }
  return total / 60;
}
