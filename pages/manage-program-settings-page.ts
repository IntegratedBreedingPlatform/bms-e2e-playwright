import { expect, Page } from "@playwright/test";

export class ManageProgramSettingsPage {
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async verifyManageProgramSettingsPageIsVisible(){
        await expect(this.page.getByRole('heading', { name: 'Manage Program Settings' })).toBeVisible();
    }

    async navigateToTab(tabName: 'Basic Details' | 'Members' | 'Locations' | 'Breeding Methods'){
        await expect(this.page.getByRole('link', { name: tabName })).toBeVisible();
        await this.page.getByRole('link', { name: tabName }).click();
    }

    async verifyBasicDetailsTabIsActive(){
    
        await expect(this.page.getByRole('tabpanel')).toMatchAriaSnapshot(`
          - button " Reset"
          - button "Delete"
          - button " Save"
          `);
    };

    async clickDeleteButton(){
        await this.page.getByRole('button', { name: 'Delete' }).click();
    }

    async confirmDeleteProgram(){
        await expect(this.page.getByText('Are you sure you want to delete the program?')).toBeVisible();
        await this.page.getByRole('button', { name: 'Confirm' }).click();
        
        await this.page.waitForLoadState('networkidle');

        await expect(this.page.getByText('The program was deleted successfully')).toBeVisible();
    }


}