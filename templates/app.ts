// The adapter: everything cutscene needs to know about this app. Scenes import `scene` from here.
// The cutscene skill, or the README's "The adapter", says how to fill in each part.
import { createScene, DEFAULT_FRAME, expect } from "@pavlonekrasov/cutscene";

export const scene = createScene({
  // Settled after a load. Swap in the app's own signal if it has one (hydrated, data in).
  ready: async (page) => {
    await page.waitForLoadState("load");
    await page.waitForLoadState("networkidle");
  },
  // Dev-only UI never to film, as CSS selectors (NEXT_DEV_TOOLS for Next.js).
  hide: [],
  // Blurred only in the CUTSCENE_BLUR=1 version: a logo, names.
  blur: [],
  // Set bar.background to the app's outer canvas colour and windowRadius to its panel's corner.
  frame: DEFAULT_FRAME,
});

export { expect };
