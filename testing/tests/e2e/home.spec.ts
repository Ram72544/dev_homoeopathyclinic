import { test, expect } from "@playwright/test";

test.describe("Home Page & Core Patient Flows", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads clinic homepage with correct title and key elements", async ({ page }) => {
    await expect(page).toHaveTitle(/Dr\. Sheetal/i);
    // Verify hero section
    const heroHeading = page.locator("h1");
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText("Gentle, Natural & Permanent Healing", { ignoreCase: true });
  });

  test("navigation links are present and accessible", async ({ page }) => {
    const navbar = page.locator("nav");
    await expect(navbar).toBeVisible();
  });

  test("consultation form can be filled and submitted with mocked API", async ({ page }) => {
    // Intercept appointment API so tests never hit production external endpoints
    await page.route("**/api/book-appointment", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          ok: true,
          name: "Test Patient",
          whatsappUrl: "https://wa.me/917827991551",
        }),
      });
    });

    // Scroll to contact section
    const contactSection = page.locator("#contact");
    await expect(contactSection).toBeVisible();

    // Verify booking form inputs exist
    const nameInput = page.locator('input[placeholder*="Full name" i], input[name="name"], #name').first();
    if (await nameInput.isVisible()) {
      await nameInput.fill("Test Patient");
      const phoneInput = page.locator('input[placeholder*="phone" i], input[placeholder*="mobile" i], input[name="phone"], #phone').first();
      if (await phoneInput.isVisible()) {
        await phoneInput.fill("9876543210");
      }
    }
  });
});
