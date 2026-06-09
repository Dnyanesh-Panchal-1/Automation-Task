import {test, expect} from '@playwright/test';
import {users} from '../test-data/users';
import {products} from '../test-data/products';

const validUser = users[0];

test.beforeEach(async ({page}) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(validUser.username);
  await page.locator('[data-test="password"]').fill(validUser.password);
  await page.locator('[data-test="login-button"]').click();
});

test('TC_005: All the products should be displayed', async ({page}) => {
    const inventoryItems = page.locator('.inventory_item');
    await expect(inventoryItems).toHaveCount(6);
});

test('TC_006: Add a product to cart', async ({page}) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
});

test('TC_007: Remove a product from a cart', async ({page}) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});

test('TC_008: Add multiple products to a cart', async ({page}) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});

test('TC_009: Cart should show selected products', async ({page}) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();

    await expect(page.getByText(products[0].name)).toBeVisible();
});



