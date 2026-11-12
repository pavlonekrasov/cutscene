import { expect, scene } from "../app";

/**
 * A second session on the same list, for the parallel-action reel (reels/parallel.reel.ts): a
 * reviewer sees the task "Add a task" sends arrive, and ticks it off. Its marks match that scene's
 * ("added", "done"), so a reel can cut between the two sessions on them. The example saves
 * nothing, so the arrival is played in the page; a real app shows the other session's write.
 */
scene("Review tasks", async ({ act }) => {
  const { page, main } = act;
  await act.visit("/");
  act.mark("start");
  await act.hover(main.getByRole("listitem").nth(2));
  await act.wait(1200);

  // The other session's task lands.
  await page.evaluate(() => {
    const form = document.querySelector("form")!;
    (form.elements.namedItem("task") as HTMLInputElement).value = "Ship the demo video";
    form.requestSubmit();
  });
  await expect(main.getByRole("listitem").first()).toContainText("Ship the demo video");
  act.mark("added");
  await act.wait(900);

  await act.click(main.getByRole("checkbox").first());
  await expect(main.getByRole("checkbox").first()).toBeChecked();
  act.mark("done");
  await act.wait(1500);
});
