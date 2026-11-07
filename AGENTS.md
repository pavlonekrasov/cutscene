# cutscene: working on it

To **use** cutscene in a project, follow the skill: [skills/cutscene/SKILL.md](skills/cutscene/SKILL.md)
(or `npx @pavlonekrasov/cutscene skill` to install it). This file is for changing cutscene itself.
Read [README.md](README.md) first.

## Layout

| Path               | What                                                                         |
| ------------------ | ---------------------------------------------------------------------------- |
| `src/`             | The library (TypeScript). Built to `dist/` (CommonJS + types) on `npm pack`. |
| `bin/cutscene.mjs` | The `npx` command: `init`, `skill`, `doctor`. Plain Node, no dependencies.   |
| `templates/`       | What `init` writes into a project: adapter, config, a first scene.           |
| `skills/cutscene/` | The agent skill, shipped in the package and found by `npx skills add`.       |
| `examples/basic/`  | A static app with its adapter, config and a scene; imports `src/` directly.  |

## Checks before a commit

```sh
npm install
npm run typecheck
npm run build
npm run example                         # desktop and phone, light, Playwright's Chromium
CUTSCENE_THEME=dark npm run example     # dark
CUTSCENE_BROWSER=msedge npm run example -- --project=desktop   # another Chromium, if installed
```

All must pass. Read the example's `check/contact.jpg` and mark stills before committing. A change
to the pipeline (capture, timeline, encode, frame, check) needs the example to still pass the
fidelity gate; give the numbers in the commit message.

A change to `bin/`, `templates/` or the package shape: `npm pack`, install the tarball into a
fresh project in a temp folder, run `npx @pavlonekrasov/cutscene init` there and record its first
scene against a static page.

## Rules

- Runtime dependencies: `ffmpeg-static` and Node built-ins. `@playwright/test` is a peer
  dependency, so a project has one copy of it.
- Chromium only, any build: never rely on Google Chrome specifically. The fidelity check decodes
  in the browser and falls back to ffmpeg when that build has no H.264.
- Functions passed to `addInitScript` (`installOverlay`, `installPace`) run in the page: they may
  not reference anything outside themselves.
- Colours in OKLCH. Comments say why, not what.
- Publishing: bump `version`, `npm publish` (the scope publishes public). Only when the owner asks.
