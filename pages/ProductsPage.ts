import {Page,expect,Locator} from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = this.page.locator('.inventory_item');
        this.cartLink = this.page.locator('.shopping_cart_link');
        this.cartBadge = this.page.locator('.shopping_cart_badge');
    }
    async verifyProductsPageIsVisible(): Promise<void> {
        await expect(this.inventoryItems).toHaveCount(6);
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