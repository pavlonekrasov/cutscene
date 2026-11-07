import { join } from "node:path";
import { cutsceneConfig } from "../../src";

export default cutsceneConfig({
  testDir: "./scenes",
  baseURL: "http://localhost:4173",
  webServer: {
    command: "node server.mjs",
    url: "http://localhost:4173",
    reuseExistingServer: true,
  },
  use: { locale: "en-US" },
  outputDir: join(__dirname, "out", "test-results"),
});
