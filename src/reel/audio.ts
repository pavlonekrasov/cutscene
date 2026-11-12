import { rename, rm, writeFile } from "node:fs/promises";
import { ffmpeg } from "../edit";

/**
 * Sound for a reel. Silent is the default: most feeds autoplay muted, and 11 of the 50 measured
 * films are silent. Sound is added after the picture is encoded and the video stream is copied
 * through untouched, so the picture, its fidelity numbers and the critic's readings are the same
 * with or without it.
 */
export type Audio = {
  /**
   * A track you hold the rights to (any file ffmpeg reads). It plays from the reel's first frame,
   * trimmed to the reel and faded out over the last 1.5 s. Cuts are not moved onto its beat: across
   * 37 measured films with music, cuts land on the beat no more often than chance (rule 13).
   */
  track?: string;
  /** The track's level in dB (negative is quieter). Default 0. */
  gain?: number;
  /**
   * A rising Shepard–Risset tone, generated (never sampled from anyone's music), that ends exactly
   * on the reveal: the cut into clip `into` (an index into `clips`; default the last clip, or the
   * closing card for a single clip). `length` seconds, default 4.
   */
  riser?: boolean | { into?: number; length?: number; gain?: number };
};

const RATE = 48_000;

/**
 * A Shepard–Risset glissando: nine partials an octave apart glide upward together under a fixed
 * bell-shaped loudness over pitch, so each fades in at the bottom and out at the top and the whole
 * seems to rise without arriving. It swells in and stops dead on its last sample, with a 6 ms
 * release so the stop doesn't click. Deterministic: the same samples every run.
 */
export function riserSamples(seconds: number) {
  const count = Math.max(1, Math.round(seconds * RATE));
  const out = new Float32Array(count);
  const partials = 9;
  const base = 40; // Hz at the bottom of the bell
  const rise = 0.5; // octaves a second
  const centre = partials / 2;
  const width = 1.25; // octaves, the bell's standard deviation
  const phases = new Float64Array(partials);
  const release = Math.round(0.006 * RATE);
  for (let n = 0; n < count; n++) {
    const t = n / RATE;
    let sample = 0;
    for (let i = 0; i < partials; i++) {
      const octave = (i + rise * t) % partials;
      const frequency = base * 2 ** octave;
      phases[i] = (phases[i]! + (2 * Math.PI * frequency) / RATE) % (2 * Math.PI);
      const loud = Math.exp(-((octave - centre) ** 2) / (2 * width * width));
      sample += loud * Math.sin(phases[i]!);
    }
    // A swell that keeps building to the very end, then the stop.
    const swell = (t / seconds) ** 1.6;
    const tail = Math.min(1, (count - 1 - n) / release);
    out[n] = sample * swell * tail;
  }
  let peak = 0;
  for (const value of out) peak = Math.max(peak, Math.abs(value));
  const level = 0.5 / (peak || 1); // −6 dBFS at its loudest
  for (let n = 0; n < count; n++) out[n]! *= level;
  return out;
}

/** 16-bit mono PCM in a WAV container. */
export function wav(samples: Float32Array) {
  const data = Buffer.alloc(samples.length * 2);
  samples.forEach((value, n) =>
    data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, value)) * 32767), n * 2),
  );
  const head = Buffer.alloc(44);
  head.write("RIFF", 0);
  head.writeUInt32LE(36 + data.length, 4);
  head.write("WAVE", 8);
  head.write("fmt ", 12);
  head.writeUInt32LE(16, 16);
  head.writeUInt16LE(1, 20); // PCM
  head.writeUInt16LE(1, 22); // mono
  head.writeUInt32LE(RATE, 24);
  head.writeUInt32LE(RATE * 2, 28);
  head.writeUInt16LE(2, 32);
  head.writeUInt16LE(16, 34);
  head.write("data", 36);
  head.writeUInt32LE(data.length, 40);
  return Buffer.concat([head, data]);
}

/**
 * Adds the sound to an encoded reel in place: the video stream is copied, never re-encoded. `riser`
 * is when the riser ends, seconds into the reel.
 */
export async function addSound(
  video: string,
  duration: number,
  audio: Audio,
  riser: { end: number; length: number; gain: number } | null,
  workDir: string,
) {
  const inputs: string[] = ["-i", video];
  const chains: string[] = [];
  const labels: string[] = [];
  const end = duration.toFixed(3);
  if (audio.track) {
    inputs.push("-i", audio.track);
    const fade = Math.max(0, duration - 1.5).toFixed(3);
    chains.push(
      `[1:a]atrim=0:${end},asetpts=PTS-STARTPTS,aformat=sample_rates=${RATE}:channel_layouts=stereo,volume=${audio.gain ?? 0}dB,afade=t=out:st=${fade}:d=1.5[track]`,
    );
    labels.push("[track]");
  }
  if (riser) {
    const file = `${workDir}/riser.wav`;
    await writeFile(file, wav(riserSamples(riser.length)));
    inputs.push("-i", file);
    const index = audio.track ? 2 : 1;
    const delay = Math.max(0, Math.round((riser.end - riser.length) * 1000));
    chains.push(
      `[${index}:a]aformat=sample_rates=${RATE}:channel_layouts=stereo,volume=${riser.gain}dB,adelay=${delay}:all=1,apad,atrim=0:${end}[riser]`,
    );
    labels.push("[riser]");
  }
  if (!labels.length) return;
  const mix =
    labels.length > 1
      ? `${labels.join("")}amix=inputs=${labels.length}:normalize=0:duration=longest[mix]`
      : `${labels[0]}anull[mix]`;
  const out = `${video}.sound.mp4`;
  ffmpeg([
    ...inputs,
    ...["-filter_complex", [...chains, mix].join(";")],
    ...["-map", "0:v", "-map", "[mix]", "-c:v", "copy"],
    ...["-c:a", "aac", "-b:a", "192k", "-t", end, "-movflags", "+faststart", out],
  ]);
  await rm(video);
  await rename(out, video);
}
