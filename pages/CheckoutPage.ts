import {Page, expect, Locator} from '@playwright/test';
import { routes } from '../constants/routes';
import { messages } from '../constants/messages';
import { selectors } from '../constants/selectors';

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
        this.firstNameInput = page.locator(selectors.firstNameInput);
        this.lastNameInput = page.locator(selectors.lastNameInput);
        this.postalCodeInput = page.locator(selectors.postalCodeInput);
        this.continueButton = page.locator(selectors.continueButton);
        this.finishButton = page.locator(selectors.finishButton);
        this.errorMessage = page.locator(selectors.errorMessage);
        this.completeHeader = page.locator(selectors.completeHeader);
        this.cancelButton = page.locator(selectors.cancelButton);
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
    }

    async verifyCheckoutCancelled(): Promise<void> {
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
    
    async verifyCheckoutOverviewPage(): Promise<void> {
        await expect(this.page).toHaveURL(routes.checkoutOverview);
    }
   
}
