import { spawnSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
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

export function ffmpeg(args: string[], tool = "ffmpeg") {
  const run = spawnSync(
    tool,
    tool === "ffmpeg" ? ["-hide_banner", "-loglevel", "error", "-y", ...args] : args,
    {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    },
  );
  if (run.error) throw new Error(`${tool} didn't start (is it on PATH?): ${run.error.message}`);
  if (run.status !== 0) throw new Error(`${tool} failed:\n${run.stderr}`);
  return run.stdout;
}

/** A captured frame's size, to prove the capture is the app's device size before anything is cut. */
export function frameSize(file: string) {
  const [width, height] = ffmpeg(
    ["-v", "error", "-show_entries", "stream=width,height", "-of", "csv=p=0", file],
    "ffprobe",
  )
    .trim()
    .split(",")
    .map(Number);
  return { width: width!, height: height! };
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
  const quote = (path: string) => `'${path.replaceAll("\\", "/").replaceAll("'", "'\\''")}'`;
  const lines = ["ffconcat version 1.0"];
  for (const entry of entries)
    lines.push(`file ${quote(entry.file)}`, `duration ${entry.duration.toFixed(4)}`);
  // The concat demuxer drops the last duration unless the last file is listed once more.
  lines.push(`file ${quote(entries.at(-1)!.file)}`);
  const list = join(workDir, "frames.ffconcat");
  await writeFile(list, lines.join("\n"));

  const { x, y, canvas } = layout(format);
  const yuv =
    "scale=out_color_matrix=bt709:out_range=tv:flags=accurate_rnd+full_chroma_int,format=yuv420p";
  const filter = framePng
    ? `[0:v]fps=60,format=gbrp,pad=${canvas.width}:${canvas.height}:${x}:${y}[app];` +
      `[app][1:v]overlay=0:0:format=gbrp,${yuv}[out]`
    : `[0:v]fps=60,format=gbrp,${yuv}[out]`;
  ffmpeg([
    ...["-f", "concat", "-safe", "0", "-i", list],
    ...(framePng ? ["-i", framePng] : []),
    ...["-filter_complex", filter, "-map", "[out]"],
    ...["-c:v", "libx264", "-preset", "slow", "-crf", "16", "-r", "60"],
    ...["-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "iec61966-2-1"],
    ...["-color_range", "tv", "-movflags", "+faststart", file],
  ]);
}
