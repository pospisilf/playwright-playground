import { test, expect } from "@playwright/test";

const HOME_URL = "http://uitestingplayground.com/";

const DEFAULT_CLASS = "btn btn-primary";
const SUCCESS_CLASS = "btn btn-success";

test.describe("Click", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HOME_URL);
    await page.getByRole("link", { name: "Click" }).click();
    await expect(page).toHaveURL(/click/);
    await expect(page).toHaveTitle(/Click/);
  });

  test("click on button works and button changes color", async ({ page }) => {
    const button = page.getByRole("button", {
      name: "Button That Ignores DOM Click",
    });
    await expect(button).toBeVisible();
    await expect(await button.getAttribute("class")).toBe(DEFAULT_CLASS);
    await button.click();
    await expect(await button.getAttribute("class")).toBe(SUCCESS_CLASS);
  });
});
