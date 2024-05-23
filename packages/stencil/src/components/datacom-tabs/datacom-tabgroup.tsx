import {
  Component,
  h,
  Host,
  Element,
  Method,
  State,
  Listen,
} from '@stencil/core';
import { HTMLDatacomTabElement } from './datacom-tab';

@Component({
  tag: 'datacom-tabgroup',
  styleUrl: 'datacom-tabgroup.css',
  shadow: true,
})
export class DatacomTabGroup {
  @Element() host: HTMLElement;

  /**
   * Currently selected tab
   */
  @State() selectedTab: number;

  /**
   * Dummy state variable to force re-render when a datacom-tab is changed programatically.
   */
  @State() force = 0;

  @State()
  tabs: HTMLDatacomTabElement[] = [];

  @Listen('forceReRenderTabGroup')
  handleForceReRender() {
    this.force++;
  }

  /**
   * When the component is loaded, select the first tab if none is selected.
   *
   * @returns void
   */
  async connectedCallback(): Promise<void> {
    this.getTabs();

    /**
     * Log a warning if there are no tab child elements included
     */
    if (this.tabs.length === 0) {
      console.warn('Tab group has no tabs');
      return;
    }

    /**
     * If no tab is selected, then set the first as selected.
     */
    const hasSelectedTab = this.tabs.some(
      (t: HTMLDatacomTabElement) => t.selected,
    );

    if (!hasSelectedTab) {
      await this.select(0);
    }
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
   * Select a tab with focus (zero index based)
   *
   * @param index
   *
   * @returns void
   */
  @Method()
  async select(index: number): Promise<void> {
    if (index > this.tabs.length - 1 || index < 0) {
      console.warn(`Invalid tab index ${index}`);
      return;
    }

    if (this.tabs[index].disabled) {
      return;
    }

    for (let i = 0; i < this.tabs.length; i++) {
      await this.tabs[i].setSelected(false);
    }

    /**
     * Selecting the tab displays the content
     */
    await this.tabs[index].setSelected(true);

    /**
     * Force a re-render using a stateful property
     */
    this.selectedTab = index;
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

    if (this.tabs.length > 0) {
      return this.tabs;
    }

    // Only get immediate children of tab group to permit nested tabs
    this.host
      .querySelectorAll<HTMLDatacomTabElement>('datacom-tab')
      .forEach((t) => this.tabs.push(t));
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
      'dc-tab-label': true,
      selected: selected && !disabled,
      disabled: disabled,
    };

    return (
      <label
        key={index}
        class={classes}
        title={tab.title}
        tabIndex={tabIndex}
        onClick={() => this.onClick(index)}
        onKeyPress={(e) => this.onKeyPress(e, index)}>
        <span class="dc-tab-text">{label}</span>
      </label>
    );
  }

  render() {
    return (
      <Host>
        <div class="dc-tab-group">
          <div class="dc-tab-bar">
            {this.tabs.map((t, ind) => this.header(t, ind))}
          </div>
          <slot />
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomTabGroupElement = HTMLElement & DatacomTabGroup;
