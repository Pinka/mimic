const { test, expect } = require('@playwright/test');

test.only('basic test 2', async ({ page }) => {
  await page.goto('/mimic');
  const title = await page.waitForSelector('text=Take Screenshot');
  await expect(title).toBeTruthy();
});