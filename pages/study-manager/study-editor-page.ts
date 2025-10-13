import {expect, Page} from "@playwright/test";
import {DesignType} from "../app.constants";

export class StudyEditorPage {


    readonly page: Page;



    constructor(page: Page) {
        this.page = page;
    }

    async verifyStudyEditorIsVisible(studyName: string) {
        this.page.waitForLoadState('networkidle');
        await expect(this.page.getByRole('heading',{ name: 'Manage Studies' }), 'Verify that Study Editor page is visible').toBeVisible();
        await expect(this.page.getByText(studyName), 'Verify that Study Editor page is visible').toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Actions'}), 'Verify that Study Editor Actions button is visible').toBeVisible();
    }

    async verifyBasicDetails(studyName: string) {
        await this.page.getByText('BASIC DETAILS').click();
        await expect(this.page.locator('jhi-basic-details')).toMatchAriaSnapshot(`
        - text: Study name *
        - textbox: ${studyName}
        - text: Description *
        - textbox: Some Description
        - text: Study type * Trial Objective
        - textbox: Some Objective
        - text: Save in *
        - textbox: STUDIES
        - button "Change Folder"
        - text: Created by * admin Creation date *
        - textbox "yyyy-mm-dd": /\\d+-\\d+-\\d+/
        - button ""
        - text: Completion date
        - textbox "yyyy-mm-dd": /\\d+-\\d+-\\d+/
        - button ""
        `);
    }

    async navigateToTab(tabName: 'Settings' | 'Germplasm & Checks' | 'Treatment Factors' | 'Environments' | 'Experimental Design' | 'Observations') {
        await expect(this.page.getByRole('link', { name: tabName, exact: false }), `Verify that ${tabName} tab is visible`).toBeVisible();
        await this.page.getByRole('link', { name: tabName, exact: false }).click();
        await this.page.waitForLoadState('networkidle');
    }

    async browseGermplasmList(listName: string) {
        await expect(this.page.locator('jhi-germplasm-checks')).toContainText('Browse a list to work with.');
        await expect(this.page.getByRole('button', { name: 'Browse' })).toBeVisible();
        await (this.page.getByRole('button', { name: 'Browse' })).click();

        await expect(this.page.getByRole('heading', { name: 'Browse for lists' })).toBeVisible();
        await expect(this.page.getByText(listName, { exact: true })).toBeVisible();
        await this.page.getByText(listName, { exact: true }).click();
        await this.page.locator('[data-test="treeTableOkButton"]').click();
        await expect(this.page.getByRole('heading', { name: 'Browse for lists' })).toBeHidden();

        await expect(this.page.locator('jhi-germplasm-checks')).toContainText('Click "Modify List" if you wish to change the germplasm list. Take note that this will also remove any existing observations and field layout generated.');
        await expect(this.page.getByRole('button', { name: 'Modify List' })).toBeVisible();

        await expect(this.page.locator('span').filter({ hasText: 'Total Entries:' }).locator('span')).toContainText('20');

        this.page.waitForLoadState('networkidle');
    }

    async selectEntryType(rowIndex: number, entryType: 'C' | 'T') {
        await this.page.locator('td[data-test="germplasm-entries-table-cell-8255"]').nth(rowIndex).click();
        await this.page.locator('td[data-test="germplasm-entries-table-cell-8255"]').nth(rowIndex).getByRole('combobox').click();
        await this.page.getByRole('option', {name: entryType, exact: true}).first().click();
        await this.page.locator('jhi-germplasm-checks').focus();
        await this.page.waitForLoadState('networkidle');
    }

    async selectDesignType(designType: DesignType) {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.getByText('EXPERIMENTAL DESIGN', { exact: true })).toBeVisible();
        await this.page.locator('ng-select[name="experimentalDesignType"]').click();
        await this.page.getByRole('option', { name: designType }).click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyDefaultViewForRandomizedCompleteBlock() {

        await expect(this.page.locator('jhi-experimental-design')).toMatchAriaSnapshot(`
            - text:  EXPERIMENTAL DESIGN
            - text: CHOOSE A DESIGN TYPE Randomized Complete Block Design
            - text: Or
            - button "Import"
            - text: "an experimental design SPECIFY PLOT NUMBERING Specify the starting plot number:"
            - spinbutton "Specify the starting plot number:"
            - text: "SPECIFY DESIGN PARAMETERS Number of replications:"
            - spinbutton "Number of replications:"
            - checkbox "First rep not randomized" [checked]
            - text: "/First rep not randomized SUMMARY OF DESIGN DETAILS Number of environments: 1 Number of treatments: \\\\d+ Plot factor:/"
            - link "PLOT_NO"
            - text: "Replicate factor:"
            - link "REP_NO"
            - text: "Treatment factors:"
            - table:
              - rowgroup:
                - 'row "NAME DESCRIPTION # LEVELS"':
                  - cell "NAME"
                  - cell "DESCRIPTION"
                  - cell "# LEVELS"
              - rowgroup:
                - row /ENTRY_NO Germplasm entry - enumerated \\(number\\) \\d+/:
                  - cell "ENTRY_NO":
                    - link "ENTRY_NO"
                  - cell "Germplasm entry - enumerated (number)"
                  - cell /\\d+/
            - button "Generate Design"
            - button " Delete Design" [disabled]
            `);
    }

