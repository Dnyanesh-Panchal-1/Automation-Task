import {Page, expect, Locator} from '@playwright/test';
import { selectors } from '../constants/selectors';

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator(selectors.checkoutButton);
    }

    async verifyProductInCart(productName: string): Promise<void> {
        await expect(this.page.getByText(productName)).toBeVisible();
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }
}
