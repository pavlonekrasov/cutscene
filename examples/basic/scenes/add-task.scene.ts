import { expect, scene } from "../app";

/** Adds a task, sees it land at the top with a toast, and ticks it off. */
scene("Add a task", async ({ act }) => {
  const { page, main } = act;
  await act.visit("/");
  await act.caption("Add a task");
  act.mark("start");
  await act.wait(700);

  await act.type(main.getByRole("textbox", { name: "New task" }), "Ship the demo video");
  await act.click(main.getByRole("button", { name: "Add task" }));
  await expect(page.getByRole("status")).toHaveText("Task added");
  await act.caption(null);
  act.mark("added");
  await act.wait(900);

  await act.caption("Tick it off");
  // Camera hints for the reel (reels/tour.reel.ts); they do nothing in this scene's own video.
  await act.focus(main.getByRole("list"));
  await act.click(main.getByRole("checkbox").first());
  await expect(main.getByRole("checkbox").first()).toBeChecked();
  await act.focus(main.getByRole("listitem").first(), 2);
  act.mark("done");
  await act.wait(800);
  await act.caption(null);
  act.wide();
});
