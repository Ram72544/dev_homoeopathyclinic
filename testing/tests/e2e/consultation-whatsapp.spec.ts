import { test, expect } from "@playwright/test";

test.describe("WhatsApp Feature & Consultation Form Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Ensure page and React hydration are complete
    await page.locator("#appointment-name-input").waitFor({ state: "visible" });
  });

  /* -------------------------------------------------------------------------- */
  /*                             WhatsApp Feature Tests                         */
  /* -------------------------------------------------------------------------- */

  test("WhatsApp link in footer contains valid phone and pre-filled inquiry text", async ({ page }) => {
    const footerWhatsApp = page.locator('footer a[href*="wa.me"]').first();
    await footerWhatsApp.scrollIntoViewIfNeeded();
    await expect(footerWhatsApp).toBeVisible();

    const href = await footerWhatsApp.getAttribute("href");
    expect(href).not.toBeNull();
    // Validate target clinic phone number (+91 78279 91551)
    expect(href).toContain("917827991551");
    // Validate security attributes
    await expect(footerWhatsApp).toHaveAttribute("target", "_blank");
    await expect(footerWhatsApp).toHaveAttribute("rel", "noopener noreferrer");
    // Validate prefilled consultation message
    expect(decodeURIComponent(href!)).toContain("Dr. Sheetal");
    expect(decodeURIComponent(href!)).toContain("consult");
  });

  test("Mobile quick-action WhatsApp button is configured with correct credentials", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.locator('a[aria-label*="WhatsApp" i]').first().waitFor({ state: "visible" });

    const mobileWhatsAppBtn = page.locator('a[aria-label*="WhatsApp" i]').first();
    await expect(mobileWhatsAppBtn).toBeVisible();

    const href = await mobileWhatsAppBtn.getAttribute("href");
    expect(href).toContain("wa.me/917827991551");
    expect(decodeURIComponent(href!)).toContain("Hello");
  });

  /* -------------------------------------------------------------------------- */
  /*                       Consultation Form Functionality Tests                */
  /* -------------------------------------------------------------------------- */

  test("Consultation form displays validation errors when submitted empty", async ({ page }) => {
    const form = page.locator("#contact-form");
    await form.scrollIntoViewIfNeeded();
    await expect(form).toBeVisible();

    const submitBtn = form.locator('button[type="submit"]');
    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.click();

    // Verify field validation error messages appear
    await expect(page.getByText("Please enter your full name")).toBeVisible();
    await expect(page.getByText("Enter a valid 10-digit mobile number")).toBeVisible();
    await expect(page.getByText("Please select a date")).toBeVisible();
    await expect(page.getByText("Please select a time slot")).toBeVisible();
  });

  test("Consultation form validates phone number to enforce 10 digits", async ({ page }) => {
    const form = page.locator("#contact-form");
    await form.scrollIntoViewIfNeeded();

    const phoneInput = form.locator('input[type="tel"]');
    await phoneInput.fill("12345"); // Incomplete phone number

    const submitBtn = form.locator('button[type="submit"]');
    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.click();

    await expect(page.getByText("Enter a valid 10-digit mobile number")).toBeVisible();
  });

  test("Consultation form completes full booking lifecycle with mocked API", async ({ page }) => {
    let capturedPayload: any = null;

    // Mock the appointment booking API route to verify request structure
    await page.route("**/api/book-appointment", async (route) => {
      const request = route.request();
      expect(request.method()).toBe("POST");
      capturedPayload = JSON.parse(request.postData() || "{}");

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          ok: true,
          name: capturedPayload.name,
          whatsappUrl: `https://wa.me/91${capturedPayload.phone}?text=Confirmation`,
        }),
      });
    });

    const form = page.locator("#contact-form");
    await form.scrollIntoViewIfNeeded();

    // 1. Select Condition / Category
    const categorySelect = form.locator('select').first();
    await categorySelect.selectOption({ index: 1 }); // Choose first service

    // 2. Fill Name
    const nameInput = form.locator("#appointment-name-input");
    await nameInput.fill("Ramesh Sharma");

    // 3. Fill 10-digit Phone
    const phoneInput = form.locator('input[type="tel"]');
    await phoneInput.fill("9876543210");

    // 4. Open Date Picker and select a future enabled date (ensuring slots are open)
    const datePickerBtn = form.locator('button:has-text("Select consultation date")');
    await datePickerBtn.click();

    // Select a future date from the calendar to guarantee morning & evening slots are active
    const availableDays = page.locator('div[role="dialog"], div.absolute button:not([disabled])').filter({
      hasText: /^[0-9]+$/,
    });
    // Pick the last day of the current calendar view (always a future date)
    await availableDays.last().click();

    // 5. Select Time Slot
    const timeSelect = form.locator('select[name="time"]');
    await expect(timeSelect).toBeEnabled();
    // Select the first valid slot (index 1, since index 0 is placeholder)
    await timeSelect.selectOption({ index: 1 });

    // 6. Add optional symptoms note
    const addNoteBtn = form.locator('button:has-text("+ Add symptoms")');
    if (await addNoteBtn.isVisible()) {
      await addNoteBtn.click();
      const concernTextarea = form.locator('textarea[name="concern"]');
      await concernTextarea.fill("Recurring headache and seasonal allergic rhinitis.");
    }

    // 7. Submit Form
    const submitBtn = form.locator('button[type="submit"]');
    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.click();

    // 8. Verify Confirmation Modal
    const confirmationTitle = page.getByText("Consultation Request Received!");
    await expect(confirmationTitle).toBeVisible({ timeout: 5000 });

    // Verify patient details in confirmation summary breakdown
    await expect(page.locator('text=Ramesh Sharma').first()).toBeVisible();
    await expect(page.locator('text=9876543210').first()).toBeVisible();

    // Verify backend received accurate payload
    expect(capturedPayload).not.toBeNull();
    expect(capturedPayload.name).toBe("Ramesh Sharma");
    expect(capturedPayload.phone).toBe("9876543210");
    expect(capturedPayload.concern).toContain("Recurring headache");

    // 9. Close confirmation modal
    const doneBtn = page.locator('button:has-text("Done")');
    await doneBtn.click();
    await expect(confirmationTitle).toBeHidden();
  });

  test("filters out past time slots and shows only future hours when today is selected", async ({ page }) => {
    const form = page.locator("#contact-form");
    await form.scrollIntoViewIfNeeded();

    // 1. Open Date Picker
    const datePickerBtn = form.locator('button:has-text("Select consultation date")');
    await datePickerBtn.click();

    // 2. Click "Today" button in the calendar footer if enabled
    const todayBtn = page.locator('div[role="dialog"], div.absolute').locator('button:has-text("Today")');
    if (await todayBtn.isEnabled()) {
      await todayBtn.click();

      // Check the options in the time select dropdown
      const timeSelect = form.locator('select[name="time"]');
      const options = await timeSelect.locator('option').allInnerTexts();

      // Determine current hour in India Standard Time
      const now = new Date();
      const istFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        hour12: false,
      });
      const currentHour = parseInt(istFormatter.format(now), 10);

      // If current hour is past 1:00 PM (13:00+), morning slots must NOT be shown
      if (currentHour >= 13) {
        expect(options.some((o) => o.includes("10:00 AM"))).toBe(false);
        expect(options.some((o) => o.includes("11:00 AM"))).toBe(false);
        expect(options.some((o) => o.includes("12:00 PM"))).toBe(false);
      }
    }
  });
});
