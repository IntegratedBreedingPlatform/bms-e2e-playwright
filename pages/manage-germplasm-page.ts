import {expect,Page, Locator} from '@playwright/test';

export class ManageGermplasmPage{

    private readonly page: Page;
    private readonly gidFilter: Locator;
    private readonly gidFilterInput: Locator;
    private readonly gidFilterApplyBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.gidFilter = this.page.getByRole('button', { name: 'GID :: All' }).describe('GID filter');
        this.gidFilterInput = this.page.locator('[data-test="columnFilterListInput"]').describe('GID filter input field');
        this.gidFilterApplyBtn = this.page.locator('[data-test="columnFilterListApplyButton"]').describe('GID filter apply button');
        
    }

    private getGermplasmLink(germplasmName: string) : Locator{
        //return this.page.getByRole('cell', { name: germplasmName }).locator('a').first();
        const row = this.page.getByRole('row').filter({ hasText: 'germplasmName' });
        return row.locator('td').nth(0);

    }

    async clickGermplasmNameLink(germplasmName: string){
        await this.getGermplasmLink(germplasmName).waitFor();
        await this.getGermplasmLink(germplasmName).click();
    }

    async filterByGID(gid: string){
        await this.gidFilter.waitFor();
        await this.gidFilter.click();
        await this.gidFilterInput.waitFor();
        await this.gidFilterInput.fill(gid);
        await this.gidFilterApplyBtn.waitFor();
        await this.gidFilterApplyBtn.click();

    }
}
