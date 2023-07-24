import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "specs",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  outputDir: "results",
  reporter: process.env.CI
    ? [["@currents/playwright"], ["line"]]
    : [["html"], ["line"]],
  expect: {
    timeout: 10000,
  },
  timeout: 300000,
  use: {
    baseURL: process.env.BASE_URL,
    actionTimeout: 15000,
    trace: process.env.CI ? "on-first-retry" : "on",
    timezoneId: "Europe/Riga",
    viewport: { width: 1280, height: 720 },
    screenshot: "only-on-failure",
    video: "on-first-retry",
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
