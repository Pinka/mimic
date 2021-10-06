const path = require("path");

const testDir = "tests";
const outputDir = "test-results";

const config = {
  testDir,
  outputDir,
  forbidOnly: !!process.env.CI,
  preserveOutput: process.env.CI ? "failures-only" : "always",
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [
        ["dot"],
        ["json", { outputFile: path.join(testDir, outputDir, "report.json") }],
      ]
    : "line",
  use: {
    headless: false,
    viewport: {
      width: 1280,
      height: 720,
    },
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
  },
  webServer: {
    command: "npm run start",
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
};

module.exports = config;