    async verifyDefaultViewForResolvableIncompleteBlock() {
        await expect(this.page.locator('jhi-experimental-design')).toMatchAriaSnapshot(`
            - text:  EXPERIMENTAL DESIGN
            - text: CHOOSE A DESIGN TYPE Resolvable Incomplete Block Design
            - text: Or
            - button "Import"
            - text: "an experimental design SPECIFY PLOT NUMBERING Specify the starting plot number:"
            - spinbutton "Specify the starting plot number:"
            - text: "SPECIFY DESIGN PARAMETERS Number of replications:"
            - spinbutton "Number of replications:"
            - checkbox "First rep not randomized" [checked]
            - text: "First rep not randomized Block Size:"
            - spinbutton "Block Size:"
            - checkbox "Show advanced options"
            - text: "/Show advanced options SUMMARY OF DESIGN DETAILS Number of environments: 1 Number of treatments: \\\\d+ Number of blocks per replication: 0 Treatment factor:/"
            - link "ENTRY_NO"
            - text: "Plot factor:"
            - link "PLOT_NO"
            - text: "Block factor:"
            - link "BLOCK_NO"
            - text: "Replicate factor:"
            - link "REP_NO"
            - button "Generate Design"
            - button " Delete Design" [disabled]
            `);
    }

    async verifyDefaultViewForRowAndColumn() {
        await expect(this.page.locator('jhi-experimental-design')).toMatchAriaSnapshot(`
            - text:  EXPERIMENTAL DESIGN
            - text: CHOOSE A DESIGN TYPE Row-and-Column Design
            - combobox:
              - textbox
            - text: Or
            - button "Import"
            - text: "an experimental design SPECIFY PLOT NUMBERING Specify the starting plot number:"
            - spinbutton "Specify the starting plot number:"
            - text: "SPECIFY DESIGN PARAMETERS Number of replications:"
            - spinbutton "Number of replications:"
            - checkbox "First rep not randomized" [checked]
            - text: "First rep not randomized Number of rows in replications:"
            - spinbutton "Number of rows in replications:"
            - text: "Number of columns in replications:"
            - spinbutton "Number of columns in replications:"
            - checkbox "Show advanced options"
            - text: "/Show advanced options SUMMARY OF DESIGN DETAILS Number of environments: 1 Number of treatments: \\\\d+ Treatment factor:/"
            - link "ENTRY_NO"
            - text: "Replicate factor:"
            - link "REP_NO"
            - text: "Row factor:"
            - link "ROW"
            - text: "Column factor:"
            - link "COL"
            - button "Generate Design"
            - button " Delete Design" [disabled]
            `);
    }

    
    async verifyDefaultViewForAugmentedRandomized() {

        // await expect(this.page.locator('jhi-experimental-design')).toMatchAriaSnapshot(`
        // - text: "/SUMMARY OF DESIGN DETAILS Number of environments: 1 Number of treatments: \\\\d+ Number of Test entries: \\\\d+ Number of Check entries: 2 Number of Test entries per block: 9 Number of plots per block: \\\\d+ Total number of plots: \\\\d+ Treatment factor:/"
        // - link "ENTRY_NO":
        // - /url: "#/study-editor/45146/(study-editor-outlet:experimental-design)(popup:variable-details-popup)?cropName=maize&programUUID=208dba7e-f4cc-4b71-9f38-46a6fee088e4&selectedProjectId=436&loggedInUserId=1&toolUrl=study-editor&studyId=45146&variableId=8230"
        // - text: "Plot factor:"
        // - link "PLOT_NO":
        // - /url: "#/study-editor/45146/(study-editor-outlet:experimental-design)(popup:variable-details-popup)?cropName=maize&programUUID=208dba7e-f4cc-4b71-9f38-46a6fee088e4&selectedProjectId=436&loggedInUserId=1&toolUrl=study-editor&studyId=45146&variableId=8200"
        // - text: "Block factor:"
        // - link "BLOCK_NO":
        // - /url: "#/study-editor/45146/(study-editor-outlet:experimental-design)(popup:variable-details-popup)?cropName=maize&programUUID=208dba7e-f4cc-4b71-9f38-46a6fee088e4&selectedProjectId=436&loggedInUserId=1&toolUrl=study-editor&studyId=45146&variableId=8220"
        // `);
    }

