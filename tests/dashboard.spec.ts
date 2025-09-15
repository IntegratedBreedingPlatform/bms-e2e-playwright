import { test} from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';

test.describe('Test Dashboard Page',()=>{

    test('verify launching a program',async({browser })=>{
        // testUserContext with test user logged in
        const testUserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        const testUserPage = await testUserContext.newPage();

        const dashboard = new DashboardPage(testUserPage);
        await dashboard.goToDashboardPage();

        await dashboard.selectCrop('maize');
        await dashboard.selectProgram('TestingProgram');
        await dashboard.launchProgram();
    });
});