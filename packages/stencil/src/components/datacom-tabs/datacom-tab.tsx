import { Component, h, Prop, Method, Host } from '@stencil/core';

/**
 * The tab element describes the tab, but does not render the tab label.
 *
 * @see DatacomTabGroup
 */
@Component({
  tag: 'datacom-tab',
  styleUrl: 'datacom-tab.css',
  shadow: true,
})
export class DatacomTab {
  @Prop() label = 'Not Set';
  @Prop({ mutable: true }) disabled: boolean;
  @Prop({ mutable: true }) selected?: boolean;

  /**
   * Is this tab currently selected
   *
   * @returns boolean
   */
  @Method()
  public async isSelected(): Promise<boolean> {
    return this.selected;
  }

  /**
   * Select this tab
   *
   * @param value
   */
  @Method()
  public async setSelected(value: boolean): Promise<void> {
    this.selected = value;
  }

  render() {
    return (
      <Host>
        <div
          class={{
            'tab-content': true,
            'selected': this.selected,
          }}
        >
          <slot />
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomTabElement = HTMLElement & DatacomTab;
