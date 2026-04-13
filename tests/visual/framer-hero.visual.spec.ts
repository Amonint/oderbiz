import { expect, test } from "@playwright/test";

test("framer hero matches baseline", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/?freezeTime=1");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".framer-ty36tk")).toHaveScreenshot("framer-hero-top.png", {
    maxDiffPixelRatio: 0.05,
    animations: "disabled",
  });
  await expect(page.locator(".framer-2xxdw2")).toHaveScreenshot("framer-hero-title.png", {
    maxDiffPixelRatio: 0.05,
    animations: "disabled",
  });
});
