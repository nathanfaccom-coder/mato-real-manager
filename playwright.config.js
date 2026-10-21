import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60000,
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:4174",
    headless: true,
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
      ? {
          executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
          args: ["--no-sandbox", "--disable-dev-shm-usage", "--no-zygote"],
        }
      : undefined,
    viewport: { width: 390, height: 844 },
    timezoneId: "America/Sao_Paulo",
    locale: "pt-BR",
  },
  webServer: {
    command: "npx vite --config vite.test.config.js",
    url: "http://127.0.0.1:4174/app.html",
    reuseExistingServer: false,
    timeout: 60000,
  },
});
