import { test} from '@playwright/test';
import { SideBarPage } from '../pages/sidebar-page';
import { DashboardPage } from '../pages/dashboard-page';

test.describe('Test Dashboard Page',()=>{

    test('verify sidebar links',async({browser })=>{
        // testUserContext with test user logged in
        const testUserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        const testUserPage = await testUserContext.newPage();

        const dashboard = new DashboardPage(testUserPage);
        const sidebar = new SideBarPage(testUserPage);
        await dashboard.goToDashboardPage();

        await dashboard.selectCrop('maize');
        await dashboard.selectProgram('TestingProgram');
        await dashboard.launchProgram();
        await testUserPage.pause();
        await sidebar.expandSidebarTree('Germplasm')
        await sidebar.clickSideBarMenu('Manage Germplasm')

    });
});