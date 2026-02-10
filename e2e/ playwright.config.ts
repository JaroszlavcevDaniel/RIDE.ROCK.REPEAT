import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',       // hol vannak a tesztek
  timeout: 30_000,          // 30 másodperc max per teszt
  retries: 0,               // újrafutás, CI-ben lehet 1
  use: {
    headless: true,         // true → nem nyit ablakot
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10_000,
    baseURL: 'http://localhost:4200', // Angular dev szerver
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
