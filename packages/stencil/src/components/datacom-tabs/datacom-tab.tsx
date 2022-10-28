import { Component, h, Prop, State, Method, Event, EventEmitter, Host } from '@stencil/core';

interface DatacomTabElement {
  setSelected(value: boolean): Promise<void>;
  isSelected(): Promise<boolean>;
}

@Component({
  tag: 'datacom-tab',
  styleUrl: 'datacom-tab.css',
  shadow: true,
  assetsDirs: ['assets']
})
export class DatacomTab implements DatacomTabElement {
  @Prop() label = 'Not Set';
  @Prop() enabled = true;
  @State() selected = false;

  @Event({
    composed: true
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

  handleSelect = () => {
    this.tabSelected.emit(this.label.toLowerCase());
  }

  render() {
    return (
      <Host data-tab={this.label.toLowerCase()}>
        <div class={{
          'tab': true,
          'selected': this.selected,
          'disabled': !this.enabled
        }}>
          <label onClick={this.handleSelect} class="label">
            {this.label}
          </label>
          <div class="content">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomTabElement = HTMLElement & DatacomTabElement;