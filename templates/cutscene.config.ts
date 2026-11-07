import { cutsceneConfig } from "@pavlonekrasov/cutscene";

export default cutsceneConfig({
  baseURL: "http://localhost:3000",
  // Starts the app for a run, or reuses one that's already up.
  webServer: { command: "npm run dev", url: "http://localhost:3000", reuseExistingServer: true },
  use: { locale: "en-US" },
  // Any Chromium browser: Playwright's own by default; "chrome", "msedge", or a path to Brave,
  // Vivaldi or Arc.
  // browser: "chrome",
});
