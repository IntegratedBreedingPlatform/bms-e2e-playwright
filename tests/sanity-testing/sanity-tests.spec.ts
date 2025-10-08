import { expect, test} from '@playwright/test';
import { BMSAPIPage } from '../../pages/bmsapi-page';
import { LoginPage } from '../../pages/login-page';
import { DashboardPage } from '../../pages/dashboard-page';
import { SideBarPage } from '../../pages/sidebar-page';
import { ManageGermplasmPage } from '../../pages/manage-germplasm-page';
import { AddProgramPage } from '../../pages/add-program-page';

test.describe('Sanity Testing',()=>{

    test('IBP-T290 Access BMS in UAT test instance', { tag: ['@sanity'] } , async ({ browser }) => {
        
        const testUserContext = await browser.newContext();
        const page = await testUserContext.newPage();
        
        const login = new LoginPage(page);
        const dashboard = new DashboardPage(page);
        const bmsapi = new BMSAPIPage(page);
        await login.goToLoginPage();       

        await page.waitForLoadState('networkidle');

        await test.step('Login using admin credentials', async() => {
            await login.enterUsername("admin");
            await login.enterPassword("@dm1N");
            await login.clickLogin();
        });
       
        await test.step('Verify dashboard page elements', async() => {
            await dashboard.verifyDashboardURL();
            await dashboard.verifyFieldmapManagerBtn();
            await dashboard.verifyAddProgramBtn();
        });
       
        await test.step('Verify BMSAPI is loading correctly', async() => {
             await bmsapi.goToBMSAPI();
            await bmsapi.verifyBMSAPIHeading();
        });

    });

    test('IBP-T293 Check all side menu links', { tag: ['@sanity'] } ,async ({ browser }) => {
       // testUserContext with test user logged in
        const testUserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        const testUserPage = await testUserContext.newPage();

        const dashboard = new DashboardPage(testUserPage);
        const sidebar = new SideBarPage(testUserPage);
        await dashboard.goToDashboardPage();

        await test.step('Launch an existing program', async() => {
            await dashboard.selectCrop('maize');
            await dashboard.selectProgram('TestingProgram');
            await dashboard.launchProgram();
        });

        await test.step('Navigate to Germplasm Manager page', async() => {
            await sidebar.expandSidebarTree('Germplasm');
            await sidebar.clickSideBarMenu('Manage Germplasm');
            await sidebar.verifyPageHeading('Germplasm Manager');
        });
       
        await test.step('Navigate to Germplasm List/List Manager page', async() => {
            await sidebar.expandSidebarTree('Lists');
            await sidebar.clickSideBarMenu('Germplasm Lists');
            await sidebar.verifyPageHeading('Germplasm Lists');
        });

        await test.step('Navigate to Manage Samples page', async() => {
            await sidebar.expandSidebarTree('Lists');
            await sidebar.clickSideBarMenu('Samples Lists');
            await sidebar.verifyPageHeading('Manage Samples');
        });

        await test.step('Navigate to Manage Studies page', async() => {
           await sidebar.expandSidebarTree('Studies');
            await sidebar.clickSideBarMenu('Manage Studies');
            await sidebar.verifyPageHeading('Manage Studies');
        });

        await test.step('Navigate to Import Datasets page', async() => {
            await sidebar.expandSidebarTree('Studies');
            await sidebar.clickSideBarMenu('Import Datasets');
            await sidebar.verifyFrameText('Dataset Importer');
        });
       
        await test.step('Navigate to Single Site Analysis page', async() => {
            await sidebar.expandSidebarTree('Studies');
            await sidebar.clickSideBarMenu('Single-Site Analysis');
            await sidebar.verifyPageText('SINGLE-SITE ANALYSIS');
        });
       
        await test.step('Navigate to Multi Site Analysis page', async() => {
            await sidebar.expandSidebarTree('Studies');
            await sidebar.clickSideBarMenu('Multi-Site Analysis');
            await sidebar.verifyPageText('MULTI-SITE ANALYSIS');
        });

        await test.step('Navigate to Manage Inventory page', async() => {
            await sidebar.expandSidebarTree('Inventory');
            await sidebar.clickSideBarMenu('Manage Inventory');
            await sidebar.verifyPageHeading('Manage Inventory');
        });
    
        await test.step('Navigate to Graphical Queries page', async() => {
            await sidebar.expandSidebarTree('Queries');
            await sidebar.clickSideBarMenu('Graphical Queries');
            await sidebar.verifyFrameHeading('BrAPI Graphical Queries');

        });

        await test.step('Navigate to Head to Head Query page', async() => {
            await sidebar.expandSidebarTree('Queries');
            await sidebar.clickSideBarMenu('Head to Head Query');
            await sidebar.verifyPageText('MAIN HEAD TO HEAD QUERY');
        });

        await test.step('Navigate to Multi-Trait Query page', async() => {
            await sidebar.expandSidebarTree('Queries');
            await sidebar.clickSideBarMenu('Multi-Trait Query');
            await sidebar.verifyPageText('MULTI-TRAIT QUERY');
        });   

        await test.step('Navigate to High-Density page', async() => {
            // TODO:
            //Check High-Density Page
            // await sidebar.expandSidebarTree('Genotyping');
            // await sidebar.clickSideBarMenu('High Density');
        });   


        await test.step('Navigate to Manage Ontologies page', async() => {
            await sidebar.expandSidebarTree('Crop Administration');
            await sidebar.clickSideBarMenu('Manage Ontologies');
            await sidebar.verifyFrameHeading('Ontology Browser');
        });   

        await test.step('Navigate to Manage Crop Settings page', async() => {
            await sidebar.expandSidebarTree('Crop Administration');
            await sidebar.clickSideBarMenu('Manage Crop Settings');
            await sidebar.verifyPageText('Manage Crop settings');

        });   

        await test.step('Navigate to BrAPI Sync (beta) page', async() => {
            await sidebar.expandSidebarTree('Crop Administration');
            await sidebar.clickSideBarMenu('BrAPI Sync (beta)');
            await sidebar.verifyFrameHeading('BrAPI Synchronization Tool');
        });

        await test.step('Navigate to Manage Program Settings page', async() => {
            await sidebar.expandSidebarTree('Program Administration');
            await sidebar.clickSideBarMenu('Manage Program Settings');
            await sidebar.verifyPageHeading('Manage Program Settings');
        });   
      
    });

    test('IBP-T294 Check if BMS version is correct', { tag: ['@sanity'] } ,async ({ page }) => {
        const login = new LoginPage(page);
        await login.goToLoginPage();

        await test.step('Verify the BMS Version on login page', async() => {
            const element = await page.locator('[data-test="bms-version"]');   
            await expect(element).toHaveText('30.2');
         });
    
    });


    test('IBP-T292 Check if Pedigree Tree and Graph are showing', { tag: ['@sanity'] } ,async ({ browser }) => {
        // testUserContext with test user logged in
        const testUserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        const testUserPage = await testUserContext.newPage();

        const dashboard = new DashboardPage(testUserPage); 
        const sidebar = new SideBarPage(testUserPage);
        const manageGermplasm = new ManageGermplasmPage(testUserPage);


        await test.step('Go to Dashboard and launch a program', async() => {
            await dashboard.goToDashboardPage();
            await dashboard.selectCrop('maize');
            await dashboard.selectProgram('TestingProgram');
            await dashboard.launchProgram();
        });

        await test.step('Go to Manage Germplasm Page', async() => {
            await sidebar.expandSidebarTree('Germplasm');
            await sidebar.clickSideBarMenu('Manage Germplasm');
            await sidebar.verifyPageHeading('Germplasm Manager');
        });
            

        await testUserPage.pause();

         await test.step('Filter by GID and click the GID link', async() => {
            await manageGermplasm.filterByGID('1');
            await manageGermplasm.clickGIDLink('1');
        });
            
       
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


    test('IBP-T291 Generate Experimental Designs', { tag: ['@sanity'] } ,async ({ browser }) => {

        // const context = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        // const page = await context.newPage();
        // const dashboard = new DashboardPage(page);
        // const addProgramPage = new AddProgramPage(page);
        // const sidebarPage = new SideBarPage(page);

        // let newProgram = '';
        
        // await test.step('Go to Dashboard page and click Add Program', async() => {
        //     await dashboard.goToDashboardPage();
        //     await dashboard.clickAddProgram();
        // });

        // await test.step('Create a new program', async() => {
        //     newProgram = await addProgramPage.createNewProgram();
        // });

        // await sidebarPage.verifyPageHeading('Manage Program Settings');
        // await sidebarPage.clickSideBarMenu()


    });


     test('IBP-T2357 Create new program', { tag: ['@sanity'] } ,async ({ browser }) => {
        
        const context = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        const page = await context.newPage();
        const dashboard = new DashboardPage(page);
        const addProgramPage = new AddProgramPage(page);
        const sidebarPage = new SideBarPage(page);

        let newProgram = '';
        
        await test.step('Go to Dashboard page and click Add Program', async() => {
            await dashboard.goToDashboardPage();
            await dashboard.clickAddProgram();
        });

        await test.step('Create a new program', async() => {
            newProgram = await addProgramPage.createNewProgram();
        });

        await sidebarPage.verifyPageHeading('Manage Program Settings');

        await test.step('Go to Dashboard page and verify that the. new program is selectable', async() => {
            await dashboard.goToDashboardPage();
            await dashboard.selectProgram(newProgram);
        });

    });

});