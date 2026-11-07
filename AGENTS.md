# cutscene: agent runbook

You were pointed here to make product videos of a web app, or to work on cutscene itself. Read
[README.md](README.md) first; this file is the procedure.

## Make videos for a project

### 1. Check the machine

- `ffmpeg -version` and `ffprobe -version` work.
- Google Chrome is installed (Playwright's `chrome` channel; `npx playwright install chrome` if
  not). Plain Chromium can't decode H.264, so the fidelity check would be skipped.
- The project has `@playwright/test` (add it as a dev dependency if not).

### 2. Copy cutscene in

Copy this repo's `src/` to `<app>/demo/cutscene/`. Don't edit the copy: a fix belongs in this
repo, then copy again. Note the commit you copied in a `demo/cutscene/VERSION` line or the
project's docs.

### 3. Write the adapter (`demo/app.ts`)

Find out, from the app's code, before writing it:

- **When a page is settled.** A hydration flag, a loading state that clears, a known element.
  Prefer a signal the app already sets; add a tiny one (`data-hydrated` on `<html>`) only with the
  owner's OK. Never wait with fixed sleeps.
- **What must not be filmed.** Dev badges (`NEXT_DEV_TOOLS` for Next.js), debug toolbars, cookie
  banners, a "view as" switcher: list them in `hide`. If the app has a dev-only role or user
  switcher, keep it clickable but hidden and switch users off camera with `act.offstage`.
- **How to get the state a scene starts from.** Seeded demo data, a dev login, a cookie. Do it in
  `setup` (before the first load) or `offstage`. Use fictional people and `example.com` addresses.
- **The frame colours.** Read the app's outer canvas colour and its main panel's corner and inset
  from computed styles (`getComputedStyle(document.querySelector("main"))`). Set
  `bar.background` to the canvas colour, `backdrop` a step from it, and `windowRadius` to the
  panel's corner plus its inset (12 for a full-bleed app). Keep shadows pure black/white.
- **Project verbs.** A role switch, a translator for UI strings (so locators match the language
  you record in): put them in `extend`.

### 4. Config and script

`demo/cutscene.config.ts` with `cutsceneConfig({ baseURL, webServer, use })`, and a
`"demo": "playwright test -c demo/cutscene.config.ts"` script. Set `outDir` (or `CUTSCENE_OUT`)
outside the repo: videos are never committed.

### 5. Write scenes (`demo/scenes/<flow>.scene.ts`)

- One flow per scene, 15–30 seconds. Start with `act.visit` (off camera), end on the result.
- Locate by role and accessible name, as in e2e specs. Assert each result with `expect` before
  moving on, so a broken flow fails instead of filming a wrong state.
- Captions say who acts and what happens, in a few words. Clear them (`caption(null)`) when the
  screen speaks for itself.
- `mark()` every beat a reviewer should see; `wait()` where a viewer needs time to read.
- Record in the language the owner asks for; put every caption in that language too.

### 6. Run and verify (don't skip)

`npm run demo` (add `-- <scene> --project=desktop` to narrow). `CUTSCENE_THEME=dark` for dark.
Then, for every video:

- Read `check/contact.jpg` and each mark still. Is every beat on screen, every caption whole, no
  dev UI, no half-loaded state?
- `manifest.json`: `motionFps` ≥ 60 and `fidelity.decoded` true with `psnr` ≥ 38.
- Report the path, duration and PSNR. Delete probe files you made.

### 7. When a run fails, name the layer

| Symptom                                       | Layer and fix                                                                                                       |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| "Captured W×H, expected …"                    | Capture density. Use `cutsceneConfig` (it passes `--force-device-scale-factor`).                                     |
| Fidelity fails, big colour shift              | Encode or decode. Don't change the encode flags; check the browser is Chrome.                                        |
| Fidelity fails, low PSNR, small shift         | Content. Open `check/reference.png` beside the last mark still: an animation still running at the end, a toast, text antialiasing. End the scene on a settled screen (`wait`). |
| Frame drawn wrong (half size, offset)         | The frame page picked up project options; `renderFrame` must keep `isMobile: false`.                                 |
| `motionFps` under 60                          | Pace. Keep `CUTSCENE_PACE` at 2+; close heavy apps; one worker only.                                                 |
| A locator times out                           | The app. Read Playwright's error context; fix the scene or ask the owner about the app.                              |

## Work on cutscene itself

- `npm install`, then `npm run typecheck` and `npm run example` (desktop and phone; also
  `CUTSCENE_THEME=dark`). Both must pass, and read the example's check stills before committing.
- Runtime dependencies: `@playwright/test` and Node built-ins only. ffmpeg runs as a process.
- Colours in OKLCH. Comments say why, not what.
- A change to the pipeline (capture, timeline, encode, frame, check) needs a recorded example
  that still passes the fidelity gate; say the numbers in the commit message.
