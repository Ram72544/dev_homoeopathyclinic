import { test, expect } from "@playwright/test";

test.describe("Responsive Navbar Verification", () => {
  test("iPad Air (820px) displays clean compact navbar with hamburger button", async ({ page }) => {
    await page.setViewportSize({ width: 820, height: 1180 });
    await page.goto("/");

    const hamburgerBtn = page.getByRole("button", { name: /navigation menu/i });
    await expect(hamburgerBtn).toBeVisible();

    // Open drawer
    await hamburgerBtn.click();
    const drawer = page.locator("#mobile-menu, nav ul.flex-col");
    await expect(drawer).toBeVisible();
  });

  test("iPad Pro (1024px portrait) displays clean compact navbar without wrapping", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 1366 });
    await page.goto("/");

    // With xl:hidden breakpoint, iPad Pro portrait correctly shows the tablet hamburger button
    const hamburgerBtn = page.getByRole("button", { name: /navigation menu/i });
    await expect(hamburgerBtn).toBeVisible();

    // Desktop horizontal links should not be shown on iPad Pro portrait
    const desktopNav = page.locator("ul.hidden.xl\\:flex");
    await expect(desktopNav).toBeHidden();
  });

  test("Desktop (1440px) displays full horizontal navigation links", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const desktopNav = page.locator("ul.hidden.xl\\:flex");
    await expect(desktopNav).toBeVisible();

    // Hamburger button should be hidden on desktop
    const hamburgerBtn = page.getByRole("button", { name: /navigation menu/i });
    await expect(hamburgerBtn).toBeHidden();
  });
});
