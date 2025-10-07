import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
        const login = new LoginPage(page);
        await login.goToLoginPage();       

        await page.waitForLoadState('networkidle');
        // Perform authentication steps
        await login.enterUsername("admin");
        await login.enterPassword("@dm1N");
        await login.clickLogin();

        // Give a small delay to ensure all storage is properly set
        await page.waitForTimeout(1000);

        await page.context().storageState({ path: authFile });

        await page.close();
});