    async verifyDefaultViewForPRepDesign() {
        // await expect(this.page.locator('jhi-experimental-design')).toMatchAriaSnapshot(`
        //     - text:  EXPERIMENTAL DESIGN
        //     - text: CHOOSE A DESIGN TYPE P-rep Design
        //     - combobox:
        //       - textbox
        //     - text: Or
        //     - button "Import"
        //     - text: "an experimental design SPECIFY PLOT NUMBERING Specify the starting plot number:"
        //     - spinbutton "Specify the starting plot number:"
        //     - text: "SPECIFY DESIGN PARAMETERS % of test entries to replicate:"
        //     - spinbutton "% of test entries to replicate:"
        //     - text: "Number of replications:"
        //     - spinbutton "Number of replications:"
        //     - text: "Block Size:"
        //     - spinbutton "Block Size:"
        //     - text: "/SUMMARY OF DESIGN DETAILS Number of environments: 1 Number of treatments: \\\\d+ Number of Test entries: \\\\d+ Number of Check entries: \\\\d+ Number of Non Replicated entries: - Treatment factor:/"
        //     - link "ENTRY_NO"
        //     - text: "Plot factor:"
        //     - link "PLOT_NO"
        //     - text: "Block factor:"
        //     - link "BLOCK_NO"
        //     - button "Generate Design"
        //     - button " Delete Design" [disabled]
        //     `);
    }

    async verifyDefaultViewForEntryListOrder() {
        // await expect(this.page.locator('jhi-experimental-design')).toMatchAriaSnapshot(`
        // - text:  EXPERIMENTAL DESIGN
        // - text: CHOOSE A DESIGN TYPE Entry list order Design
        // - combobox:
        //   - textbox
        // - text: Or
        // - button "Import"
        // - text: "an experimental design SPECIFY PLOT NUMBERING Specify the starting plot number:"
        // - spinbutton "Specify the starting plot number:"
        // - text: "SUMMARY OF DESIGN DETAILS Number of environments: 1 Treatment factor:"
        // - link "ENTRY_NO"
        // - text: "Plot factor:"
        // - link "PLOT_NO"
        // - button "Generate Design"
        // - button " Delete Design" [disabled]
        // `);
    }

    async fillStartingPlotNumber(value: string) {
        await this.page.locator('input[id="startingPlotNumber"]').fill(value);
        await this.page.locator('input[id="startingPlotNumber"]').blur();        
        await this.page.waitForLoadState('networkidle');
    }

    async fillNumberOfReplications(value: string) {
        await this.page.locator('input[id="numberOfReplications"]').fill(value);
        await this.page.locator('input[id="numberOfReplications"]').blur();
        await this.page.waitForLoadState('networkidle');
    }

    async fillNumberOfBlocks(value: string) {
        await this.page.locator('input[id="numberOfBlocks"]').fill(value);
        await this.page.locator('input[id="numberOfBlocks"]').blur();
        await this.page.waitForLoadState('networkidle');
    }

    async fillNumberOfRowsInReplication(value: string) {
        await this.page.locator('input[id="numberOfRowsInReplication"]').fill(value);
        await this.page.locator('input[id="numberOfRowsInReplication"]').blur();
        await this.page.waitForLoadState('networkidle');
    }

    async fillNumberOfColumnsInReplication(value: string) {
        await this.page.locator('input[id="numberOfColumnsInReplication"]').fill(value);
        await this.page.locator('input[id="numberOfColumnsInReplication"]').blur();
        await this.page.waitForLoadState('networkidle');
    }

    async fillReplicationPercentage(value: string) {
        await this.page.locator('input[id="replicationPercentage"]').fill(value);
        await this.page.locator('input[id="replicationPercentage"]').blur();
        await this.page.waitForLoadState('networkidle');
       
    }

    async fillCheckStartingPosition(value: string) {
        await this.page.locator('input[id="checkStartingPosition"]').fill(value);
        await this.page.locator('input[id="checkStartingPosition"]').blur();
        await this.page.waitForLoadState('networkidle');
       
    }

    async fillCheckSpacing(value: string) {
        await this.page.locator('input[id="checkSpacing"]').fill(value);
        await this.page.locator('input[id="checkSpacing"]').blur();
        await this.page.waitForLoadState('networkidle');
       
    }

    async clickGenerateDesign() {
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('button', { name: 'Generate Design' }).click();
        await this.page.waitForLoadState('networkidle');
    }
}
