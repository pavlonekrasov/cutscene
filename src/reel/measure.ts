import { spawnSync } from "node:child_process";
import { ffmpegPath } from "../edit";

/**
 * The instrument: what a video's camera and cuts do, in numbers. The same code reads a reference
 * playing in a browser page (`pageSource`) and a file on disk (`measureFile`), so a top-tier reel
 * and a cutscene reel are measured the same way and their numbers can be compared directly. That
 * matters more than absolute accuracy: every instrument reads a strongly eased move as shorter
 * than its curve's nominal length, and only a shared instrument cancels that out.
 */

/** One frame, as the tracker saw it. */
export type Row = {
  /** The frame's time in the video, seconds. */
  t: number;
  /** Mean luma change from the frame before, 0–255. */
  d: number;
  /** A cut lands on this frame: it starts a new shot. */
  cut: boolean;
  /**
   * Where the camera is, relative to the shot's first frame: a point p of this frame shows what
   * the first frame showed at s·(p − centre) + centre + (tx, ty), in tracker px. s < 1 is pushed
   * in, tx > 0 has panned right.
   */
  s: number;
  tx: number;
  ty: number;
  /** What the camera doesn't explain: the mean luma error left after it, 0–255. */
  res: number;
};

export type MeasuredMove = {
  kind: "push" | "pull" | "pan";
  /** When the move is 2% of the way, seconds. */
  at: number;
  /** From 2% to 98% of the way, seconds. */
  over: number;
  /** From 10% to 90%: with `over`, how strongly it eases (`core / over` is 0.82 for linear). */
  core: number;
  /** The zoom at the end over the zoom at the start. */
  zoom: number;
  /** The camera's travel, as % of the frame's width and height (+ is right and down). */
  pan: [number, number];
  /** Where the move is fastest, as a share of `over`: 0.5 is a symmetric ease-in-out. */
  peak: number;
  /** How far past its end the camera went before settling, as a share of the move (0 is none). */
  overshoot: number;
};

export type Cut = { t: number; kind: "hard" | "dissolve"; over: number };

export type Grammar = {
  duration: number;
  width: number;
  height: number;
  /** Distinct frames per second, from the timestamps the tracker was given. */
  fps: number;
  shots: number;
  shotLength: { mean: number; median: number };
  cuts: Cut[];
  moves: MeasuredMove[];
  /** The share of the video the camera holds still (cards and held results count as still). */
  still: number;
  /**
   * The share of frames during camera moves that repeat the frame before: the camera should change
   * every frame while it moves, so anything above a few percent is stepped motion.
   */
  held: number;
  /**
   * Shot lengths in order, and their trend: the change from the first shot to the last as a share
   * of the mean (−0.5 means shots end half as long as the average). `accelerates` when the cutting
   * clearly quickens toward the end.
   */
  rhythm: { lengths: number[]; trend: number; accelerates: boolean };
};

/**
 * Follows the camera frame by frame. Each frame is matched against the shot's anchor frame, warm
 * started from where the camera was and how fast it went, so the position stays sub-pixel and
 * doesn't drift the way per-frame steps would when they're summed. Runs in a page too: it may not
 * reference anything outside itself.
 */
