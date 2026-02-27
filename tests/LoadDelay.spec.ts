import { test, expect } from "@playwright/test";

const HOME_URL = "http://uitestingplayground.com/";
const MAX_LOAD_TIME = 10000;

test.describe("Load Delay", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HOME_URL);
    await page.getByText("Load Delay").click();
    await expect(page).toHaveURL(/loaddelay/);
    await expect(page).toHaveTitle(/Load Delays/);
  });

  test("page loads and button appears within reasonable time", async ({
    page,
  }) => {
    test.setTimeout(MAX_LOAD_TIME);

    const button = page.getByRole("button");
    await button.waitFor();
    await expect(button).toBeVisible();
  });
});
