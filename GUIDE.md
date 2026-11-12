# cutscene guide

Record real web app flows as pixel-exact product videos, scripted like Playwright tests.

You write a scene (`click`, `type`, `caption`, `wait`) against your running app. cutscene drives
a Chromium browser through it with a hand-like cursor, records every paint, cuts loads and idle time, puts the
app in a window or phone frame, and encodes a 4K, 60 fps MP4. Then it **proves the video is your
app**: it decodes the last frame the way a viewer's browser does and fails the scene if it drifts
from a lossless screenshot.

```ts
scene("Add a task", async ({ act }) => {
  await act.visit("/");
  await act.caption("Add a task");
  await act.type(act.main.getByRole("textbox", { name: "New task" }), "Ship the demo video");
  await act.click(act.main.getByRole("button", { name: "Add task" }));
  act.mark("added");
  await act.wait(900);
});
```

```sh
npx @pavlonekrasov/cutscene init     # set a project up
npx @pavlonekrasov/cutscene skill    # teach your agent to use it
```

It started as the recorder for a case study of an admin panel, and borrows from two tools:
[showtime](https://github.com/mishanaer/showtime) (an agent records the real app, trims it, frames
it, checks it; it needs a Mac and the iOS Simulator) and
[stageshow](https://github.com/benjitaylor/skills/tree/main/stageshow) (a short script of beats;
it draws mock UI). cutscene records the real web app, in any Chromium browser, on any OS.

## What you get

| In `<out>/<scene>-<project>-<theme>/` | What                                                                                                           |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `<scene>.mp4`                         | H.264, 60 fps, BT.709, faststart. Desktop 3840×2160 (the 1440×810 app at 2×), phone 1080×1920 (390×844 at 2×). |
| `stills/*.png`                        | Lossless shots from `act.shot()`, without the cursor.                                                          |
| `check/`                              | A frame at every `act.mark()` and `contact.jpg`, a 4×4 sheet of the whole video.                               |
| `manifest.json`                       | Duration, marks, `motionFps` (60 or more is every frame of the video), the fidelity numbers, `passed`.         |

A scene builds in `<folder>.partial` and replaces the last video only once the new one is encoded. A
scene that fails or stops halfway leaves the last video as it was.

## Install

In your app's root:

```sh
npx @pavlonekrasov/cutscene init
```

