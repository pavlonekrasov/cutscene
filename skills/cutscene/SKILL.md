---
name: cutscene
description: Record a web app's real flows as pixel-exact product videos (4K desktop window, phone), scripted like Playwright tests, in any Chromium browser. Use when asked to make a demo video, product video, walkthrough, case-study or launch video, or a screen recording of a web app; to re-record one after a UI change; or to blur a logo or names in a shared cut.
---

# cutscene

cutscene drives a Chromium browser through a scripted flow in the real, running app, records every
paint at 2×, cuts loads and idle time, frames the app in a window or phone, encodes a 60 fps MP4,
and **fails the run if the video drifts from the app** (a decoded frame vs a lossless screenshot).
Package and docs: https://www.npmjs.com/package/@pavlonekrasov/cutscene

## 1. Set the project up

In the app's root:

```sh
npx @pavlonekrasov/cutscene init        # or: init <dir>, default demo/
npx @pavlonekrasov/cutscene doctor      # Node 20+, @playwright/test, a Chromium, ffmpeg
```

`init` installs `@pavlonekrasov/cutscene` and `@playwright/test` (only if missing), Playwright's
Chromium, and ffmpeg (bundled through `ffmpeg-static`); writes `demo/app.ts` (adapter),
`demo/cutscene.config.ts` and `demo/scenes/first-look.scene.ts` without touching existing files;
and adds a `demo` script. Don't add dependencies by hand.

Any Chromium browser records: Playwright's own (default), or set `browser` in the config to an
installed channel (`"chrome"`, `"msedge"`) or a path to Brave, Vivaldi or Arc. `CUTSCENE_BROWSER`
overrides it for one run. Firefox and Safari can't: the recorder uses Chromium's DevTools protocol.

## 2. Fill in the adapter (`demo/app.ts`)

Find each answer in the app's code before writing it:

- **When a page is settled** (`ready`): a hydration flag, a loading state that clears, a known
  element. Prefer a signal the app already sets; add one (`data-hydrated` on `<html>`) only with
  the owner's OK. Never fixed sleeps.
- **What must never be filmed** (`hide`): dev badges (`NEXT_DEV_TOOLS` for Next.js), debug
  toolbars, cookie banners, a "view as" switcher. A dev-only user switcher stays clickable but
  hidden; switch users off camera in `act.offstage`.
- **What a shared cut blurs** (`blur`): a logo, a client's or people's names. Sharp normally;
  `CUTSCENE_BLUR=1` records a separate `…-blurred` version with them blurred throughout. Use a
  stable hook (`data-slot`, a test id).
- **The starting state** (`setup`, before the first load, or `offstage`): seeded demo data, a dev
  login, a cookie, a locale. Fictional people and `example.com` addresses only.
- **The frame** (`frame`): read the app's outer canvas colour and its main panel's corner and inset
  from computed styles. `bar.background` = canvas colour, `backdrop` a step from it,
  `windowRadius` = panel corner + inset (12 for a full-bleed app). Shadows stay pure black/white.
- **Project verbs** (`extend`): sign in as, switch role, a translator for UI strings so locators
  match the language you record in.

Set `baseURL` and `webServer` in `demo/cutscene.config.ts`. Videos go to `~/Videos/cutscene`
(`outDir` or `CUTSCENE_OUT` to change); never into the repo.

## 3. Write scenes (`demo/scenes/<flow>.scene.ts`)

```ts
import { expect, scene } from "../app";

scene("Invite a teammate", async ({ act }) => {
  const { page, main } = act;
  await act.visit("/team"); // off camera: the video starts on the settled page
  await act.caption("An admin invites a teammate");
  await act.click(main.getByRole("button", { name: "Invite" }));
  await act.type(page.getByRole("textbox", { name: "Email" }), "sam@example.com");
  await act.click(page.getByRole("button", { name: "Send invite" }));
  await expect(page.getByText("Invite sent")).toBeVisible();
  act.mark("sent");
  await act.wait(1200);
});
```

