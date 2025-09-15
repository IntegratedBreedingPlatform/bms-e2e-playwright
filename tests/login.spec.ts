import { test} from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';

test.describe('Test Login Page',()=>{
    test('verify login to bms with valid credentials', async ({page}) => {
        const login = new LoginPage(page);
        const dashboard = new DashboardPage(page);
        await login.goToLoginPage();

        //Enter login credentials
        await login.enterUsername("admin");
        await login.enterPassword("@dm1N");
        await login.clickLogin();

        //Verify dashboard page elements
        await dashboard.verifyDashboardURL();
        await dashboard.verifyFieldmapManagerBtn();
        await dashboard.verifyAddProgramBtn();
    });
    test.afterEach('Close the page', async ({ page }) => {
        // logout before closing the page
        await page.close();
    });
});