export function tracker(W: number, H: number) {
  // A frame whose mean luma changes this much (0–255) is a cut, whatever the camera did.
  const CUT = 30;
  // A change the camera can't explain, this large, is a cut too (a cut between similar frames).
  const UNEXPLAINED = 14;
  // Under this much edge per pixel a frame is flat (a card, an empty backdrop): nothing for a
  // camera fit to hold on to, so the camera is taken as still there. Cards read 0.4–0.7, apps 2+.
  const FLAT = 1.2;
  // No camera covers this much in one frame: a jump this large is a cut between two framings.
  const JUMP = { zoom: 0.2, pan: 0.1 };
  const N = W * H;
  const mx = Math.round(W * 0.14);
  const my = Math.round(H * 0.17);
  const blur = (g: Float32Array) => {
    const b = new Float32Array(N);
    for (let y = 1; y < H - 1; y++)
      for (let x = 1; x < W - 1; x++) {
        let sum = 0;
        for (let j = -1; j <= 1; j++)
          for (let k = -1; k <= 1; k++) sum += g[(y + j) * W + x + k] as number;
        b[y * W + x] = sum / 9;
      }
    return b;
  };
  const sample = (g: Float32Array, X: number, Y: number) => {
    const xi = Math.floor(X);
    const yi = Math.floor(Y);
    if (xi < 1 || yi < 1 || xi >= W - 2 || yi >= H - 2) return -1;
    const fx = X - xi;
    const fy = Y - yi;
    const i = yi * W + xi;
    return (
      (g[i] as number) * (1 - fx) * (1 - fy) +
      (g[i + 1] as number) * fx * (1 - fy) +
      (g[i + W] as number) * (1 - fx) * fy +
      (g[i + W + 1] as number) * fx * fy
    );
  };
  const cx = W / 2;
  const cy = H / 2;
  // The mean error between frame b and the anchor a seen through camera (s, tx, ty).
  const err = (a: Float32Array, b: Float32Array, s: number, tx: number, ty: number) => {
    let e = 0;
    let n = 0;
    for (let y = my; y < H - my; y += 2)
      for (let x = mx; x < W - mx; x += 2) {
        const q = sample(a, s * (x - cx) + cx + tx, s * (y - cy) + cy + ty);
        if (q < 0) continue;
        e += Math.abs((b[y * W + x] as number) - q);
        n++;
      }
    return n > 50 ? e / n : 999;
  };
  type Cam = { s: number; tx: number; ty: number };
  const fit = (a: Float32Array, b: Float32Array, from: Cam, widest: number) => {
    let best = { ...from, e: err(a, b, from.s, from.tx, from.ty) };
    for (let step = widest; step >= 1 / 32; step /= 2) {
      // Pan in px; zoom in proportion, so a step moves the frame's edge about as far as a pan.
      const ds = (step * 2) / W;
      for (let improved = true, guard = 0; improved && guard < 12; guard++) {
        improved = false;
        const { s: s0, tx: x0, ty: y0 } = best;
        for (const s of [s0 * (1 - ds), s0, s0 * (1 + ds)])
          for (const dx of [-step, 0, step])
            for (const dy of [-step, 0, step]) {
              if (s === s0 && dx === 0 && dy === 0) continue;
              const e = err(a, b, s, x0 + dx, y0 + dy);
              if (e < best.e - 1e-4) {
                best = { s, tx: x0 + dx, ty: y0 + dy, e };
                improved = true;
              }
            }
      }
    }
    return best;
  };
  const texture = (g: Float32Array) => {
    let sum = 0;
    let n = 0;
    for (let y = my; y < H - my; y += 2)
      for (let x = mx; x < W - mx; x += 2) {
        const i = y * W + x;
        sum += Math.abs((g[i + 1] as number) - (g[i] as number));
        sum += Math.abs((g[i + W] as number) - (g[i] as number));
        n++;
      }
    return sum / n;
  };
  const identity = (): Cam => ({ s: 1, tx: 0, ty: 0 });
  // p_first = off(p_anchor), p_anchor = cur(p_frame): the camera relative to the shot's first frame.
  const compose = (off: Cam, cur: Cam): Cam => ({
    s: off.s * cur.s,
    tx: off.s * cur.tx + off.tx,
    ty: off.s * cur.ty + off.ty,
  });

  const rows: Row[] = [];
  let prev: Float32Array | null = null;
  let anchor: Float32Array | null = null;
  let off = identity();
  let cur = identity();
  let last = identity();
  let flat = false;
  let lastRes = 0;

  return {
    rows,
    /** Adds a frame: `pixels` is gray (1 channel) or RGBA (4), W × H, at time `t` seconds. */
    add(pixels: ArrayLike<number>, t: number, channels: 1 | 4) {
      const g = new Float32Array(N);
      if (channels === 1) for (let i = 0; i < N; i++) g[i] = pixels[i] as number;
      else
        for (let i = 0; i < N; i++)
          g[i] =
            0.2126 * (pixels[i * 4] as number) +
            0.7152 * (pixels[i * 4 + 1] as number) +
            0.0722 * (pixels[i * 4 + 2] as number);
      const b = blur(g);
      let d = 0;
      if (prev) {
        for (let i = 0; i < N; i++) d += Math.abs((g[i] as number) - (prev[i] as number));
        d /= N;
      }
      prev = g;
      const startShot = () => {
        anchor = b;
        off = identity();
        cur = identity();
        last = identity();
        flat = texture(g) < FLAT;
        lastRes = 0;
        rows.push({ t, d, cut: rows.length > 0, s: 1, tx: 0, ty: 0, res: 0 });
      };
      if (!anchor || d > CUT) return startShot();
      if (flat) {
        // Something with edges appearing over a flat frame (a dissolve out of a card) starts a shot.
        const res = err(anchor, b, 1, 0, 0);
        if (res > 3 && texture(g) >= FLAT) return startShot();
        lastRes = res;
        rows.push({ t, d, cut: false, s: 1, tx: 0, ty: 0, res });
        return;
      }
      // Warm start where the camera would be at its last speed.
      const guess = {
        s: cur.s * (cur.s / last.s),
        tx: cur.tx + (cur.tx - last.tx),
        ty: cur.ty + (cur.ty - last.ty),
      };
      let found = fit(anchor, b, guess, 2);
      // Lost (a fast move the guess didn't reach): search wide from where the camera was.
      if (found.e > 6) {
        const wide = fit(anchor, b, cur, 8);
        if (wide.e < found.e) found = wide;
      }
      // A cut: a big unexplained change, a jump no camera makes in one frame, a sudden rise in what
      // the camera can't explain, or a change it can't explain that persists (a dissolve, a cut
      // between two framings of the same screen that the fit half-explains).
      const jump =
        Math.abs(Math.log(found.s / cur.s)) > JUMP.zoom ||
        Math.hypot(found.tx - cur.tx, found.ty - cur.ty) > JUMP.pan * W;
      if (
        (found.e > UNEXPLAINED && d > 8) ||
        jump ||
        (found.e > 3 * (lastRes + 0.5) && d > 4) ||
        (found.e > 5 && lastRes > 5) ||
        texture(g) < FLAT
      )
        return startShot();
      lastRes = found.e;
      last = cur;
      cur = { s: found.s, tx: found.tx, ty: found.ty };
      const at = compose(off, cur);
      rows.push({ t, d, cut: false, s: at.s, tx: at.tx, ty: at.ty, res: found.e });
      // Re-anchor before the anchor's overlap with the frame gets thin.
      if (Math.abs(Math.log(cur.s)) > 0.12 || Math.hypot(cur.tx, cur.ty) > W * 0.08) {
        const step = { s: last.s / cur.s, tx: last.tx - cur.tx, ty: last.ty - cur.ty };
        anchor = b;
        off = at;
        cur = identity();
        last = step;
      }
    },
  };
}

