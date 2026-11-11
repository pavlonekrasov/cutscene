import { join } from "node:path";
import { reel } from "../../../src/reel";

/**
 * The camera's sub-pixel proof: a 4 s pan and a 4 s push over a still stretch of the scene, slow
 * enough that a camera rounding to whole pixels would visibly step. Read it frame by frame.
 */
reel("Pan test", {
  outDir: join(__dirname, "..", "out"),
  density: 4,
  clips: [
    {
      scene: "../scenes/add-task.scene.ts",
      from: "done",
      hold: 7,
      auto: false,
      shots: [
        { at: 0, zoom: 1.5, x: 0.4, y: 0.4 },
        { at: 0.05, zoom: 1.5, x: 0.6, y: 0.45, over: 4000 },
        { at: 4.1, zoom: 2, x: 0.5, y: 0.4, over: 4000 },
      ],
    },
  ],
});
