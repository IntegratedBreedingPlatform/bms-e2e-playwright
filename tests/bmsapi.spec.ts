import { test} from '@playwright/test';
import { BMSAPIPage } from '../pages/bmsapi-page';

test.describe('Test BMSAPI Page',()=>{

    test('verify navigating to bmsapi page',async({browser })=>{
        // testUserContext with test user logged in
        const testUserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        const testUserPage = await testUserContext.newPage();

        const bmsapi = new BMSAPIPage(testUserPage);
        await bmsapi.goToBMSAPI();
        await bmsapi.verifyBMSAPIHeading();

    });
});