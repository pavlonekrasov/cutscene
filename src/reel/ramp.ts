import type { Take } from "./take";

export type SpeedSettings = {
  /** How many times faster typing plays. */
  typing: number;
  /** How many times faster a wait on the app plays. */
  waiting: number;
  /** How long a change of speed takes in the reel, seconds. */
  ramp: number;
};

export const SPEED: SpeedSettings = { typing: 2, waiting: 3.5, ramp: 0.2 };

export type Ramp = { t0: number; t1: number; speed: number; why: "typing" | "waiting" };

/**
 * A clip's speed. Typing and waits on the app play faster; everything else, the pointer's approach,
 * the click and held beats, stays at 1×. Speed eases in and out over `ramp` seconds of the reel,
 * never a jump, so a stretch too short to ramp is left alone.
 */
export function planSpeed(take: Take, range: { a: number; b: number }, settings: SpeedSettings) {
  const { a, b } = range;
  const ramps: Ramp[] = [];
  const add = (t0: number, t1: number, speed: number, why: Ramp["why"]) => {
    t0 = Math.max(a, t0);
    t1 = Math.min(b, t1);
    // Each ramp covers `ramp` seconds of the reel at the mean of 1× and the full speed.
    const edge = (settings.ramp * (1 + speed)) / 2;
    if (speed > 1 && t1 - t0 >= 2 * edge + 0.1) ramps.push({ t0, t1, speed, why });
  };
  for (const event of take.events)
    if (event.kind === "type") add(event.t0, event.t1, settings.typing, "typing");
  // Time no `act` call covers is the scene waiting on the app (an `expect`, a fetch).
  const calls = take.events
    .filter((event) => event.kind === "call")
    .map((event) => [event.t0, event.t1] as [number, number])
    .sort((p, q) => p[0] - q[0]);
  let covered = a;
  for (const [t0, t1] of [...calls, [b, b] as [number, number]]) {
    if (t0 > covered) add(covered, t0, settings.waiting, "waiting");
    covered = Math.max(covered, t1);
  }
  ramps.sort((p, q) => p.t0 - q.t0);

  const speedAt = (t: number) => {
    for (const ramp of ramps) {
      if (t < ramp.t0 || t > ramp.t1) continue;
      const edge = (settings.ramp * (1 + ramp.speed)) / 2;
      const k = Math.min(1, (t - ramp.t0) / edge, (ramp.t1 - t) / edge);
      return 1 + (ramp.speed - 1) * k * k * (3 - 2 * k);
    }
    return 1;
  };
  // The reel's clock against the take's, a millisecond of the take at a time.
  const step = 0.001;
  const out: number[] = [0];
  for (let t = a; t < b; t += step) out.push(out.at(-1)! + step / speedAt(t + step / 2));
  const duration = out.at(-1)!;
  /** The take's moment shown at `tau` seconds into the clip. */
  const toTake = (tau: number) => {
    let lo = 0;
    let hi = out.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (out[mid]! <= tau) lo = mid;
      else hi = mid;
    }
    const k = out[hi]! > out[lo]! ? (tau - out[lo]!) / (out[hi]! - out[lo]!) : 0;
    return Math.min(b, a + (lo + Math.min(1, Math.max(0, k))) * step);
  };
  /** Where a moment of the take lands in the clip. */
  const fromTake = (t: number) =>
    out[Math.min(out.length - 1, Math.max(0, Math.round((t - a) / step)))]!;
  return { ramps, duration, toTake, fromTake };
}
