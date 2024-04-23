import {
  Component,
  h,
  Prop,
  Host,
  Event,
  EventEmitter,
  Element,
} from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';
export type MenuSizeType = 'standard' | 'small';

@Component({
  tag: 'datacom-menu-items',
  styleUrl: 'datacom-overflow-menu-items.css',
  shadow: true,
})
export class DatacomMenuItems {
  @Element() hostElement: HTMLElement;
  @Prop() itemText: string;
  @Prop() itemUrl: string;
  @Prop() icon: string;
  @Prop() disabled: boolean;
  @Prop() size: MenuSizeType = 'small';
  private elementRef: HTMLElement;

  @Event() buttonClicked: EventEmitter;

  onHandleClick = () => {
    this.buttonClicked;
  };

  setFocus = () => {
    if (this.disabled) {
      return;
    }
    const item = this.elementRef.querySelector('.dc-menu-item-wrapper');
    if (item instanceof HTMLElement) {
      item.focus();
    }
  };

  handleKeyUp = (event: KeyboardEvent) => {
    if (this.disabled) {
      return;
    }
    if (event.key === 'Enter' || event.key === 'Return' || event.key == ' ') {
      this.elementRef.focus();
      console.log('keyup');
      return;
    }
  };
  render() {
    const tabIndex = !this.disabled ? 0 : -1;
    const menuClasses = {
      'dc-menu-item-wrapper': true,
      [`dc-menu-item-${this.size}`]: true,
      'dc-menu-item-button': true,
      'dc-menu-item-disabled': this.disabled,
    };
    return (
      <Host>
        {this.itemUrl ? (
          <a
            ref={(el) => (this.elementRef = el)}
            href={this.itemUrl}
            class={menuClasses}
            tabIndex={tabIndex}
            onKeyUp={this.handleKeyUp}
            onFocus={this.setFocus}>
            {getSvg(this.icon, { class: 'dc-item-menu-icon' })}
            {this.itemText}
            <slot></slot>
          </a>
        ) : (
          <div
            class={menuClasses}
            onClick={this.onHandleClick}
            tabIndex={tabIndex}
            onFocus={this.setFocus}
            onKeyUp={this.handleKeyUp}>
            {getSvg(this.icon, { class: 'dc-item-menu-icon' })}
            {this.itemText}
            <slot></slot>
          </div>
        )}
      </Host>
    );
  }
}

export type HTMLDatacomMenuItemsElement = HTMLElement & DatacomMenuItems;
