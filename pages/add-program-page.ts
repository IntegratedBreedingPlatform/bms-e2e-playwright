import {expect,Page, Locator} from '@playwright/test';

export class AddProgramPage{
    private readonly page: Page;
    private readonly cropDropDown: Locator;
    private readonly programNameTxtBox: Locator;
    private readonly programStartDate: Locator;
    private readonly programBreedingLoc: Locator;
    private readonly programStorageLoc: Locator;
    private readonly saveProgramBtn: Locator;
    private readonly saveProgramSuccessMsg: Locator;


    constructor(page: Page){
        this.page = page;
        this.cropDropDown = this.page.locator('[data-test="cropDropdown"]').getByRole('textbox').describe('Add Program - crop dropdown list');
        this.programNameTxtBox = this.page.locator('[data-test="programNameTextbox"]').describe('Add Program - program name text box');
        this.programStartDate = this.page.locator('[data-test="startDateTextbox"]').describe('Program Start Date field');
        this.programBreedingLoc = this.page.locator('#dropdownBreedingLocations').getByRole('textbox').describe('Default Breeding Location list');
        this.programStorageLoc = this.page.locator('#dropdownStorageLocations').getByRole('textbox').describe('Default Program Location list');
        this.saveProgramBtn = this.page.locator('[data-test="saveProgramButton"]').describe('Save Program button');
        this.saveProgramSuccessMsg = this.page.getByText('The program was created').describe('Save program success message');
    }

    private selectCropFromList(crop: string): Locator {
        return this.page.getByRole('option', { name: crop });
    }

    private selectBreedingLocFromList(breedingLoc: string){
        return this.page.getByText(breedingLoc);
    }

    private selectStorageLocFromList(storageLoc: string){
        return this.page.getByText(storageLoc);
    }

    async selectCrop(crop: string){
        await this.cropDropDown.waitFor();
        await this.cropDropDown.fill(crop);
        await this.selectCropFromList(crop).click();

    }

    async enterProgramName(program: string){
        await this.programNameTxtBox.waitFor();
        await this.programNameTxtBox.fill(program);
    }

    async enterStartDate(date:string){
        await this.programStartDate.waitFor();
        await this.programStartDate.fill(date);
    }

    async selectBreedingLoc(breedingLoc: string){
        await this.programBreedingLoc.waitFor();
        await this.programBreedingLoc.fill(breedingLoc);
        await this.selectBreedingLocFromList(breedingLoc).click();
    }

    async selectStorageLoc(storageLoc: string){
        await this.programStorageLoc.waitFor();
        await this.programStorageLoc.fill(storageLoc);
        await this.selectStorageLocFromList(storageLoc).click();
    }

    async saveProgram(){
        await this.saveProgramBtn.waitFor();
        await this.saveProgramBtn.click();
    }

    async verifySaveProgramSuccess(){
        await expect(this.saveProgramSuccessMsg).toBeVisible;
    }
}