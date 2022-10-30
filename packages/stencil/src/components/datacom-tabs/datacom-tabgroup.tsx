import { Component, h, Listen, Host } from '@stencil/core';
import { HTMLDatacomTabElement } from './datacom-tab';

@Component({
    tag: 'datacom-tabgroup',
    styleUrl: 'datacom-tabgroup.css',
    shadow: true,
    assetsDirs: ['assets']
})
export class SiteTabGroup {
    root!: HTMLElement;

    async setRoot(value: HTMLElement): Promise<void> {
        this.root = value;
        
        const tabs = this.root.querySelectorAll<HTMLDatacomTabElement>('datacom-tab');
        let first: HTMLDatacomTabElement;
        let selected = false;
        for (let i = 0; i < tabs.length; i++) {
            const tab = tabs.item[i];

            if (first == undefined) {
                first = tab;
            }
            selected = selected || await tab.isSelected();
        }

        if (!selected && first !== undefined) {
            await first.setSelected(true);
        }
    }

    @Listen('tabSelected')
    async onTabSelected(event: CustomEvent<string>): Promise<void> {
        const name = event.detail;
        const tabs = this.root.querySelectorAll<HTMLDatacomTabElement>('datacom-tab');
        
        for (let i = 0; i < tabs.length; i++) {
            const tab = tabs.item[i];
            const found = tab.getAttribute('data-tab');
            await tab.setSelected(false);
            if (found === name) {
                await tab.setSelected(true);
            }            
        }

        event.stopPropagation();
    }

    render() {
        return (
            <Host ref={(el) => this.setRoot(el)}>
                <div class="tab-group">
                    <slot />
                </div>
            </Host>
        );
    }
}
