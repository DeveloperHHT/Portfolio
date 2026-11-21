import { defineConfig, devices } from '@playwright/test'

// CI uses the Chromium that Playwright downloads. Locally you can point
// PW_CHROMIUM_PATH at an installed Chromium-based browser instead.
const executablePath = process.env.PW_CHROMIUM_PATH || undefined

export default defineConfig({
  testDir: './Tests/e2e',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173',
    launchOptions: { executablePath },
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
