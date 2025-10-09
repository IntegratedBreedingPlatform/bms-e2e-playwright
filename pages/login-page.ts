import {expect,Page, Locator} from '@playwright/test';

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

    async fillUsername(username: string){
        await this.usernameFld.waitFor();
        await this.usernameFld.fill(username);
    }

     async fillPassword(password: string){
        await this.passwordFld.waitFor();
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
        await this.fillUsername("admin");
        await this.fillPassword("@dm1N");
        await this.clickLogin();

        // Give a small delay to ensure all storage is properly set
        await this.page.waitForTimeout(1000);
    }
}
