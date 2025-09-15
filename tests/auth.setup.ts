import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
        const login = new LoginPage(page);
        const dashboard = new DashboardPage(page);
        await login.goToLoginPage();       

        await page.waitForLoadState('networkidle');
        //Perform authentication steps
        await login.enterUsername("admin");
        await login.enterPassword("@dm1N");
        await login.clickLogin();
  

        //Verify dashboard page elements
        await dashboard.verifyDashboardURL();
        await dashboard.verifyFieldmapManagerBtn();
        await dashboard.verifyAddProgramBtn();
        // End of authentication steps.

        await page.context().storageState({ path: authFile });
});