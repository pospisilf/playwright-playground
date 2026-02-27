import { test, expect } from "@playwright/test";

const HOME_URL = "http://uitestingplayground.com/";
const MAX_LOAD_TIME = 10000;

test.describe("Dynamic ID", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HOME_URL);
    await page.getByRole("link", { name: "Dynamic ID" }).click();
    await expect(page).toHaveURL(/dynamicid/);
    await expect(page).toHaveTitle(/Dynamic ID/);
  });

  test("page loads and button appears within reasonable time", async ({
    page,
  }) => {
    let button = page.getByRole("button", { name: "Button with Dynamic ID" });
    await expect(button).toBeVisible();

    const BUTTON_ID_ORIGINAL = await button.getAttribute("id");
    console.log(BUTTON_ID_ORIGINAL);
    await button.click();

    button = page.getByRole("button", { name: "Button with Dynamic ID" });
    await expect(button).toBeVisible();

    const CHANGED_ID = await button.getAttribute("id");
    console.log(CHANGED_ID);

    // TODO: Why the ID is not changing?
  });
});
