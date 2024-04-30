import {
  Component,
  Host,
  h,
  Prop,
  State,
  Element,
  Listen,
} from '@stencil/core';
import { OverflowMenuIcon } from './assets/overflow-menu-icon';

export type MenuSizeType = 'standard' | 'small';
export type OverFlowMenuVariantType = 'horizontal' | 'vertical';
export type MenuItemsPositionType = 'center' | 'left' | 'right';

@Component({
  tag: 'datacom-overflow-menu',
  styleUrl: 'datacom-overflow-menu.css',
  shadow: true,
})
export class DatacomOverflowMenu {
  @Prop() variant: OverFlowMenuVariantType = 'horizontal';
  @Prop() label: string;
  @State() isOpen: boolean = false;
  @Prop() size: MenuSizeType = 'small';
  @Element() hostElement: HTMLDatacomOverflowMenuElement;
  @Prop({ mutable: true }) position: MenuItemsPositionType = 'center';
  private buttonRef: HTMLButtonElement;
  private firstElementRef: HTMLElement;

  private open() {
    this.isOpen = true;
    console.log('open');
  }
  private close() {
    this.isOpen = false;
  }

  handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Return' || event.key == ' ') {
      this.open();
      setTimeout(() => {
        this.setFocusToFirstItem();
      }, 100);
      return;
    }
    if (event.key === 'Escape' && this.isOpen) {
      this.close();
      this.buttonRef.focus();
      return;
    }
  };
  /**
   *Set the focus first element of dropdown options when click on the menu button
   *First child of slot
   */
  setFocusToFirstItem() {
    this.firstElementRef = this.hostElement.shadowRoot
      .querySelector('.dc-overflow-dropdown-options')
      ?.querySelector('slot')
      .assignedElements()[0]
      .shadowRoot.querySelector('.dc-menu-item-wrapper') as HTMLElement;
    if (this.firstElementRef) {
      this.firstElementRef.setAttribute('tabindex', '0');
      this.firstElementRef.focus(); // Set focus to the first item of the menu
    }
  }

  private toggleMenu = (event: MouseEvent) => {
    event.preventDefault();
    if (this.isOpen !== true) {
      this.open();
      setTimeout(() => {
        const sampleText =
          this.hostElement.shadowRoot.querySelector<HTMLDivElement>(
            '.dc-overflow-dropdown-options',
          );
        sampleText.focus();
      }, 100);
      return;
    } else {
      this.close();
      this.buttonRef.blur();
    }
    return;
  };

  @Listen('click', { target: 'document' })
  handleOutsideClick(event: MouseEvent) {
    if (!this.hostElement.contains(event.target as Node)) {
      this.close();
    }
  }
  render() {
    const dropdownClasses = {
      'dc-overflow-dropdown-options': true,
      [`dc-menu-item-${this.position}`]: true,
      [`dc-menu-item-${this.size}`]: true,
    };
    const Classes = {
      'dc-overflow-menu-wrapper': true,
      [`dc-menu-item-${this.size}`]: true,
    };

    return (
      <Host>
        <div class="dc-overflow-menu-content">
          <datacom-tooltip
            label={this.label}
            class="dc-overflow-menu-tooltip"
            position="top">
            <button
              ref={(el) => (this.buttonRef = el)}
              onKeyUp={this.handleKeyUp}
              onClick={this.toggleMenu}
              class={Classes}
              tabIndex={0}>
              <OverflowMenuIcon class={`dc-overflow-menu-${this.variant}`} />
            </button>
          </datacom-tooltip>
          {this.isOpen && (
            <div
              tabIndex={this.isOpen ? 0 : -1}
              ref={(el) => (this.firstElementRef = el)}
              class={dropdownClasses}
              onKeyUp={this.handleKeyUp}>
              <slot />
            </div>
          )}
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomOverflowMenuElement = HTMLElement & DatacomOverflowMenu;
