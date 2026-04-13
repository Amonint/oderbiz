import { expect, test } from "@playwright/test";

test("framer nav matches baseline", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/?freezeTime=1");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("nav.framer-17v787v")).toHaveScreenshot("framer-nav.png", {
    maxDiffPixelRatio: 0.03,
    animations: "disabled",
  });
});
