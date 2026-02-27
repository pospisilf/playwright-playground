import { test, expect } from "@playwright/test";

const HOME_URL = "http://uitestingplayground.com/";

test.describe("Mouse Over", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HOME_URL);
    await page.getByRole("link", { name: "Mouse Over" }).click();
    await expect(page).toHaveURL(/mouseover/);
    await expect(page).toHaveTitle(/Mouse Over/);
  });

  test("click me", async ({ page }) => {
    const counterLocator = page.locator("#clickCount");
    await expect(counterLocator).toBeVisible();
    let counterValue = await counterLocator.textContent();
    expect(counterValue).toBe("0");

    const clickMe = page.getByText("Click me");
    await expect(clickMe).toBeVisible();
    await clickMe.dblclick();

    counterValue = await counterLocator.textContent();
    expect(counterValue).toBe("2");
  });

  test("link button", async ({ page }) => {
    const counterLocator = page.locator("#clickButtonCount");
    await expect(counterLocator).toBeVisible();
    let counterValue = await counterLocator.textContent();
    expect(counterValue).toBe("0");

    const clickMe = page.getByText("Link Button");
    await expect(clickMe).toBeVisible();
    await clickMe.dblclick();

    counterValue = await counterLocator.textContent();
    expect(counterValue).toBe("2");
  });
});
