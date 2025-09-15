import { test} from '@playwright/test';
import { SideBarPage } from '../pages/sidebar-page';
import { DashboardPage } from '../pages/dashboard-page';

test.describe('Test Dashboard Page',()=>{

    test('verify sidebar links',async({browser })=>{
        // testUserContext with test user logged in
        const testUserContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
        const testUserPage = await testUserContext.newPage();

        const dashboard = new DashboardPage(testUserPage);
        const sidebar = new SideBarPage(testUserPage);
        await dashboard.goToDashboardPage();

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

        //Check SSA Page
        await sidebar.expandSidebarTree('Studies');
        await sidebar.clickSideBarMenu('Single-Site Analysis');
        await sidebar.verifyPageText('SINGLE-SITE ANALYSIS');

        //Check MSA Page
        await sidebar.expandSidebarTree('Studies');
        await sidebar.clickSideBarMenu('Multi-Site Analysis');
        await sidebar.verifyPageText('MULTI-SITE ANALYSIS');
    
        //Check Manage Inventory Page
        await sidebar.expandSidebarTree('Inventory');
        await sidebar.clickSideBarMenu('Manage Inventory');
        await sidebar.verifyPageHeading('Manage Inventory');

        //Check Graphical Query Page
        await sidebar.expandSidebarTree('Queries');
        await sidebar.clickSideBarMenu('Graphical Queries');
        await sidebar.verifyFrameHeading('BrAPI Graphical Queries');

        //Check Head to Head Query Page
        await sidebar.expandSidebarTree('Queries');
        await sidebar.clickSideBarMenu('Head to Head Query');
        await sidebar.verifyFrameText('Main Head to Head Query');

        //Check Multi-Trait Query Page
        await sidebar.expandSidebarTree('Queries');
        await sidebar.clickSideBarMenu('Multi-Trait Query');
        await sidebar.verifyPageText('MULTI-TRAIT QUERY');

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
});