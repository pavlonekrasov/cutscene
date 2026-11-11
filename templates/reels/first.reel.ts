import { reel } from "@pavlonekrasov/cutscene/reel";

/**
 * A first reel: the first scene with a card at each end. Run it with
 *   npx cutscene reel demo/reels/first.reel.ts
 * It records its own takes of the scenes it lists, then adds the camera, speed ramps and cards.
 * See "Reels" in GUIDE.md (node_modules/@pavlonekrasov/cutscene).
 */
reel("First reel", {
  cards: { open: ["Your product", "One honest line about it"], close: ["Your product"] },
  clips: [{ scene: "../scenes/first-look.scene.ts" }],
});
