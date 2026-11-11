import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { homedir, tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { test } from "@playwright/test";
import { fidelityProblem, review, type Fidelity } from "../check";
import { CAMERA, planCamera, type Cam, type CameraSettings, type Shot } from "./camera";
import { CARD, cardLine } from "./cards";
import { gate } from "./gate";
import { planSpeed, SPEED, type SpeedSettings } from "./ramp";
import { cardLayout, encodeReel, output, Renderer, shot, type Paint } from "./render";
import { paceFor, type ReelJob, type Take } from "./take";

export { CAMERA, type Cam, type CameraSettings, type Move, type Shot } from "./camera";
export { SPEED, type Ramp, type SpeedSettings } from "./ramp";
export type { ReelJob, Take, TakeEvent } from "./take";

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

export type ReelDef = {
  clips: Clip[];
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
};

/** The reel's pixels per canvas CSS px: a 1920 × 1080 canvas makes a 3840 × 2160 video. */
const SCALE = 2;

const slugOf = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * `reel(title, def)`: a showreel cut from scenes, run with `cutscene reel <file>`. It records its
 * own takes of the scenes at a higher density (through the same config, so nothing about a scene's
 * own video changes), then renders a second pass: a camera that pushes in on where the work
 * happens, typing and waits sped through, hard cuts between clips, a card at each end. Like a
 * scene, it fails when the result drifts from the app.
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
    const outDir = join(OUT, `${slug}-reel-${theme}${variant}`);
    const draft = `${outDir}.partial`;
    // Takes are kept between runs, so a re-cut (`--reuse`) doesn't record again.
    const work = join(tmpdir(), "cutscene", "reels", `${slug}-${project}-${theme}${variant}`);
    const takesDir = join(work, "takes");
    // The reel file: `info.file` is this module, where the test is declared.
    const reelFile = process.env.CUTSCENE_REEL_FILE ?? info.file;
    const here = dirname(reelFile);
    const scenes = [...new Set(def.clips.map((clip) => resolve(here, clip.scene)))];
    for (const scene of scenes)
      if (!existsSync(scene)) throw new Error(`The reel's clip names ${scene}, which isn't there.`);

    // ── Takes ────────────────────────────────────────────────────────────────────────────────
    const find = () => {
      const takes = new Map<string, { take: Take; dir: string }>();
      if (existsSync(takesDir))
        for (const name of readdirSync(takesDir)) {
          const file = join(takesDir, name, "take.json");
          if (!existsSync(file)) continue;
          const take = JSON.parse(readFileSync(file, "utf8")) as Take;
          if (take.project === project && take.density === density)
            takes.set(resolve(take.file).toLowerCase(), { take, dir: join(takesDir, name) });
        }
      return takes;
    };
    const reuse = process.env.CUTSCENE_REEL_REUSE === "1";
    if (!reuse || scenes.some((scene) => !find().has(scene.toLowerCase()))) {
      await rm(takesDir, { recursive: true, force: true });
      await mkdir(takesDir, { recursive: true });
      const job: ReelJob = { takes: takesDir, density, scale: SCALE, cards: def.cards };
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
      const filters = scenes.map((scene) => basename(scene).replace(/[.*+?^${}()|[\]]/g, "\$&"));
      const run = spawnSync(
        process.execPath,
        [cli, "test", "-c", config, `--project=${project}`, ...filters],
        { stdio: "inherit", env },
      );
      if (run.status !== 0) throw new Error("The reel's takes didn't record: see the run above.");
    }
    const takes = find();
    const clips = def.clips.map((clip) => {
      const found = takes.get(resolve(here, clip.scene).toLowerCase());
      if (!found) throw new Error(`No take of ${clip.scene} for the ${project} format.`);
      return { clip, ...found };
    });
    const firstTake = clips[0]!;
    const lastTake = clips.at(-1)!;
    const out = output(firstTake.take, SCALE);
    for (const { take } of clips) {
      const size = output(take, SCALE);
      if (size.width !== out.width || size.height !== out.height)
        throw new Error("A reel's clips must share one format.");
      if (take.motionFps < 60)
        console.warn(
          `  ${take.scene}: the take's motion is ${take.motionFps} fps, under 60. Raise the reel's pace.`,
        );
    }
    const maxZoom = density / SCALE;

    // ── The edit ─────────────────────────────────────────────────────────────────────────────
    const frames: { key: string; paint: Paint }[] = [];
    const push = (paint: Paint) => frames.push({ key: JSON.stringify(paint), paint });
    const stills: { label: string; at: number }[] = [];
    const now = () => frames.length / 60;
    const blank = (sample: string): Paint => ({
      width: out.width,
      height: out.height,
      layers: [],
      card: { sample, fill: 1, lines: [] },
    });
    const card = (
      side: "open" | "close",
      under: Paint | null,
      held: { take: Take; dir: string },
    ) => {
      const lines = held.take.cards?.[side] ?? [];
      if (!lines.length) return;
      const placed = cardLayout(held.dir, lines, out);
      const sample = placed[0]!.url;
      const length = CARD[side];
      const dissolve = (k: number) =>
        push({ ...(under ?? blank(sample)), card: { sample, fill: k, lines: [] } });
      // A short dissolve is allowed only into and out of a card.
      if (side === "close" && under)
        for (let i = 1; i <= CARD.dissolve; i++) dissolve(i / (CARD.dissolve + 1));
      stills.push({ label: `card-${side}`, at: now() + length * 0.6 });
      for (let n = 0; n < Math.round(length * 60); n++)
        push({
          ...blank(sample),
          card: {
            sample,
            fill: 1,
            lines: placed.map((line, i) => {
              const { alpha, rise, blur } = cardLine(i, n / 60, length, SCALE);
              return { url: line.url, x: line.x, y: line.y + rise, alpha, blur };
            }),
          },
        });
      if (side === "open" && under)
        for (let i = CARD.dissolve; i >= 1; i--) dissolve(i / (CARD.dissolve + 1));
    };

    const report: object[] = [];
    let deepest: { cam: Cam; take: Take; dir: string } | null = null;
    const planned = clips.map(({ clip, take, dir }) => {
      const mark = (label: string | undefined, what: string) => {
        if (label === undefined) return null;
        const found = take.marks.find((m) => m.label === label);
        if (!found)
          throw new Error(`${clip.scene} has no mark "${label}" (the clip's \`${what}\`).`);
        return found.at;
      };
      const a = mark(clip.from, "from") ?? 0;
      const to = mark(clip.to, "to");
      const b = to === null ? take.duration : Math.min(take.duration, to + (clip.tail ?? 1.2));
      if (b - a < 0.2)
        throw new Error(
          `The clip of ${clip.scene} is empty: "${clip.to}" isn't after "${clip.from}".`,
        );
      const range = { a, b };
      const hold = clip.hold ?? 0;
      const cam = planCamera(
        take,
        { a, b: b + hold },
        { settings: camera, maxZoom, open: clip.open, auto: clip.auto, shots: clip.shots },
      );
      const pacing = planSpeed(take, range, speed);
      const frameAt = (n: number) => {
        // Past the clip's end the last frame holds while the camera's clock runs on.
        const tau = n / 60;
        const t = tau <= pacing.duration ? pacing.toTake(tau) : b + (tau - pacing.duration);
        const entry = take.entries.findLast((e) => e.at <= t + 1e-6) ?? take.entries[0]!;
        return shot(take, dir, entry.file, cam.at(t), SCALE);
      };
      for (const where of [cam.start, ...cam.moves.map((move) => move.to)])
        if (!deepest || where.z > deepest.cam.z) deepest = { cam: where, take, dir };
      /** Where a moment of the take (or of the hold after it) lands in the clip. */
      const inClip = (t: number) => (t <= b ? pacing.fromTake(t) : pacing.duration + (t - b));
      return {
        clip,
        take,
        dir,
        range,
        cam,
        pacing,
        frameAt,
        inClip,
        count: Math.round((pacing.duration + hold) * 60),
      };
    });

    card("open", planned[0]!.frameAt(0), firstTake);
    for (const part of planned) {
      const at = now();
      stills.push({ label: `clip-${slugOf(part.take.scene)}`, at: at + 0.05 });
      for (const move of part.cam.moves)
        stills.push({ label: `shot-${slugOf(move.why)}`, at: at + part.inClip(move.t1) + 0.1 });
      for (let n = 0; n < part.count; n++) push(part.frameAt(n));
      report.push({
        scene: part.take.scene,
        from: part.clip.from ?? null,
        to: part.clip.to ?? null,
        at: Number(at.toFixed(2)),
        duration: Number((part.count / 60).toFixed(2)),
        take: {
          from: Number(part.range.a.toFixed(2)),
          to: Number(part.range.b.toFixed(2)),
          motionFps: part.take.motionFps,
          pace: part.take.pace,
        },
        opens: part.cam.start,
        shots: part.cam.moves.map((move) => ({
          at: Number((at + part.inClip(move.t0)).toFixed(2)),
          // In the reel's seconds: a move that runs through a ramp is shorter than in the take.
          over: Number((part.inClip(move.t1) - part.inClip(move.t0)).toFixed(2)),
          why: move.why,
          zoom: Number(move.to.z.toFixed(2)),
          x: Number(move.to.x.toFixed(1)),
          y: Number(move.to.y.toFixed(1)),
        })),
        ramps: part.pacing.ramps.map((ramp) => ({
          at: Number((at + part.pacing.fromTake(ramp.t0)).toFixed(2)),
          over: Number((part.pacing.fromTake(ramp.t1) - part.pacing.fromTake(ramp.t0)).toFixed(2)),
          speed: ramp.speed,
          why: ramp.why,
        })),
      });
    }
    const end = planned.at(-1)!;
    card("close", end.frameAt(end.count - 1), lastTake);

    // ── Render, encode, check ────────────────────────────────────────────────────────────────
    const renderDir = join(work, "render");
    await rm(renderDir, { recursive: true, force: true });
    await mkdir(renderDir, { recursive: true });
    await rm(draft, { recursive: true, force: true });
    await mkdir(draft, { recursive: true });
    const renderer = new Renderer(browser);
    await renderer.open();
    let published = false;
    try {
      const entries: { file: string; frames: number }[] = [];
      let last = "";
      for (const frame of frames) {
        if (frame.key === last) {
          entries.at(-1)!.frames++;
          continue;
        }
        last = frame.key;
        const file = join(renderDir, `${String(entries.length).padStart(6, "0")}.png`);
        await writeFile(file, await renderer.paint(frame.paint));
        entries.push({ file, frames: 1 });
      }
      const file = `${slug}.mp4`;
      const duration = await encodeReel(entries, renderDir, join(draft, file));
      await review(join(draft, file), duration, stills, join(draft, "check"));

      // The gate, per take: the whole frame, and the deepest zoom the reel reaches.
      const wideCam = (take: Take): Cam => {
        const on = {
          w: take.layout.canvas.width / take.density,
          h: take.layout.canvas.height / take.density,
        };
        return { x: on.w / 2, y: on.h / 2, z: 1 };
      };
      const checks: { scene: string; zoom: number; fidelity: Fidelity }[] = [];
      const seen = new Set<string>();
      for (const { take, dir } of clips) {
        if (seen.has(dir)) continue;
        seen.add(dir);
        const name = `gate-${seen.size}`;
        checks.push({
          scene: take.scene,
          zoom: 1,
          fidelity: await gate(
            browser,
            renderer,
            take,
            dir,
            wideCam(take),
            SCALE,
            renderDir,
            `${name}-wide`,
          ),
        });
      }
      const deep = deepest as { cam: Cam; take: Take; dir: string } | null;
      if (deep && deep.cam.z > 1)
        checks.push({
          scene: deep.take.scene,
          zoom: Number(deep.cam.z.toFixed(2)),
          fidelity: await gate(
            browser,
            renderer,
            deep.take,
            deep.dir,
            deep.cam,
            SCALE,
            renderDir,
            "gate-deepest",
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
      await writeFile(
        join(draft, "manifest.json"),
        JSON.stringify(
          {
            reel: title,
            file: reelFile,
            project,
            theme,
            blurred: variant !== "",
            canvas: { width: out.width, height: out.height },
            fps: 60,
            density,
            maxZoom,
            duration: Number(duration.toFixed(2)),
            frames: frames.length,
            drawn: entries.length,
            camera,
            speed,
            cards: def.cards ?? null,
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
        `\n  ${title}: ${join(outDir, file)} (${duration.toFixed(1)} s, ${entries.length} frames drawn, PSNR wide ${wideWorst?.fidelity.psnr} dB${deepCheck ? `, at ×${deepCheck.zoom} ${deepCheck.fidelity.psnr} dB` : ""})\n`,
      );
    } finally {
      await renderer.close();
      if (!published) await rm(draft, { recursive: true, force: true });
      if (!process.env.CUTSCENE_KEEP) await rm(renderDir, { recursive: true, force: true });
    }
  });
}
