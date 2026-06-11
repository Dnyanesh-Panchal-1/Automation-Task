import {test, expect} from '@playwright/test';
import {users} from '../test-data/users';
import {products} from '../test-data/products';
import {LoginPage} from '../pages/LoginPage';
import {ProductsPage} from '../pages/ProductsPage';
import {CartPage} from '../pages/CartPage';
import {loginAsStandardUser} from '../utils/testHelpers';


const validUser = users[0];
let loginPage: LoginPage;
let productsPage: ProductsPage;
let cartPage: CartPage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);

    await loginAsStandardUser(page);
});

test('TC_005: All the products should be displayed @cart @regression', async ({page}) => {
    await productsPage.verifyProductsPageIsVisible();
});

test('TC_006: Add a product to cart @regression', async ({page}) => {
    await productsPage.addProductToCart('sauce-labs-backpack');
    await productsPage.verifyCartCount(1);
});

test('TC_007: Remove a product from a cart @cart @regression', async ({page}) => {
    await productsPage.addProductToCart('sauce-labs-backpack');
    await productsPage.removeProductFromCart('sauce-labs-backpack');
    
    await productsPage.verifyCartIsEmpty();
});

test('TC_008: Add multiple products to a cart @cart @regression', async ({page}) => {
    await productsPage.addProductToCart('sauce-labs-backpack');
    await productsPage.addProductToCart('sauce-labs-bike-light');

    await productsPage.verifyCartCount(2);
});

test('TC_009: Cart should show selected products @cart @regression', async ({page}) => {
    await productsPage.addProductToCart('sauce-labs-backpack');
    await productsPage.goToCart();

    await productsPage.verifyProductInCart(products[0].name);
});



