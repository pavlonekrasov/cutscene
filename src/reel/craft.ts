import type { Grammar } from "./measure";

/**
 * The critic: a reel's measured craft held against the ranges top-tier launch films use. The
 * ranges are the rulebook's (`research/craft.md`, which doesn't ship): each one is read with the
 * same instrument (`measure.ts`) from the same 50 crafted films on X, so a cutscene reel and a
 * reference compare number for number. Out of range is a warning, never a failure: which warnings
 * become failures is the owner's call.
 */
export type Range = {
  /** The rule in `research/craft.md` the range comes from. */
  source: string;
  /** How many references (or readings) the range rests on. */
  n: number;
  /** Inclusive; null is open. */
  range: [number | null, number | null];
  unit: "s" | "share" | "fps" | "chars/s" | "width" | "ratio";
  what: string;
};

/**
 * Each range is the middle half (25th to 75th percentile) of what the instrument reads in the 50 X
 * films unless the rule gives a hard limit. Moves are counted when they are clearly moves: zooms of
 * ×1.2 or more, pans over 5% of the frame.
 */
export const CRAFT = {
  push: {
    source: "rule 14",
    n: 70,
    range: [0.28, 0.97],
    unit: "s",
    what: "push-in, read from 2% to 98% of the way",
  },
  pull: {
    source: "rule 14",
    n: 66,
    range: [0.43, 1.11],
    unit: "s",
    what: "pull-back, read from 2% to 98% of the way",
  },
  pan: {
    source: "rule 14",
    n: 202,
    range: [0.23, 0.63],
    unit: "s",
    what: "pan, read from 2% to 98% of the way",
  },
  overshoot: {
    source: "Part 2 (0 of 8 clean fits overshoot)",
    n: 8,
    range: [0, 0.02],
    unit: "share",
    what: "how far a move runs past its end (the instrument reads 1–2% on a still camera)",
  },
  still: {
    source: "measured table: camera still",
    n: 50,
    range: [0.7, 0.89],
    unit: "share",
    what: "share of the reel the camera holds still",
  },
  stepped: {
    source: "the pan test: no stepping",
    n: 1,
    range: [0, 0.05],
    unit: "share",
    what: "share of frames inside camera moves that repeat the frame before",
  },
  shot: {
    source: "measured table: shot length",
    n: 50,
    range: [1.06, 1.89],
    unit: "s",
    what: "median shot length (the instrument counts in-app changes as cuts, as it does in references)",
  },
  length: {
    source: "measured table: film length",
    n: 50,
    range: [23, 46],
    unit: "s",
    what: "the whole reel",
  },
  endCard: {
    source: "rule 12",
    n: 47,
    range: [2.0, 6.3],
    unit: "s",
    what: "the closing card",
  },
  hold: {
    source: "rule 5",
    n: 12,
    range: [1.5, null],
    unit: "s",
    what: "the shot held after a push before the camera changes again or the clip ends",
  },
  eye: {
    source: "rule 27",
    n: 139,
    range: [0, 0.1],
    unit: "width",
    what: "how far the point of interest jumps at a hard cut, as a share of the frame's width",
  },
  typing: {
    source: "rule 30",
    n: 3,
    range: [12, 30],
    unit: "chars/s",
    what: "typing as it plays in the reel",
  },
  dissolve: {
    source: "rule 19",
    n: 50,
    range: [0, 0.99],
    unit: "ratio",
    what: "a dissolve's length over the shorter of the two shots it joins",
  },
  motionFps: {
    source: "Proof: every take at 60 fps of motion",
    n: 1,
    range: [60, null],
    unit: "fps",
    what: "a take's paint rate while something moves, in the reel's time",
  },
} satisfies Record<string, Range>;

export type Property = keyof typeof CRAFT;

/** What the plan knows and the instrument can't see: why each cut is there, where the eye is. */
export type PlanFacts = {
  takes: { scene: string; motionFps: number }[];
  /** Every hard cut, with how far the point of interest jumps across it (null: no point to follow). */
  cuts: { at: number; eye: number | null; why: string }[];
  /** Each push-in planned, and how long its framing holds after it settles. */
  holds: { at: number; hold: number }[];
  /** Characters a second on screen, per typed field. */
  typing: { at: number; rate: number }[];
  dissolves: { at: number; over: number; shortest: number }[];
  endCard: number | null;
};

