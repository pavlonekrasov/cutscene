import { defineConfig, type PlaywrightTestConfig } from "@playwright/test";
import { basename, dirname } from "node:path";
import { FORMATS, type Format } from "./formats";
import { denseFormat, reelJob } from "./reel/take";
import type { CutsceneFixtures } from "./scene";

/**
 * Chromium's screencast streams at the screen's density, not the emulated one: without the first flag
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
  /**
   * Which Chromium browser records. Default: Playwright's own Chromium (`npx playwright install
   * chromium`). A channel name uses that installed browser (`"chrome"`, `"msedge"`,
   * `"chrome-beta"`); a path runs any Chromium-based executable (Brave, Vivaldi, Arc). Not Firefox
   * or Safari: the recorder speaks Chromium's DevTools protocol. `CUTSCENE_BROWSER` wins.
   */
  browser?: string;
};

/** A browser setting as Playwright options: a channel, or an executable path. */
export function browserOptions(browser = process.env.CUTSCENE_BROWSER) {
  if (!browser || browser === "chromium") return {};
  if (/[\\/]/.test(browser) || /\.(exe|app)$/i.test(browser)) return { executablePath: browser };
  return { channel: browser };
}

/**
 * A Playwright config for recording: one worker (a recording never shares the machine and keeps
 * its frame rate), a Chromium browser, each project a format with the flags that keep its pixels
 * exact. `CUTSCENE_THEME=dark` records the dark theme.
 */
export function cutsceneConfig({
  testDir = "./scenes",
  baseURL,
  webServer,
  formats = ["desktop", "phone"],
  use,
  outputDir,
  browser,
}: CutsceneConfig) {
  const theme = process.env.CUTSCENE_THEME === "dark" ? "dark" : "light";
  const { channel, executablePath } = browserOptions(process.env.CUTSCENE_BROWSER ?? browser);
  // `cutscene reel` only. A reel file is the one test of its run: it records its takes through
  // this same config (a child run, which starts the app) and renders them in a plain browser.
  const reel = process.env.CUTSCENE_REEL_FILE;
  if (reel)
    return defineConfig<CutsceneFixtures>({
      testDir: dirname(reel),
      testMatch: `**/${basename(reel)}`,
      outputDir,
      workers: 1,
      timeout: 0,
      reporter: "list",
      use: { colorScheme: theme, ...(channel ? { channel } : {}) },
      projects: [{ name: "reel", use: { launchOptions: { executablePath } } }],
    });
  // A reel's takes record at its density (`reel/take.ts`); every other run has no job.
  const job = reelJob();
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
      ...(channel ? { channel } : {}),
      ...use,
    },
    projects: formats.map((entry) => {
      const { name, format: plain } =
        typeof entry === "string" ? { name: entry, format: FORMATS[entry] } : entry;
      const format = job ? denseFormat(plain, job.density) : plain;
      const touch = format.pointer === "touch";
      return {
        name,
        use: {
          format,
          viewport: format.viewport,
          deviceScaleFactor: format.scale,
          launchOptions: { args: chromeArgs(format.scale), executablePath },
          ...(touch ? { isMobile: true, hasTouch: true } : {}),
        },
      };
    }),
    webServer,
  });
}
