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

    private selectCropFromList(crop: string): Locator {
        return this.page.getByRole('option', { name: crop });
    }

    private selectProgramFromList(program: string): Locator {
        return this.page.getByRole('option', { name: program });
    }

    async verifyDashboardURL(){
        await expect(this.page).not.toHaveURL('/app/#/programs/my-studies');
    }
    async verifySiteAdminBtn(){
        await expect(this.siteAdminBtn).toBeVisible();

    }
    async verifyMyProgramsBtn(){ 
        await expect(this.myProgramsBtn).toBeVisible();
    }

    async verifyFieldmapManagerBtn(){
        await expect(this.fieldmapMgrBtn).toBeVisible();
    }
    async verifyAddProgramBtn(){
        await expect(this.addProgramBtn).toBeVisible();
    }

    async selectCrop(crop: string){
        await expect(this.cropLabel).toBeVisible();
        await expect(this.cropDropDown).toBeVisible();
        await this.cropDropDown.fill(crop);
        await this.selectCropFromList(crop).click();

    }

    async selectProgram(program: string){
        await expect(this.programLabel).toBeVisible();
        await expect(this.programDropdown).toBeVisible();
        await this.programDropdown.fill(program);
        await this.selectProgramFromList(program).click();

    }

    async launchProgram(){
        await this.launchProgramBtn.waitFor();
        await this.launchProgramBtn.click();
    }
}