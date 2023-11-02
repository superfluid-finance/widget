import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "specs",
  //Disabled due to currents not supporting this at the moment https://github.com/superfluid-finance/widget/issues/227
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  outputDir: "results",
  reporter: process.env.CI
    ? [["@currents/playwright"], ["line"]]
    : [["html"], ["line"]],
  expect: {
    timeout: 10000,
  },
  timeout: 300000,
  use: {
    actionTimeout: 10000,
    baseURL: process.env.BASE_URL,
    trace: "on",
    timezoneId: "Europe/Riga",
    viewport: { width: 1280, height: 720 },
    screenshot: "only-on-failure",
    video: "on",
    testIdAttribute: "data-testid",
    headless: false,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
