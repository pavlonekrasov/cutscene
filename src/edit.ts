import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { copyFile, link, mkdir, rm } from "node:fs/promises";
import { createRequire } from "node:module";
import { extname, join } from "node:path";
import type { Frame } from "./capture";
import { layout } from "./frame";
import type { Format } from "./formats";

export type Span = [start: number, end: number];
export type Mark = { label: string; t: number };

/**
 * Turns raw frames into the edit: spans marked off-stage (loads, off-camera navigation, setup) are removed, a
 * still stretch longer than `idleCap` is shortened (a slow compile or fetch never reads as a frozen
 * video), and spans the scene asked to hold (`act.wait`) keep their full length. What's left plays
 * `pace` times faster than it was recorded (`pace.ts`), back to life speed; `idleCap` is in video
 * seconds.
 */
export function buildTimeline(
  frames: Frame[],
  end: number,
  {
    cuts,
    holds,
    idleCap,
    pace = 1,
  }: { cuts: Span[]; holds: Span[]; idleCap: number; pace?: number },
) {
  const overlap = (a: number, b: number, spans: Span[]) =>
    spans.reduce((sum, [s, e]) => sum + Math.max(0, Math.min(b, e) - Math.max(a, s)), 0);
  /** [a, b) minus every cut. */
  const kept = (a: number, b: number) => {
    let pieces: Span[] = [[a, b]];
    for (const [s, e] of cuts)
      pieces = pieces.flatMap(([p, q]): Span[] =>
        e <= p || s >= q
          ? [[p, q]]
          : (
              [
                [p, Math.min(q, s)],
                [Math.max(p, e), q],
              ] as Span[]
            ).filter(([x, y]) => y - x > 0),
      );
    return pieces;
  };

  const entries: { file: string; duration: number; from: number; to: number; out: number }[] = [];
  let out = 0;
  frames.forEach((frame, i) => {
    const from = frame.t;
    const to = Math.max(from, frames[i + 1]?.t ?? end);
    const duration = kept(from, to).reduce((sum, [p, q]) => {
      const held = overlap(p, q, holds);
      return sum + held / pace + Math.min((q - p - held) / pace, idleCap);
    }, 0);
    if (duration < 0.0005) return;
    entries.push({ file: frame.file, duration, from, to, out });
    out += duration;
  });

  /** Where a moment of the recording lands in the video (a cut moment lands where the cut ends). */
  const map = (t: number) => {
    const entry = entries.find((e) => t >= e.from && t < e.to) ?? entries.find((e) => e.from >= t);
    if (!entry) return out;
    return entry.out + Math.min(Math.max(0, t - entry.from) / pace, entry.duration);
  };
  return { entries, duration: out, map };
}

let resolved: string | undefined;

/**
 * The ffmpeg to run: `CUTSCENE_FFMPEG`, else one on `PATH`, else the build `ffmpeg-static`
 * downloaded at install (an npm dependency of cutscene), so a machine without ffmpeg still records.
 */
export function ffmpegPath() {
  if (resolved) return resolved;
  const candidates = [process.env.CUTSCENE_FFMPEG, "ffmpeg", bundledFfmpeg()].filter(
    (path): path is string => Boolean(path),
  );
  for (const path of candidates)
    if (spawnSync(path, ["-version"], { stdio: "ignore" }).status === 0) return (resolved = path);
  throw new Error(
    "No ffmpeg: set CUTSCENE_FFMPEG, put ffmpeg on PATH, or reinstall cutscene (it brings ffmpeg-static).",
  );
}

function bundledFfmpeg(): string | null {
  try {
    // Resolved from this file (the package's own dependency), or from the project when the source is
    // loaded as ESM; in a copied-in src/ without ffmpeg-static it just finds nothing. `createRequire`,
    // not a bare `require`: projects that vendor src/ often lint against `require()` imports.
    const from = typeof __filename === "string" ? __filename : join(process.cwd(), "package.json");
    return createRequire(from)("ffmpeg-static") as string | null;
  } catch {
    return null;
  }
}