/**
 * The grammar of a video from its rows: shots, cuts, camera moves, stillness and rhythm. Runs in a
 * page too: it may not reference anything outside itself.
 */
export function grammar(
  rows: Row[],
  info: {
    duration: number;
    width: number;
    height: number;
    W: number;
    H: number;
    /** Where the reading started in the video, seconds. Default: the first row's time. */
    start?: number;
  },
): Grammar {
  const { W, H } = info;
  const round = (n: number, p = 2) => Number(n.toFixed(p));
  const times = rows.map((row) => row.t);
  const gaps = times
    .slice(1)
    .map((t, i) => t - (times[i] as number))
    .filter((gap) => gap > 0)
    .sort((a, b) => a - b);
  const dt = (gaps[Math.floor(gaps.length / 2)] as number | undefined) ?? 1 / 60;
  const start = info.start ?? rows[0]?.t ?? 0;
  const end = start + info.duration;

  // ── Shots and cuts ──
  const shots: { a: number; b: number }[] = [];
  rows.forEach((row, i) => {
    if (i === 0 || row.cut) shots.push({ a: i, b: i });
    else (shots.at(-1) as { b: number }).b = i;
  });
  // Cut frames close together are one transition: a dissolve re-anchors the tracker a few times.
  const groups: { a: number; b: number }[] = [];
  rows.forEach((row, i) => {
    if (!row.cut) return;
    const group = groups.at(-1);
    if (group && row.t - (rows[group.b] as Row).t <= 0.3) group.b = i;
    else groups.push({ a: i, b: i });
  });
  const cuts: Cut[] = [];
  for (const group of groups) {
    // A dissolve: around the cut, frames keep changing in ways no camera move explains.
    let a = group.a - 1;
    while (a > 0 && (rows[a] as Row).d > 1 && (rows[a] as Row).res > 2 && !(rows[a] as Row).cut)
      a--;
    let b = group.b + 1;
    while (
      b < rows.length &&
      (rows[b] as Row).d > 1 &&
      (rows[b] as Row).res > 2 &&
      !(rows[b] as Row).cut
    )
      b++;
    const from = (rows[a + 1] as Row).t;
    const to = (rows[b - 1] as Row).t;
    cuts.push(
      b - a - 1 >= 3
        ? { t: round(from - start), kind: "dissolve", over: round(to - from + dt) }
        : { t: round((rows[group.a] as Row).t - start), kind: "hard", over: 0 },
    );
  }
  const bounds = [start, ...cuts.map((cut) => cut.t + start), end];
  const lengths = bounds.slice(1).map((t, i) => round(t - (bounds[i] as number)));

  // ── Camera moves, shot by shot ──
  // A position in one space: zoom as ln-zoom × 100 (≈ % of the frame's edge), pan as % of width.
  const pos = (row: Row) => [-Math.log(row.s) * 100, (row.tx / W) * 100, (row.ty / H) * 100];
  const moves: MeasuredMove[] = [];
  for (const shot of shots) {
    const seg = rows.slice(shot.a, shot.b + 1);
    if (seg.length < 6) continue;
    const P = seg.map(pos);
    // Speed, smoothed over five frames, in % per second.
    const raw = P.map((p, i) => {
      if (i === 0) return 0;
      const q = P[i - 1] as number[];
      const span = (seg[i] as Row).t - (seg[i - 1] as Row).t || dt;
      return Math.hypot(p[0]! - q[0]!, p[1]! - q[1]!, p[2]! - q[2]!) / span;
    });
    const speed = raw.map((_, i) => {
      const window = raw.slice(Math.max(0, i - 2), i + 3);
      return window.reduce((sum, v) => sum + v, 0) / window.length;
    });
    // Runs above 3 %/s, joined across gaps under 0.15 s.
    const runs: [number, number][] = [];
    speed.forEach((v, i) => {
      if (v < 3) return;
      const run = runs.at(-1);
      if (run && (seg[i] as Row).t - (seg[run[1]] as Row).t < 0.15) run[1] = i;
      else runs.push([i, i]);
    });
    // A quarter-second mean of speed: where it bottoms out between two runs is where one move
    // ends and the next begins (or where the camera stood still). Per-frame speed is too noisy
    // at an eased move's slow ends to find that edge by walking out from the run.
    const calm = raw.map((_, i) => {
      const window = raw.slice(Math.max(0, i - 7), i + 8);
      return window.reduce((sum, v) => sum + v, 0) / window.length;
    });
    const lowest = (from: number, to: number) => {
      let at = from;
      for (let i = from; i <= to; i++) if ((calm[i] as number) < (calm[at] as number)) at = i;
      return at;
    };
    runs.forEach(([r0, r1], n) => {
      const i0 = lowest(n === 0 ? 0 : (runs[n - 1] as [number, number])[1], r0);
      const i1 = lowest(
        r1,
        n === runs.length - 1 ? P.length - 1 : (runs[n + 1] as [number, number])[0],
      );
      const before = P.slice(Math.max(0, i0 - 2), i0 + 3);
      const after = P.slice(Math.max(0, i1 - 2), i1 + 3);
      const mean = (list: number[][]) =>
        [0, 1, 2].map((k) => list.reduce((sum, p) => sum + p[k]!, 0) / list.length);
      const p0 = mean(before.length ? before : [P[i0] as number[]]);
      const p1 = mean(after.length ? after : [P[i1] as number[]]);
      const delta = [p1[0]! - p0[0]!, p1[1]! - p0[1]!, p1[2]! - p0[2]!];
      const size = Math.hypot(delta[0]!, delta[1]!, delta[2]!);
      // Under 2 (≈ 2% of the frame): a nudge or tracking noise, not a move.
      if (size < 2) return;
      const progress = (p: number[]) =>
        ((p[0]! - p0[0]!) * delta[0]! +
          (p[1]! - p0[1]!) * delta[1]! +
          (p[2]! - p0[2]!) * delta[2]!) /
        (size * size);
      const pr = P.map(progress);
      // When progress crosses `level`, interpolated between frames, searching out from the run.
      const cross = (level: number, rising: boolean) => {
        if (rising) {
          let i = i0;
          while (i > 0 && (pr[i] as number) > level) i--;
          while (i < pr.length - 1 && (pr[i + 1] as number) <= level) i++;
          const a = pr[i] as number;
          const b = (pr[i + 1] as number | undefined) ?? a;
          const k = b === a ? 0 : (level - a) / (b - a);
          const ta = (seg[i] as Row).t;
          const tb = (seg[i + 1] as Row | undefined)?.t ?? ta;
          return ta + Math.min(1, Math.max(0, k)) * (tb - ta);
        }
        let i = i1;
        while (i < pr.length - 1 && (pr[i] as number) < level) i++;
        while (i > 0 && (pr[i - 1] as number) >= level) i--;
        const b = pr[i] as number;
        const a = (pr[i - 1] as number | undefined) ?? b;
        const k = b === a ? 1 : (level - a) / (b - a);
        const tb = (seg[i] as Row).t;
        const ta = (seg[i - 1] as Row | undefined)?.t ?? tb;
        return ta + Math.min(1, Math.max(0, k)) * (tb - ta);
      };
      const t02 = cross(0.02, true);
      const t98 = cross(0.98, false);
      if (t98 <= t02) return;
      const t10 = cross(0.1, true);
      const t90 = cross(0.9, false);
      let peakAt = t02;
      let peakV = -1;
      seg.forEach((row, i) => {
        if (row.t >= t02 && row.t <= t98 && (speed[i] as number) > peakV) {
          peakV = speed[i] as number;
          peakAt = row.t;
        }
      });
      // Past the end: the furthest the camera went beyond 100% within half a second.
      let beyond = 1;
      seg.forEach((row, i) => {
        if (row.t >= (t02 + t98) / 2 && row.t <= t98 + 0.5)
          beyond = Math.max(beyond, pr[i] as number);
      });
      const zoom = Math.exp(delta[0]! / 100);
      const panSize = Math.hypot(delta[1]!, delta[2]!);
      moves.push({
        kind:
          Math.abs(delta[0]!) > 0.5 * panSize && Math.abs(Math.log(zoom)) > Math.log(1.04)
            ? zoom > 1
              ? "push"
              : "pull"
            : "pan",
        at: round(t02 - start),
        over: round(t98 - t02),
        core: round(Math.max(0, t90 - t10)),
        zoom: round(zoom, 3),
        pan: [round(delta[1]!, 1), round(delta[2]!, 1)],
        peak: round((peakAt - t02) / (t98 - t02)),
        // Under 1% is tracking noise.
        overshoot: beyond - 1 > 0.01 ? round(beyond - 1) : 0,
      });
    });
  }

  const moving = moves.reduce((sum, move) => sum + move.over, 0);
  const inMoves = rows.filter(
    (row) => !row.cut && moves.some((m) => row.t - start >= m.at && row.t - start <= m.at + m.over),
  );
  const sorted = [...lengths].sort((a, b) => a - b);
  const meanLength = lengths.reduce((sum, l) => sum + l, 0) / (lengths.length || 1);
  // Least-squares slope of shot length over shot order, as a change from first to last.
  let trend = 0;
  if (lengths.length >= 3) {
    const n = lengths.length;
    const mi = (n - 1) / 2;
    let num = 0;
    let den = 0;
    lengths.forEach((l, i) => {
      num += (i - mi) * (l - meanLength);
      den += (i - mi) ** 2;
    });
    trend = ((num / den) * (n - 1)) / meanLength;
  }
  return {
    duration: round(info.duration),
    width: info.width,
    height: info.height,
    fps: round(1 / dt, 1),
    shots: lengths.length,
    shotLength: { mean: round(meanLength), median: sorted[Math.floor(sorted.length / 2)] ?? 0 },
    cuts,
    moves,
    still: round(Math.max(0, 1 - moving / (info.duration || 1))),
    held: round(inMoves.filter((row) => row.d < 0.02).length / (inMoves.length || 1)),
    rhythm: { lengths, trend: round(trend), accelerates: lengths.length >= 5 && trend < -0.3 },
  };
}

