// @ts-check
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    testDir: 'tests',
    forbidOnly: !!process.env.CI,
    retries: 1,
    workers: process.env.CI ? 2 : undefined,
    use: {
        headless: false,
        viewport: {
            width: 1280,
            height: 720
        },
        ignoreHTTPSErrors: true,
        video: 'on-first-retry',
    },
};
module.exports = config;