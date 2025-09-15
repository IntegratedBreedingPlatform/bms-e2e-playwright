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

    async goToLoginPage(){
        await this.page.goto('/ibpworkbench/main/app/#/login?logout');
    }

    async enterUsername(username: string){
        await this.usernameFld.waitFor();
        await this.usernameFld.fill(username);
    }

     async enterPassword(password: string){
        await this.passwordFld.waitFor();
        await this.passwordFld.fill(password);
    }

    async clickLogin(){
        await this.loginBtn.waitFor();
        await this.loginBtn.click();
    }

    

}
