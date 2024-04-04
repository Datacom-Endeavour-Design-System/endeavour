import { Component, Host, h, Prop, State } from '@stencil/core';
import { OverflowMenuIcon } from './assets/overflow-menu-icon';

export type OverFlowMenuVariantType = 'horizontal' | 'vertical';
export type MenuSizeType = 'standard' | 'small';

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
  @Prop() menuText: string;
  @Prop() size: MenuSizeType = 'small';

  // @Method()
  // async isExpanded(): Promise<boolean> {
  //   return this.expanded;
  // }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  render() {
    const Classes = {
      // [`dc-overflow-menu-${this.variant}`]: true,
      [`dc-menu-item-${this.size}`]: true,
      'dropdown-options': true,
    };

    return (
      <Host>
        <div onClick={() => this.toggleMenu()}>
          {!this.isOpen ? (
            <datacom-tooltip label="More options">
              <OverflowMenuIcon class={`dc-overflow-menu-${this.variant}`} />
            </datacom-tooltip>
          ) : (
            <div>
              <OverflowMenuIcon class={`dc-overflow-menu-${this.variant}`} />
              <div class={Classes}>
                <slot />
              </div>
            </div>
          )}
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomOverflowMenuElement = HTMLElement & DatacomOverflowMenu;
