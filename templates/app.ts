// The adapter: everything cutscene needs to know about this app. Scenes import `scene` from here.
// How to fill in each part: the cutscene skill ("Fill in the adapter"), or "Set it up by hand" in
// GUIDE.md (node_modules/@pavlonekrasov/cutscene).
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
