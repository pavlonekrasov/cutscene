import type { Box, Point, Take, TakeEvent } from "./take";

/** Where the camera is: its centre on the canvas (CSS px) and its zoom (1 is the whole canvas). */
export type Cam = { x: number; y: number; z: number };

/**
 * One camera change, in the take's seconds. `t0 === t1` is a cut. A spring move keeps settling
 * after `t1` (its 98% point) until the next move starts.
 */
export type Move = {
  t0: number;
  t1: number;
  from: Cam;
  to: Cam;
  why: string;
  curve?: "ease" | "spring";
};

export type CameraSettings = {
  /** The zoom while something is acted on. */
  working: number;
  /** Seconds: a push-in, a pull-back, and a pan from the shortest to the longest. */
  push: number;
  pull: number;
  pan: [number, number];
  /** How long before the pointer starts gliding the camera starts, seconds. */
  lead: number;
  /** The middle share of the shot inside which an action doesn't move the camera. */
  deadZone: number;
  /** A reframe beyond this zoom ratio, or this share of the shot's width, cuts instead of moving. */
  cutOver: { zoom: number; pan: number };
  /**
   * How the camera gets from one framing to the next. `moves`: a symmetric in-out curve, the shape
   * the X films use for zooms (rule 2). `spring`: a critically damped spring that starts fast and
   * settles in the same time, with no overshoot, the Screen Studio shape (rule 1).
   */
  follow: "moves" | "spring";
  /**
   * At every hard cut, frame the incoming shot so its point of interest lands where the outgoing
   * one's was (Murch's eye trace; rule 27: 101 of 139 measured cuts land within 10% of the width).
   */
  eyeTrace: boolean;
};

// The pace of 50 launch films measured on X (research/craft.md, rule 14): fitted with this file's
// `ease`, their pushes take 0.75 s, pulls 1.0 s and pans 0.86 s at the median. 0.3.0's 0.5 s push
// rested on an older script's reading of 400–570 ms.
export const CAMERA: CameraSettings = {
  working: 1.5,
  push: 0.75,
  pull: 1.0,
  pan: [0.7, 1.0],
  lead: 0.3,
  deadZone: 0.6,
  cutOver: { zoom: 1.8, pan: 0.5 },
  follow: "moves",
  eyeTrace: true,
};

/** A shot set in the reel file: where the camera goes at a moment of a clip. */
export type Shot = {
  /** A mark's label, or seconds from the clip's start. */
  at: string | number;
  zoom: number;
  /** The centre, as a share of the canvas (0–1). Default the middle. */
  x?: number;
  y?: number;
  /** The move's length in ms. Given, the camera always moves, never cuts. */
  over?: number;
};

export type Size = { width: number; height: number };

/** The canvas a take is composed on, CSS px, and where the app sits on it. */
export function stage(take: Take) {
  const d = take.density;
  return {
    width: take.layout.canvas.width / d,
    height: take.layout.canvas.height / d,
    appX: take.layout.x / d,
    appY: take.layout.y / d,
    density: d,
  };
}

export type Stage = ReturnType<typeof stage>;

/** The smallest zoom whose view still lies inside the canvas, for a frame of this size. */
export function minZoom(on: Stage, frame: Size) {
  return Math.max(frame.width / on.width, frame.height / on.height);
}

/**
 * The part of the canvas a camera shows, CSS px. `frame` is what the camera frames at zoom 1, in
 * canvas CSS px: the whole canvas for the reel's own aspect, less for a square, a 4:5 or a pane.
 */
export function view(cam: Cam, on: Stage, frame: Size = on) {
  const width = frame.width / cam.z;
  const height = frame.height / cam.z;
  return { x: cam.x - width / 2, y: cam.y - height / 2, width, height };
}

