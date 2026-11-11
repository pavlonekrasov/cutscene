import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Browser } from "@playwright/test";
import { fidelity, type Fidelity } from "../check";
import type { Cam } from "./camera";
import { appRect, encodeReel, shot, type Renderer } from "./render";
import type { Take } from "./take";

/**
 * The fidelity gate under the camera. A take's last frame, framed by `cam`, goes the way every
 * frame of the reel goes (resampled in the canvas, encoded, decoded as a viewer's browser would)
 * and is compared with the lossless screenshot of that moment resampled the same way. What it
 * proves: the capture, the camera and the encode together still show the app as it was painted.
 */
export async function gate(
  browser: Browser,
  renderer: Renderer,
  take: Take,
  dir: string,
  cam: Cam,
  scale: number,
  workDir: string,
  name: string,
): Promise<Fidelity> {
  const rect = appRect(take, cam, scale);
  const last = take.entries.at(-1)!.file;
  const frame = join(workDir, `${name}.png`);
  await writeFile(frame, await renderer.paint(shot(take, dir, last, cam, scale)));
  const want = await renderer.paint({ ...shot(take, dir, take.reference, cam, scale), crop: rect });
  const video = join(workDir, `${name}.mp4`);
  await encodeReel([{ file: frame, frames: 30 }], workDir, video);
  return fidelity(browser, video, 0.25, want, null, rect);
}
