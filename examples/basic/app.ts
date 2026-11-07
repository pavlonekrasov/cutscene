// The example's adapter: everything cutscene needs to know about this app. A real project puts its
// own here (a signed-in state, a hydration signal, dev-tool badges to hide, its frame colours).
import { join } from "node:path";
import { createScene, DEFAULT_FRAME, expect } from "../../src";

export const scene = createScene({
  outDir: join(__dirname, "out"),
  // A static page is settled once it has loaded; an SPA would wait for its own ready signal.
  ready: async (page) => {
    await page.waitForLoadState("load");
    await page.getByRole("main").waitFor();
  },
  // The title bar takes the app's canvas colour; the window's corner runs concentric with the
  // panel (12px corner, 8px in).
  frame: {
    ...DEFAULT_FRAME,
    light: { ...DEFAULT_FRAME.light, bar: { ...DEFAULT_FRAME.light.bar, background: "oklch(0.965 0 0)" } },
    dark: { ...DEFAULT_FRAME.dark, bar: { ...DEFAULT_FRAME.dark.bar, background: "oklch(0.18 0 0)" } },
    windowRadius: 20,
  },
});

export { expect };