/** A camera kept on the canvas, resting on whole device pixels so a still shot isn't resampled off-grid. */
function rest(cam: Cam, on: Stage, frame: Size): Cam {
  const z = Math.max(minZoom(on, frame), cam.z);
  const half = { w: frame.width / z / 2, h: frame.height / z / 2 };
  const snap = (edge: number) => Math.round(edge * on.density) / on.density;
  const x = Math.min(on.width - half.w, Math.max(half.w, cam.x));
  const y = Math.min(on.height - half.h, Math.max(half.h, cam.y));
  return { x: snap(x - half.w) + half.w, y: snap(y - half.h) + half.h, z };
}

/** Where a canvas point shows in a shot, as a share of the frame (0–1 on each axis). */
export function onScreen(point: Point, cam: Cam, on: Stage, frame: Size = on): Point {
  const seen = view(cam, on, frame);
  return { x: (point.x - seen.x) / seen.width, y: (point.y - seen.y) / seen.height };
}

/** How far the eye travels between two screen points, as a share of the frame's width. */
export function eyeDistance(a: Point, b: Point, frame: Size) {
  return Math.hypot(a.x - b.x, ((a.y - b.y) * frame.height) / frame.width);
}

/** `cubic-bezier(0.65, 0, 0.35, 1)`: in and out, for a move from one place on screen to another. */
export function ease(k: number) {
  const [x1, y1, x2, y2] = [0.65, 0, 0.35, 1];
  const curve = (a: number, b: number, s: number) =>
    3 * a * s * (1 - s) ** 2 + 3 * b * s * s * (1 - s) + s ** 3;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (curve(x1, x2, mid) < k) lo = mid;
    else hi = mid;
  }
  return curve(y1, y2, (lo + hi) / 2);
}

/** A critically damped spring from rest settles to 2% at ω·t = 5.834: it never passes its target. */
const SETTLE = 5.834;

/** How far along a critically damped spring is, `tau` seconds after it starts, if 98% takes `length`. */
export function spring(tau: number, length: number) {
  const w = SETTLE / length;
  return tau <= 0 ? 0 : 1 - (1 + w * tau) * Math.exp(-w * tau);
}

type Anchor = {
  /** When the camera must be there (a press), or when it may start (a hint). */
  t: number;
  kind: "act" | "hint";
  /** Where the action lands, on the canvas. */
  point?: Point;
  box?: Box;
  cam?: Cam;
  zoom?: number;
  over?: number;
  why: string;
};

export type CameraPlan = ReturnType<typeof planCamera>;

/**
 * Plans a clip's camera from what happened in its take. It opens on the first action at the
 * working zoom (or wide), and then, for each click, hover, typed field or hint that falls outside
 * the middle of the shot, moves there: starting `lead` before the pointer starts gliding and still
 * before the press lands, never while the page scrolls, one move at a time. A reframe too big to
 * glide cuts, and a cut (into the clip, or inside it) puts the next action where the eye already
 * is.
 */
