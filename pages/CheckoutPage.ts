import {Page, expect} from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.page.locator('[data-test="firstName"]').fill(firstName);
        await this.page.locator('[data-test="lastName"]').fill(lastName);
        await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    }

    async continueCheckout(): Promise<void> {
        await this.page.locator('[data-test="continue"]').click();
    }

    async verifyValidationMessage(expectedMessage: string): Promise<void> {
        await  expect(this.page.locator('[data-test="error"]')  ).toContainText(expectedMessage);
    }

    async finishOrder(): Promise<void> {
        await this.page.locator('[data-test="finish"]').click();
    }

    async verifyOrderCompletion(): Promise<void> {
        await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!');
    }       
}
