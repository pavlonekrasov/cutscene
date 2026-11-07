# cutscene

Record real web app flows as pixel-exact product videos, scripted like Playwright tests.

You write a scene (`click`, `type`, `caption`, `wait`) against your running app. cutscene drives
Chrome through it with a hand-like cursor, records every paint, cuts loads and idle time, puts the
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

It started as the recorder for a case study of an admin panel, and borrows from two tools:
[showtime](https://github.com/mishanaer/showtime) (an agent records the real app, trims it, frames
it, checks it; it needs a Mac and the iOS Simulator) and
[stageshow](https://github.com/benjitaylor/skills/tree/main/stageshow) (a short script of beats;
it draws mock UI). cutscene records the real web app, in Chrome, on any OS.

## What you get

| In `<out>/<scene>-<project>-<theme>/` | What                                                                                                           |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `<scene>.mp4`                         | H.264, 60 fps, BT.709, faststart. Desktop 3840×2160 (the 1440×810 app at 2×), phone 1080×1920 (390×844 at 2×). |
| `stills/*.png`                        | Lossless shots from `act.shot()`, without the cursor.                                                          |
| `check/`                              | A frame at every `act.mark()` and `contact.jpg`, a 4×4 sheet of the whole video.                               |
| `manifest.json`                       | Duration, marks, `motionFps` (60 or more is every frame of the video), the fidelity numbers.                   |

## Requirements

- Node 20+ and `@playwright/test`.
- Google Chrome (Playwright's `chrome` channel). Plain Chromium has no H.264, so the fidelity check
  is skipped there.
- `ffmpeg` and `ffprobe` on `PATH`.

## Try it

```sh
npm install
npm run example                       # desktop and phone, light
CUTSCENE_THEME=dark npm run example   # dark
```

Videos land in `examples/basic/out/`. The example is a static page (`examples/basic/site/`) with
its adapter (`app.ts`), config and one scene.

## Use it in a project

cutscene is copied in, not installed: its source goes into your project, next to your scenes.
Playwright runs TypeScript directly, so there is no build step.

```
your-app/
  demo/
    cutscene/           ← this repo's src/, copied
    app.ts              ← your adapter: what cutscene needs to know about your app
    cutscene.config.ts
    scenes/*.scene.ts
```

```sh
git clone https://github.com/pavlonekrasov/cutscene /tmp/cutscene
cp -r /tmp/cutscene/src your-app/demo/cutscene
```

**The adapter** (`demo/app.ts`) creates the `scene` your scenes import:

```ts
import { createScene, DEFAULT_FRAME, expect, NEXT_DEV_TOOLS } from "./cutscene";

export const scene = createScene({
  outDir: "/path/outside/the/repo", // or CUTSCENE_OUT
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
import { cutsceneConfig } from "./cutscene";

export default cutsceneConfig({
  baseURL: "http://localhost:3000",
  webServer: { command: "npm run dev", url: "http://localhost:3000", reuseExistingServer: true },
  use: { locale: "en-US", timezoneId: "Europe/London" },
});
```

Add `"demo": "playwright test -c demo/cutscene.config.ts"` to your scripts. To update cutscene
later, copy `src/` again.

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

Durations are the video's. Off-camera time is cut; any other still stretch is shortened to
`idleCap` (1.2 s) so a slow fetch never looks frozen; `wait` is kept in full.

| Switch                  | Does                                                                                     |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| `CUTSCENE_THEME=dark`   | Records the dark theme (`prefers-color-scheme`); the frame follows.                      |
| `CUTSCENE_PACE=<n>`     | Records `n` times slower than life (default 2) and plays at 1×. 1 turns slow motion off. |
| `CUTSCENE_FRAME=none`   | No frame: the app's own pixels, edge to edge.                                            |
| `CUTSCENE_BLUR=1`       | The blurred version: the adapter's `blur` selectors blurred throughout, in `…-blurred/`. |
| `CUTSCENE_CAPTURE=jpeg` | Lossy capture, if PNG frames are too slow on a machine; the check shows the cost.        |
| `CUTSCENE_OUT=<dir>`    | Where videos go.                                                                         |
| `CUTSCENE_URL=<url>`    | Another server.                                                                          |
| `CUTSCENE_KEEP=1`       | Keeps the raw frames in the temp folder.                                                 |

## Fidelity

After the last beat cutscene takes a lossless `page.screenshot()`. Once the MP4 is encoded it
decodes the last frame **in Chrome** (a `<video>` drawn to a canvas) and compares every app pixel
the frame leaves visible with that screenshot. A scene fails below 38 dB PSNR, above ±1.5 mean
shift in any channel, or with more than 0.5% of pixels off by more than 16, and saves the
screenshot as `check/reference.png`. Typical runs land at 44–55 dB.

## How it works

- **Native pixels.** Chrome's screencast streams at the screen's density, not the emulated one, so
  each project launches Chrome with `--force-device-scale-factor` equal to its `deviceScaleFactor`.
  Frames are lossless PNGs at 2×, placed on the canvas 1:1. A frame of the wrong size fails the
  scene.
- **Grayscale text.** Chrome runs with `--disable-lcd-text`: Windows turns ClearType colour
  fringes on and off per paint, and they don't survive 4:2:0 or scaling anyway.
- **Slow motion for smoothness.** Chrome streams 2× frames at about 30 per second. `pace.ts` slows
  the page's JS clock (timers, rAF, `performance.now`; `Date.now` stays real), CDP slows CSS
  animations (`Animation.setPlaybackRate`), and every beat stretches by the same factor. The
  editor speeds it back up: motion lands at 60 fps.
- **Colour.** App and frame are composited in RGB and converted to YUV once, BT.709 limited range,
  tagged BT.709 / sRGB / tv: the combination browsers decode back to what Chrome painted.
- **The overlay** (cursor, ripples, taps, caption, paced scrolls) is drawn inside the page, so it
  lands in the same frames as the UI.

| File         | Role                                                                        |
| ------------ | --------------------------------------------------------------------------- |
| `scene.ts`   | `createScene`: the fixture that records, edits, frames, encodes and checks. |
| `act.ts`     | The `act` API.                                                              |
| `config.ts`  | `cutsceneConfig`: Playwright projects per format, with the Chrome flags.    |
| `capture.ts` | The CDP screencast recorder.                                                |
| `edit.ts`    | The timeline (cuts, holds, idle cap, pace) and the ffmpeg encode.           |
| `frame.ts`   | The window and phone frame, and where the app sits on the canvas.           |
| `check.ts`   | Mark stills, the contact sheet and the fidelity check.                      |
| `overlay.ts` | Cursor, ripples, taps, caption and paced scrolls, inside the page.          |
| `pace.ts`    | The slowed page clock.                                                      |
| `formats.ts` | Viewports, densities and canvases.                                          |

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

## For agents

[AGENTS.md](AGENTS.md) is the runbook: adopting cutscene in a project, writing scenes, reading the
checks, and fixing a failed run.

## License

[MIT](LICENSE)