export function planCamera(
  take: Take,
  range: { a: number; b: number },
  options: {
    settings: CameraSettings;
    maxZoom: number;
    open?: "working" | "wide";
    auto?: boolean;
    shots?: Shot[];
    /** What the camera frames at zoom 1, canvas CSS px. Default the whole canvas. */
    frame?: Size;
    /** Where the viewer's eye is as the clip cuts in, as a share of the frame. */
    enter?: Point | null;
    /** No wide shots: a frame too narrow to show the window legibly (a 4:5 of a desktop). */
    workingOnly?: boolean;
  },
) {
  const on = stage(take);
  const { settings } = options;
  const frame = options.frame ?? { width: on.width, height: on.height };
  const lowest = minZoom(on, frame);
  const maxZoom = Math.max(lowest, options.maxZoom);
  const cap = (z: number) => Math.min(maxZoom, Math.max(lowest, z));
  const inside = <E extends TakeEvent>(event: E) =>
    ("t" in event ? event.t : event.t0) >= range.a - 1e-6 &&
    ("t" in event ? event.t : event.t1) <= range.b + 1e-6;
  const events = take.events.filter(inside);
  const onCanvas = (p: Point): Point => ({ x: p.x + on.appX, y: p.y + on.appY });
  const centre = (box: Box): Point =>
    onCanvas({ x: box.x + box.width / 2, y: box.y + box.height / 2 });
  const wide = (): Cam => rest({ x: on.width / 2, y: on.height / 2, z: lowest }, on, frame);
  const margin = (1 - settings.deadZone) / 2;
  const intoDeadZone = (p: Point): Point => ({
    x: Math.min(1 - margin, Math.max(margin, p.x)),
    y: Math.min(1 - margin, Math.max(margin, p.y)),
  });

  /** Where the pointer is at `t` (canvas px): mid-glide, or where it last came to rest. */
  const pointerAt = (t: number): Point | null => {
    let at: Point | null = null;
    for (const event of take.events) {
      if (event.kind === "glide") {
        if (event.t0 > t) continue;
        if (event.t1 <= t) at = onCanvas(event.to);
        else {
          const k = ease((t - event.t0) / (event.t1 - event.t0));
          at = onCanvas({
            x: event.from.x + (event.to.x - event.from.x) * k,
            y: event.from.y + (event.to.y - event.from.y) * k,
          });
        }
      } else if ((event.kind === "click" || event.kind === "hover") && event.t <= t)
        at = onCanvas(event.point);
    }
    return at;
  };

  const anchors: Anchor[] = [];
  if (options.auto !== false)
    for (const event of events) {
      if (event.kind === "click" || event.kind === "hover")
        anchors.push({
          t: event.t,
          kind: "act",
          point: onCanvas(event.point),
          box: event.box,
          why: event.kind,
        });
      else if (event.kind === "focus")
        anchors.push({ t: event.t, kind: "hint", box: event.box, zoom: event.zoom, why: "focus" });
      else if (event.kind === "wide" && !options.workingOnly)
        anchors.push({ t: event.t, kind: "hint", cam: wide(), why: "wide" });
    }
  for (const shot of options.shots ?? []) {
    const mark = typeof shot.at === "string" ? take.marks.find((m) => m.label === shot.at) : null;
    if (typeof shot.at === "string" && !mark)
      throw new Error(`A shot is set at the mark "${shot.at}", which ${take.scene} doesn't have.`);
    anchors.push({
      t: mark ? mark.at : range.a + (shot.at as number),
      kind: "hint",
      cam: { x: (shot.x ?? 0.5) * on.width, y: (shot.y ?? 0.5) * on.height, z: cap(shot.zoom) },
      over: shot.over === undefined ? undefined : shot.over / 1000,
      why: "shot",
    });
  }
  anchors.sort((p, q) => p.t - q.t);

  /** The point an anchor is about: where it's pressed, or the middle of what it frames. */
  const subject = (anchor: Anchor): Point | null =>
    anchor.point ?? (anchor.box ? centre(anchor.box) : null);

  /** The framing an anchor asks for. A target wider than the shot is framed on where it's pressed. */
  const frameFor = (anchor: Anchor, eye?: Point | null): Cam => {
    if (anchor.cam) return rest(anchor.cam, on, frame);
    const z = cap(anchor.zoom ?? settings.working);
    const box = anchor.box!;
    const sized = view({ x: 0, y: 0, z }, on, frame);
    const fits = box.width <= sized.width * 0.8 && box.height <= sized.height * 0.8;
    const at = fits || !anchor.point ? centre(box) : anchor.point;
    if (!eye) return rest({ ...at, z }, on, frame);
    // Eye trace: put the subject where the eye is (inside the dead zone, so the camera doesn't
    // then move straight off it), as far as a target that fits the shot stays whole in it.
    const want = intoDeadZone(eye);
    const poi = subject(anchor) ?? at;
    const keep = (c: number, lo: number, hi: number) =>
      lo <= hi ? Math.min(hi, Math.max(lo, c)) : c;
    const left = box.x + on.appX;
    const top = box.y + on.appY;
    const x = keep(
      poi.x + (0.5 - want.x) * sized.width,
      left + box.width - sized.width / 2,
      left + sized.width / 2,
    );
    const y = keep(
      poi.y + (0.5 - want.y) * sized.height,
      top + box.height - sized.height / 2,
      top + sized.height / 2,
    );
    return rest({ x, y, z }, on, frame);
  };

  const first = anchors[0];
  const enter = settings.eyeTrace ? (options.enter ?? null) : null;
  // Shots set at the clip's very start are its opening framing, not a move.
  const startsOnHint = Boolean(first && first.kind === "hint" && first.t <= range.a + 1e-3);
  const openWide =
    !first || options.auto === false || (options.open === "wide" && !options.workingOnly);
  const start = startsOnHint
    ? frameFor(first!)
    : openWide
      ? options.workingOnly && first
        ? frameFor(first, enter)
        : wide()
      : frameFor(first!, enter);

  const moves: Move[] = [];
  /** Cuts inside the clip, with the eye's screen position on each side. */
  const cuts: { t: number; from: Point | null; to: Point | null }[] = [];
  const scrolls = events.filter((event) => event.kind === "scroll");
  const glides = events.filter((event) => event.kind === "glide");
  let cam = start;
  let free = range.a;
  let last = range.a;
  let hinted = startsOnHint;
  for (const anchor of anchors) {
    let to = frameFor(anchor);
    const shown = view(cam, on, frame);
    if (anchor.kind === "act" && anchor.point) {
      // Inside the middle of the shot the camera stays put: no seasick micro-pans. A framing the
      // scene asked for (a hint) holds for anything inside it at all.
      const edge = hinted ? 0.04 : margin;
      const kx = (anchor.point.x - shown.x) / shown.width;
      const ky = (anchor.point.y - shown.y) / shown.height;
      const calm = kx >= edge && kx <= 1 - edge && ky >= edge && ky <= 1 - edge;
      if (calm && cam.z > lowest + 1e-3) {
        last = anchor.t;
        continue;
      }
      // Already at the working zoom: glide just far enough to bring the action into the middle,
      // so what was in the shot (the result of the last action) stays in it.
      if (Math.abs(cam.z - to.z) < 1e-3) {
        const into = (p: number, from: number, size: number) =>
          Math.min(0, p - (from + edge * size)) + Math.max(0, p - (from + (1 - edge) * size));
        to = rest(
          {
            x: cam.x + into(anchor.point.x, shown.x, shown.width),
            y: cam.y + into(anchor.point.y, shown.y, shown.height),
            z: cam.z,
          },
          on,
          frame,
        );
      }
    }
    const distance = Math.hypot(to.x - cam.x, to.y - cam.y);
    if (distance < 0.5 && Math.abs(to.z - cam.z) < 1e-3) {
      last = anchor.t;
      continue;
    }
    const ratio = Math.max(to.z / cam.z, cam.z / to.z);
    const span = (distance * Math.min(to.z, cam.z)) / frame.width;
    let length =
      anchor.over ??
      (ratio > 1.001
        ? to.z > cam.z
          ? settings.push
          : settings.pull
        : settings.pan[0] + (settings.pan[1] - settings.pan[0]) * Math.min(1, span / 0.5));
    let t0 = anchor.t;
    if (anchor.kind === "act") {
      // The camera leads the pointer and is still when the press lands.
      const glide = glides.filter((g) => g.t1 <= anchor.t + 1e-3 && g.t0 >= last - 1e-3).at(-1);
      t0 = (glide ? glide.t0 : anchor.t - length) - settings.lead;
      t0 = Math.min(t0, anchor.t - 0.05 - length);
    }
    t0 = Math.max(t0, free, range.a);
    // Never while the page scrolls: the move waits for the scroll to end.
    for (const scroll of scrolls) if (t0 < scroll.t1 && t0 + length > scroll.t0) t0 = scroll.t1;
    if (anchor.kind === "act") length = Math.max(0.2, Math.min(length, anchor.t - 0.05 - t0));
    const cut =
      anchor.over === undefined &&
      (ratio > settings.cutOver.zoom || span > settings.cutOver.pan) &&
      t0 > range.a;
    // A move the clip would end in the middle of isn't started: the clip ends on a still shot.
    if (t0 + (cut ? 0.3 : length) > range.b) continue;
    let eyeFrom: Point | null = null;
    if (cut) {
      // Across the cut the eye stays where it was: on the pointer, which the action starts from.
      const pointer = pointerAt(t0);
      eyeFrom = pointer ? onScreen(pointer, cam, on, frame) : null;
      if (settings.eyeTrace && eyeFrom) to = frameFor(anchor, eyeFrom);
    }
    const t1 = cut ? t0 : t0 + length;
    const curve = settings.follow === "spring" ? "spring" : "ease";
    moves.push({ t0, t1, from: cam, to, why: cut ? `${anchor.why} (cut)` : anchor.why, curve });
    if (cut) {
      const poi = subject(anchor);
      cuts.push({ t: t0, from: eyeFrom, to: poi ? onScreen(poi, to, on, frame) : null });
    }
    cam = to;
    hinted = anchor.kind === "hint";
    free = t1;
    last = anchor.t;
  }

  /** How far a spring has to settle before it's within a quarter of a take pixel of its target. */
  const restsAfter = (move: Move) => {
    const shift = Math.hypot(move.to.x - move.from.x, move.to.y - move.from.y);
    const edge = (frame.width / 2) * Math.abs(1 / move.from.z - 1 / move.to.z);
    const pixels = (shift + edge) * on.density;
    const length = move.t1 - move.t0;
    let tau = length;
    while (tau < length * 4 && (1 - spring(tau, length)) * pixels > 0.25) tau += 1 / 240;
    return tau;
  };
  // A spring that hasn't fully settled when the next move starts hands over from where it is.
  const between = (move: Move, t: number): Cam => {
    const length = move.t1 - move.t0;
    const tau = t - move.t0;
    if (length <= 0 || tau >= (move.curve === "spring" ? restsAfter(move) : length)) return move.to;
    const k = move.curve === "spring" ? spring(tau, length) : ease(tau / length);
    // Zoom changes by ratio, so a push feels even from start to end.
    return {
      x: move.from.x + (move.to.x - move.from.x) * k,
      y: move.from.y + (move.to.y - move.from.y) * k,
      z: move.from.z * (move.to.z / move.from.z) ** k,
    };
  };
  for (let i = 1; i < moves.length; i++)
    if (moves[i - 1]!.curve === "spring" && moves[i]!.t1 > moves[i]!.t0)
      moves[i]!.from = between(moves[i - 1]!, moves[i]!.t0);

  /** The camera at a moment of the take. */
  const at = (t: number): Cam => {
    let now = start;
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i]!;
      if (t < move.t0) break;
      const next = moves[i + 1];
      if (next && t >= next.t0) {
        now = move.to;
        continue;
      }
      return between(move, t);
    }
    return now;
  };

  /** The point of interest's screen position at `t`: the pointer, else the last thing acted on. */
  const eyeAt = (t: number): Point | null => {
    const pointer = pointerAt(t);
    const acted = anchors.filter((anchor) => anchor.t <= t + 1e-6).at(-1);
    const poi = pointer ?? (acted ? subject(acted) : null);
    if (!poi) return null;
    const p = onScreen(poi, at(t), on, frame);
    return { x: Math.min(1, Math.max(0, p.x)), y: Math.min(1, Math.max(0, p.y)) };
  };
  const firstPoi = first ? subject(first) : null;
  const eye = {
    /** Where the clip's first subject shows as it cuts in. */
    in: firstPoi ? onScreen(firstPoi, start, on, frame) : null,
    /** Where the eye is as the clip ends. */
    out: eyeAt(range.b),
  };
  return { start, moves, at, stage: on, frame, eye, cuts, eyeAt, lowest };
}
