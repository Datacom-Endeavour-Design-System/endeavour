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
  @Prop() label: string = 'Not Set';
  @Prop() enabled: boolean = true;
  @State() selected: boolean = false;

  @Event({
    composed: true
  })
  tabSelected: EventEmitter<string>;

  @Method()
  async isSelected(): Promise<boolean> {
    return this.selected;
  }

  @Method()
  async setSelected(value: boolean): Promise<void> {
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