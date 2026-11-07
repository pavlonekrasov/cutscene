import { scene } from "../app";

/** A first scene to prove the setup: the home page, held. Replace it with a real flow. */
scene("First look", async ({ act }) => {
  await act.visit("/");
  await act.caption("The home page");
  act.mark("home");
  await act.wait(1500);
  await act.caption(null);
  await act.wait(600);
});
