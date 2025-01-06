import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Holdeman/);
  });

  test("should have working quick links", async ({ page }) => {
    await page.goto("/");
    const links = page.getByRole("link");
    await expect(links).toHaveCount(await links.count());

    // Test each link is clickable
    for (const link of await links.all()) {
      await expect(link).toBeVisible();
      await expect(link).toBeEnabled();
    }
  });

  test("should load images", async ({ page }) => {
    await page.goto("/");
    const images = page.getByRole("img");

    for (const image of await images.all()) {
      // Wait for image to load and check natural dimensions
      await expect(async () => {
        const naturalWidth = await image.evaluate((img: HTMLImageElement) => img.naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
      }).toPass();
    }
  });
});
