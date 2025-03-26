import { test, expect } from '@playwright/test';

test('Screenshot of index', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveScreenshot('homepage-screenshot.png', {
    maxDiffPixels: 10000,
  });
});

test('Screenshot of admin page', async ({ page }) => {
  await page.goto('http://localhost:3000/admin');
  await expect(page).toHaveScreenshot('adminpage-screenshot.png', {
    maxDiffPixels: 10000,
  });
});
