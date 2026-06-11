import {Page,expect,Locator} from '@playwright/test';
import { selectors } from '../constants/selectors';

export class ProductsPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = this.page.locator(selectors.inventoryItem);
        this.cartLink = this.page.locator(selectors.cartLink);
        this.cartBadge = this.page.locator(selectors.cartBadge);
    }
    async verifyProductsPageIsVisible(): Promise<void> {
        await expect(this.inventoryItems.first()).toBeVisible();
    }

   async verifyCartIsEmpty(): Promise<void> {
        await expect(this.cartBadge).toBeHidden();
    }
    async addProductToCart(productId: string): Promise<void> {
        await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click();
    }

    async removeProductFromCart(productId: string): Promise<void> {
        await this.page.locator(`[data-test="remove-${productId}"]`).click();
    }

    async goToCart(): Promise<void> {
        await this.cartLink.click();
    }

    async verifyCartCount(expectedCount: number): Promise<void> {
        await expect(this.cartBadge).toHaveText(expectedCount.toString());
    }

    async verifyProductInCart(productName: string): Promise<void> {
        await expect(this.page.locator('.cart_item')).toContainText(productName);
    }
}