| `act.`                                         | Camera | Does                                                             |
| ---------------------------------------------- | ------ | ---------------------------------------------------------------- |
| `visit(path)`                                  | off    | Loads a page and waits for `ready`.                              |
| `offstage(work)`                               | off    | Setup the viewer shouldn't see; end a navigation with `ready()`. |
| `move / hover / click / type / press / scroll` | on     | A hand-like pointer with a press ripple; taps on phone.          |
| `wait(ms)`                                     | on     | A held beat, kept in full.                                       |
| `caption(text \| null)`                        | on     | A pill at the bottom: who acts, what happens.                    |
| `mark(label)`                                  | —      | A still in `check/` at this beat.                                |
| `shot(name, locator?)`                         | cut    | A lossless PNG without the overlay.                              |

- One flow per scene, 15–30 s. Start with `visit`, end on the result, held with `wait`.
- Leave the pointer off what the viewer reads: after a click, `move` it beside the result
  (`act.move(row, { at: { x, y } })`, CSS px from the target's top-left), not on a label.
- Locate by role and accessible name. `expect` each result before moving on, so a broken flow
  fails instead of filming a wrong state.
- `act.type` clicks its field first; type a newline (`"\n"`) for Enter inside one field.
- Captions: a few words, in the language the owner asked for. Clear them (`caption(null)`) when
  the screen speaks; they sit at the bottom, so clear them before a bottom bar or toast appears.
- File inputs: `const chooser = page.waitForEvent("filechooser")`, `act.click` the picker button,
  then `(await chooser).setFiles(...)`; no system dialog opens.

## 4. Run and verify (never skip)

```sh
npm run demo                                   # every scene, desktop and phone, light
npm run demo -- invite --project=desktop       # one scene, one format
CUTSCENE_THEME=dark npm run demo               # dark
CUTSCENE_BLUR=1 npm run demo                   # the blurred version
```

Other switches: `CUTSCENE_PACE=<n>` (slow-motion capture, default 2), `CUTSCENE_FRAME=none`,
`CUTSCENE_OUT=<dir>`, `CUTSCENE_URL=<url>`, `CUTSCENE_BROWSER=<channel|path>`,
`CUTSCENE_FFMPEG=<path>`, `CUTSCENE_KEEP=1`.

For every video, in `<out>/<scene>-<format>-<theme>[-blurred]/`:

- Read `check/contact.jpg` and each mark still: every beat on screen, captions whole and not over
  UI, no dev UI, no half-loaded or blank state.
- `manifest.json`: `motionFps` ≥ 60; `passed` true and `fidelity.psnr` ≥ 38.
- Something on screen for a split second (a flash, a jump) shows in the contact sheet only by
  luck: extract frames around a suspect moment with ffmpeg and look.
- Report the path, duration and PSNR. Delete probe files you made.

## 5. When a run fails, name the layer

| Symptom                                | Layer and fix                                                                                 |
| -------------------------------------- | --------------------------------------------------------------------------------------------- |
| "Captured W×H, expected …"             | Capture density: use `cutsceneConfig` (it passes `--force-device-scale-factor`).              |
| Fidelity fails with a big colour shift | Encode or decode. Don't change the encode flags.                                              |
| Fidelity fails, low PSNR, small shift  | Content: compare `check/reference.png` with the last still. End on a settled screen (`wait`). |
| Frame drawn wrong (half size, offset)  | The frame page took project options; `renderFrame` keeps `isMobile: false`.                   |
| `motionFps` under 60                   | Keep `CUTSCENE_PACE` at 2+, close heavy apps, one worker.                                     |
| "has no meta viewport" error           | The app isn't mobile-ready: add the tag, or record desktop only (`formats: ["desktop"]`).     |
| Browser won't launch                   | `npx playwright install chromium`, or set `browser` to an installed Chromium.                 |
| A locator times out                    | The app: read Playwright's error context; fix the scene or ask the owner about the app.       |
| A flash or glitch the app really shows | It's the app, not the recorder: report it to the owner rather than hiding it in the scene.    |
