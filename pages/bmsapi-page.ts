import {expect,Page, Locator} from '@playwright/test';

export class BMSAPIPage{
    private readonly page: Page;
    private readonly bmsapiHeading: Locator;

    constructor(page: Page){
        this.page = page;
        this.bmsapiHeading = page.getByRole('heading', { name: 'BMSAPI' });
    }

    async goToBMSAPI(){
        await this.page.goto('/bmsapi');
    }

    async verifyBMSAPIHeading(){
        await expect(this.bmsapiHeading).toBeVisible();
    }
}