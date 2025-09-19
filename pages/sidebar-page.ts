import {expect,Page, Locator,FrameLocator} from '@playwright/test';

export class SideBarPage{

    private readonly page: Page;
    private readonly pageFrame: FrameLocator;
    
    constructor(page: Page){
        this.page = page;
        this.pageFrame = this.page.locator('iframe[name="PID_Sbrowser"]').contentFrame();
    }
    
    private getSidebarGroup(sidebar:string): Locator{
        return this.page.getByRole('treeitem', { name: sidebar, level: 1 });
    }

    private getSidebarMenu(sidebarMenu:string): Locator{
        return this.page.getByRole('treeitem', { name: sidebarMenu, level:2 });
    }
    
    private getPageHeading(header: string): Locator{
        return this.page.getByRole('heading', { name: header });
    }

    private getPageText(text: string):Locator{
        return this.page.getByText(text, { exact: true });
    }

    private getFrameHeading(header: string): Locator{
        return this.pageFrame.getByRole('heading', { name: header });
    } 
    private getFrameText(text: string): Locator{
        return this.pageFrame.getByText(text);
    }

    async expandSidebarTree(sidebar: string){
        const sidebarTree = this.getSidebarGroup(sidebar);
        const isExpanded = await sidebarTree.getAttribute('aria-expanded');
        // Conditionally click the item to expand it if it is not already expanded
        if (isExpanded === 'false') {
            await sidebarTree.click();
            await expect(sidebarTree).toHaveAttribute('aria-expanded', 'true');
        } else {
            console.log('The documents tree item is already expanded.');
        }
    }
    async clickSideBarMenu(sidebar: string){
        const sidebarMenu = this.getSidebarMenu(sidebar);
        await sidebarMenu.click();

    }

    async verifyPageHeading(header: string){
        const pageHeading = this.getPageHeading(header);
        await pageHeading.waitFor()
        await expect(pageHeading).toBeVisible();
    }
    
    async verifyPageText(text: string){
        const pageText = this.getPageText(text);
        await pageText.waitFor();
        await expect(pageText).toBeVisible();
    }

    async verifyFrameHeading(header: string){
        const frameHeading = this.getFrameHeading(header);
        await frameHeading.waitFor()
        await expect(frameHeading).toBeVisible();
    }
    
    async verifyFrameText(text: string){
        const frameText = this.getFrameText(text);
        await frameText.waitFor();
        await expect(frameText).toBeVisible();
    }
}