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
  @Element() hostElement: HTMLElement;
  @Prop({ mutable: true }) position: MenuItemsPositionType = 'center';
  private buttonRef: HTMLButtonElement;
  private firstElementRef: HTMLElement;
  private currentPosition: MenuItemsPositionType;

  private open() {
    this.isOpen = true;
    this.setFocusToFirstItem();
  }

  private close() {
    this.isOpen = false;
  }

  handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Return' || event.key == ' ') {
      this.open();
      this.setFocusToFirstItem();
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
  setFocusToFirstItem(_event?: MouseEvent | KeyboardEvent) {
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
    if (this.isOpen !== true) {
      this.open();
      setTimeout(() => {
        this.setFocusToFirstItem(event);
      }, 0);
    } else {
      this.close();
    }
    event.preventDefault();
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
        <div>
          <datacom-tooltip label={this.label} class="dc-overflow-menu-tooltip">
            <button
              ref={(el) => (this.buttonRef = el)}
              onClick={this.toggleMenu}
              class={Classes}
              tabIndex={0}
              onKeyUp={this.handleKeyUp}>
              <OverflowMenuIcon class={`dc-overflow-menu-${this.variant}`} />
            </button>
          </datacom-tooltip>
          {this.isOpen && (
            <div
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
