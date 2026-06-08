import {test, expect} from '@playwright/test';
import {users} from '../test-data/users';

const validUser = users[0];

test.beforeEach(async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill(validUser.username);
    await page.locator('[data-test="password"]').fill(validUser.password);
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();
});

test('TC_010: Checkout with valid details', async ({page}) => {
    await page.locator('[data-test="firstName"]').fill('Bruce');
    await page.locator('[data-test="lastName"]').fill('Wayne');
    await page.locator('[data-test="postalCode"]').fill('401101');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-two/);
});

test('TC_011: Checkout with missing first name', async ({page}) => {
    await page.locator('[data-test="lastName"]').fill('Wayne');
    await page.locator('[data-test="postalCode"]').fill('401101');
    await page.locator('[data-test="continue"]').click();
    
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');
});

test('TC_012: Checkout with missing postal code', async ({page}) => {
    await page.locator('[data-test="firstName"]').fill('Bruce');
    await page.locator('[data-test="lastName"]').fill('Wayne');
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');
});