export function ffmpeg(args: string[]) {
  const run = spawnSync(ffmpegPath(), ["-hide_banner", "-loglevel", "error", "-y", ...args], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (run.error) throw new Error(`ffmpeg didn't start: ${run.error.message}`);
  if (run.status !== 0)
    throw new Error(`ffmpeg failed:
${run.stderr}`);
  return run.stdout;
}

/**
 * A captured frame's size, read from its header (PNG or JPEG), to prove the capture is the app's
 * device size before anything is cut.
 */
export function frameSize(file: string) {
  const data = readFileSync(file);
  // PNG: the IHDR chunk follows the 8-byte signature; width and height are big-endian.
  if (data.readUInt32BE(0) === 0x89504e47)
    return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
  // JPEG: walk the segments to a start-of-frame marker (SOF0–SOF15, except DHT, JPG and DAC).
  let at = 2;
  while (at + 9 < data.length) {
    if (data[at] !== 0xff) break;
    const marker = data[at + 1]!;
    const length = data.readUInt16BE(at + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker))
      return { height: data.readUInt16BE(at + 5), width: data.readUInt16BE(at + 7) };
    at += 2 + length;
  }
  throw new Error(`Can't read the size of ${file}.`);
}

/**
 * Frames + frame → an H.264 MP4 at 60 fps, ready for the web. The app is placed 1:1 (no scaling),
 * composited in RGB, and converted to YUV once with the BT.709 matrix in limited range, then tagged
 * BT.709 / sRGB, the combination every browser decodes back to the colours Chrome painted.
 */
export async function encode({
  entries,
  format,
  framePng,
  workDir,
  file,
}: {
  entries: { file: string; duration: number }[];
  format: Format;
  framePng: string | null;
  workDir: string;
  file: string;
}) {
  // One file per frame of the video, read at 60 per second: at each 60th, the frame the timeline
  // shows then (a repeated frame is a hard link). Not an ffconcat list with durations: its image
  // times sit on a 1/25 s clock, so 60 paints a second came out as 25 and motion stepped.
  const length = entries.reduce((sum, entry) => sum + entry.duration, 0);
  const total = Math.max(1, Math.round(length * 60));
  const sequence = join(workDir, "sequence");
  await rm(sequence, { recursive: true, force: true });
  await mkdir(sequence, { recursive: true });
  const kind = extname(entries[0]!.file);
  let at = 0;
  let shown = 0;
  for (let n = 0; n < total; n++) {
    // Half a frame of slack: a frame shows from the 60th nearest its start.
    while (at < entries.length - 1 && shown + entries[at]!.duration <= n / 60 + 1 / 120)
      shown += entries[at++]!.duration;
    const frame = join(sequence, `${String(n).padStart(6, "0")}${kind}`);
    await link(entries[at]!.file, frame).catch(() => copyFile(entries[at]!.file, frame));
  }

  const { x, y, canvas } = layout(format);
  const yuv =
    "scale=out_color_matrix=bt709:out_range=tv:flags=accurate_rnd+full_chroma_int,format=yuv420p";
  const filter = framePng
    ? `[0:v]format=gbrp,pad=${canvas.width}:${canvas.height}:${x}:${y}[app];` +
      `[app][1:v]overlay=0:0:format=gbrp,${yuv}[out]`
    : `[0:v]format=gbrp,${yuv}[out]`;
  ffmpeg([
    ...["-framerate", "60", "-start_number", "0", "-i", join(sequence, `%06d${kind}`)],
    ...(framePng ? ["-i", framePng] : []),
    ...["-filter_complex", filter, "-map", "[out]"],
    ...["-c:v", "libx264", "-preset", "slow", "-crf", "16", "-r", "60", "-frames:v", String(total)],
    ...["-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "iec61966-2-1"],
    ...["-color_range", "tv", "-movflags", "+faststart", file],
  ]);
}