/** The tracker's frame width: enough for a sub-pixel camera on a 16:9 frame, fast in a page. */
const WIDTH = 256;

/**
 * A script for a browser page that defines `window.__cutsceneMeasure(video, options)`: it plays the
 * video (muted, at `rate`, half speed by default so no frame is skipped), tracks every frame it
 * shows, and resolves to its grammar. Nothing is downloaded. It also defines
 * `window.__cutsceneSheet(video, times, { cols, width })`, which lays the frames at `times` out in a
 * grid over the page for one screenshot (`__cutsceneSheet.close()` removes it). Paste it with an
 * agent's page tool, or print it with `cutscene measure --page`.
 */
export function pageSource() {
  // Comment lines and indentation trimmed: it's pasted into pages, so its size is what it costs.
  const lines = (source: string) =>
    source
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("//"))
      .join(String.fromCharCode(10));
  return lines(`(() => {
const tracker = ${tracker.toString()};
const grammar = ${grammar.toString()};
window.__cutsceneMeasure = async (video, { rate = 0.5, from = 0, to = Infinity, width = ${WIDTH} } = {}) => {
  const v = typeof video === "string" ? document.querySelector(video) : video;
  if (!v) throw new Error("no video");
  v.muted = true; v.loop = false; v.pause();
  if (v.readyState < 1) await new Promise((r) => v.addEventListener("loadedmetadata", r, { once: true }));
  v.currentTime = from;
  await new Promise((r) => v.addEventListener("seeked", r, { once: true }));
  const W = width, H = Math.round((W * v.videoHeight) / v.videoWidth / 2) * 2;
  const ctx = new OffscreenCanvas(W, H).getContext("2d", { willReadFrequently: true });
  const track = tracker(W, H);
  const stop = Math.min(to, v.duration - 0.03);
  v.playbackRate = rate;
  await v.play();
  await new Promise((done, fail) => {
    const tick = (_, meta) => {
      try {
        ctx.drawImage(v, 0, 0, W, H);
        // Throws when the video is cross-origin without CORS: say so rather than measure nothing.
        track.add(ctx.getImageData(0, 0, W, H).data, meta.mediaTime, 4);
      } catch (error) {
        v.pause();
        return fail(error);
      }
      if (v.ended || meta.mediaTime >= stop) return done();
      v.requestVideoFrameCallback(tick);
    };
    v.requestVideoFrameCallback(tick);
    v.addEventListener("ended", done, { once: true });
  });
  v.pause();
  const last = track.rows.at(-1)?.t ?? stop;
  return grammar(track.rows, { duration: last - from + 1 / 60, width: v.videoWidth, height: v.videoHeight, W, H, start: from });
};
// Frames at chosen times in one grid over the page, each with its time, for one screenshot.
// Drawing a cross-origin video works even where reading its pixels doesn't.
window.__cutsceneSheet = async (video, times, { cols = 4, width = 480 } = {}) => {
  const v = typeof video === "string" ? document.querySelector(video) : video;
  if (!v) throw new Error("no video");
  window.__cutsceneSheet.close();
  v.pause();
  const h = Math.round((width * v.videoHeight) / v.videoWidth);
  const rows = Math.ceil(times.length / cols);
  const canvas = document.createElement("canvas");
  canvas.width = cols * width;
  canvas.height = rows * (h + 22);
  canvas.id = "__cutscene-sheet";
  Object.assign(canvas.style, { position: "fixed", inset: "0", zIndex: 2147483647, width: "100vw", height: "auto", maxHeight: "100vh", objectFit: "contain", background: "#111" });
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "16px system-ui, sans-serif";
  for (const [i, t] of times.entries()) {
    v.currentTime = t;
    await new Promise((r) => v.addEventListener("seeked", r, { once: true }));
    await new Promise((r) => (v.requestVideoFrameCallback ? v.requestVideoFrameCallback(() => r()) : setTimeout(r, 120)));
    const x = (i % cols) * width;
    const y = Math.floor(i / cols) * (h + 22);
    ctx.drawImage(v, x, y + 22, width, h);
    ctx.fillStyle = "#eee";
    ctx.fillText(t.toFixed(3) + " s", x + 6, y + 16);
  }
  document.body.append(canvas);
  return { width: canvas.width, height: canvas.height };
};
window.__cutsceneSheet.close = () => document.getElementById("__cutscene-sheet")?.remove();
})();`);
}

