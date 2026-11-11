import { join } from "node:path";
import { reel } from "../../../src/reel";

/**
 * The example's reel: the "Add a task" scene as two clips with a card at each end. Run it with
 * `npm run reel`. Density 4 keeps the 2× detail shot (`act.focus` in the scene) pixel-sharp.
 */
reel("Tour", {
  outDir: join(__dirname, "..", "out"),
  density: 4,
  cards: { open: ["Tasks", "A cutscene example"], close: ["Tasks", "Recorded with cutscene"] },
  clips: [
    { scene: "../scenes/add-task.scene.ts", to: "added" },
    { scene: "../scenes/add-task.scene.ts", from: "added", open: "wide" },
  ],
});
