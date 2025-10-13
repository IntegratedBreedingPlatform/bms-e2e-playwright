import {expect,Page, Locator} from '@playwright/test';
import { generateRandomString, getFormattedDateYYY_MM_DD } from './utilities';
import { TEST_BREEDING_LOCATION, TEST_CROP, TEST_PROGRAM_NAME, TEST_STORAGE_LOCATION } from './app.constants';

export class AddProgramPage{
    private readonly page: Page;
    private readonly cropDropDown: Locator;
    private readonly programNameTxtBox: Locator;
    private readonly programStartDate: Locator;
    private readonly programBreedingLoc: Locator;
    private readonly programStorageLoc: Locator;
    private readonly saveProgramBtn: Locator;
    private newProgramName: string;

    constructor(page: Page){
        this.page = page;
        this.cropDropDown = this.page.locator('[data-test="cropDropdown"]').getByRole('textbox').describe('Add Program - crop dropdown list');
        this.programNameTxtBox = this.page.locator('[data-test="programNameTextbox"]').describe('Add Program - program name text box');
        this.programStartDate = this.page.locator('[data-test="startDateTextbox"]').describe('Program Start Date field');
        this.programBreedingLoc = this.page.locator('#dropdownBreedingLocations').getByRole('textbox').describe('Default Breeding Location list');
        this.programStorageLoc = this.page.locator('#dropdownStorageLocations').getByRole('textbox').describe('Default Program Location list');
        this.saveProgramBtn = this.page.locator('[data-test="saveProgramButton"]').describe('Save Program button');
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

    async verifySaveProgramSuccess() {
        const saveProgramSuccessMsg = this.page.locator('div').filter({ hasText: 'The program was created' }).first().describe('Save program success message');
        expect(saveProgramSuccessMsg, 'Verify that program is saved successfully').toBeVisible;
    }

     async createNewProgram() {

        const formattedDate = getFormattedDateYYY_MM_DD();
        const program = `${TEST_PROGRAM_NAME} - [${generateRandomString(10)}]`;
        this.newProgramName = program;

        await this.selectCrop(TEST_CROP);
        await this.enterProgramName(program);
        await this.enterStartDate(formattedDate);
        await this.selectBreedingLoc(TEST_BREEDING_LOCATION);
        await this.selectStorageLoc(TEST_STORAGE_LOCATION);
        await this.saveProgram();
        await this.verifySaveProgramSuccess();
        await this.page.waitForLoadState('networkidle');

        return program;
    }

    getNewProgramName(){
        return this.newProgramName;
    }


}