That installs `@pavlonekrasov/cutscene` and `@playwright/test` (if the project doesn't have it),
downloads Playwright's Chromium, and writes a starting point next to your code:

```
your-app/
  demo/
    app.ts                     ← the adapter: what cutscene needs to know about your app
    cutscene.config.ts         ← where the app runs, which browser
    scenes/first-look.scene.ts ← a first scene; replace it with real flows
```

plus a `"demo": "playwright test -c demo/cutscene.config.ts"` script. Existing files are never
overwritten. `npx @pavlonekrasov/cutscene doctor` checks the machine.

**What comes with it:** Node 20+ is the one thing you bring. `@playwright/test` is a peer
dependency, installed with cutscene when the project doesn't have it. ffmpeg comes from
[`ffmpeg-static`](https://www.npmjs.com/package/ffmpeg-static) (a GPL build, downloaded at
install) unless one is on `PATH` or in `CUTSCENE_FFMPEG`.

**Browser:** any Chromium. Playwright's own Chromium is the default; set `browser` in the config to
an installed channel (`"chrome"`, `"msedge"`, `"chrome-beta"`) or to the path of any
Chromium-based executable (Brave, Vivaldi, Arc). `CUTSCENE_BROWSER` overrides it for a run.
Firefox and Safari can't record: cutscene uses Chromium's DevTools protocol.

## Agent skill

cutscene ships a skill: the runbook an agent follows to adopt it, write scenes, verify each video
and fix a failed run.

```sh
npx @pavlonekrasov/cutscene skill            # Claude Code, for every project (~/.claude/skills)
npx @pavlonekrasov/cutscene skill --project  # this project only (.claude/skills)
npx @pavlonekrasov/cutscene skill --dir <another agent's skills folder>/cutscene
```

Then ask your agent for "a product video of the invite flow".

## Set it up by hand

**The adapter** (`demo/app.ts`) creates the `scene` your scenes import:

```ts
import { createScene, DEFAULT_FRAME, expect, NEXT_DEV_TOOLS } from "@pavlonekrasov/cutscene";

export const scene = createScene({
  outDir: "/path/outside/the/repo", // or CUTSCENE_OUT; default ~/Videos/cutscene
  // Before the first load: cookies, auth, locale, a recording mode.
  setup: async (context, { baseURL }) => {
    await context.addCookies([{ name: "locale", value: "en", url: baseURL }]);
  },
  // Settled after a load: hydrated, data in.
  ready: async (page) => {
    await page.waitForFunction(() => document.documentElement.dataset.hydrated === "true");
  },
  hide: NEXT_DEV_TOOLS, // dev-only badges never reach the video
  blur: ["[data-slot=logo]"], // blurred in the CUTSCENE_BLUR=1 version only
  frame: { ...DEFAULT_FRAME, windowRadius: 20 }, // see "The frame"
  // Your own verbs on `act`.
  extend: (act) => ({
    signInAs: (user: string) =>
      act.offstage(async () => {
        /* … */
        await act.ready();
      }),
  }),
});
export { expect };
```

**The config** (`demo/cutscene.config.ts`):

```ts
import { cutsceneConfig } from "@pavlonekrasov/cutscene";

export default cutsceneConfig({
  baseURL: "http://localhost:3000",
  webServer: { command: "npm run dev", url: "http://localhost:3000", reuseExistingServer: true },
  use: { locale: "en-US", timezoneId: "Europe/London" },
  browser: "chrome", // optional: any Chromium channel or executable path
});
```

**Without npm:** copy this repo's `src/` into your project (say `demo/cutscene/`) and import from
there; Playwright runs the TypeScript directly. Note the commit you copied, and copy again to
update rather than editing the copy.

## Scenes

A scene is a Playwright test, so targets are locators and checks are `expect`, as in an e2e spec.

| `act.`                                         | Camera | Does                                                                                              |
| ---------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------- |
| `visit(path)`                                  | off    | Loads a page and waits for `ready`. The video starts on the settled page.                         |
| `offstage(work)`                               | off    | Work the viewer shouldn't see: seeding, switching user. Follow a navigation in it with `ready()`. |
| `ready()`                                      | off    | The adapter's `ready`, fonts, the paced clock; for your own off-camera verbs.                     |
| `move / hover / click / type / press / scroll` | on     | A hand-like pointer: eased, slightly arced, timed by distance, a press ripple. Phone uses taps.   |
| `wait(ms)`                                     | on     | A held beat at full length.                                                                       |
| `caption(text \| null)`                        | on     | A pill at the bottom of the frame: who acts, what happens.                                        |
| `mark(label)`                                  | —      | A named beat; `check/` gets a still there.                                                        |
| `shot(name, locator?)`                         | cut    | A lossless PNG without the overlay.                                                               |
| `page`, `main`, `format`                       | —      | The Playwright page, the main region (the adapter's `main`), the format.                          |

`move(target, { at: { x, y } })` rests the pointer at a point of the target's box (CSS px from its
top-left, outside it too) instead of near its start: beside a result rather than on its text.
`hover` and `click` take the same `at` (inside the target, for a click): a row clicked in its empty
space, so the hover before it doesn't cover the row's words.

Durations are the video's. Off-camera time is cut; any other still stretch is shortened to
`idleCap` (1.2 s) so a slow fetch never looks frozen; `wait` is kept in full.

| Switch                   | Does                                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `CUTSCENE_THEME=dark`    | Records the dark theme (`prefers-color-scheme`); the frame follows.                      |
| `CUTSCENE_PACE=<n>`      | Records `n` times slower than life (default 2) and plays at 1×. 1 turns slow motion off. |
| `CUTSCENE_BROWSER=<b>`   | Another Chromium: a channel (`chrome`, `msedge`) or an executable path.                  |
| `CUTSCENE_FFMPEG=<path>` | A specific ffmpeg.                                                                       |
| `CUTSCENE_FRAME=none`    | No frame: the app's own pixels, edge to edge.                                            |
| `CUTSCENE_BLUR=1`        | The blurred version: the adapter's `blur` selectors blurred throughout, in `…-blurred/`. |
| `CUTSCENE_CAPTURE=jpeg`  | Lossy capture, if PNG frames are too slow on a machine; the check shows the cost.        |
| `CUTSCENE_OUT=<dir>`     | Where videos go.                                                                         |
| `CUTSCENE_URL=<url>`     | Another server.                                                                          |
| `CUTSCENE_KEEP=1`        | Keeps the raw frames in the temp folder.                                                 |

## Fidelity

After the last beat cutscene takes a lossless `page.screenshot()`. Once the MP4 is encoded it
decodes the last frame **in the browser** (a `<video>` drawn to a canvas, as a viewer's browser
would; with ffmpeg and the video's BT.709 matrix when that Chromium build has no H.264 or can't play
the file) and
compares every app pixel
the frame leaves visible with that screenshot. A scene fails below 38 dB PSNR, above ±1.5 mean
shift in any channel, or with more than 0.5% of pixels off in brightness (BT.709 luma) by more
than 16, and saves the screenshot as `check/reference.png`. That last test is brightness only: 4:2:0
keeps colour at half resolution, and a browser's decode smears it across saturated edges (a bright
chart bar on a dark track) in any faithful take; a colour drift still shows in the shift and PSNR. A video neither the browser nor ffmpeg can decode fails the
scene too. Typical runs land at 44–55 dB.

