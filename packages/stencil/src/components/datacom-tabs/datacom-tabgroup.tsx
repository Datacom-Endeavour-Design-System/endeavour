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

    async setRoot(value: HTMLElement) {
        this.root = value;
        
        const tabs = this.root.querySelectorAll<HTMLDatacomTabElement>('datacom-tab');
        let first: HTMLDatacomTabElement;
        let selected = false;
        tabs.forEach(async (tab) => {
            if (!first) {
                first = tab;
            }
            selected = selected || await tab.isSelected();
        });        

        if (!selected && first) {
            first.setSelected(true);
        }
    }

    @Listen('tabSelected')
    onTabSelected(event: CustomEvent<string>) {
        const name = event.detail;
        const tabs = this.root.querySelectorAll<HTMLDatacomTabElement>('datacom-tab');
        tabs.forEach((tab) => {
            const found = tab.getAttribute('data-tab');
            tab.setSelected(false);
            if (found === name) {
                tab.setSelected(true);
            }
        });

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
