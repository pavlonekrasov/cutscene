import type { Box, Point, Take, TakeEvent } from "./take";

/** Where the camera is: its centre on the canvas (CSS px) and its zoom (1 is the whole canvas). */
export type Cam = { x: number; y: number; z: number };

/** One camera change, in the take's seconds. `t0 === t1` is a cut. */
export type Move = { t0: number; t1: number; from: Cam; to: Cam; why: string };

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
};

export const CAMERA: CameraSettings = {
  working: 1.5,
  push: 0.5,
  pull: 0.6,
  pan: [0.5, 0.8],
  lead: 0.3,
  deadZone: 0.6,
  cutOver: { zoom: 1.8, pan: 0.5 },
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

type Stage = ReturnType<typeof stage>;

/** The part of the canvas a camera shows, CSS px. */
export function view(cam: Cam, on: Stage) {
  const width = on.width / cam.z;
  const height = on.height / cam.z;
  return { x: cam.x - width / 2, y: cam.y - height / 2, width, height };
}

/** A camera kept on the canvas, resting on whole device pixels so a still shot isn't resampled off-grid. */
function rest(cam: Cam, on: Stage): Cam {
  const z = Math.max(1, cam.z);
  const half = { w: on.width / z / 2, h: on.height / z / 2 };
  const snap = (edge: number) => Math.round(edge * on.density) / on.density;
  const x = Math.min(on.width - half.w, Math.max(half.w, cam.x));
  const y = Math.min(on.height - half.h, Math.max(half.h, cam.y));
  return { x: snap(x - half.w) + half.w, y: snap(y - half.h) + half.h, z };
}

const wide = (on: Stage): Cam => ({ x: on.width / 2, y: on.height / 2, z: 1 });

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

/**
 * Plans a clip's camera from what happened in its take. It opens on the first action at the
 * working zoom (or wide), and then, for each click, hover, typed field or hint that falls outside
 * the middle of the shot, moves there: starting `lead` before the pointer starts gliding and still
 * before the press lands, never while the page scrolls, one move at a time. A reframe too big to
 * glide cuts.
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
  },
) {
  const on = stage(take);
  const { settings, maxZoom } = options;
  const cap = (z: number) => Math.min(maxZoom, Math.max(1, z));
  const inside = <E extends TakeEvent>(event: E) =>
    ("t" in event ? event.t : event.t0) >= range.a - 1e-6 &&
    ("t" in event ? event.t : event.t1) <= range.b + 1e-6;
  const events = take.events.filter(inside);
  const onCanvas = (p: Point): Point => ({ x: p.x + on.appX, y: p.y + on.appY });
  const centre = (box: Box): Point =>
    onCanvas({ x: box.x + box.width / 2, y: box.y + box.height / 2 });

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
      else if (event.kind === "wide")
        anchors.push({ t: event.t, kind: "hint", cam: wide(on), why: "wide" });
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

  /** The framing an anchor asks for. A target wider than the shot is framed on where it's pressed. */
  const frame = (anchor: Anchor): Cam => {
    if (anchor.cam) return rest(anchor.cam, on);
    const z = cap(anchor.zoom ?? settings.working);
    const box = anchor.box!;
    const fits = box.width <= (on.width / z) * 0.8 && box.height <= (on.height / z) * 0.8;
    const at = fits || !anchor.point ? centre(box) : anchor.point;
    return rest({ ...at, z }, on);
  };

  const first = anchors[0];
  // Shots set at the clip's very start are its opening framing, not a move.
  const start =
    first && first.kind === "hint" && first.t <= range.a + 1e-3
      ? frame(first)
      : options.open === "wide" || !first || options.auto === false
        ? wide(on)
        : frame(first);

  const moves: Move[] = [];
  const scrolls = events.filter((event) => event.kind === "scroll");
  const glides = events.filter((event) => event.kind === "glide");
  let cam = start;
  let free = range.a;
  let last = range.a;
  let hinted = first?.kind === "hint" && start !== wide(on) && first.t <= range.a + 1e-3;
  for (const anchor of anchors) {
    let to = frame(anchor);
    const shown = view(cam, on);
    if (anchor.kind === "act" && anchor.point) {
      // Inside the middle of the shot the camera stays put: no seasick micro-pans. A framing the
      // scene asked for (a hint) holds for anything inside it at all.
      const margin = hinted ? 0.04 : (1 - settings.deadZone) / 2;
      const kx = (anchor.point.x - shown.x) / shown.width;
      const ky = (anchor.point.y - shown.y) / shown.height;
      const calm = kx >= margin && kx <= 1 - margin && ky >= margin && ky <= 1 - margin;
      if (calm && cam.z > 1) {
        last = anchor.t;
        continue;
      }
      // Already at the working zoom: glide just far enough to bring the action into the middle,
      // so what was in the shot (the result of the last action) stays in it.
      if (Math.abs(cam.z - to.z) < 1e-3) {
        const into = (p: number, from: number, size: number) =>
          Math.min(0, p - (from + margin * size)) + Math.max(0, p - (from + (1 - margin) * size));
        to = rest(
          {
            x: cam.x + into(anchor.point.x, shown.x, shown.width),
            y: cam.y + into(anchor.point.y, shown.y, shown.height),
            z: cam.z,
          },
          on,
        );
      }
    }
    const distance = Math.hypot(to.x - cam.x, to.y - cam.y);
    if (distance < 0.5 && Math.abs(to.z - cam.z) < 1e-3) {
      last = anchor.t;
      continue;
    }
    const ratio = Math.max(to.z / cam.z, cam.z / to.z);
    const span = (distance * Math.min(to.z, cam.z)) / on.width;
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
    const t1 = cut ? t0 : t0 + length;
    moves.push({ t0, t1, from: cam, to, why: cut ? `${anchor.why} (cut)` : anchor.why });
    cam = to;
    hinted = anchor.kind === "hint";
    free = t1;
    last = anchor.t;
  }

  /** The camera at a moment of the take. */
  const at = (t: number): Cam => {
    let now = start;
    for (const move of moves) {
      if (t < move.t0) break;
      if (t >= move.t1) {
        now = move.to;
        continue;
      }
      const k = ease((t - move.t0) / (move.t1 - move.t0));
      // Zoom changes by ratio, so a push feels even from start to end.
      const z = move.from.z * (move.to.z / move.from.z) ** k;
      return {
        x: move.from.x + (move.to.x - move.from.x) * k,
        y: move.from.y + (move.to.y - move.from.y) * k,
        z,
      };
    }
    return now;
  };
  return { start, moves, at, stage: on };
}
