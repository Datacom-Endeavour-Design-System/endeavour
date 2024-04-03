import { Component, Host, h, Prop, Fragment, State } from '@stencil/core';
import { OverflowMenuIcon } from './assets/overflow-menu-icon';

export type OverFlowMenuVariantType = 'horizontal' | 'vertical';

@Component({
  tag: 'datacom-overflow-menu',
  styleUrl: 'datacom-overflow-menu.css',
  shadow: true,
})
export class DatacomOverflowMenu {
  @Prop() variant: OverFlowMenuVariantType = 'horizontal';
  @Prop() label: string;
  @Prop() close: true;
  @State() isOpen: boolean = false;
  @Prop() url: string;
  @Prop() itemText: string;

  // @Method()
  // async isExpanded(): Promise<boolean> {
  //   return this.expanded;
  // }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  renderDropdown() {
    // const tagItem = this.url ? 'a': 'button';
    return (
      <Fragment>
        <div class="dc-overflow-menu-items-wrapper">
          {this.url ? (
            <a href={this.url}>{this.itemText}</a>
          ) : (
            <button>{this.itemText}</button>
          )}
        </div>
      </Fragment>
    );
  }
  render() {
    //  const Classes = {
    //   // [`dc-overflow-menu-${this.variant}`]: true,
    //  };

    return (
      <Host>
        <div onClick={() => this.toggleMenu()}>
          {!this.isOpen ? (
            <datacom-tooltip label="More options">
              <OverflowMenuIcon class={`dc-overflow-menu-${this.variant}`} />
            </datacom-tooltip>
          ) : (
            <div class="dropdown options">
              <OverflowMenuIcon class={`dc-overflow-menu-${this.variant}`} />
              <slot />
            </div>
          )}
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomOverflowMenuElement = HTMLElement & DatacomOverflowMenu;
