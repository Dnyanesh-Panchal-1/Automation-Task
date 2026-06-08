import {test, expect} from '@playwright/test';
import { users } from '../test-data/users';

const validUser = users[0];
const lockedOutUser = users[1];
const problemUser = users[2];

test('TC_001: Login Page should load successfully', async ({page}) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="username"]')).toBeVisible();
  await expect(page.locator('[data-test="password"]')).toBeVisible();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});

test('TC_002: Valid user should be able to login', async ({page}) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', validUser.username);
  await page.fill('[data-test="password"]', validUser.password);
  await page.click('[data-test="login-button"]');
  await expect(page).toHaveURL(/inventory/);
});

test('TC_003: Invalid password should display error message', async ({page}) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', validUser.username);
  await page.fill('[data-test="password"]', 'wrong_password');
  await page.click('[data-test="login-button"]');
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('TC_004: Locked out user should not be able to login', async ({page}) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', lockedOutUser.username);
  await page.fill('[data-test="password"]', lockedOutUser.password);
  await page.click('[data-test="login-button"]');
  await expect(page.locator('[data-test="error"]')).toContainText(/locked out/);
});

