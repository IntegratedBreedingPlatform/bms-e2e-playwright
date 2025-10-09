import { expect, test} from '@playwright/test';
import { BMSAPIPage } from '../../pages/bmsapi-page';
import { LoginPage } from '../../pages/login-page';
import { DashboardPage } from '../../pages/dashboard-page';
import { SideBarPage } from '../../pages/sidebar-page';
import { GermplasmManagerPage } from '../../pages/germplasm-manager-page';
import { AddProgramPage } from '../../pages/add-program-page';

test.describe('Sanity Testing Clean Setup',()=>{

    test('IBP-T2351 Access BMS and API swagger in Clean Install Setup', { tag: ['@sanity-clean-setup'] } , async ({ browser }) => {

        const testUserContext = await browser.newContext();
        const page = await testUserContext.newPage();
        
        const login = new LoginPage(page);
        const dashboard = new DashboardPage(page);
        const bmsapi = new BMSAPIPage(page);
        await login.goto();

        await page.waitForLoadState('networkidle');
        //Perform authentication steps
        await login.fillUsername("admin");
        await login.fillPassword("@dm1N");
        await login.clickLogin();
        
        await expect(page.getByText('Upgrade Notification'), 'Verify that Upgrade Notification is visibsle after logging in').toBeVisible();
        await page.getByRole('button', { name: 'Ok' }).click();
        await expect(page.getByText('Upgrade Notification'), 'Verify that Upgrade Notification is not visible after clicking OK').toBeHidden();
        
        //Verify dashboard page elements
        await dashboard.verifyDashboardURL();
        await dashboard.verifyFieldmapManagerBtn();
        await dashboard.verifyAddProgramBtn();
        // await dashboard.verifySiteAdminBtn();

        await bmsapi.goto();
        await bmsapi.verifyBMSAPIHeading();

        page.close();
    });

    test('IBP-T2354 Check all side menu links', { tag: ['@sanity-clean-setup'] } ,async ({ browser }) => {
       // testUserContext with test user logged in
        const testUserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        const testUserPage = await testUserContext.newPage();

        const dashboard = new DashboardPage(testUserPage);
        const sidebar = new SideBarPage(testUserPage);
        await dashboard.goto();

        await dashboard.selectCrop('maize');
        await dashboard.selectProgram('TestingProgram');
        await dashboard.launchProgram();
       // await testUserPage.pause();

        //Check Germplasm Manager Page
        await sidebar.expandSidebarTree('Germplasm');
        await sidebar.clickSideBarMenu('Manage Germplasm');
        await sidebar.verifyPageHeading('Germplasm Manager');

        //Check List Manager Page
        await sidebar.expandSidebarTree('Lists');
        await sidebar.clickSideBarMenu('Germplasm Lists');
        await sidebar.verifyPageHeading('Germplasm Lists');

        //Check Manage Samples Page
        await sidebar.expandSidebarTree('Lists');
        await sidebar.clickSideBarMenu('Samples Lists');
        await sidebar.verifyPageHeading('Manage Samples');

        //Check Manage Studies Page
        await sidebar.expandSidebarTree('Studies');
        await sidebar.clickSideBarMenu('Manage Studies');
        await sidebar.verifyPageHeading('Manage Studies');
        
        //Check Import Datasets Page
        await sidebar.expandSidebarTree('Studies');
        await sidebar.clickSideBarMenu('Import Datasets');
        await sidebar.verifyFrameText('Dataset Importer');

        // Check SSA Page
        await sidebar.expandSidebarTree('Studies');
        await sidebar.clickSideBarMenu('Single-Site Analysis');
        await sidebar.verifyPageText('SINGLE-SITE ANALYSIS');

        // Check MSA Page
        await sidebar.expandSidebarTree('Studies');
        await sidebar.clickSideBarMenu('Multi-Site Analysis');
        await sidebar.verifyPageText('MULTI-SITE ANALYSIS');
    
        // Check Manage Inventory Page
        await sidebar.expandSidebarTree('Inventory');
        await sidebar.clickSideBarMenu('Manage Inventory');
        await sidebar.verifyPageHeading('Manage Inventory');

        // Check Graphical Query Page
        await sidebar.expandSidebarTree('Queries');
        await sidebar.clickSideBarMenu('Graphical Queries');
        await sidebar.verifyFrameHeading('BrAPI Graphical Queries');

        // Check Head to Head Query Page
        await sidebar.expandSidebarTree('Queries');
        await sidebar.clickSideBarMenu('Head to Head Query');
        await sidebar.verifyPageText('MAIN HEAD TO HEAD QUERY');

        // Check Multi-Trait Query Page
        await sidebar.expandSidebarTree('Queries');
        await sidebar.clickSideBarMenu('Multi-Trait Query');
        await sidebar.verifyPageText('MULTI-TRAIT QUERY');


        // TODO:
        //Check High-Density Page
        // await sidebar.expandSidebarTree('Genotyping');
        // await sidebar.clickSideBarMenu('High Density');

        //Check Manage Ontology Page
        await sidebar.expandSidebarTree('Crop Administration');
        await sidebar.clickSideBarMenu('Manage Ontologies');
        await sidebar.verifyFrameHeading('Ontology Browser');

        //Check Manage Crop Settings Page
        await sidebar.expandSidebarTree('Crop Administration');
        await sidebar.clickSideBarMenu('Manage Crop Settings');
        await sidebar.verifyPageText('Manage Crop settings');

        //Check BrAPI Sync Page
        await sidebar.expandSidebarTree('Crop Administration');
        await sidebar.clickSideBarMenu('BrAPI Sync (beta)');
        await sidebar.verifyFrameHeading('BrAPI Synchronization Tool');

        //Check Manage Program Settings Page
        await sidebar.expandSidebarTree('Program Administration');
        await sidebar.clickSideBarMenu('Manage Program Settings');
        await sidebar.verifyPageHeading('Manage Program Settings');
    });

     test('IBP-T2352 Check BV Design License is not included', { tag: ['@sanity-clean-setup'] } , async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();
        const bmsapi = new BMSAPIPage(page);
        await bmsapi.goto();
        await bmsapi.verifyBMSAPIHeading();
        page.close();
    });

    test('IBP-T2355 Check if BMS version is correct', { tag: ['@sanity-clean-setup'] } ,async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();

        const element = await page.locator('[data-test="bms-version"]');   
        await expect(element).toHaveText('30.2');
    });


    test('IBP-T2353 Check if Pedigree Tree and Graph are showing', { tag: ['@sanity-clean-setup'] } ,async ({ browser }) => {
        // testUserContext with test user logged in
        const testUserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        const testUserPage = await testUserContext.newPage();

        const dashboard = new DashboardPage(testUserPage); 
        const sidebar = new SideBarPage(testUserPage);
        const manageGermplasm = new GermplasmManagerPage(testUserPage);

        //Go to Dashboard and launch a program
        await dashboard.goto();
        await dashboard.selectCrop('maize');
        await dashboard.selectProgram('TestingProgram');
        await dashboard.launchProgram();

        //Go to Manage Germplasm Page
        await sidebar.expandSidebarTree('Germplasm');
        await sidebar.clickSideBarMenu('Manage Germplasm');
        await sidebar.verifyPageHeading('Germplasm Manager');

         await testUserPage.pause();

        //Click first GID link
        await manageGermplasm.filterByGID('1');
        await manageGermplasm.clickGIDLink('1');

        
        await expect(testUserPage.getByText('Germplasm Details:'), 'Verify that the Germplasm Details is displayed').toBeVisible();

        // Navigate to Pedigree Tab
        await testUserPage.getByRole('link', { name: 'Pedigree' }).click();

        // Click the View Pedigree Graph
        await testUserPage.getByRole('button', { name: 'View Pedigree Graph' }).click();

    
        await expect(testUserPage.getByRole('heading', { name: 'Pedigree Graph' }), 'Verify that Pedigree Graph is displayed').toBeVisible();
        await expect(testUserPage.locator('polygon').first(), 'Verify that at least one polygon is visible').toBeVisible();

    
        // // Keep browser open and handle manual close
        // await new Promise((resolve) => {
        //     process.on('SIGINT', async () => {
        //     await browser.close();
        //     resolve(true);
        //     });
        // });
    });

    test('IBP-T2357 Create new program', { tag: ['@sanity-clean-setup'] } , async ({ browser }) => {

         // testUserContext with test user logged in
        const context = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        const page = await context.newPage();
        const dashboard = new DashboardPage(page);
        const addProgramPage = new AddProgramPage(page);
       
        await test.step('Go to Dashboard page and click Add Program', async() => {
            await dashboard.goto();
            await dashboard.clickAddProgram();
        });

        await test.step('Create a new program', async() => {
             await addProgramPage.createNewProgram();
        });
       

    });


});
