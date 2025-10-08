import {expect, Page, test} from "@playwright/test";
import {generateRandomString, getFormattedDateYYY_MM_DD} from "../utilities";

export class CreateNewStudyPage {

  
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyCreateStudyIsVisible() {
        await expect(this.page.getByText('Create Study'), 'Verify that Create Study page is visible').toBeVisible();
    }

    async createNewStudy() {
        const studyName = `Test Study - ${generateRandomString(10)}`;
        const formattedDate = getFormattedDateYYY_MM_DD();

        await test.step('Fill in Study Details', async () => {
            await this.page.locator('[data-test="study-name-input"]').describe('Study Name').fill(studyName);
            await this.page.locator('[data-test="study-description-input"]').describe('Study Description').fill('Some Description');
            await this.page.getByRole('combobox').describe('Trial Type Combobox').getByRole('textbox').click();
            await this.page.getByRole('option', { name: 'Trial' }).describe('Trial Option').click();
            await this.page.locator('textarea').describe('Trial Objective').fill('Some Objective');
            await this.page.locator('[data-test="start-date-input"]').fill(formattedDate);
            await this.page.locator('[data-test="end-date-input"]').fill(formattedDate);
        });

        await test.step('Select a folder where study will be saved', async () => {
            await this.page.locator('[data-test="change-folder-button"]').click();
            await this.page.getByRole('heading', { name: 'Browse for studies' }).click();
            await this.page.getByRole('treeitem', { name: 'Studies' }).locator('div').click();
            await this.page.getByText('Select', { exact: true }).click();
        });

        await this.page.locator('[data-test="save-study-button"]').click();

        await expect(this.page.getByText('Study is created successfully'), 'Verify that study is saved successfully').toBeVisible();

        await this.page.waitForLoadState('networkidle');

        return studyName;
    }

}