## How it works

- **Native pixels.** Chromium's screencast streams at the screen's density, not the emulated one, so
  each project launches the browser with `--force-device-scale-factor` equal to its `deviceScaleFactor`.
  Frames are lossless PNGs at 2×, placed on the canvas 1:1. A frame of the wrong size fails the
  scene.
- **Grayscale text.** The browser runs with `--disable-lcd-text`: Windows turns ClearType colour
  fringes on and off per paint, and they don't survive 4:2:0 or scaling anyway.
- **Slow motion for smoothness.** Chromium streams 2× frames at about 30 per second. `pace.ts` slows
  the page's JS clock (timers, rAF, `performance.now`; `Date.now` stays real), CDP slows CSS
  animations (`Animation.setPlaybackRate`), and every beat stretches by the same factor. The
  editor speeds it back up: motion lands at 60 fps.
- **Colour.** App and frame are composited in RGB and converted to YUV once, BT.709 limited range,
  tagged BT.709 / sRGB / tv: the combination browsers decode back to what was painted.
- **The overlay** (cursor, ripples, taps, caption, paced scrolls) is drawn inside the page, so it
  lands in the same frames as the UI.

| File         | Role                                                                         |
| ------------ | ---------------------------------------------------------------------------- |
| `scene.ts`   | `createScene`: the fixture that records, edits, frames, encodes and checks.  |
| `act.ts`     | The `act` API.                                                               |
| `config.ts`  | `cutsceneConfig`: Playwright projects per format, the browser and its flags. |
| `capture.ts` | The CDP screencast recorder.                                                 |
| `edit.ts`    | The timeline (cuts, holds, idle cap, pace) and the ffmpeg encode.            |
| `frame.ts`   | The window and phone frame, and where the app sits on the canvas.            |
| `check.ts`   | Mark stills, the contact sheet and the fidelity check.                       |
| `overlay.ts` | Cursor, ripples, taps, caption and paced scrolls, inside the page.           |
| `pace.ts`    | The slowed page clock.                                                       |
| `formats.ts` | Viewports, densities and canvases.                                           |

## The frame

`frame.ts` draws the window or phone as an HTML page at the app's density and screenshots it with a
transparent hole where the app plays. Defaults are neutral; tune them to your app:

- `bar.background` = your app's outer canvas colour, so window and app read as one surface.
  `backdrop` a step below it in light, darker than it in dark.
- `windowRadius` concentric with your app: content in a panel with a 12px corner, 8px from the
  edge, wants 20. Full-bleed apps look right at 12.
- Shadows and rings are pure black or white (`oklch(0 0 0 / a)`), never tinted. Light gets a
  layered shadow (ring, contact, mid, ambient); dark separates with a white ring, because a wide
  blur over a dark backdrop bands in 8 bits.

