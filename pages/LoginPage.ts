import { Page, Locator, expect } from '@playwright/test'; 
import { routes } from '../constants/routes';
import {selectors} from '../constants/selectors'

export class LoginPage { 
  readonly page: Page; 
  readonly usernameInput: Locator; 
  readonly passwordInput: Locator; 
  readonly loginButton: Locator; 
  readonly errorMessage: Locator; 
 
  constructor(page: Page) { 
    this.page = page; 
    this.usernameInput = page.locator(selectors.usernameInput); 
    this.passwordInput = page.locator(selectors.passwordInput); 
    this.loginButton = page.locator(selectors.loginButton); 
    this.errorMessage = page.locator(selectors.errorMessage); 
  } 
 
  async goto(): Promise<void> { 
    await this.page.goto(routes.login); 
  } 
 
  async login(username: string, password: string): Promise<void> { 
    await this.usernameInput.fill(username); 
    await this.passwordInput.fill(password); 
    await this.loginButton.click(); 
  } 

  async verifySuccessfulLogin(): Promise<void> {
    await expect(this.page).toHaveURL(routes.products);
  }
 
 
  async verifyLoginPageIsVisible(): Promise<void> { 
    await expect(this.usernameInput).toBeVisible(); 
    await expect(this.passwordInput).toBeVisible(); 
    await expect(this.loginButton).toBeVisible(); 
  } 
 
  async verifyErrorMessage(expectedMessage: string): Promise<void> { 
    await expect(this.errorMessage).toContainText(expectedMessage); 
  } 

  async logout(): Promise<void> {
    await this.page.click(selectors.menuButton);
    await this.page.click(selectors.logoutButton);
  }

  async verifyLogout(): Promise<void> {
    await expect(this.page).toHaveURL(routes.login);
  }

} 