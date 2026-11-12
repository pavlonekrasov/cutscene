import { join } from "node:path";
import { reel } from "../../../src/reel";

/**
 * The spring follow's proof: the pan test's moves on a critically damped spring. Measured with
 * `cutscene measure`, its moves must peak early (about a sixth of the way in) and never overshoot.
 */
reel("Spring test", {
  outDir: join(__dirname, "..", "out"),
  density: 4,
  pace: 6.6,
  camera: { follow: "spring" },
  clips: [
    {
      scene: "../scenes/add-task.scene.ts",
      from: "done",
      hold: 7,
      auto: false,
      shots: [
        { at: 0, zoom: 1.5, x: 0.4, y: 0.4 },
        { at: 0.05, zoom: 1.5, x: 0.6, y: 0.45, over: 1000 },
        { at: 2.1, zoom: 2, x: 0.5, y: 0.4, over: 750 },
        { at: 4.1, zoom: 1.5, x: 0.45, y: 0.45, over: 1000 },
      ],
    },
  ],
});
