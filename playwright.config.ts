import { defineConfig, devices } from "@playwright/test"

const baseURL = process.env.INSTANT_BASE_URL ?? "http://127.0.0.1:3102"
const port = new URL(baseURL).port || "3102"

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  reporter: process.env.CI ? "github" : "line",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  webServer: {
    command: `pnpm start --hostname 127.0.0.1 --port ${port}`,
    url: `${baseURL}/health`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
    },
  ],
})
