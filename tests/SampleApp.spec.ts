import { test, expect } from "@playwright/test";

const HOME_URL = "http://uitestingplayground.com/";

const USERNAME = "whalebone_qa_assignment";
const VALID_PASSWORD = "pwd";
const INVALID_PASSWORD = "wrong";

const USERNAME_PLACEHOLDER = "User Name";
const PASSWORD_PLACEHOLDER = "********";
const LOGIN_LOCATOR = "#login";
const STATUS_LOCATOR = "#loginstatus";

const INVALID_CREDENTIALS_MESSAGE = "Invalid username/password";
const LOGGED_OUT_MESSAGE = "User logged out.";
const welcomeMessage = (username: string) => `Welcome, ${username}!`;

test.describe("Sample App", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HOME_URL);
    await page.getByText("Sample App").click();
    await expect(page).toHaveURL(/sampleapp/);
    await expect(page).toHaveTitle(/Sample App/);
  });

  test("valid credentials show welcome message", async ({ page }) => {
    await page.getByPlaceholder(USERNAME_PLACEHOLDER).fill(USERNAME);
    await page.getByPlaceholder(PASSWORD_PLACEHOLDER).fill(VALID_PASSWORD);
    await page.locator(LOGIN_LOCATOR).click();
    await expect(page.locator(STATUS_LOCATOR)).toHaveText(
      welcomeMessage(USERNAME),
    );
  });

  test("logout after login shows logged out message", async ({ page }) => {
    await page.getByPlaceholder(USERNAME_PLACEHOLDER).fill(USERNAME);
    await page.getByPlaceholder(PASSWORD_PLACEHOLDER).fill(VALID_PASSWORD);
    await page.locator(LOGIN_LOCATOR).click();
    await expect(page.locator(STATUS_LOCATOR)).toHaveText(
      welcomeMessage(USERNAME),
    );

    await page.locator(LOGIN_LOCATOR).click();
    await expect(page.locator(STATUS_LOCATOR)).toHaveText(LOGGED_OUT_MESSAGE);
  });

  test("wrong password shows invalid credentials error", async ({ page }) => {
    await page.getByPlaceholder(USERNAME_PLACEHOLDER).fill(USERNAME);
    await page.getByPlaceholder(PASSWORD_PLACEHOLDER).fill(INVALID_PASSWORD);
    await page.locator(LOGIN_LOCATOR).click();
    await expect(page.locator(STATUS_LOCATOR)).toHaveText(
      INVALID_CREDENTIALS_MESSAGE,
    );
  });

  test("empty username shows invalid credentials error", async ({ page }) => {
    await page.getByPlaceholder(PASSWORD_PLACEHOLDER).fill(VALID_PASSWORD);
    await page.locator(LOGIN_LOCATOR).click();
    await expect(page.locator(STATUS_LOCATOR)).toHaveText(
      INVALID_CREDENTIALS_MESSAGE,
    );
  });

  test("empty password shows invalid credentials error", async ({ page }) => {
    await page.getByPlaceholder(USERNAME_PLACEHOLDER).fill(USERNAME);
    await page.locator(LOGIN_LOCATOR).click();
    await expect(page.locator(STATUS_LOCATOR)).toHaveText(
      INVALID_CREDENTIALS_MESSAGE,
    );
  });

  test("empty form shows invalid credentials error", async ({ page }) => {
    await page.locator(LOGIN_LOCATOR).click();
    await expect(page.locator(STATUS_LOCATOR)).toHaveText(
      INVALID_CREDENTIALS_MESSAGE,
    );
  });
});
