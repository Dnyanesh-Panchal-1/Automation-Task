import {test, expect} from '@playwright/test';
import {users} from '../test-data/users';
import {LoginPage} from '../pages/LoginPage';
import {ProductsPage} from '../pages/ProductsPage';
import {CartPage} from '../pages/CartPage';
import {CheckoutPage} from '../pages/CheckoutPage';

const validUser = users[0];
let loginPage: LoginPage;
let productsPage: ProductsPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await productsPage.addProductToCart('sauce-labs-backpack');
    await productsPage.goToCart();
    await cartPage.checkout();
});

test('TC_010: Checkout with valid details @checkout', async ({page}) => {
  await checkoutPage.fillCheckoutInformation('Bruce', 'Wayne', '401101');
  await checkoutPage.continueCheckout();

    await expect(page).toHaveURL(/checkout-step-two/);
});

test('TC_011: Checkout with missing first name @checkout @negative', async ({page}) => {
    await checkoutPage.fillCheckoutInformation('', 'Wayne', '401101');
    await checkoutPage.continueCheckout();

    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');
});

test('TC_012: Checkout with missing postal code @checkout @negative', async ({page}) => {
    await checkoutPage.fillCheckoutInformation('Bruce', 'Wayne', '');
    await checkoutPage.continueCheckout();

    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');
});

test('TC_014: Complete checkout process @checkout', async ({page}) => {
    await checkoutPage.fillCheckoutInformation('Bruce', 'Wayne', '401101');
    await checkoutPage.continueCheckout();
    await checkoutPage.finishOrder();
    await checkoutPage.verifyOrderCompletion();
});

test('TC_015: Cancel checkout process @checkout', async ({page}) => {
    await checkoutPage.fillCheckoutInformation('Bruce', 'Wayne', '401101');
    await checkoutPage.continueCheckout();
    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL(/inventory/);
});