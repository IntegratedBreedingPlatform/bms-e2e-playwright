import {expect,Page, Locator,FrameLocator} from '@playwright/test';
import {SidebarMenu, SidebarSection} from "./app.constants";

export class SideBarPage{

    private readonly page: Page;
    private readonly pageFrame: FrameLocator;
    
    constructor(page: Page){
        this.page = page;
        this.pageFrame = this.page.locator('iframe[name="PID_Sbrowser"]').contentFrame();
    }
    
    private getSidebarSection(sidebarSection: SidebarSection): Locator{
        return this.page.getByRole('treeitem', { name: sidebarSection, level: 1 });
    }

    private getSidebarMenu(sidebarMenu: SidebarMenu): Locator{
        return this.page.getByRole('treeitem', { name: sidebarMenu, level:2 });
    }
    
    private getPageHeading(header: string): Locator{
        return this.page.getByRole('heading', { name: header });
    }

    private getPageText(text: string):Locator{
        return this.page.getByText(text, { exact: true });
    }

    async getFrameHeading(header: string) {
        return this.pageFrame.getByRole('heading', { name: header });
    } 
    async getFrameText(text: string) {
        return this.pageFrame.getByText(text);
    }

    async expandSidebarTree(sidebar: SidebarSection){
        const sidebarTree = this.getSidebarSection(sidebar);
        const isExpanded = await sidebarTree.getAttribute('aria-expanded');
        // Conditionally click the item to expand it if it is not already expanded
        if (isExpanded === 'false') {
            await sidebarTree.click();
            await expect(sidebarTree).toHaveAttribute('aria-expanded', 'true');
        } else {
        }
    }
    async clickSideBarMenu(sidebarMenu: SidebarMenu){
        const sidebarMenuItem = this.getSidebarMenu(sidebarMenu);
        await sidebarMenuItem.click();
    }

    async verifyPageHeading(header: string){
        const pageHeading = this.getPageHeading(header);
        await pageHeading.waitFor()
        await expect(pageHeading, `Verify that page ${header} is loaded successfully`).toBeVisible();
    }
    
    async verifyPageText(text: string){
        const pageText = this.getPageText(text);
        await pageText.waitFor();
        await expect(pageText).toBeVisible();
    }

    async verifyFrameHeading(header: string){
        const frameHeading = await this.getFrameHeading(header);
        await frameHeading.waitFor({ timeout: 90000 });
        await expect(frameHeading).toBeVisible();
    }
    
    async verifyFrameText(text: string){
        const frameText = await this.getFrameText(text);
        await frameText.waitFor();
        await expect(frameText).toBeVisible();
    }
}