/** Measures a video file: ffmpeg decodes it to small gray frames, with each frame's own time. */
export function measureFile(file: string, { width = WIDTH } = {}): Grammar {
  const probe = spawnSync(ffmpegPath(), ["-hide_banner", "-i", file], { encoding: "utf8" });
  const size = /, (\d{2,5})x(\d{2,5})[\s,]/.exec(probe.stderr ?? "");
  if (!size) throw new Error(`${file}: not a video ffmpeg can read.`);
  const vw = Number(size[1]);
  const vh = Number(size[2]);
  const W = width;
  const H = Math.round((W * vh) / vw / 2) * 2;
  const run = spawnSync(
    ffmpegPath(),
    [
      "-hide_banner",
      "-loglevel",
      "info",
      "-i",
      file,
      "-an",
      "-vf",
      `scale=${W}:${H}:flags=area,format=gray,showinfo`,
      "-fps_mode",
      "passthrough",
      "-f",
      "rawvideo",
      "-pix_fmt",
      "gray",
      "pipe:1",
    ],
    { maxBuffer: 2 * 1024 ** 3 },
  );
  if (run.status !== 0) throw new Error(`ffmpeg couldn't decode ${file}:\n${run.stderr}`);
  const times = [...String(run.stderr).matchAll(/pts_time:\s*([\d.]+)/g)].map((m) => Number(m[1]));
  const frame = W * H;
  const count = Math.floor(run.stdout.length / frame);
  const track = tracker(W, H);
  for (let i = 0; i < count; i++)
    track.add(run.stdout.subarray(i * frame, (i + 1) * frame), times[i] ?? i / 60, 1);
  const first = track.rows[0]?.t ?? 0;
  const last = track.rows.at(-1)?.t ?? 0;
  const step = count > 1 ? (last - first) / (count - 1) : 1 / 60;
  return grammar(track.rows, { duration: last - first + step, width: vw, height: vh, W, H });
}

/** The grammar as a few lines a person reads. */
export function describe(g: Grammar) {
  const lines = [
    `${g.duration} s, ${g.width}×${g.height}, ${g.fps} fps; ${g.shots} shot(s), mean ${g.shotLength.mean} s, median ${g.shotLength.median} s`,
    `camera still ${Math.round(g.still * 100)}% of the time; ${Math.round(g.held * 100)}% of frames in its moves repeat the one before`,
    `rhythm: shots ${g.rhythm.lengths.join(" · ")} s (trend ${g.rhythm.trend}${g.rhythm.accelerates ? ", accelerating" : ""})`,
  ];
  for (const cut of g.cuts)
    lines.push(`  ${cut.t.toFixed(2)} s  ${cut.kind} cut${cut.over ? ` over ${cut.over} s` : ""}`);
  for (const m of g.moves)
    lines.push(
      `  ${m.at.toFixed(2)} s  ${m.kind} ×${m.zoom} pan ${m.pan[0]},${m.pan[1]}% over ${Math.round(m.over * 1000)} ms ` +
        `(10–90% ${Math.round(m.core * 1000)} ms), peak at ${m.peak}, overshoot ${Math.round(m.overshoot * 100)}%`,
    );
  return lines.join("\n");
}
