import { test, expect } from "@playwright/test";

const HOME_URL = "http://uitestingplayground.com/";

const START_BUTTON = "#startButton";
const STOP_BUTTON = "#stopButton";

const TARGET_PROGRESS = 75;
const TOLERANCE = 3;

test.describe("Progress Bar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HOME_URL);
    await page.getByText("Progress Bar").click();
    await expect(page).toHaveURL(/progressbar/);
    await expect(page).toHaveTitle(/Progress Bar/);
  });

  test("stops progress bar close to 75%", async ({ page }) => {
    await page.locator(START_BUTTON).click();

    await page.waitForFunction((target) => {
      const bar = document.querySelector("#progressBar");
      return parseInt(bar?.getAttribute("aria-valuenow") ?? "0") >= target;
    }, TARGET_PROGRESS);

    await page.locator(STOP_BUTTON).click();

    const rawValue = await page
      .locator("#progressBar")
      .getAttribute("aria-valuenow");
    const stoppedValue = parseInt(rawValue ?? "0");

    expect(Math.abs(stoppedValue - TARGET_PROGRESS)).toBeLessThanOrEqual(
      TOLERANCE,
    );
  });
});
