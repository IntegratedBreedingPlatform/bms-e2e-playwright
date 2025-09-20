import { test} from '@playwright/test';
import { DashboardPage } from '../pages/dashboard-page';
import { SideBarPage } from '../pages/sidebar-page';
import { AddProgramPage } from '../pages/add-program-page';

test.describe('Test Dashboard Page',()=>{

    test('verify adding a new program',async({browser })=>{
        // testUserContext with test user logged in
        const testUserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        const testUserPage = await testUserContext.newPage();

        const dashboard = new DashboardPage(testUserPage);
        const addProgram = new AddProgramPage(testUserPage);
        await dashboard.goToDashboardPage();
        await dashboard.clickAddProgram();
        await addProgram.selectCrop('maize');
        await addProgram.enterProgramName('TEST PROGRAM');
        await addProgram.enterStartDate('2025-09-19');
        await addProgram.selectBreedingLoc('Bulacan');
        await addProgram.selectStorageLoc('Default Seed Store');
        await addProgram.saveProgram();
        await addProgram.verifySaveProgramSuccess();

    });
});