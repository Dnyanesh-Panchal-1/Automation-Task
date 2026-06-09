import {Page,expect} from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async verifyProductsPageIsVisible(): Promise<void> {
        await expect(this.page.locator('.inventory_item')).toHaveCount(6);
    }

    async addProductToCart(productId: string): Promise<void> {
        await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click();
    }

    async removeProductFromCart(productId: string): Promise<void> {
        await this.page.locator(`[data-test="remove-${productId}"]`).click();
    }

    async goToCart(): Promise<void> {
        await this.page.locator('.shopping_cart_link').click();
    }

    async verifyCartCount(expectedCount: number): Promise<void> {
        await expect(this.page.locator('.shopping_cart_badge')).toHaveText(expectedCount.toString());
    }
}