import {test, expect} from '@playwright/test';
import { users } from '../test-data/users';
import {LoginPage} from '../pages/LoginPage';
import { routes } from '../constants/routes';
import { messages } from '../constants/messages';

const validUser = users[0];
const lockedOutUser = users[1];



test('TC_001: Login Page should load successfully @smoke', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.verifyLoginPageIsVisible();
});

test('TC_002: Valid user should be able to login @smoke', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(validUser.username, validUser.password);
});

test('TC_003: Invalid password should display error message @negative', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(validUser.username, 'wrong_password');
  await loginPage.verifyErrorMessage(messages.invalidCredentials);
});

test('TC_004: Locked out user should not be able to login @negative', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(lockedOutUser.username, lockedOutUser.password);
  await loginPage.verifyErrorMessage(messages.lockedOutError);
});

test('TC_013: User should be able to logout successfully @smoke', async ({page}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(validUser.username, validUser.password);
  await loginPage.Logout();
});

