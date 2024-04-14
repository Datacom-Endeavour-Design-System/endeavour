import { Component, Host, h, Prop, State } from '@stencil/core';
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

  private toggleMenu = () => {
    this.isOpen = !this.isOpen;
    return;
  };

  handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Return' || event.key == ' ') {
      this.toggleMenu();
      return;
    }
  };

  render() {
    const Classes = {
      'dc-overflow-dropdown-options': true,
    };
    return (
      <Host>
        <div
          onClick={() => this.toggleMenu()}
          onKeyUp={this.handleKeyUp}
          class="dc-overflow-menu-wrapper"
          tabIndex={0}>
          {!this.isOpen ? (
            <datacom-tooltip
              label={this.label}
              tabIndex={-1}
              class="dc-overflow-menu-tooltip">
              <OverflowMenuIcon class={`dc-overflow-menu-${this.variant}`} />
            </datacom-tooltip>
          ) : (
            <div class="dc-overflow-dropdown-wrapper">
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
