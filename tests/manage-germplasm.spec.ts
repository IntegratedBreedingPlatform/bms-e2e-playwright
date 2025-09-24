import { test} from '@playwright/test';
import { DashboardPage } from '../pages/dashboard-page';
import { SideBarPage } from '../pages/sidebar-page';
import { ManageGermplasmPage } from '../pages/manage-germplasm-page';

test.describe('Test Manage Germplasm Page',()=>{

    test('verify viewing pedigree graph of a germplasm',async({browser })=>{
        // testUserContext with test user logged in
        const testUserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        const testUserPage = await testUserContext.newPage();

        const dashboard = new DashboardPage(testUserPage); 
        const sidebar = new SideBarPage(testUserPage);
        const manageGermplasm = new ManageGermplasmPage(testUserPage);

        //Go to Dashboard and launch a program
        await dashboard.goToDashboardPage();
        await dashboard.selectCrop('maize');
        await dashboard.selectProgram('TestingProgram');
        await dashboard.launchProgram();

        //Go to Manage Germplasm Page
        await sidebar.expandSidebarTree('Germplasm');
        await sidebar.clickSideBarMenu('Manage Germplasm');
        await sidebar.verifyPageHeading('Germplasm Manager');

        //Click first GID link
        await testUserPage.pause()
        //await manageGermplasm.filterByGID('1');
        await manageGermplasm.clickGermplasmNameLink('CML8493');
    

    });
});