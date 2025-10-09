import {expect, test as base} from '@playwright/test';
import {BMSAPIPage} from '../../pages/bmsapi-page';
import {LoginPage} from '../../pages/login-page';
import {DashboardPage} from '../../pages/dashboard-page';
import {SideBarPage} from '../../pages/sidebar-page';
import {GermplasmManagerPage} from '../../pages/germplasm-manager-page';
import {AddProgramPage} from '../../pages/add-program-page';
import {DesignType, SidebarMenu, SidebarSection, TEST_CROP} from "../../pages/app.constants";
import {SaveGermplasmListModalPage} from "../../pages/save-germplasm-list-modal-page";
import {ManageStudiesPage} from '../../pages/study-manager/manage-studies-page';
import {CreateNewStudyPage} from '../../pages/study-manager/create-new-study-page';
import {StudyEditorPage} from "../../pages/study-manager/study-editor-page";

// Declare the types of the common pages.
type BMSPages = {
    bmsapi: BMSAPIPage;
    login: LoginPage;
    dashboard: DashboardPage;
    sidebar: SideBarPage;
    germplasmManager: GermplasmManagerPage;
    addProgram: AddProgramPage;
    studyManager: ManageStudiesPage;
    studyEditor: StudyEditorPage;
    createNewStudy: CreateNewStudyPage;
    saveGermplasmListModal: SaveGermplasmListModalPage;
};

export const test = base.extend<BMSPages>({
    login: async ({ browser, page }, use) => {
        const login = new LoginPage(page);
        // Use the fixture value in the test.
        await use(login);
    },
    bmsapi: async ({ browser }, use) => {
        const browserContext = await browser.newContext();
        const page = await browserContext.newPage();
        // Set up the fixture.
        const bmsapiPage = new BMSAPIPage(page);
        // Use the fixture value in the test.
        await use(bmsapiPage);
    },
    dashboard: async ({ browser, page }, use) => {
        // const browserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        // const page = await browserContext.newPage();
        // Set up the fixture.
        const dashboardPage = new DashboardPage(page);
        // Use the fixture value in the test.
        await use(dashboardPage);
    },
    sidebar: async ({ browser, page }, use) => {
        // const browserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        // const page = await browserContext.newPage();
        // Set up the fixture.
        const sideBarPage = new SideBarPage(page);
        // Use the fixture value in the test.
        await use(sideBarPage);
    },
    germplasmManager: async ({ browser, page }, use) => {
        // const browserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        // const page = await browserContext.newPage();
        // Set up the fixture.
        const germplasmManagerPage = new GermplasmManagerPage(page);
        // Use the fixture value in the test.
        await use(germplasmManagerPage);
    },
    addProgram: async ({ browser, page }, use) => {
        // const browserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        // const page = await browserContext.newPage();
        // Set up the fixture.
        const addProgramPage = new AddProgramPage(page);
        // Use the fixture value in the test.
        await use(addProgramPage);
    },
    studyManager: async ({ browser, page }, use) => {
        // const browserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        // const page = await browserContext.newPage();
        // Set up the fixture.
        const manageStudiesPage = new ManageStudiesPage(page);
        // Use the fixture value in the test.
        await use(manageStudiesPage);
    },
    studyEditor: async ({ browser, page }, use) => {
        // const browserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        // const page = await browserContext.newPage();
        // Set up the fixture.
        const studyEditorPage = new StudyEditorPage(page);
        // Use the fixture value in the test.
        await use(studyEditorPage);
    },
    createNewStudy: async ({ browser, page }, use) => {
        // const browserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        // const page = await browserContext.newPage();
        // Set up the fixture.
        const createNewStudyPage = new CreateNewStudyPage(page);
        // Use the fixture value in the test.
        await use(createNewStudyPage);
    },
});


