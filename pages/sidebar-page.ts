import {expect,Page, Locator} from '@playwright/test';

export class SideBarPage{

    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }
    
    private getSidebarGroup(sidebar:string): Locator{
        return this.page.getByRole('treeitem', { name: sidebar, level: 1 });
    }

    private getSidebarMenu(sidebarMenu:string): Locator{
        return this.page.getByRole('treeitem', { name: sidebarMenu, level:2 });
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
        await
        sidebarMenu.click();

    }
    
}