## Reels

A reel is a second pass over your scenes: a 60 fps showreel with a camera that pushes in on where
the work happens, typing and waits sped through, hard cuts between clips and a card at each end.
It's opt-in. Scenes record exactly as above; a reel records **its own takes** of them, denser, and
never touches a scene's video.

```ts
// demo/reels/tour.reel.ts
import { reel } from "@pavlonekrasov/cutscene/reel";

reel("Tour", {
  cards: {
    open: ["Acme", "Invoices that send themselves"],
    close: ["Acme", "A concept by Sam Lee"],
  },
  clips: [
    { scene: "../scenes/invite.scene.ts", to: "sent" }, // from the start to 1.2 s after the mark
    { scene: "../scenes/report.scene.ts", from: "open", open: "wide" },
  ],
});
```

```sh
npx cutscene reel demo/reels/tour.reel.ts            # record the takes, then render
npx cutscene reel demo/reels/tour.reel.ts --reuse    # cut again from the last takes
CUTSCENE_THEME=dark npx cutscene reel demo/reels/tour.reel.ts
```

The reel lands in `<out>/<reel>-reel-<theme>/`: `<reel>.mp4`, `check/` (a still at each clip, shot
and card, and `contact.jpg`) and `manifest.json` (every clip, shot and ramp with its time, the
fidelity numbers, `passed`, every hard cut with how far the eye jumps across it, and `craft`, the
critic's scores below). `--config <path>` names the cutscene config when it isn't above the
reel file; `--project <name>` shoots another format. `CUTSCENE_THEME`, `CUTSCENE_BLUR`,
`CUTSCENE_OUT` and `CUTSCENE_BROWSER` work as for scenes.

| `reel(title, { … })`        | Does                                                                                                                                                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clips`                     | In order: `scene` (file, relative to the reel), `from` / `to` (marks), `tail` (seconds held after `to`, 1.2), `hold` (extra seconds on the last frame), `open` (`"working"` or `"wide"`), `shots`, `auto: false`. |
| `cards`                     | `open` and `close`: lines of text; the first is the name. Set in the app's own typeface on the frame's backdrop.                                                                                                  |
| `density`                   | The takes' density. The deepest sharp zoom is `density / 2`: 3 (default) for 1.5, 4 for 2.                                                                                                                        |
| `camera`, `speed`           | The defaults below, overridden.                                                                                                                                                                                   |
| `project`, `pace`, `outDir` | The format (default `desktop`), the takes' slow motion, where the reel goes.                                                                                                                                      |
| `cross`, `split`            | In place of a clip: two sessions of one flow cut together (below).                                                                                                                                                |
| `coldOpen`                  | `true` or `{ length }`: open on the result (1.2 s), then cut to the start. Opt-in.                                                                                                                                |
| `matte`                     | `true` or `{ aspect, over }`: letterboxed at 2.39:1 until the first action, then open over 700 ms. Opt-in.                                                                                                        |
| `audio`                     | `{ track, gain }`, `{ riser }`: sound under the finished picture. Silent by default.                                                                                                                              |
| `pointer`                   | `"human"` or `{ a, b }`: the takes' pointer reaches like a hand (Fitts's law, minimum jerk). Opt-in; scenes keep their own.                                                                                       |
| `deliver`                   | Aspects to deliver, each its own reel: `"native"` (default), `"16:9"`, `"1:1"`, `"4:5"`, `"9:16"`.                                                                                                                |

**The camera** is planned from what the scene did. A clip opens on its first action at the working
zoom (1.5). For each click, hover or typed field outside the middle 60% of the shot it glides just
far enough to bring the action in, starting 300 ms before the pointer sets off and still when the
press lands. It never moves while the page scrolls, and never overshoots
(`cubic-bezier(0.65, 0, 0.35, 1)`; push-in 750 ms, pull-back 1 s, pans 700 ms–1 s, the median pace
of 50 measured launch films). A reframe beyond ×1.8, or across more than half the shot, is a cut.
Between clips it's always a hard cut.

**Eye trace.** At every hard cut, into a clip or inside one, the incoming shot is framed so its
subject (where the next action lands, or the region a `focus` frames) sits where the viewer's eye
already is: the pointer, the caret, the last thing acted on. It stays inside the middle of the shot
and keeps a target that fits the shot whole, so the camera doesn't move straight off it. Measured
launch films keep the eye within 10% of the width at 101 of 139 cuts (rule 27). `camera:
{ eyeTrace: false }` frames every shot on its own subject instead.

**Spring follow.** `camera: { follow: "spring" }` moves the camera on a critically damped spring
instead of the in-out curve: it starts fast, reaches 98% of the way in the same push, pull and pan
times, and never passes its target. That's the Screen Studio shape; the hand-edited X films push
and pull on in-out curves, so it stays opt-in.

Where the automatic camera isn't what you want, say so in the scene. Both do nothing when a scene
records on its own:

| `act.`                  | In a reel                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| `focus(locator, zoom?)` | Frames that element, at `zoom` if given (the working zoom otherwise), until an action outside it. |
| `wide()`                | Pulls back to the whole window, until the next action.                                            |

Or set a shot in the reel file: `shots: [{ at: "sent", zoom: 2, x: 0.3, y: 0.4, over: 600 }]`
(`at` is a mark or seconds into the clip; `x`, `y` are the centre as a share of the canvas).

**Speed.** Typing plays at 2× and waits on the app at 3.5×, easing in and out over 200 ms. The
pointer's approach, the click and every `act.wait` stay at 1×.

**Sharpness.** A zoom must not soften the app, so takes are recorded denser than the reel shows
them (3× for a 1.5 zoom, 4× for 2) and the camera only ever picks from real pixels; a zoom past
`density / 2` is capped. Denser frames paint slower, so takes also record slower (pace 4 at 3×, 6
at 4×) and still land at 60 fps. Frames are drawn in a Chromium canvas at fractional positions, so
a slow push moves between whole pixels instead of stepping across them.

**Fidelity.** For each take, its last frame goes the way every frame of the reel goes (the camera,
the encode, a browser's decode) at the whole frame and at the reel's deepest zoom, and is compared
with a lossless screenshot resampled the same way. The same limits as a scene: 38 dB PSNR.

### Two sessions: `cross` and `split`

When one person's action changes another's screen (a suggestion sent, an approval landing), record
each side as its own scene, give both the same marks at the moments the action reaches the other
side, and cut them together:

```ts
clips: [
  {
    cross: [{ scene: "../scenes/suggest.scene.ts" }, { scene: "../scenes/approve.scene.ts" }],
    at: ["sent", "approved"],
  },
  {
    split: [
      { scene: "../scenes/suggest.scene.ts", from: "sent" },
      { scene: "../scenes/approve.scene.ts", from: "sent" },
    ],
    at: ["approved"],
  },
];
```

**`cross`** alternates full-frame shots, cause then effect, cutting 0.2 s after each shared mark.
Each pair after the first is `shrink` (0.7) as long as the one before, down to 1.2 s, trimmed from
its start so every shot still ends on its action; then the second session holds on the result
(`hold`, 2 s). Each cut is framed by eye trace.

**`split`** puts both sessions side by side on the backdrop (stacked in a square or a portrait
frame), synced on the marks: one pane plays while the other holds its last frame. Each pane frames
its own working region at `zoom` (1.25), with its own camera, not the whole window.

### The opt-ins

- **Cold open** (`coldOpen: true`): the reel's last 1.2 s first, then the opening card: here's where
  we end up, here's how. None of the 50 measured films does it, so it's opt-in.
- **Matte** (`matte: true`): the cards and the establishing shot letterboxed at 2.39:1, opening to
  the full frame over 700 ms (in-out) as the pointer sets off for the first action. The bars are the
  backdrop's colour. Landscape deliveries only.
- **Human pointer** (`pointer: "human"`): a reel's takes reach for each target the way a hand does.
  Fitts's law sets the time from the distance and the target's width along the approach, with
  MacKenzie, Sellen and Buxton's (1991) mouse constants (−107 ms + 223 ms per bit), or a fit of your
  own hand as `{ a, b }` in seconds. The speed rises and falls on a minimum-jerk profile (Flash and
  Hogan, 1985), and a long reach to a small target lands about 7% short and corrects. Scenes keep
  their own pointer.
- **Sound** (`audio`): `track` is a file you hold the rights to, played from the first frame,
  trimmed to the reel and faded over its last 1.5 s. Cuts aren't moved onto its beat: across 37
  measured films with music, cuts land on beats no more often than chance (rule 13). `riser: true`
  adds a generated Shepard–Risset rising tone (4 s) that stops exactly on the cut into the last
  clip (`into` picks another). Sound goes in after the picture is encoded, with the video stream
  copied, so nothing about the picture or its checks changes.
- **Delivery formats** (`deliver: ["native", "1:1", "4:5"]`): the same edit in each aspect, the
  camera re-planned for that frame from the same takes; each lands in `…-reel-<theme>-1x1/` and so
  on, and costs a full render. A frame taller than wide of a desktop app shows working shots only:
  the whole window isn't legible at that width. Cards shrink to fit.

### The critic

Every reel's `manifest.json` has a `craft` section: each property the instrument reads from the
finished picture (push, pull and pan times, overshoot, the share of time the camera is still,
stepped frames, median shot, length) and each the plan knows (eye travel at every hard cut, the
hold after every push, typing speed on screen, dissolves against the shots they join, the end
card, each take's motion fps), with the range measured launch films use and whether it's inside.
Out of range is a warning, printed after the run; which warnings become failures is the owner's
call. A reel tells the instrument where its own hard cuts are: a cut between two framings of one
app can otherwise fit as one long move and skew the move, stillness and stepped numbers.
`npx cutscene measure <file> --craft` scores any video from its picture alone.

### Measuring a video

`cutscene measure` reads what a video's camera and cuts do: the instrument cutscene's reels and the
references they learn from are both measured with, so their numbers compare directly.

```sh
npx cutscene measure demo/out/tour-reel-light/tour.mp4           # a few lines to read
npx cutscene measure tour.mp4 --json --out tour.grammar.json     # the numbers
npx cutscene measure tour.mp4 --craft                            # scored against the references
npx cutscene measure --page                                      # the in-page version
```

It reports the shots and their lengths, each cut (hard or dissolve), and each camera move: push,
pull or pan, its zoom ratio and travel, how long it takes from 2% to 98% of the way and from 10% to
90%, where it's fastest, and how far it overshoots. It also gives the share of time the camera is
still, the share of frames inside moves that repeat the one before (stepped motion), and the
rhythm of the cutting. A zoom is measured by ratio, as the reel's camera moves.

`--page` prints a script for a browser page: paste it with an agent's page tool, then
`await __cutsceneMeasure("video")` plays the page's video muted at half speed, tracks every frame
it shows and returns the same numbers. Nothing is downloaded. A video served cross-origin without
CORS can't be read this way; the call says so.

Read the numbers as an instrument, not the truth. A strongly eased move spends a long time at its
ends: from 2% to 98% of the way is about 70% of its nominal length (a 500 ms push reads 360 ms).
At the slow ends of a long move, a reading 1% off in distance is several frames off in time, so
compare the 10–90% figure when the ends matter. An in-app page change can read as a cut, and a
cut between two framings of the same app can read as a long move; check the frames.

| File (`src/reel/`) | Role                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| `index.ts`         | `reel`: records the takes, edits, renders, encodes and checks.           |
| `take.ts`          | What a take saves, and the hooks a scene run reads (off without a reel). |
| `camera.ts`        | Shots from clicks, typing and hints.                                     |
| `ramp.ts`          | The speed map.                                                           |
| `cards.ts`         | Card text, drawn in the app's page; how a card plays.                    |
| `render.ts`        | The canvas compositor and the encode.                                    |
| `gate.ts`          | The fidelity gate under the camera.                                      |
| `measure.ts`       | The instrument: a video's shots, cuts and camera moves.                  |
| `craft.ts`         | The critic: the ranges measured launch films use, and a reel's scores.   |
| `audio.ts`         | The riser, and sound laid under a finished reel.                         |

## For agents

The [skill](skills/cutscene/SKILL.md) is the runbook for using cutscene in a project.
[AGENTS.md](AGENTS.md) is for working on cutscene itself.

## License

[MIT](LICENSE)
