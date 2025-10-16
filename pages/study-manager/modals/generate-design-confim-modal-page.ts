import {expect, Page} from "@playwright/test";

export class GenerateDesignConfirmModalPage {

    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async isVisible() {
        await expect(this.page.getByRole('heading', { name: 'Confirmation' })).toBeVisible();
        await expect(this.page.getByText('Experimental Design generated successfully. Would you like to specify additional details?')).toBeVisible();
    }

    async clickYes() {
        await this.page.locator('[data-test="modalConfirmButton"]').click();
        await this.page.waitForLoadState('networkidle');
    }

}



