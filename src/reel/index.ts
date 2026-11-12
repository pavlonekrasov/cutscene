import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { homedir, tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { test } from "@playwright/test";
import { fidelityProblem, review, type Fidelity } from "../check";
import { addSound, type Audio } from "./audio";
import {
  CAMERA,
  ease,
  eyeDistance,
  minZoom,
  planCamera,
  stage,
  type Cam,
  type CameraPlan,
  type CameraSettings,
  type Shot,
  type Size,
} from "./camera";
import { CARD, cardLine } from "./cards";
import { critic, describeCraft, type PlanFacts } from "./craft";
import { gate } from "./gate";
import { measureFile } from "./measure";
import { planSpeed, SPEED, type SpeedSettings } from "./ramp";
import {
  backdropOf,
  cardLayout,
  encodeReel,
  frameFor,
  output,
  Renderer,
  shot,
  type Aspect,
  type Clip as PaneClip,
  type Paint,
} from "./render";
import { paceFor, type Point, type PointerModel, type ReelJob, type Take } from "./take";

export { CAMERA, spring, type Cam, type CameraSettings, type Move, type Shot } from "./camera";
export { SPEED, type Ramp, type SpeedSettings } from "./ramp";
export type { PointerModel, ReelJob, Take, TakeEvent } from "./take";
export type { Audio } from "./audio";
export type { Aspect } from "./render";
export { CRAFT, critic, describeCraft, type Craft, type CraftCheck, type PlanFacts } from "./craft";
export {
  describe,
  grammar,
  measureFile,
  pageSource,
  tracker,
  type Cut,
  type Grammar,
  type MeasuredMove,
  type Row,
} from "./measure";

/** A stretch of one scene in the reel. */
export type Clip = {
  /** The scene's file, relative to the reel file. */
  scene: string;
  /** Start at this mark of the scene. Default: its first moment. */
  from?: string;
  /** End `tail` seconds after this mark. Default: the scene's end. */
  to?: string;
  /** How long the result is held after `to`, seconds, at 1×. Default 1.2. */
  tail?: number;
  /** Extra seconds on the clip's last frame, for the camera to finish a move on a still screen. */
  hold?: number;
  /** The first framing: on the first action at the working zoom (default), or the whole window. */
  open?: "working" | "wide";
  /** False keeps the camera off clicks and hints: only `shots` move it. */
  auto?: boolean;
  /** Shots set by hand, beside what the scene's actions and `act.focus()` / `act.wide()` give. */
  shots?: Shot[];
};

/**
 * Parallel action: two sessions of one flow, one person's action and its effect on another's
 * screen. Both scenes set the marks in `at`, in order; each is a moment where the first session's
 * action reaches the second. The first clip is the cause, the second the effect.
 */
type Parallel = {
  /** Marks both scenes set, in order. */
  at: string[];
  /** Seconds the result holds at the end, on the second session. Default 2. */
  hold?: number;
};

/**
 * Cross-cutting: the two sessions alternate full frame, cut at each shared mark, cause then
 * effect. Shots shorten toward the last mark (each pair to `shrink` of the one before, down to
 * 1.2 s), then the second session holds on the result.
 */
export type Cross = Parallel & { cross: [Clip, Clip]; shrink?: number };

/**
 * Split screen: both sessions side by side (stacked in a frame taller than wide), synced on the
 * shared marks. One pane acts at a time while the other holds its last frame, and each pane frames
 * its own working region at `zoom` (default 1.25), not the whole window.
 */
export type Split = Parallel & { split: [Clip, Clip]; zoom?: number };

export type ReelDef = {
  clips: (Clip | Cross | Split)[];
  /** A title card and a closing card: the first line is the name, the rest sit under it. */
  cards?: { open?: string[]; close?: string[] };
  /**
   * The takes' density, device px per CSS px. The deepest sharp zoom is `density / 2`: 3 (default)
   * for a working shot at 1.5, 4 for a detail at 2.
   */
  density?: number;
  /** How slow the takes record. Default: what keeps their motion at 60 fps (4 at 3×, 6 at 4×). */
  pace?: number;
  /** Which of the config's formats the reel is shot in. Default `desktop`. */
  project?: string;
  /** Where the reel goes: `<outDir>/<reel>-reel-<theme>/`. `CUTSCENE_OUT` wins. */
  outDir?: string;
  camera?: Partial<CameraSettings>;
  speed?: Partial<SpeedSettings>;
  /**
   * Open on the result for `length` seconds (default 1.2), then cut to the start: here's where we
   * end up, here's how. The last moments of the last clip, before the opening card.
   */
  coldOpen?: boolean | { length?: number };
  /**
   * Open letterboxed at `aspect` (default 2.39) on the cards and the establishing shot, then open
   * the frame to its full height over `over` ms (default 700) as the pointer sets off for the first
   * action. The bars are the backdrop's colour. Landscape deliveries only.
   */
  matte?: boolean | { aspect?: number; over?: number };
  /** Sound: silent by default. */
  audio?: Audio;
  /** The takes' pointer: `"human"` (Fitts's law, minimum jerk) or a fitted `{ a, b }`. */
  pointer?: PointerModel;
  /**
   * The aspects to deliver, each its own reel with the camera re-planned for that frame from the
   * same takes. Default `["native"]`, the canvas's own (16:9 for desktop). A frame taller than wide
   * of a desktop app uses working shots only: the window isn't legible whole at that width.
   */
  deliver?: Aspect[];
};

/** The reel's pixels per canvas CSS px: a 1920 × 1080 canvas makes a 3840 × 2160 video. */
const SCALE = 2;
/** A split's margins and gap, canvas CSS px, and its panes' corner. */
const SPLIT = { margin: 40, gap: 24, radius: 16 };
/** The shortest shot cross-cutting shrinks to, seconds (the films' median shot is 1.3 s). */
const SHORTEST = 1.2;

const slugOf = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const r2 = (value: number) => Number(value.toFixed(2));

type Found = { take: Take; dir: string };

/** One planned stretch of a take, full frame or in a pane, at the reel's speed. */
type Seg = {
  found: Found;
  scene: string;
  a: number;
  b: number;
  hold: number;
  cam: CameraPlan;
  count: number;
  toTake: (tau: number) => number;
  inClip: (t: number) => number;
  ramps: ReturnType<typeof planSpeed>["ramps"];
};

/** A finished piece of the edit: frames, where the eye is at its ends, and what the critic needs. */
type Built = {
  kind: "clip" | "cross" | "split" | "cold";
  label: string;
  count: number;
  frameAt: (n: number) => Paint;
  /** The point of interest as the part cuts in and as it ends, as a share of the reel's frame. */
  eye: { in: Point | null; out: Point | null };
  /** Seconds from the part's start. */
  cuts: { at: number; eye: number | null; why: string }[];
  holds: { at: number; hold: number }[];
  typing: { at: number; rate: number }[];
  /** When the pointer sets off for the part's first action. */
  firstAction: number | null;
  stills: { label: string; at: number }[];
  deep: { cam: Cam; found: Found; frame: Size }[];
  found: Found[];
  report: (at: number) => object;
};

/**
 * `reel(title, def)`: a showreel cut from scenes, run with `cutscene reel <file>`. It records its
 * own takes of the scenes at a higher density (through the same config, so nothing about a scene's
 * own video changes), then renders a second pass: a camera that pushes in on where the work
 * happens, typing and waits sped through, cuts that keep the eye where it was, a card at each end.
 * Like a scene, it fails when the result drifts from the app, and its manifest scores its craft
 * against measured launch films.
 */
export function reel(title: string, def: ReelDef) {
  test(title, async ({ browser, colorScheme }, info) => {
    test.setTimeout(0);
    if (!def.clips.length) throw new Error("A reel needs at least one clip.");
    const theme = colorScheme === "dark" ? "dark" : "light";
    const variant = process.env.CUTSCENE_BLUR === "1" ? "-blurred" : "";
    const slug = slugOf(title);
    const density = def.density ?? 3;
    const project = process.env.CUTSCENE_REEL_PROJECT ?? def.project ?? "desktop";
    const camera = { ...CAMERA, ...def.camera };
    const speed = { ...SPEED, ...def.speed };
    const OUT = process.env.CUTSCENE_OUT ?? def.outDir ?? join(homedir(), "Videos", "cutscene");
    // Takes are kept between runs, so a re-cut (`--reuse`) doesn't record again.
    const work = join(tmpdir(), "cutscene", "reels", `${slug}-${project}-${theme}${variant}`);
    const takesDir = join(work, "takes");
    // The reel file: `info.file` is this module, where the test is declared.
    const reelFile = process.env.CUTSCENE_REEL_FILE ?? info.file;
    const here = dirname(reelFile);
    const pairOf = (entry: Clip | Cross | Split): Clip[] =>
      "cross" in entry ? entry.cross : "split" in entry ? entry.split : [entry];
    const scenes = [...new Set(def.clips.flatMap(pairOf).map((clip) => resolve(here, clip.scene)))];
    for (const scene of scenes)
      if (!existsSync(scene)) throw new Error(`The reel's clip names ${scene}, which isn't there.`);

    // ── Takes ────────────────────────────────────────────────────────────────────────────────
    const pointer = JSON.stringify(def.pointer ?? null);
    const find = () => {
      const takes = new Map<string, Found>();
      if (existsSync(takesDir))
        for (const name of readdirSync(takesDir)) {
          const file = join(takesDir, name, "take.json");
          if (!existsSync(file)) continue;
          const take = JSON.parse(readFileSync(file, "utf8")) as Take;
          if (
            take.project === project &&
            take.density === density &&
            JSON.stringify(take.pointer ?? null) === pointer
          )
            takes.set(resolve(take.file).toLowerCase(), { take, dir: join(takesDir, name) });
        }
      return takes;
    };
    const reuse = process.env.CUTSCENE_REEL_REUSE === "1";
    if (!reuse || scenes.some((scene) => !find().has(scene.toLowerCase()))) {
      await rm(takesDir, { recursive: true, force: true });
      await mkdir(takesDir, { recursive: true });
      const job: ReelJob = {
        takes: takesDir,
        density,
        scale: SCALE,
        cards: def.cards,
        ...(def.pointer ? { pointer: def.pointer } : {}),
      };
      await writeFile(join(work, "job.json"), JSON.stringify(job));
      const config = info.config.configFile;
      if (!config) throw new Error("A reel runs through a cutscene config: cutscene reel <file>.");
      const cli = createRequire(config).resolve("@playwright/test/cli");
      const env: NodeJS.ProcessEnv = {
        ...process.env,
        CUTSCENE_REEL: join(work, "job.json"),
        CUTSCENE_PACE: process.env.CUTSCENE_PACE ?? String(def.pace ?? paceFor(density)),
      };
      delete env.CUTSCENE_REEL_FILE;
      delete env.CUTSCENE_FRAME;
      // Playwright filters files by regular expression, matched against the whole path.
      const filters = scenes.map((scene) => basename(scene).replace(/[.*+?^${}()|[\]]/g, "\\$&"));
      const run = spawnSync(
        process.execPath,
        [cli, "test", "-c", config, `--project=${project}`, ...filters],
        { stdio: "inherit", env },
      );
      if (run.status !== 0) throw new Error("The reel's takes didn't record: see the run above.");
    }
    const takes = find();
    const takeOf = (clip: Clip): Found => {
      const found = takes.get(resolve(here, clip.scene).toLowerCase());
      if (!found) throw new Error(`No take of ${clip.scene} for the ${project} format.`);
      return found;
    };
    const used = def.clips.flatMap(pairOf).map(takeOf);
    const firstTake = used[0]!;
    const lastTake = used.at(-1)!;
    const canvas = stage(firstTake.take);
    for (const { take } of used) {
      const on = stage(take);
      if (on.width !== canvas.width || on.height !== canvas.height)
        throw new Error("A reel's clips must share one format.");
    }
    const maxZoom = density / SCALE;
    const markOf = (found: Found, clip: Clip, label: string | undefined, what: string) => {
      if (label === undefined) return null;
      const mark = found.take.marks.find((m) => m.label === label);
      if (!mark) throw new Error(`${clip.scene} has no mark "${label}" (${what}).`);
      return mark.at;
    };

    const renderer = new Renderer(browser);
    await renderer.open();
    try {
      const aspects = [...new Set<Aspect>(def.deliver ?? ["native"])];
      for (const aspect of aspects) await deliver(aspect);
    } finally {
      await renderer.close();
    }

    /** One delivery: the edit planned for this frame, rendered, encoded, checked and scored. */
    async function deliver(aspect: Aspect) {
      const frame = frameFor(firstTake.take, aspect, SCALE);
      const out = output(frame, SCALE);
      const native =
        Math.abs(frame.width / frame.height - canvas.width / canvas.height) < 0.01 &&
        frame.width === canvas.width;
      const suffix = native ? "" : `-${aspect.replace(":", "x")}`;
      const outDir = join(OUT, `${slug}-reel-${theme}${variant}${suffix}`);
      const draft = `${outDir}.partial`;
      const workingOnly = frame.width < frame.height && canvas.width > canvas.height;
      const fill = backdropOf(firstTake.take, firstTake.dir);
      const fileAt = (take: Take, t: number) =>
        (take.entries.findLast((e) => e.at <= t + 1e-6) ?? take.entries[0]!).file;

      // ── Planning ───────────────────────────────────────────────────────────────────────────
      const plan = (
        found: Found,
        clip: Clip,
        a: number,
        b: number,
        hold: number,
        enter: Point | null,
        options: { frame?: Size; working?: number; open?: "working" | "wide" } = {},
      ): Seg => {
        const cam = planCamera(
          found.take,
          { a, b: b + hold },
          {
            settings: options.working ? { ...camera, working: options.working } : camera,
            maxZoom,
            open: options.open ?? clip.open,
            auto: clip.auto,
            shots: clip.shots,
            frame: options.frame ?? frame,
            enter,
            workingOnly,
          },
        );
        const pacing = planSpeed(found.take, { a, b }, speed);
        return {
          found,
          scene: found.take.scene,
          a,
          b,
          hold,
          cam,
          count: Math.round((pacing.duration + hold) * 60),
          // Past the clip's end the last frame holds while the camera's clock runs on.
          toTake: (tau) =>
            tau <= pacing.duration ? pacing.toTake(tau) : b + (tau - pacing.duration),
          inClip: (t) => (t <= b ? pacing.fromTake(t) : pacing.duration + (t - b)),
          ramps: pacing.ramps,
        };
      };
      /** A segment's frame, full frame. Past its end the last frame holds; the camera runs on. */
      const full = (seg: Seg, n: number): Paint => {
        const t = seg.toTake(n / 60);
        return shot(
          seg.found.take,
          seg.found.dir,
          fileAt(seg.found.take, Math.min(t, seg.b)),
          seg.cam.at(t),
          SCALE,
          frame,
        );
      };
      /** What the critic and the matte need from a segment, `at` seconds into its part. */
      const factsOf = (seg: Seg, at: number, pane?: { box: PaneClip; frame: Size }) => {
        const { take } = seg.found;
        const moves = seg.cam.moves;
        const holds = moves
          .map((move, i) => ({ move, next: moves[i + 1] }))
          .filter(({ move }) => move.to.z > move.from.z * 1.001)
          .map(({ move, next }) => ({
            at: at + seg.inClip(move.t1),
            hold: seg.inClip(next ? next.t0 : seg.b + seg.hold) - seg.inClip(move.t1),
          }));
        const typing = take.events
          .filter((e) => e.kind === "type" && e.t0 >= seg.a - 1e-6 && e.t1 <= seg.b + 1e-6)
          .flatMap((e) =>
            e.kind === "type" && e.chars
              ? [
                  {
                    at: at + seg.inClip(e.t0),
                    rate: e.chars / Math.max(0.05, seg.inClip(e.t1) - seg.inClip(e.t0)),
                  },
                ]
              : [],
          );
        const sets = take.events.find(
          (e) =>
            (e.kind === "glide" && e.t0 >= seg.a - 1e-6 && e.t0 <= seg.b) ||
            ((e.kind === "click" || e.kind === "hover") && e.t >= seg.a && e.t <= seg.b),
        );
        const firstAction = !sets
          ? null
          : at + seg.inClip("t0" in sets ? sets.t0 : Math.max(seg.a, sets.t - 0.3));
        const size = pane?.frame ?? frame;
        const cuts = seg.cam.cuts.map((cut) => ({
          at: at + seg.inClip(cut.t),
          eye: cut.from && cut.to ? r2(eyeDistance(cut.from, cut.to, size)) : null,
          why: "reframe",
        }));
        return { holds, typing, firstAction, cuts };
      };
      const deepOf = (seg: Seg, size: Size = frame) =>
        [seg.cam.start, ...seg.cam.moves.map((move) => move.to)].map((cam) => ({
          cam,
          found: seg.found,
          frame: size,
        }));
      const reportOf = (seg: Seg, at: number) => ({
        scene: seg.scene,
        at: r2(at),
        duration: r2(seg.count / 60),
        take: {
          from: r2(seg.a),
          to: r2(seg.b),
          motionFps: seg.found.take.motionFps,
          pace: seg.found.take.pace,
        },
        opens: seg.cam.start,
        shots: seg.cam.moves.map((move) => ({
          at: r2(at + seg.inClip(move.t0)),
          // In the reel's seconds: a move that runs through a ramp is shorter than in the take.
          over: r2(seg.inClip(move.t1) - seg.inClip(move.t0)),
          why: move.why,
          zoom: r2(move.to.z),
          x: Number(move.to.x.toFixed(1)),
          y: Number(move.to.y.toFixed(1)),
        })),
        ramps: seg.ramps.map((ramp) => ({
          at: r2(at + seg.inClip(ramp.t0)),
          over: r2(seg.inClip(ramp.t1) - seg.inClip(ramp.t0)),
          speed: ramp.speed,
          why: ramp.why,
        })),
      });
      const rangeOf = (found: Found, clip: Clip) => {
        const a = markOf(found, clip, clip.from, "the clip's `from`") ?? 0;
        const to = markOf(found, clip, clip.to, "the clip's `to`");
        const b =
          to === null
            ? found.take.duration
            : Math.min(found.take.duration, to + (clip.tail ?? 1.2));
        if (b - a < 0.2)
          throw new Error(
            `The clip of ${clip.scene} is empty: "${clip.to}" isn't after "${clip.from}".`,
          );
        return { a, b };
      };

      const buildClip = (clip: Clip, enter: Point | null): Built => {
        const found = takeOf(clip);
        const { a, b } = rangeOf(found, clip);
        const seg = plan(found, clip, a, b, clip.hold ?? 0, enter);
        const facts = factsOf(seg, 0);
        return {
          kind: "clip",
          label: `clip-${slugOf(seg.scene)}`,
          count: seg.count,
          frameAt: (n) => full(seg, n),
          eye: seg.cam.eye,
          ...facts,
          stills: [
            { label: `clip-${slugOf(seg.scene)}`, at: 0.05 },
            ...seg.cam.moves.map((move) => ({
              label: `shot-${slugOf(move.why)}`,
              at: seg.inClip(move.t1) + 0.1,
            })),
          ],
          deep: deepOf(seg),
          found: [found],
          report: (at) => ({ from: clip.from ?? null, to: clip.to ?? null, ...reportOf(seg, at) }),
        };
      };

      /**
       * The two sessions' stretches in order, cut at each shared mark (a moment after it, so the
       * action's result registers before the cut): cause, effect, cause, effect…, and the effect's
       * session runs on to its end.
       */
      const stretches = (entry: Cross | Split, pair: [Clip, Clip]) => {
        if (!entry.at.length)
          throw new Error("Parallel action needs at least one shared mark (`at`).");
        const found = pair.map(takeOf) as [Found, Found];
        const ranges = pair.map((clip, i) => rangeOf(found[i]!, clip));
        const marks = pair.map((clip, i) =>
          entry.at.map((label) =>
            Math.min(
              found[i]!.take.duration,
              markOf(found[i]!, clip, label, "a shared mark in `at`")! + 0.2,
            ),
          ),
        );
        for (const side of marks)
          side.forEach((t, i) => {
            if (i && t <= side[i - 1]!)
              throw new Error(`The marks in \`at\` must come in order: ${entry.at.join(", ")}.`);
          });
        const list: { side: 0 | 1; a: number; b: number }[] = [];
        const from = [ranges[0]!.a, ranges[1]!.a];
        entry.at.forEach((_, i) => {
          const last = i === entry.at.length - 1;
          list.push({ side: 0, a: from[0]!, b: marks[0]![i]! });
          list.push({
            side: 1,
            a: from[1]!,
            b: last ? Math.max(ranges[1]!.b, marks[1]![i]!) : marks[1]![i]!,
          });
          from[0] = marks[0]![i]!;
          from[1] = marks[1]![i]!;
        });
        return { found, list };
      };

      const buildCross = (entry: Cross, enter: Point | null): Built => {
        const { found, list } = stretches(entry, entry.cross);
        const shrink = entry.shrink ?? 0.7;
        const segs: Seg[] = [];
        let eye = enter;
        let longest = 0;
        list.forEach((piece, i) => {
          const clip = entry.cross[piece.side];
          const final = i === list.length - 1;
          const hold = final ? (entry.hold ?? 2) : 0;
          const first = i < 2;
          const open = first ? clip.open : "working";
          let seg = plan(found[piece.side]!, clip, piece.a, piece.b, hold, eye, { open });
          if (first) longest = Math.max(longest, seg.count / 60);
          else if (!final) {
            // Toward the meeting point each pair is shorter than the one before: trim the start,
            // so every shot still ends on its action.
            const budget = Math.max(SHORTEST, longest * shrink ** Math.floor(i / 2));
            if (seg.count / 60 > budget + 1 / 60) {
              const a = seg.toTake(seg.count / 60 - budget);
              seg = plan(found[piece.side]!, clip, a, piece.b, hold, eye, { open });
            }
          }
          segs.push(seg);
          eye = seg.cam.eye.out;
        });
        const starts: number[] = [];
        let total = 0;
        for (const seg of segs) {
          starts.push(total);
          total += seg.count;
        }
        const facts = segs.map((seg, i) => factsOf(seg, starts[i]! / 60));
        const cuts = segs.slice(1).map((seg, i) => {
          const before = segs[i]!.cam.eye.out;
          const after = seg.cam.eye.in;
          return {
            at: starts[i + 1]! / 60,
            eye: before && after ? r2(eyeDistance(before, after, frame)) : null,
            why: "cross",
          };
        });
        return {
          kind: "cross",
          label: "cross",
          count: total,
          frameAt: (n) => {
            let i = segs.length - 1;
            while (i > 0 && starts[i]! > n) i--;
            return full(segs[i]!, n - starts[i]!);
          },
          eye: { in: segs[0]!.cam.eye.in, out: segs.at(-1)!.cam.eye.out },
          cuts: [...cuts, ...facts.flatMap((f) => f.cuts)],
          holds: facts.flatMap((f) => f.holds),
          typing: facts.flatMap((f) => f.typing),
          firstAction: facts.find((f) => f.firstAction !== null)?.firstAction ?? null,
          stills: segs.map((seg, i) => ({
            label: `cross-${i + 1}-${slugOf(seg.scene)}`,
            at: starts[i]! / 60 + Math.min(0.4, seg.count / 120),
          })),
          deep: segs.flatMap((seg) => deepOf(seg)),
          found,
          report: (at) => ({
            kind: "cross",
            scenes: found.map((f) => f.take.scene),
            marks: entry.at,
            at: r2(at),
            duration: r2(total / 60),
            shots: segs.map((seg, i) => reportOf(seg, at + starts[i]! / 60)),
          }),
        };
      };

      const buildSplit = (entry: Split, enter: Point | null): Built => {
        const { found, list } = stretches(entry, entry.split);
        // Side by side in a landscape frame, stacked in a square or a portrait one.
        const across = out.width >= out.height * 1.2;
        const m = SPLIT.margin * SCALE;
        const g = SPLIT.gap * SCALE;
        const even = (n: number) => Math.floor(n / 2) * 2;
        const paneW = even(across ? (out.width - 2 * m - g) / 2 : out.width - 2 * m);
        const paneH = even(across ? out.height - 2 * m : (out.height - 2 * m - g) / 2);
        const panes: PaneClip[] = [0, 1].map((i) => ({
          x: across ? m + i * (paneW + g) : (out.width - paneW) / 2,
          y: across ? (out.height - paneH) / 2 : m + i * (paneH + g),
          width: paneW,
          height: paneH,
          radius: SPLIT.radius * SCALE,
        }));
        const paneFrame: Size = { width: paneW / SCALE, height: paneH / SCALE };
        const zoom = Math.max(minZoom(canvas, paneFrame), entry.zoom ?? 1.25);
        // Each pane's camera follows its own take through every stretch it plays.
        const cams = ([0, 1] as const).map((side) => {
          const mine = list.filter((piece) => piece.side === side);
          const clip = entry.split[side];
          const hold = side === 1 ? (entry.hold ?? 2) : 0;
          return plan(found[side]!, clip, mine[0]!.a, mine.at(-1)!.b, hold, null, {
            frame: paneFrame,
            working: zoom,
            open: "working",
          }).cam;
        });
        const toReel = (side: number, p: Point | null): Point | null =>
          p && {
            x: (panes[side]!.x + p.x * panes[side]!.width) / out.width,
            y: (panes[side]!.y + p.y * panes[side]!.height) / out.height,
          };
        const segs = list.map((piece, i) => {
          const final = i === list.length - 1;
          const seg = plan(
            found[piece.side]!,
            entry.split[piece.side],
            piece.a,
            piece.b,
            final ? (entry.hold ?? 2) : 0,
            null,
            {
              frame: paneFrame,
              working: zoom,
            },
          );
          // The pane's own camera, planned over all its stretches, not this stretch's alone.
          return { ...seg, cam: cams[piece.side]!, side: piece.side };
        });
        const starts: number[] = [];
        let total = 0;
        for (const seg of segs) {
          starts.push(total);
          total += seg.count;
        }
        /** Where each pane's take is at the start of each stretch: held where it last stopped. */
        const heldAt = segs.map((_, i) =>
          ([0, 1] as const).map((side) => {
            const before = segs
              .slice(0, i)
              .filter((seg) => seg.side === side)
              .at(-1);
            return before ? before.b : list.find((piece) => piece.side === side)!.a;
          }),
        );
        const facts = segs.map((seg, i) =>
          factsOf(seg, starts[i]! / 60, { box: panes[seg.side]!, frame: paneFrame }),
        );
        const last = segs.at(-1)!;
        return {
          kind: "split",
          label: "split",
          count: total,
          frameAt: (n) => {
            let i = segs.length - 1;
            while (i > 0 && starts[i]! > n) i--;
            const seg = segs[i]!;
            const times = [...heldAt[i]!];
            times[seg.side] = seg.toTake((n - starts[i]!) / 60);
            // Past a stretch's end its picture holds while the pane's camera runs on.
            const shown = times.map((t, side) => (side === seg.side ? Math.min(t, seg.b) : t));
            const layers = ([0, 1] as const).flatMap((side) => {
              const { take, dir } = found[side]!;
              const t = times[side]!;
              return shot(
                take,
                dir,
                fileAt(take, shown[side]!),
                cams[side]!.at(t),
                SCALE,
                paneFrame,
                panes[side],
              ).layers;
            });
            return { width: out.width, height: out.height, fill, layers };
          },
          eye: {
            in: toReel(segs[0]!.side, cams[segs[0]!.side]!.eyeAt(segs[0]!.a)),
            out: toReel(last.side, cams[last.side]!.eyeAt(last.b + last.hold)),
          },
          cuts: facts.flatMap((f) => f.cuts),
          holds: facts.flatMap((f) => f.holds),
          typing: facts.flatMap((f) => f.typing),
          firstAction: facts.find((f) => f.firstAction !== null)?.firstAction ?? null,
          stills: segs.map((seg, i) => ({
            label: `split-${i + 1}-${slugOf(seg.scene)}`,
            at: starts[i]! / 60 + Math.min(0.4, seg.count / 120),
          })),
          deep: cams.flatMap((cam, side) =>
            [cam.start, ...cam.moves.map((move) => move.to)].map((c) => ({
              cam: c,
              found: found[side]!,
              frame: paneFrame,
            })),
          ),
          found,
          report: (at) => ({
            kind: "split",
            scenes: found.map((f) => f.take.scene),
            marks: entry.at,
            at: r2(at),
            duration: r2(total / 60),
            zoom: r2(zoom),
            panes: panes.map((pane) => ({
              x: pane.x,
              y: pane.y,
              width: pane.width,
              height: pane.height,
            })),
            stretches: segs.map((seg, i) => ({
              scene: seg.scene,
              at: r2(at + starts[i]! / 60),
              duration: r2(seg.count / 60),
              take: { from: r2(seg.a), to: r2(seg.b) },
            })),
          }),
        };
      };

      // The cards' text sits in the middle of the frame: that's where the eye is when one ends.
      const centre: Point = { x: 0.5, y: 0.5 };
      const hasOpenCard = Boolean(firstTake.take.cards?.open.length);
      const buildAll = (enter: Point | null) => {
        const parts: Built[] = [];
        let eye = enter;
        for (const entry of def.clips) {
          const part =
            "cross" in entry
              ? buildCross(entry, eye)
              : "split" in entry
                ? buildSplit(entry, eye)
                : buildClip(entry, eye);
          parts.push(part);
          eye = part.eye.out;
        }
        return parts;
      };
      let parts = buildAll(hasOpenCard ? centre : null);
      const coldLength =
        def.coldOpen === true ? 1.2 : def.coldOpen ? (def.coldOpen.length ?? 1.2) : 0;
      // Without an opening card the cold open cuts straight into the first clip: frame that clip
      // for where the cold open leaves the eye.
      if (coldLength && !hasOpenCard) parts = buildAll(parts.at(-1)!.eye.out);
      const tail = parts.at(-1)!;
      const cold: Built | null = coldLength
        ? {
            kind: "cold",
            label: "cold-open",
            count: Math.min(tail.count, Math.round(coldLength * 60)),
            frameAt: (n) =>
              tail.frameAt(tail.count - Math.min(tail.count, Math.round(coldLength * 60)) + n),
            eye: { in: tail.eye.out, out: tail.eye.out },
            cuts: [],
            holds: [],
            typing: [],
            firstAction: null,
            stills: [{ label: "cold-open", at: 0.3 }],
            deep: [],
            found: tail.found,
            report: (at) => ({ kind: "cold", at: r2(at), duration: r2(coldLength) }),
          }
        : null;

      // ── The edit ───────────────────────────────────────────────────────────────────────────
      const paints: Paint[] = [];
      const now = () => paints.length / 60;
      const stills: { label: string; at: number }[] = [];
      const facts: PlanFacts = {
        takes: [],
        cuts: [],
        holds: [],
        typing: [],
        dissolves: [],
        endCard: null,
      };
      const report: object[] = [];
      const placed: { part: Built; at: number }[] = [];
      const blank = (sample: string): Paint => ({
        width: out.width,
        height: out.height,
        layers: [],
        card: { sample, fill: 1, lines: [] },
      });
      const dissolve = CARD.dissolve;
      /** A card, dissolving from `before` and into `after` when there's a picture on that side. */
      const card = (
        side: "open" | "close",
        before: Paint | null,
        after: Paint | null,
        held: Found,
      ) => {
        const lines = held.take.cards?.[side] ?? [];
        if (!lines.length) return false;
        const set = cardLayout(held.dir, lines, out);
        const sample = set[0]!.url;
        const length = CARD[side];
        const over = (under: Paint | null, k: number) =>
          paints.push({ ...(under ?? blank(sample)), card: { sample, fill: k, lines: [] } });
        if (before) for (let i = 1; i <= dissolve; i++) over(before, i / (dissolve + 1));
        stills.push({ label: `card-${side}`, at: now() + length * 0.6 });
        for (let n = 0; n < Math.round(length * 60); n++)
          paints.push({
            ...blank(sample),
            card: {
              sample,
              fill: 1,
              lines: set.map((line, i) => {
                const { alpha, rise, blur } = cardLine(i, n / 60, length, SCALE);
                return { ...line, y: line.y + rise, alpha, blur };
              }),
            },
          });
        if (after) for (let i = dissolve; i >= 1; i--) over(after, i / (dissolve + 1));
        return true;
      };
      const play = (part: Built) => {
        const at = now();
        placed.push({ part, at });
        for (const still of part.stills) stills.push({ label: still.label, at: at + still.at });
        for (let n = 0; n < part.count; n++) paints.push(part.frameAt(n));
        facts.cuts.push(...part.cuts.map((cut) => ({ ...cut, at: r2(at + cut.at) })));
        facts.holds.push(
          ...part.holds.map((hold) => ({ at: r2(at + hold.at), hold: r2(hold.hold) })),
        );
        facts.typing.push(
          ...part.typing.map((typed) => ({ at: r2(at + typed.at), rate: r2(typed.rate) })),
        );
        if (part.kind !== "cold") report.push(part.report(at));
      };
      /** A hard cut from one part to the next, and how far the eye travels across it. */
      const hardCut = (before: Built, after: Built) =>
        facts.cuts.push({
          at: r2(now()),
          eye:
            before.eye.out && after.eye.in
              ? r2(eyeDistance(before.eye.out, after.eye.in, frame))
              : null,
          why: `${before.kind} → ${after.kind}`,
        });

      const first = parts[0]!;
      if (cold) play(cold);
      const opened = card(
        "open",
        cold ? cold.frameAt(cold.count - 1) : null,
        first.frameAt(0),
        firstTake,
      );
      if (opened) {
        const shown = CARD.open + (cold ? dissolve / 60 : 0);
        facts.dissolves.push({
          at: r2(now() - dissolve / 60),
          over: r2(dissolve / 60),
          shortest: r2(Math.min(shown, first.count / 60)),
        });
        if (cold)
          facts.dissolves.push({
            at: r2(cold.count / 60),
            over: r2(dissolve / 60),
            shortest: r2(Math.min(cold.count / 60, CARD.open)),
          });
      } else if (cold) hardCut(cold, first);
      parts.forEach((part, i) => {
        if (i) hardCut(parts[i - 1]!, part);
        play(part);
      });
      const end = parts.at(-1)!;
      const before = paints.length;
      if (card("close", end.frameAt(end.count - 1), null, lastTake)) {
        facts.endCard = CARD.close;
        facts.dissolves.push({
          at: r2(before / 60),
          over: r2(dissolve / 60),
          shortest: r2(Math.min(CARD.close, end.count / 60)),
        });
      }
      for (const found of new Set(parts.flatMap((part) => part.found)))
        facts.takes.push({ scene: found.take.scene, motionFps: found.take.motionFps });

      // The matte: letterboxed until the pointer sets off for the first action, then open.
      const matte = def.matte
        ? { aspect: 2.39, over: 700, ...(def.matte === true ? {} : def.matte) }
        : null;
      let matteReport: object | null = null;
      if (matte && out.width > out.height) {
        const content = Math.min(out.height, out.width / matte.aspect);
        const bar = (out.height - content) / 2;
        const lead = placed.find((p) => p.part.kind !== "cold" && p.part.firstAction !== null);
        const opens = lead ? lead.at + lead.part.firstAction! : paints.length / 60;
        const startAt = Math.max(lead ? lead.at : 0, opens - matte.over / 1000);
        const from = Math.round(startAt * 60);
        const to = from + Math.round(matte.over / (1000 / 60));
        const sample = backdropOf(firstTake.take, firstTake.dir);
        for (let n = 0; n < Math.min(to, paints.length); n++) {
          const k = n < from ? 0 : ease((n - from) / (to - from));
          const height = Math.round(bar * (1 - k));
          if (height > 0) paints[n] = { ...paints[n]!, matte: { sample, bar: height } };
        }
        matteReport = { aspect: matte.aspect, opens: r2(from / 60), open: r2(to / 60) };
      }

      // ── Render, encode, check ──────────────────────────────────────────────────────────────
      const renderDir = join(work, `render${suffix}`);
      await rm(renderDir, { recursive: true, force: true });
      await mkdir(renderDir, { recursive: true });
      await rm(draft, { recursive: true, force: true });
      await mkdir(draft, { recursive: true });
      let published = false;
      try {
        const entries: { file: string; frames: number }[] = [];
        let last = "";
        for (const paint of paints) {
          const key = JSON.stringify(paint);
          if (key === last) {
            entries.at(-1)!.frames++;
            continue;
          }
          last = key;
          const file = join(renderDir, `${String(entries.length).padStart(6, "0")}.png`);
          await writeFile(file, await renderer.paint(paint));
          entries.push({ file, frames: 1 });
        }
        const file = `${slug}.mp4`;
        const duration = await encodeReel(entries, renderDir, join(draft, file));
        // The instrument reads the picture before any sound is laid under it.
        // Told the edit's own hard cuts: the tracker can read a cut between two framings of one
        // app as a long move, which would skew the moves, the stillness and the stepped share.
        const grammar = measureFile(join(draft, file), { cuts: facts.cuts.map((cut) => cut.at) });
        let sound: object | null = null;
        if (def.audio && (def.audio.track || def.audio.riser)) {
          const riserDef = def.audio.riser
            ? { length: 4, gain: 0, ...(def.audio.riser === true ? {} : def.audio.riser) }
            : null;
          let riser: { end: number; length: number; gain: number } | null = null;
          if (riserDef) {
            const clips = placed.filter((p) => p.part.kind !== "cold");
            const into = "into" in riserDef ? riserDef.into : undefined;
            const reveal =
              into !== undefined
                ? clips[into]?.at
                : clips.length > 1
                  ? clips.at(-1)!.at
                  : before / 60 < duration
                    ? before / 60
                    : duration;
            if (reveal === undefined)
              throw new Error(
                `The riser's \`into\` names clip ${into}, which the reel doesn't have.`,
              );
            riser = { end: reveal, length: Math.min(riserDef.length, reveal), gain: riserDef.gain };
          }
          if (def.audio.track && !existsSync(resolve(here, def.audio.track)))
            throw new Error(`The audio track ${def.audio.track} isn't there.`);
          await addSound(
            join(draft, file),
            duration,
            { ...def.audio, track: def.audio.track && resolve(here, def.audio.track) },
            riser,
            renderDir,
          );
          sound = {
            track: def.audio.track ?? null,
            riser: riser && { ends: r2(riser.end), length: r2(riser.length) },
          };
        }
        await review(join(draft, file), duration, stills, join(draft, "check"));

        // The gate, per take: the widest frame, and the deepest zoom the reel reaches.
        const checks: { scene: string; zoom: number; fidelity: Fidelity }[] = [];
        const seen = new Set<string>();
        let gates = 0;
        for (const { take, dir } of used) {
          if (seen.has(dir)) continue;
          seen.add(dir);
          const on = stage(take);
          const z = minZoom(on, frame);
          checks.push({
            scene: take.scene,
            zoom: 1,
            fidelity: await gate(
              browser,
              renderer,
              take,
              dir,
              { x: on.width / 2, y: on.height / 2, z },
              SCALE,
              renderDir,
              `gate-${++gates}-wide`,
              frame,
            ),
          });
        }
        const deep = parts
          .flatMap((part) => part.deep)
          .reduce<Built["deep"][number] | null>(
            (most, d) => (!most || d.cam.z > most.cam.z ? d : most),
            null,
          );
        if (deep && deep.cam.z > 1)
          checks.push({
            scene: deep.found.take.scene,
            zoom: r2(deep.cam.z),
            fidelity: await gate(
              browser,
              renderer,
              deep.found.take,
              deep.found.dir,
              deep.cam,
              SCALE,
              renderDir,
              "gate-deepest",
              deep.frame,
            ),
          });
        const problems = checks
          .map((check) => {
            const problem = fidelityProblem(check.fidelity);
            return problem ? `${check.scene} at zoom ${check.zoom}: ${problem}` : null;
          })
          .filter((problem): problem is string => Boolean(problem));
        const worst = (list: typeof checks) =>
          list.reduce<(typeof checks)[number] | null>(
            (low, check) => (!low || check.fidelity.psnr < low.fidelity.psnr ? check : low),
            null,
          );
        const wideWorst = worst(checks.filter((check) => check.zoom === 1));
        const deepCheck = checks.find((check) => check.zoom > 1) ?? null;
        const craft = critic(grammar, facts);
        await writeFile(
          join(draft, "manifest.json"),
          JSON.stringify(
            {
              reel: title,
              file: reelFile,
              project,
              theme,
              blurred: variant !== "",
              aspect,
              canvas: { width: out.width, height: out.height },
              fps: 60,
              density,
              maxZoom,
              duration: r2(duration),
              frames: paints.length,
              drawn: entries.length,
              camera,
              speed,
              pointer: def.pointer ?? null,
              cards: def.cards ?? null,
              coldOpen: cold ? r2(cold.count / 60) : null,
              matte: matteReport,
              audio: sound,
              clips: report,
              // The whole frame (the lowest of the takes) and the deepest zoom, each decoded as a
              // viewer's browser would and held against a lossless screenshot resampled the same way.
              fidelity: {
                wide: wideWorst?.fidelity ?? null,
                deepest: deepCheck
                  ? { zoom: deepCheck.zoom, scene: deepCheck.scene, ...deepCheck.fidelity }
                  : null,
              },
              passed: !problems.length,
              // The reel's craft against measured launch films: warnings, not failures.
              craft,
              cuts: facts.cuts,
              stills,
            },
            null,
            2,
          ),
        );
        try {
          await rm(outDir, { recursive: true, force: true });
          await rename(draft, outDir);
          published = true;
        } catch (error) {
          published = true;
          throw new Error(
            `Couldn't replace ${outDir} (is its video open in a player?). The new reel is in ${draft}. ${String(error)}`,
          );
        }
        if (problems.length) throw new Error(`The reel drifts from the app. ${problems.join(" ")}`);
        console.log(
          `\n  ${title}${suffix ? ` (${aspect})` : ""}: ${join(outDir, file)} (${duration.toFixed(1)} s, ${entries.length} frames drawn, PSNR wide ${wideWorst?.fidelity.psnr} dB${deepCheck ? `, at ×${deepCheck.zoom} ${deepCheck.fidelity.psnr} dB` : ""})\n${describeCraft(
            craft,
          )
            .split("\n")
            .map((line) => `  ${line}`)
            .join("\n")}\n`,
        );
        for (const warning of craft.warnings) console.warn(`  ! ${warning}`);
      } finally {
        if (!published) await rm(draft, { recursive: true, force: true });
        if (!process.env.CUTSCENE_KEEP) await rm(renderDir, { recursive: true, force: true });
      }
    }
  });
}
