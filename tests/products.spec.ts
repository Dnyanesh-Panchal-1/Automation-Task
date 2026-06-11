import {test} from '@playwright/test';
import {products} from '../test-data/products';
import {ProductsPage} from '../pages/ProductsPage';
import {CartPage} from '../pages/CartPage';
import {loginAsStandardUser} from '../utils/testHelpers';


let productsPage: ProductsPage;
let cartPage: CartPage;

test.beforeEach(async ({page}) => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);

    await loginAsStandardUser(page);
});

test('TC_005: All the products should be displayed @cart @regression', async ({page}) => {
    await productsPage.verifyProductsPageIsVisible();
});

test('TC_006: Add a product to cart @regression', async ({page}) => {
    await productsPage.addProductToCart(products[0].id);
    await productsPage.verifyCartCount(1);
});

test('TC_007: Remove a product from a cart @cart @regression', async ({page}) => {
    await productsPage.addProductToCart(products[0].id);
    await productsPage.removeProductFromCart(products[0].id);

    await productsPage.verifyCartIsEmpty();
});

test('TC_008: Add multiple products to a cart @cart @regression', async ({page}) => {
    await productsPage.addProductToCart(products[0].id);
    await productsPage.addProductToCart(products[1].id);

    await productsPage.verifyCartCount(2);
});

test('TC_009: Cart should show selected products @cart @regression', async ({page}) => {
    await productsPage.addProductToCart(products[0].id);
    await productsPage.goToCart();

    await productsPage.verifyProductInCart(products[0].name);
});