test.describe('Sanity Testing',()=>{

    test('IBP-T290 Access BMS in UAT test instance', { tag: ['@sanity'] } , async ({ page, login, bmsapi, dashboard }) => {

        await login.goto();

        await page.waitForLoadState('networkidle');

        await test.step('Login using admin credentials', async() => {
            await login.fillUsername("admin");
            await login.fillPassword("@dm1N");
            await login.clickLogin();
        });
       
        await test.step('Verify dashboard page elements', async() => {
            await dashboard.verifyDashboardURL();
            await dashboard.verifyFieldmapManagerBtn();
            await dashboard.verifyAddProgramBtn();
        });
       
        await test.step('Verify BMSAPI is loading correctly', async() => {
            await bmsapi.goto();
            await bmsapi.verifyBMSAPIHeading();
        });

    });

    test('IBP-T293 Check all side menu links', { tag: ['@sanity'] } ,async ({ browser, login, dashboard, addProgram, sidebar }) => {

        await login.authenticate();

        let newProgram = '';

        await test.step('Go to Dashboard page and click Add Program', async() => {
            await dashboard.goto();
            await dashboard.clickAddProgram();
        });

        await test.step('Create a new program', async() => {
            newProgram = await addProgram.createNewProgram();
        });

        await sidebar.verifyPageHeading('Manage Program Settings');

        await test.step('Launch an existing program', async() => {
            await dashboard.goto();
            await dashboard.selectCrop(TEST_CROP);
            await dashboard.selectProgram(newProgram);
            await dashboard.launchProgram();
        });

        await test.step('Navigate to Germplasm Manager page', async() => {
            await sidebar.expandSidebarTree(SidebarSection.GERMPLASM);
            await sidebar.clickSideBarMenu(SidebarMenu.MANAGE_GERMPLASM);
            await sidebar.verifyPageHeading('Germplasm Manager');
        });
       
        await test.step('Navigate to Germplasm List/List Manager page', async() => {
            await sidebar.expandSidebarTree(SidebarSection.LISTS);
            await sidebar.clickSideBarMenu(SidebarMenu.GERMPLASM_LISTS);
            await sidebar.verifyPageHeading('Germplasm Lists');
        });

        await test.step('Navigate to Manage Samples page', async() => {
            await sidebar.expandSidebarTree(SidebarSection.LISTS);
            await sidebar.clickSideBarMenu(SidebarMenu.SAMPLES_LISTS);
            await sidebar.verifyPageHeading('Manage Samples');
        });

        await test.step('Navigate to Manage Studies page', async() => {
           await sidebar.expandSidebarTree(SidebarSection.STUDIES);
            await sidebar.clickSideBarMenu(SidebarMenu.MANAGE_STUDIES);
            await sidebar.verifyPageHeading('Manage Studies');
        });

        await test.step('Navigate to Import Datasets page', async() => {
            await sidebar.expandSidebarTree(SidebarSection.STUDIES);
            await sidebar.clickSideBarMenu(SidebarMenu.IMPORT_DATASETS);
            await sidebar.verifyFrameText('Dataset Importer');
        });
       
        await test.step('Navigate to Single Site Analysis page', async() => {
            await sidebar.expandSidebarTree(SidebarSection.STUDIES);
            await sidebar.clickSideBarMenu(SidebarMenu.SINGLE_SITE_ANALYSIS);
            await sidebar.verifyPageText('SINGLE-SITE ANALYSIS');
        });
       
        await test.step('Navigate to Multi Site Analysis page', async() => {
            await sidebar.expandSidebarTree(SidebarSection.STUDIES);
            await sidebar.clickSideBarMenu(SidebarMenu.MULTI_SITE_ANALYSIS);
            await sidebar.verifyPageText('MULTI-SITE ANALYSIS');
        });

        await test.step('Navigate to Manage Inventory page', async() => {
            await sidebar.expandSidebarTree(SidebarSection.INVENTORY);
            await sidebar.clickSideBarMenu(SidebarMenu.MANAGE_INVENTORY);
            await sidebar.verifyPageHeading('Manage Inventory');
        });
    
        await test.step('Navigate to Graphical Queries page', async() => {
            await sidebar.expandSidebarTree(SidebarSection.QUERIES);
            await sidebar.clickSideBarMenu(SidebarMenu.GRAPHICAL_QUERIES);
            await sidebar.verifyFrameHeading('BrAPI Graphical Queries');

        });

        await test.step('Navigate to Head to Head Query page', async() => {
            await sidebar.expandSidebarTree(SidebarSection.QUERIES);
            await sidebar.clickSideBarMenu(SidebarMenu.HEAD_TO_HEAD_QUERY);
            await sidebar.verifyPageText('MAIN HEAD TO HEAD QUERY');
        });

        await test.step('Navigate to Multi-Trait Query page', async() => {
            await sidebar.expandSidebarTree(SidebarSection.QUERIES);
            await sidebar.clickSideBarMenu(SidebarMenu.MULTI_TRAIT_QUERY);
            await sidebar.verifyPageText('MULTI-TRAIT QUERY');
        });   

        await test.step('Navigate to High-Density page', async() => {
            // TODO:
            //Check High-Density Page
            // await sidebar.expandSidebarTree('Genotyping');
            // await sidebar.clickSideBarMenu('High Density');
        });   


        await test.step('Navigate to Manage Ontologies page', async() => {
            await sidebar.expandSidebarTree(SidebarSection.CROP_ADMINISTRATION);
            await sidebar.clickSideBarMenu(SidebarMenu.MANAGE_ONTOLOGIES);
            await sidebar.verifyFrameHeading('Ontology Browser');
        });   

        await test.step('Navigate to Manage Crop Settings page', async() => {
            await sidebar.expandSidebarTree(SidebarSection.CROP_ADMINISTRATION);
            await sidebar.clickSideBarMenu(SidebarMenu.MANAGE_CROP_SETTINGS);
            await sidebar.verifyPageText('Manage Crop settings');

        });   

        await test.step('Navigate to BrAPI Sync (beta) page', async() => {
            await sidebar.expandSidebarTree(SidebarSection.CROP_ADMINISTRATION);
            await sidebar.clickSideBarMenu(SidebarMenu.BRAPI_SYNC);
            await sidebar.verifyFrameHeading('BrAPI Synchronization Tool');
        });

        await test.step('Navigate to Manage Program Settings page', async() => {
            await sidebar.expandSidebarTree(SidebarSection.PROGRAM_ADMINISTRATION);
            await sidebar.clickSideBarMenu(SidebarMenu.MANAGE_PROGRAM_SETTINGS);
            await sidebar.verifyPageHeading('Manage Program Settings');
        });   
      
    });

    test('IBP-T294 Check if BMS version is correct', { tag: ['@sanity'] } ,async ({ page, login }) => {

        await login.goto();

        await test.step('Verify the BMS Version on login page', async() => {
            const element = await page.locator('[data-test="bms-version"]');   
            await expect(element).toHaveText('30.2');
         });
    
    });


    test('IBP-T292 Check if Pedigree Tree and Graph are showing', { tag: ['@sanity'] } ,async ({ browser, login, page, dashboard, sidebar, germplasmManager }) => {

        await login.authenticate();

        await test.step('Go to Dashboard and launch a program', async() => {
            await dashboard.goto();
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
            await germplasmManager.filterByGID('1');
            await germplasmManager.clickGIDLink('1');
        });
            
       
        await expect(page.getByText('Germplasm Details:'), 'Verify that the Germplasm Details is displayed').toBeVisible();
        // Navigate to Pedigree Tab
        await page.getByRole('link', { name: 'Pedigree' }).click();
        // Click the View Pedigree Graph
        await page.getByRole('button', { name: 'View Pedigree Graph' }).click();
        await expect(page.getByRole('heading', { name: 'Pedigree Graph' }), 'Verify that Pedigree Graph is displayed').toBeVisible();
        await expect(page.locator('polygon').first(), 'Verify that at least one polygon is visible').toBeVisible();


    });


   test('IBP-T291 Generate Experimental Designs', { tag: ['@sanity'] } ,async ({ browser, login, page, dashboard, addProgram, sidebar, germplasmManager, studyManager, studyEditor, createNewStudy}) => {

        await login.authenticate();

        let newProgram = '';
        
        await test.step('Go to Dashboard page and click Add Program', async() => {
            await dashboard.goto();
            await dashboard.clickAddProgram();
        });

        await test.step('Create a new program', async() => {
            newProgram = await addProgram.createNewProgram();
        });

        await sidebar.verifyPageHeading('Manage Program Settings');

        await test.step('Launch an existing program', async() => {
            await dashboard.goto();
            await dashboard.selectCrop(TEST_CROP);
            await dashboard.selectProgram(newProgram);
            await dashboard.launchProgram();
        });

        await test.step('Navigate to Germplasm Manager page', async() => {
            await sidebar.expandSidebarTree(SidebarSection.GERMPLASM);
            await sidebar.clickSideBarMenu(SidebarMenu.MANAGE_GERMPLASM);
            await sidebar.verifyPageHeading('Germplasm Manager');
        });


        await test.step('Select all germplasm in the page and Create a new list', async() => {
            await germplasmManager.selectAllCurrentPage();
            await germplasmManager.clickActionsButton();
            await germplasmManager.clickActionsMenuButton('Create new list');
        });

        const saveGermplasmListModal = new SaveGermplasmListModalPage(page);
        let listName = '';
        await test.step('Create a new list to be used for creating a new study', async() => {
            await saveGermplasmListModal.verifyModalIsVisible();
            listName = await saveGermplasmListModal.createNewList();
        });
        
        await test.step('Navigate to Manage Studies page', async() => {
            await sidebar.expandSidebarTree(SidebarSection.STUDIES);
            await sidebar.clickSideBarMenu(SidebarMenu.MANAGE_STUDIES);
            await sidebar.verifyPageHeading('Manage Studies');
        });

        await test.step('Go to create new study', async() => {
           await studyManager.clickStartNewStudy();
        });

        let studyName = '';
        await test.step('Create a new study', async() => {
           await createNewStudy.verifyCreateStudyIsVisible();
           studyName = await createNewStudy.createNewStudy();
        });

        await test.step('After creating a study, page should be redirected to Study Editor', async() => {
            await studyEditor.verifyStudyEditorIsVisible(studyName);
            await studyEditor.verifyBasicDetails(studyName);
        });

       await test.step('Select Germplasm List for Study Germplasm Entries', async() => {
           await studyEditor.navigateToTab('Germplasm & Checks');
           await studyEditor.browseGermplasmList(listName);
       });

       await test.step('Verify Experimental Design form views', async() => {
           await studyEditor.navigateToTab('Experimental Design');
           await studyEditor.selectDesignType(DesignType.RandomizedCompleteBlock);
           await studyEditor.selectDesignType(DesignType.ResolvableIncompleteBlock);
           await studyEditor.selectDesignType(DesignType.RowAndColumn);
           await studyEditor.selectDesignType(DesignType.AugmentedRandomizedBlock);
           await studyEditor.selectDesignType(DesignType.PrepDesign);
           await studyEditor.selectDesignType(DesignType.EntryListOrder);
       });

       await test.step('Generate Randomized Complete Block Design', async() => {
           await studyEditor.navigateToTab('Experimental Design');
           await studyEditor.selectDesignType(DesignType.RandomizedCompleteBlock);
           await studyEditor.fillStartingPlotNumber('1');
           await studyEditor.fillNumberOfReplications('12');
           await studyEditor.clickGenerateDesign();
       });

    });


     test('IBP-T2357 Create new program', { tag: ['@sanity'] } ,async ({ browser, login, dashboard, addProgram, sidebar }) => {

        await login.authenticate();

        let newProgram = '';
        
        await test.step('Go to Dashboard page and click Add Program', async() => {
            await dashboard.goto();
            await dashboard.clickAddProgram();
        });

        await test.step('Create a new program', async() => {
            newProgram = await addProgram.createNewProgram();
        });

        await sidebar.verifyPageHeading('Manage Program Settings');

        await test.step('Go to Dashboard page and verify that the. new program is selectable', async() => {
            await dashboard.goto();
            await dashboard.selectProgram(newProgram);
        });

    });

});
