import {expect, Page} from "@playwright/test";

export class GenerateDesignModalPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async isVisible() {
        await this.page.getByRole('heading', { name: 'Generate Design' }).waitFor();
        await expect(this.page.getByRole('heading', { name: 'Generate Design' })).toBeVisible();
        await expect(this.page.locator('jhi-modal')).toMatchAriaSnapshot(`
        - text: "STUDY ENVIRONMENT Choose the study environment you would like to generate the design:"
        - textbox "Search..."
        - button ""
        - table:
          - rowgroup:
            - row "TRIAL_INSTANCE LOCATION_NAME":
              - cell:
                - checkbox [checked]
              - cell "TRIAL_INSTANCE"
              - cell "LOCATION_NAME"
        `);
    }

    async selectAll() {
        await this.page.getByRole('row', { name: 'TRIAL_INSTANCE LOCATION_NAME' }).getByRole('checkbox').check();
    }

    async generate() {
        await this.page.getByRole('button', { name: 'Generate' }).click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.getByRole('heading', { name: 'Generate Design' })).toBeHidden();
    }

}
