# cutscene

Record real web app flows as pixel-exact product videos, scripted like Playwright tests. Any
Chromium browser, any OS.

```sh
npx @pavlonekrasov/cutscene init    # set your project up
npx @pavlonekrasov/cutscene skill   # give your agent the cutscene skill
```

## What comes with it

- `@playwright/test`: a peer dependency, installed with cutscene if your project doesn't have it.
- Chromium: Playwright's own, downloaded by `init`. Chrome, Edge, Brave or any other Chromium works
  too (`browser` in the config).
- ffmpeg: from `ffmpeg-static`, unless one is on your `PATH`.
- You bring Node 20+.

Full guide: `GUIDE.md` in the package.

MIT
