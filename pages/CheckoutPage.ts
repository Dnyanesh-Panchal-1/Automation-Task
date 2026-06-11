import {Page, expect, Locator} from '@playwright/test';
import { routes } from '../constants/routes';
import { messages } from '../constants/messages';
import {checkoutData} from '../test-data/checkoutData';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator; 
    readonly errorMessage: Locator;
    readonly completeHeader: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.completeHeader = page.locator('.complete-header');
        this.cancelButton = page.locator('[data-test="cancel"]');
    }
    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueCheckout(): Promise<void> {
        await this.continueButton.click();
    }

    async cancelCheckout(): Promise<void> {
        await this.cancelButton.click();
        await expect(this.page).toHaveURL(routes.products);
    }

    async verifyValidationMessage(expectedMessage: string): Promise<void> {
        await  expect(this.errorMessage).toContainText(expectedMessage);
    }

    async finishOrder(): Promise<void> {
        await this.finishButton.click();
    }

    async verifyOrderCompletion(): Promise<void> {
        await expect(this.completeHeader).toHaveText(messages.orderSuccess);
    }      
    
   
}
