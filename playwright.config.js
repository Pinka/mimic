const path = require('path');

const outputDir = 'test-results';

const config = {
    testDir: 'tests',
    outputDir,
    forbidOnly: !!process.env.CI,
    preserveOutput: process.env.CI ? 'failures-only' : 'always',
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI ? [
        [ 'dot' ],
        [ 'json', { outputFile: 'report.json' } ],
      ] : 'line',
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