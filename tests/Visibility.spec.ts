import { test, expect } from "@playwright/test";

const HOME_URL = "http://uitestingplayground.com/";

test.describe("Visibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HOME_URL);
    await page.getByText("Visibility").click();
    await expect(page).toHaveURL(/visibility/);
    await expect(page).toHaveTitle(/Visibility/);
  });

  test("all buttons are visible in the beginning", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Removed" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Zero Width" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Overlapped" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Opacity" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Visibility Hidden" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Display None" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Offscreen" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Hide" })).toBeVisible();
  });
});
