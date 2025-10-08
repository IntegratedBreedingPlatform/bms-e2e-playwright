import {expect, Page, test} from "@playwright/test";
import {generateRandomString, getFormattedDateYYY_MM_DD} from "./utilities";

export class SaveGermplasmListModalPage {

    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async verifyModalIsVisible() {
        await expect(this.page.getByText('Save list'), 'Verify Save List modal is visible').toBeVisible();
    }

    async createNewList() {

        const formattedDate = getFormattedDateYYY_MM_DD();
        const listName = `TEST_GERMPLASM_LIST_NAME - ${generateRandomString(10)}`;

        await test.step('Fill in Germplasm List Details', async () => {
            await this.page.locator('[data-test="name"]').describe('Germplasm List Name').fill(listName);
            await this.page.locator('[data-test="description"]').describe('Germplasm List Description').fill('Some Description');
            await this.page.getByRole('textbox', { name: 'Notes' }).describe('Germplasm List Notes').fill('Some Notes');
            await this.page.locator('[data-test="date"]').describe('Germplasm List Date').fill(formattedDate);
            await this.page.getByLabel('Program lists').locator('div').describe('Select Program List folder').filter({ hasText: 'Program lists' }).click();
            await this.page.locator('[data-test="saveList"]').click();
        })


        await this.page.waitForLoadState("networkidle");
        await expect(this.page.getByText('Germplasm list saved'), 'Verify germplasm list is saved successfully').toBeVisible();

        return listName;
    }
}
