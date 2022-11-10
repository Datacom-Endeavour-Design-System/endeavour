import { Component, h, Host, Element, Method, State } from '@stencil/core';
import { HTMLDatacomTabElement } from './datacom-tab';

@Component({
  tag: 'datacom-tabgroup',
  styleUrl: 'datacom-tabgroup.css',
  shadow: true,
})
export class DatacomTabGroup {
  @Element()
  host: HTMLElement;

  /**
   * Currently selected tab
   */
  @State() selectedTab: number;

  /**
   * Dummy state variable to force re-render when a datacom-tab is changed programatically.
   */
  @State() force = 0;

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
    if (!selected.includes(true)) {
      await this.select(0);
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

    if (index > tabs.length - 1 || index < 0) {
      console.warn(`Invalid tab index ${index}`);
      return;
    }

    if (tabs[index].disabled) {
      return;
    }

    for (let i = 0; i < tabs.length; i++) {
      await tabs[i].setSelected(false);
    }

    /**
     * Selecting the tab displays the content
     */
    await tabs[index].setSelected(true);

    /**
     * Force a re-render using a stateful property
     */
    this.selectedTab = index;
  }

  /**
   * Return selected tab (zero index based)
   *
   * @returns number
   */
  @Method()
  async selected(): Promise<number> {
    return this.selectedTab;
  }

  /**
   * Disable tab
   *
   * @returns void
   */
  @Method()
  async disableTab(index: number): Promise<void> {
    const tab = this.getTab(index);
    if (tab == undefined) {
      return;
    }

    tab.disabled = true;

    /**
     * Force render
     */
    this.force++;
  }

  /**
   * Enable tab
   *
   * @returns void
   */
  @Method()
  async enableTab(index: number): Promise<void> {
    const tab = this.getTab(index);
    if (tab == undefined) {
      return;
    }
    tab.disabled = false;

    /**
     * Force render
     */
    this.force++;
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

  private tabs: HTMLDatacomTabElement[] = [];

  /**
   * Get a list of tab children
   *
   * @returns List of tabs
   */
  private getTabs(): HTMLDatacomTabElement[] {
    if (this.host == undefined) {
      return [];
    }

    if (this.tabs?.length > 0) {
      return this.tabs;
    }

    // Only get immediate children of tab group to permit nested tabs
    this.host.querySelectorAll<HTMLDatacomTabElement>('datacom-tab').forEach(t => this.tabs.push(t));

    return this.tabs;
  }

  private getTab(index: number): HTMLDatacomTabElement {
    const tabs = this.getTabs();

    if (index < 0 || index > this.tabs.length - 1) {
      return undefined;
    }

    return tabs[index];
  }

  /**
   * Emit an event on selection. The parent is responsible for selecting and deselecting.
   */
  onClick = async (index: number) => {
    await this.select(index);
  };

  /**
   * Pressing the enter or space key will select the tab.
   *
   * @param event
   */
  onKeyPress = async (event: KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === 'Return' || event.key == ' ') {
      await this.select(index);
    }
  };

  /**
   * Generate a tab label per tab
   *
   * @param tab
   * @param index
   * @returns
   */
  private header(tab: HTMLDatacomTabElement, index?: number) {
    const { disabled, selected, label } = tab;

    const tabIndex = disabled == true ? -1 : 0;
    const classes = {
      'tab-label': true,
      'selected': selected && !disabled,
      'disabled': disabled,
    };

    return (
      <label key={index} class={classes} title={tab.title} tabIndex={tabIndex} onClick={() => this.onClick(index)} onKeyPress={e => this.onKeyPress(e, index)}>
        <span class="tab-text">{label}</span>
      </label>
    );
  }

  render() {
    const tabs = this.getTabs();

    return (
      <Host>
        <div class="tab-group">
          <div class="tab-bar">{tabs.map((t, ind) => this.header(t, ind))}</div>

          <slot />
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomTabGroupElement = HTMLElement & DatacomTabGroup;
