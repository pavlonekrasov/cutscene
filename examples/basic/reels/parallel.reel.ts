import { join } from "node:path";
import { reel } from "../../../src/reel";

/**
 * The mechanics of parallel action, on the example's two sessions: a cross-cut on the marks both
 * scenes set, then the same moment side by side. Around it: a cold open on the result, a matte
 * that opens at the first action, a generated riser ending on the cut into the split, takes moved
 * by a human pointer, and the edit delivered at 16:9, 1:1 and 4:5. A regression check, not a demo:
 * the example app has one list and saves nothing.
 */
reel("Parallel", {
  outDir: join(__dirname, "..", "out"),
  // Pace 4 is what density 3 needs for 60 fps of motion; 4.4 leaves 10% for a busy machine.
  pace: 4.4,
  pointer: "human",
  coldOpen: true,
  matte: true,
  audio: { riser: true },
  deliver: ["native", "1:1", "4:5"],
  cards: {
    open: ["Tasks", "Two sessions, one list"],
    close: ["Tasks", "Recorded with cutscene"],
  },
  clips: [
    {
      cross: [
        { scene: "../scenes/add-task.scene.ts" },
        { scene: "../scenes/review-tasks.scene.ts" },
      ],
      at: ["added", "done"],
    },
    {
      split: [
        { scene: "../scenes/add-task.scene.ts", from: "added" },
        { scene: "../scenes/review-tasks.scene.ts", from: "added" },
      ],
      at: ["done"],
    },
  ],
});
