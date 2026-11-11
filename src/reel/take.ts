import { readFileSync } from "node:fs";
import { copyFile, mkdir, rename, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import type { Format } from "../formats";

/**
 * What a reel asks of a scene run, read from the file `CUTSCENE_REEL` points at. Only `cutscene
 * reel` sets it: without it a scene records exactly as it always has.
 */
export type ReelJob = {
  /** Where takes are saved: `<takes>/<scene>-<project>-<theme>/`. */
  takes: string;
  /** Device pixels per CSS pixel for the take: twice the deepest zoom the reel may use. */
  density: number;
  /** The finished reel's pixels per canvas CSS px: card text is drawn at this size. */
  scale: number;
  /** Card lines, drawn in the app's own page so they take its typeface. */
  cards?: { open?: string[]; close?: string[] };
};

let job: ReelJob | null | undefined;

/** The reel job this run records for, or null in every ordinary run. */
export function reelJob(): ReelJob | null {
  if (job !== undefined) return job;
  const file = process.env.CUTSCENE_REEL;
  return (job = file ? (JSON.parse(readFileSync(file, "utf8")) as ReelJob) : null);
}

/** A format at a reel's density: the same CSS layout, more device pixels, a canvas to match. */
export function denseFormat(format: Format, density: number): Format {
  const k = density / format.scale;
  return {
    ...format,
    scale: density,
    canvas: {
      width: Math.round(format.canvas.width * k),
      height: Math.round(format.canvas.height * k),
    },
  };
}

/** How slow a take records so its motion still lands at 60 fps: denser frames paint slower. */
export function paceFor(density: number) {
  return density <= 2 ? 2 : density <= 3 ? 4 : 2 * density - 2;
}

export type Box = { x: number; y: number; width: number; height: number };

/**
 * What happened in a take, as the camera and the speed ramps need it. Times are wall-clock seconds
 * while recording and video seconds once saved; boxes and points are CSS px in the viewport.
 */
export type TakeEvent =
  /** One `act` call, start to end: time outside every call is the app being waited on. */
  | { kind: "call"; t0: number; t1: number }
  | { kind: "glide"; t0: number; t1: number; from: Point; to: Point }
  | { kind: "click"; t: number; box: Box; point: Point }
  | { kind: "hover"; t: number; box: Box; point: Point }
  /** From the first character to the last. */
  | { kind: "type"; t0: number; t1: number; box: Box }
  | { kind: "scroll"; t0: number; t1: number }
  | { kind: "hold"; t0: number; t1: number }
  /** `act.focus()`: frame this box, at this zoom when given. */
  | { kind: "focus"; t: number; box: Box; zoom?: number }
  /** `act.wide()`: pull back to the whole window. */
  | { kind: "wide"; t: number };

export type Point = { x: number; y: number };

/** The log `Act` writes to during a reel take. Absent in every ordinary run. */
export class TakeLog {
  readonly events: TakeEvent[] = [];
  push(event: TakeEvent) {
    this.events.push(event);
  }
}

export type CardLine = { file: string; width: number; height: number };

/** A saved take: everything `cutscene reel` cuts from, in `<takes>/<name>/take.json`. */
export type Take = {
  scene: string;
  /** The scene file, absolute: how a reel's clip finds its take. */
  file: string;
  project: string;
  theme: "light" | "dark";
  blurred: string[];
  density: number;
  pace: number;
  format: Format;
  /** Where the app sits on the take's canvas, device px (`layout`). */
  layout: { x: number; y: number; width: number; height: number; canvas: Size };
  duration: number;
  motionFps: number;
  /** The edited timeline: each frame, when it starts in the video and how long it shows. */
  entries: { file: string; at: number; duration: number }[];
  marks: { label: string; at: number }[];
  events: TakeEvent[];
  /** The frame PNG at the take's density, or null without a frame. */
  frame: string | null;
  /** A lossless screenshot of the take's last moment, for the fidelity gate. */
  reference: string;
  cards: { open: CardLine[]; close: CardLine[] } | null;
};

type Size = { width: number; height: number };

/** Events with their times moved from the recording's clock onto the video's. */
export function onVideoClock(events: TakeEvent[], map: (t: number) => number): TakeEvent[] {
  return events.map((event) =>
    "t" in event
      ? { ...event, t: map(event.t) }
      : { ...event, t0: map(event.t0), t1: map(event.t1) },
  );
}

/**
 * Saves a take: the frames the timeline uses (moved out of the temp folder, which the scene
 * deletes), the lossless end screenshot, and `take.json`.
 */
export async function saveTake(
  dir: string,
  take: Omit<Take, "entries" | "reference"> & {
    entries: { file: string; out: number; duration: number }[];
  },
  reference: Buffer,
) {
  await mkdir(join(dir, "frames"), { recursive: true });
  const entries: Take["entries"] = [];
  for (const entry of take.entries) {
    const file = join("frames", basename(entry.file));
    // Across drives a rename fails; a copy is the same bytes.
    await rename(entry.file, join(dir, file)).catch(() => copyFile(entry.file, join(dir, file)));
    entries.push({ file, at: entry.out, duration: entry.duration });
  }
  await writeFile(join(dir, "reference.png"), reference);
  const saved: Take = { ...take, entries, reference: "reference.png" };
  await writeFile(join(dir, "take.json"), JSON.stringify(saved, null, 2));
}
