import { defineConfig, type PlaywrightTestConfig } from "@playwright/test";
import { FORMATS, type Format } from "./formats";
import type { CutsceneFixtures } from "./scene";

/**
 * Chrome's screencast streams at the screen's density, not the emulated one: without the first flag
 * a 2× page arrives as 1× frames and the video is an upscale. With it, each frame is the device
 * pixels a screenshot shows. The second keeps text grayscale antialiased: Windows Chrome switches
 * ClearType fringes on and off per paint (off while a layer scrolls), and colour fringes don't
 * survive 4:2:0 or a scaled video anyway. Phones and Macs draw text this way too.
 */
export function chromeArgs(scale: number) {
  return [`--force-device-scale-factor=${scale}`, "--disable-lcd-text"];
}

export type CutsceneConfig = {
  /** Where the scenes live, relative to the config file. Default `./scenes`. */
  testDir?: string;
  /** The app's origin. `CUTSCENE_URL` wins. */
  baseURL: string;
  /** Starts the app (reused when it's already up). */
  webServer?: PlaywrightTestConfig["webServer"];
  /** One project per format; a name from `FORMATS` or your own. Default desktop and phone. */
  formats?: (keyof typeof FORMATS | { name: string; format: Format })[];
  /** Extra context options for every project (`locale`, `timezoneId`, …). */
  use?: PlaywrightTestConfig["use"];
  /** Playwright's own output (traces of a failed scene). */
  outputDir?: string;
};

/**
 * A Playwright config for recording: one worker (a recording never shares the machine and keeps
 * its frame rate), real Chrome (H.264 for the fidelity check), each project a format with the
 * Chrome flags that keep its pixels exact. `CUTSCENE_THEME=dark` records the dark theme.
 */
export function cutsceneConfig({
  testDir = "./scenes",
  baseURL,
  webServer,
  formats = ["desktop", "phone"],
  use,
  outputDir,
}: CutsceneConfig) {
  const theme = process.env.CUTSCENE_THEME === "dark" ? "dark" : "light";
  return defineConfig<CutsceneFixtures>({
    testDir,
    testMatch: "**/*.scene.ts",
    outputDir,
    workers: 1,
    timeout: 5 * 60_000,
    reporter: "list",
    use: {
      baseURL: process.env.CUTSCENE_URL ?? baseURL,
      colorScheme: theme,
      ...(process.env.CI ? {} : { channel: "chrome" }),
      ...use,
    },
    projects: formats.map((entry) => {
      const { name, format } =
        typeof entry === "string" ? { name: entry, format: FORMATS[entry] } : entry;
      const touch = format.pointer === "touch";
      return {
        name,
        use: {
          format,
          viewport: format.viewport,
          deviceScaleFactor: format.scale,
          launchOptions: { args: chromeArgs(format.scale) },
          ...(touch ? { isMobile: true, hasTouch: true } : {}),
        },
      };
    }),
    webServer,
  });
}
