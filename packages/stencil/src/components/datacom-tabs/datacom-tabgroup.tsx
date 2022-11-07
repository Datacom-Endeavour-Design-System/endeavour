import { Component, h, Listen, Host, Element, Method } from '@stencil/core';
import { HTMLDatacomTabElement } from './datacom-tab';

@Component({
  tag: 'datacom-tabgroup',
  styleUrl: 'datacom-tabgroup.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class DatacomTabGroup {
  @Element()
  host: HTMLElement;

  /**
   * When the component is loaded, select the first tab is none is selected.
   *
   * @returns void
   */
  async connectedCallback(): Promise<void> {
    const tabs = this.getTabs();
    if (tabs.length === 0) {
      console.warn('Tab group has no tabs');
      return;
    }

    /**
     * If no tab is selected, then set the first as selected.
     */
    const selected = await Promise.all(tabs.map(t => t.isSelected()));
    if (!selected.reduce((p, c) => p || c, false)) {
      await tabs[0].setSelected(true);
    }
  }

  /**
   * Select a tab with focus (zero index based)
   *
   * @param index
   *
   * @returns void
   */
  @Method()
  async select(index: number): Promise<void> {
    const tabs = this.getTabs();

    if (index > tabs.length || index < 0) {
      console.warn(`Invalid tab index ${index}`);
      return;
    }

    for (let i = 0; i < tabs.length; i++) {
      await tabs[i].setSelected(false);
    }

    await tabs[index].setSelected(true);
  }

  /**
   * Pre-rendering validation
   *
   * @returns
   */
  componentWillRender() {
    if (this.host == undefined) {
      return;
    }

    /**
     * Log an error if there are non-tab elements included
     */
    if (this.host.querySelectorAll(':scope > :not(datacom-tab)').length > 0) {
      console.error('Tab group may only contain tab items');
    }
  }

  /**
   * Get a list of tab children
   *
   * @returns List of tabs
   */
  private getTabs(): HTMLDatacomTabElement[] {
    if (this.host == undefined) {
      return [];
    }

    const items: HTMLDatacomTabElement[] = [];

    // Only get immediate children of tab group to permit nested tabs
    this.host.querySelectorAll<HTMLDatacomTabElement>(':scope > datacom-tab').forEach(t => items.push(t));

    return items;
  }

  /**
   * When a tab is selected then deselect the currently selected tab.
   *
   * @param event
   */
  @Listen('selected')
  async onTabSelected(event: CustomEvent<string>): Promise<void> {
    const name = event.detail;
    const tabs = this.getTabs();

    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
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
      <Host>
        <div class="tab-group">
          <slot />
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomTabGroupElement = HTMLElement & DatacomTabGroup;
