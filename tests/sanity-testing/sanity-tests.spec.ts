import {expect, test} from '@playwright/test';
import {BMSAPIPage} from '../../pages/bmsapi-page';
import {LoginPage} from '../../pages/login-page';
import {DashboardPage} from '../../pages/dashboard-page';
import {SideBarPage} from '../../pages/sidebar-page';
import {ManageGermplasmPage} from '../../pages/manage-germplasm-page';
import {AddProgramPage} from '../../pages/add-program-page';
import {SidebarMenu, SidebarSection, TEST_CROP} from "../../pages/app.constants";

test.describe('Sanity Testing',()=>{

    test('IBP-T290 Access BMS in UAT test instance', { tag: ['@sanity'] } , async ({ browser }) => {
        
        const browserContext = await browser.newContext();
        const page = await browserContext.newPage();
        
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
       // browserContext with test user logged in
        const browserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        const page = await browserContext.newPage();

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

        await dashboard.goToDashboardPage();

        await test.step('Launch an existing program', async() => {
            await dashboard.selectCrop(TEST_CROP);
            await dashboard.selectProgram(newProgram);
            await dashboard.launchProgram();
        });

        await test.step('Navigate to Germplasm Manager page', async() => {
            await sidebarPage.expandSidebarTree(SidebarSection.GERMPLASM);
            await sidebarPage.clickSideBarMenu(SidebarMenu.MANAGE_GERMPLASM);
            await sidebarPage.verifyPageHeading('Germplasm Manager');
        });
       
        await test.step('Navigate to Germplasm List/List Manager page', async() => {
            await sidebarPage.expandSidebarTree(SidebarSection.LISTS);
            await sidebarPage.clickSideBarMenu(SidebarMenu.GERMPLASM_LISTS);
            await sidebarPage.verifyPageHeading('Germplasm Lists');
        });

        await test.step('Navigate to Manage Samples page', async() => {
            await sidebarPage.expandSidebarTree(SidebarSection.LISTS);
            await sidebarPage.clickSideBarMenu(SidebarMenu.SAMPLES_LISTS);
            await sidebarPage.verifyPageHeading('Manage Samples');
        });

        await test.step('Navigate to Manage Studies page', async() => {
           await sidebarPage.expandSidebarTree(SidebarSection.STUDIES);
            await sidebarPage.clickSideBarMenu(SidebarMenu.MANAGE_STUDIES);
            await sidebarPage.verifyPageHeading('Manage Studies');
        });

        await test.step('Navigate to Import Datasets page', async() => {
            await sidebarPage.expandSidebarTree(SidebarSection.STUDIES);
            await sidebarPage.clickSideBarMenu(SidebarMenu.IMPORT_DATASETS);
            await sidebarPage.verifyFrameText('Dataset Importer');
        });
       
        await test.step('Navigate to Single Site Analysis page', async() => {
            await sidebarPage.expandSidebarTree(SidebarSection.STUDIES);
            await sidebarPage.clickSideBarMenu(SidebarMenu.SINGLE_SITE_ANALYSIS);
            await sidebarPage.verifyPageText('SINGLE-SITE ANALYSIS');
        });
       
        await test.step('Navigate to Multi Site Analysis page', async() => {
            await sidebarPage.expandSidebarTree(SidebarSection.STUDIES);
            await sidebarPage.clickSideBarMenu(SidebarMenu.MULTI_SITE_ANALYSIS);
            await sidebarPage.verifyPageText('MULTI-SITE ANALYSIS');
        });

        await test.step('Navigate to Manage Inventory page', async() => {
            await sidebarPage.expandSidebarTree(SidebarSection.INVENTORY);
            await sidebarPage.clickSideBarMenu(SidebarMenu.MANAGE_INVENTORY);
            await sidebarPage.verifyPageHeading('Manage Inventory');
        });
    
        await test.step('Navigate to Graphical Queries page', async() => {
            await sidebarPage.expandSidebarTree(SidebarSection.QUERIES);
            await sidebarPage.clickSideBarMenu(SidebarMenu.GRAPHICAL_QUERIES);
            await sidebarPage.verifyFrameHeading('BrAPI Graphical Queries');

        });

        await test.step('Navigate to Head to Head Query page', async() => {
            await sidebarPage.expandSidebarTree(SidebarSection.QUERIES);
            await sidebarPage.clickSideBarMenu(SidebarMenu.HEAD_TO_HEAD_QUERY);
            await sidebarPage.verifyPageText('MAIN HEAD TO HEAD QUERY');
        });

        await test.step('Navigate to Multi-Trait Query page', async() => {
            await sidebarPage.expandSidebarTree(SidebarSection.QUERIES);
            await sidebarPage.clickSideBarMenu(SidebarMenu.MULTI_TRAIT_QUERY);
            await sidebarPage.verifyPageText('MULTI-TRAIT QUERY');
        });   

        await test.step('Navigate to High-Density page', async() => {
            // TODO:
            //Check High-Density Page
            // await sidebar.expandSidebarTree('Genotyping');
            // await sidebar.clickSideBarMenu('High Density');
        });   


        await test.step('Navigate to Manage Ontologies page', async() => {
            await sidebarPage.expandSidebarTree(SidebarSection.CROP_ADMINISTRATION);
            await sidebarPage.clickSideBarMenu(SidebarMenu.MANAGE_ONTOLOGIES);
            await sidebarPage.verifyFrameHeading('Ontology Browser');
        });   

        await test.step('Navigate to Manage Crop Settings page', async() => {
            await sidebarPage.expandSidebarTree(SidebarSection.CROP_ADMINISTRATION);
            await sidebarPage.clickSideBarMenu(SidebarMenu.MANAGE_CROP_SETTINGS);
            await sidebarPage.verifyPageText('Manage Crop settings');

        });   

        await test.step('Navigate to BrAPI Sync (beta) page', async() => {
            await sidebarPage.expandSidebarTree(SidebarSection.CROP_ADMINISTRATION);
            await sidebarPage.clickSideBarMenu(SidebarMenu.BRAPI_SYNC);
            await sidebarPage.verifyFrameHeading('BrAPI Synchronization Tool');
        });

        await test.step('Navigate to Manage Program Settings page', async() => {
            await sidebarPage.expandSidebarTree(SidebarSection.PROGRAM_ADMINISTRATION);
            await sidebarPage.clickSideBarMenu(SidebarMenu.MANAGE_PROGRAM_SETTINGS);
            await sidebarPage.verifyPageHeading('Manage Program Settings');
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
        // browserContext with test user logged in
        const browserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        const page = await browserContext.newPage();

        const dashboard = new DashboardPage(page);
        const sidebar = new SideBarPage(page);
        const manageGermplasm = new ManageGermplasmPage(page);


        await test.step('Go to Dashboard and launch a program', async() => {
            await dashboard.goToDashboardPage();
            await dashboard.selectCrop('maize');
            await dashboard.selectProgram('TestingProgram');
            await dashboard.launchProgram();
        });

        await test.step('Go to Manage Germplasm Page', async() => {
            await sidebar.expandSidebarTree(SidebarSection.GERMPLASM);
            await sidebar.clickSideBarMenu(SidebarMenu.MANAGE_GERMPLASM);
            await sidebar.verifyPageHeading('Germplasm Manager');
        });
            

        await page.pause();

         await test.step('Filter by GID and click the GID link', async() => {
            await manageGermplasm.filterByGID('1');
            await manageGermplasm.clickGIDLink('1');
        });
            
       
        await expect(page.getByText('Germplasm Details:'), 'Verify that the Germplasm Details is displayed').toBeVisible();
        // Navigate to Pedigree Tab
        await page.getByRole('link', { name: 'Pedigree' }).click();
        // Click the View Pedigree Graph
        await page.getByRole('button', { name: 'View Pedigree Graph' }).click();
        await expect(page.getByRole('heading', { name: 'Pedigree Graph' }), 'Verify that Pedigree Graph is displayed').toBeVisible();
        await expect(page.locator('polygon').first(), 'Verify that at least one polygon is visible').toBeVisible();

    
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
        
        const browserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        const page = await browserContext.newPage();
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
