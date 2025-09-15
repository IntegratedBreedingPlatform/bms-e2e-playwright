import { test} from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';

test.describe('Test Dashboard Page',()=>{

    test('verify launching a program',async({page})=>{
        const login = new LoginPage(page);
        await login.goToLoginPage();
        await page.waitForLoadState('networkidle');
        //Enter login credentials
        await login.enterUsername("admin");
        await login.enterPassword("@dm1N");
        await login.clickLogin();
        const dashboard = new DashboardPage(page);

        await dashboard.selectCrop('maize');
        await dashboard.selectProgram('TestingProgram');
        await dashboard.launchProgram();
    });
});