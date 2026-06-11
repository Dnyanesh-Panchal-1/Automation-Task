import { Page, Locator, expect } from '@playwright/test'; 
import { routes } from '../constants/routes';
import { messages } from '../constants/messages';
import {users} from '../test-data/users';

const validUser = users[0];
const lockedOutUser = users[1];


export class LoginPage { 
  readonly page: Page; 
  readonly usernameInput: Locator; 
  readonly passwordInput: Locator; 
  readonly loginButton: Locator; 
  readonly errorMessage: Locator; 
 
  constructor(page: Page) { 
    this.page = page; 
    this.usernameInput = page.locator('[data-test="username"]'); 
    this.passwordInput = page.locator('[data-test="password"]'); 
    this.loginButton = page.locator('[data-test="login-button"]'); 
    this.errorMessage = page.locator('[data-test="error"]'); 
  } 
 
  async goto(): Promise<void> { 
    await this.page.goto(routes.login); 
  } 
 
  async login(username: string, password: string): Promise<void> { 
    await this.usernameInput.fill(username); 
    await this.passwordInput.fill(password); 
    await this.loginButton.click(); 
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
} 