export type CraftCheck = Range & {
  property: Property;
  /** Every reading in this reel: one per move, cut, take or field; one for the whole reel. */
  values: number[];
  /** How many readings sit inside the range. */
  inside: number;
  ok: boolean;
};

export type Craft = {
  /** `inside` of `checked` properties have every reading in range. */
  score: { inside: number; checked: number };
  checks: CraftCheck[];
  warnings: string[];
};

const round = (value: number) => Number(value.toFixed(3));

/**
 * Scores a reel. `grammar` is the reel as the instrument reads it; `plan` adds what only the edit
 * knows. Either side alone still scores what it can: `cutscene measure --craft` has no plan.
 */
export function critic(grammar: Grammar | null, plan: PlanFacts | null): Craft {
  const readings: Partial<Record<Property, number[]>> = {};
  const add = (property: Property, value: number) => (readings[property] ??= []).push(round(value));
  if (grammar) {
    for (const move of grammar.moves) {
      const ratio = Math.max(move.zoom, 1 / move.zoom);
      const travel = Math.hypot(move.pan[0], move.pan[1]);
      // The same filter the ranges were read with: only clear moves.
      if (move.kind !== "pan" && ratio < 1.2) continue;
      if (move.kind === "pan" && travel < 5) continue;
      add(move.kind, move.over);
      add("overshoot", move.overshoot);
    }
    add("still", grammar.still);
    if (grammar.moves.length) add("stepped", grammar.held);
    add("shot", grammar.shotLength.median);
    add("length", grammar.duration);
  }
  if (plan) {
    for (const take of plan.takes) add("motionFps", take.motionFps);
    for (const cut of plan.cuts) if (cut.eye !== null) add("eye", cut.eye);
    for (const hold of plan.holds) add("hold", hold.hold);
    for (const typed of plan.typing) add("typing", typed.rate);
    for (const dissolve of plan.dissolves)
      add("dissolve", dissolve.over / Math.max(1e-3, dissolve.shortest));
    if (plan.endCard !== null) add("endCard", plan.endCard);
  }

  const checks: CraftCheck[] = [];
  const warnings: string[] = [];
  for (const property of Object.keys(CRAFT) as Property[]) {
    const values = readings[property];
    if (!values?.length) continue;
    const range: Range = CRAFT[property];
    const [min, max] = range.range;
    const fits = (value: number) =>
      (min === null || value >= min) && (max === null || value <= max);
    const inside = values.filter(fits).length;
    const ok = inside === values.length;
    checks.push({ property, ...range, values, inside, ok });
    // A slow take gets its own line below, with what to do about it.
    if (ok || property === "motionFps") continue;
    const span = `${min ?? "…"}–${max ?? "…"} ${range.unit}`;
    const out = values.filter((value) => !fits(value));
    warnings.push(
      `${range.what}: ${out.join(", ")} ${range.unit} (${values.length - inside} of ${values.length} outside ${span}; ${range.source})`,
    );
  }
  for (const take of plan?.takes ?? [])
    if (take.motionFps < 60)
      warnings.push(
        `${take.scene}: the take moves at ${take.motionFps} fps. Raise the reel's pace.`,
      );
  return {
    score: { inside: checks.filter((check) => check.ok).length, checked: checks.length },
    checks,
    warnings,
  };
}

/** The critic as lines to read. */
export function describeCraft(craft: Craft) {
  const lines = [
    `craft: ${craft.score.inside} of ${craft.score.checked} inside the references' ranges`,
  ];
  for (const check of craft.checks) {
    const [min, max] = check.range;
    lines.push(
      `  ${check.ok ? "✓" : "!"} ${check.property.padEnd(9)} ${check.values.join(", ")} ${check.unit}  (range ${min ?? "…"}–${max ?? "…"}, ${check.source})`,
    );
  }
  return lines.join("\n");
}
