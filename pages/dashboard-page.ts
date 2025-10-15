import {expect,Page, Locator} from '@playwright/test';

export class DashboardPage{

    private readonly page: Page;
    private readonly siteAdminBtn: Locator;
    private readonly fieldmapMgrBtn: Locator;
    private readonly myProgramsBtn: Locator;
    private readonly addProgramBtn: Locator;
    private readonly cropLabel: Locator;
    private readonly cropDropDown: Locator;
    private readonly programLabel: Locator;
    private readonly programDropdown: Locator;
    private readonly launchProgramBtn: Locator;


    constructor(page: Page){
        this.page = page;
        this.siteAdminBtn = page.locator('[data-test="siteAdminButton"]').describe("Site Admin button");
        this.myProgramsBtn = page.locator('[data-test="myProgramsButton"]').describe("My Programs button");
        this.fieldmapMgrBtn = page.getByRole('button', { name: 'Fieldmap Manager' }).describe("Fieldmap Manager button");
        this.addProgramBtn = page.locator('[data-test="addProgramButton"]').describe("Add Program button");
        this.cropLabel = page.getByText('Crop').describe("Label for crop dropdown list")
        this.cropDropDown = page.locator('[data-test="dashboardCropDropdown"]').getByRole('textbox').describe("Crop Dropdown List");
        this.programLabel = page.getByText('Program', { exact: true }).describe("Label for program dropdown list");
        this.programDropdown = page.locator('[data-test="dashboardProgramDropdown"]').getByRole('textbox').describe("Program Dropdown List")
        this.launchProgramBtn = page.locator('[data-test="launchProgramButton"]').describe('Launch button')
    }

    async selectCropFromList(crop: string) {
        await this.page.getByRole('option', { name: crop }).first().click();
    }

    async selectProgramFromList(program: string) {
        await this.page.getByRole('option', { name: program }).first().click();
    }
    
    async goto(){
        await this.page.goto('/ibpworkbench/main/app/#/programs/my-studies');
        await this.page.waitForLoadState('networkidle');
    }
    async verifyDashboardURL(){
        await expect(this.page, 'Verify that the current page is Dashboard').toHaveURL('/ibpworkbench/main/app/#/programs/my-studies');
    }
    async verifySiteAdminBtn(){
        await expect(this.siteAdminBtn, 'Verify that Site Admin button is visible').toBeVisible();
    }
    async verifyMyProgramsBtn(){ 
        await expect(this.myProgramsBtn, 'Verify that My Programs button is visible').toBeVisible();
    }

    async verifyFieldmapManagerBtn(){
        await expect(this.fieldmapMgrBtn, 'Verify that Fieldmap Manager button is visible').toBeVisible();
    }
    async verifyAddProgramBtn(){
        await expect(this.addProgramBtn, 'Verify that Add Program is visible').toBeVisible();
    }

    async selectCrop(crop: string){
        await this.cropLabel.waitFor();
        await this.cropDropDown.waitFor();
        await this.cropDropDown.fill(crop);
        await this.selectCropFromList(crop);

    }

    async selectProgram(program: string){
        await this.programLabel.waitFor();
        await this.programDropdown.waitFor();
        await this.programDropdown.fill(program);
        await this.selectProgramFromList(program);

    }

    async launchProgram(){
        await this.launchProgramBtn.waitFor();
        await this.launchProgramBtn.click();
    }

    async clickAddProgram(){
        await this.addProgramBtn.waitFor();
        await this.addProgramBtn.click();
    }
}
