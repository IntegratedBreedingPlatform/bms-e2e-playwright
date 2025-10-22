import {expect,Page, Locator} from '@playwright/test';
import { TEST_PASSWORD, TEST_USERNAME } from './app.constants';

export class LoginPage{
    private readonly page: Page;
    private readonly usernameFld: Locator;
    private readonly passwordFld: Locator;
    private readonly loginBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.usernameFld = page.getByRole('textbox', { name: 'Username' }).describe("Username field");
        this.passwordFld = page.locator('[name="password"]')
        this.loginBtn = page.getByRole('button', { name: 'Sign In' }).describe("Login button");
    }

    async goto(){
        await this.page.goto('/ibpworkbench/main/app/#/login?logout');
    }

    async fillUsername(username: any){
        await this.usernameFld.waitFor();
        await expect(username, 'Ensure that username is provided').not.toBeUndefined();
        await this.usernameFld.fill(username);
    }

    async fillPassword(password: any){
        await this.passwordFld.waitFor();
        await expect(password, 'Ensure that password is provided').not.toBeUndefined();
        await this.passwordFld.fill(password);
    }

    async clickLogin(){
        await this.loginBtn.waitFor();
        await this.loginBtn.click();
    }


    async authenticate() {
        await this.goto();
        await this.page.waitForLoadState('networkidle');
        // Perform authentication steps
        await this.fillUsername(TEST_USERNAME);
        await this.fillPassword(TEST_PASSWORD);

        await Promise.all([
            this.page.waitForResponse(
                response => response.url().includes('/bmsapi/auth/validateLogin') && response.status() === 200
            ),
            this.clickLogin()
        ]);

        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('load');
        // Give a small delay to ensure all storage is properly set
        await this.page.waitForTimeout(3000);

    }
}
