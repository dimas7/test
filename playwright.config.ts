import { PlaywrightTestConfig, devices } from '@playwright/test';
require('dotenv').config({ path: __dirname + '/.env' });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {

  testDir: './specs',
  // отключил пока параллелизм. Для этого сайта тесты гоняются медленнее(вероятно из-за GPU и видео) и менее стабильно.
  workers: 1,

  /* Maximum time one test can run for. Default 30*/
  timeout: 40 * 1000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met. Default 5000
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: Boolean(process.env.CI),

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['allure-playwright'], ['dot'], ['html']],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASEURL,
    screenshot: 'only-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Desktop Google Chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },

    {
      name: 'Desktop Firefox',
      use: {
        browserName: 'firefox',
      },
    },

    {
      name: 'Desktop Safari',
      use: {
        browserName: 'webkit',
      },
    },
  ],
};
export default config;
