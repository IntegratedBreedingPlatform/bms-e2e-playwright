import { Page } from "@playwright/test";

export class ManageStudiesPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickStartNewStudy() {
        await this.page.locator('[data-test="startNewStudyButton"]').click();
    }


}