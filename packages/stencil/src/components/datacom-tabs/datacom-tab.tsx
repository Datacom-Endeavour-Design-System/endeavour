import { Component, h, Prop, Method, Event, EventEmitter, Host, Element } from '@stencil/core';
import { randomString } from '../../utils';

@Component({
  tag: 'datacom-tab',
  styleUrl: 'datacom-tab.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class DatacomTab {
  @Element() host: HTMLElement;
  @Prop() label = 'Not Set';
  @Prop() disabled: boolean;
  @Prop({ mutable: true }) selected?: boolean;

  private tabId = randomString();

  @Event({
    composed: true,
    eventName: 'selected',
  })
  tabSelected: EventEmitter<string>;

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

  /**
   * Emit an event on selection. The parent is responsible for selecting and deselecting.
   */
  onClick = () => {
    if (this.disabled) {
      return;
    }
    this.tabSelected.emit(this.tabId);
  };

  /**
   * Pressing the enter or space key will select the tab.
   *
   * @param event
   */
  onKeyPress = (event: KeyboardEvent) => {
    if (this.disabled) {
      return;
    }

    if (event.key === 'Enter' || event.key === 'Return' || event.key == ' ') {
      this.tabSelected.emit(this.tabId);
    }
  };

  render() {
    /**
     * A disabled tab cannot have focus
     */
    const tabIndex = this.disabled == true ? -1 : 0;

    return (
      <Host data-tab={this.tabId}>
        <div
          class={{
            tab: true,
            selected: this.selected && !this.disabled,
            disabled: this.disabled,
          }}
        >
          <label class="tab-label" title={this.host.title} tabIndex={tabIndex} onClick={this.onClick} onKeyPress={this.onKeyPress} htmlFor={this.tabId}>
            <span class="tab-text">{this.label}</span>
          </label>

          <div class="content" id={this.tabId}>
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomTabElement = HTMLElement & DatacomTab;
