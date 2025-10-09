import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {

});
