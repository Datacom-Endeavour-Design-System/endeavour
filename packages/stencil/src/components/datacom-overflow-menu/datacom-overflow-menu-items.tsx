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
  tag: 'datacom-menu-item',
  styleUrl: 'datacom-overflow-menu-items.css',
  shadow: true,
})
export class DatacomMenuItem {
  @Element() hostElement: HTMLElement;
  @Prop() itemText: string;
  @Prop() itemUrl: string;
  @Prop() icon: string;
  @Prop() disabled: boolean;
  @Prop() size: MenuSizeType = 'small';
  private elementRef: HTMLElement;

  @Event() buttonClicked: EventEmitter;

  private onHandleClick = () => {
    this.buttonClicked;
  };

  private setFocus = () => {
    if (this.disabled) {
      return;
    }
    const item = this.elementRef.querySelector('.dc-menu-item-wrapper');
    if (item instanceof HTMLElement) {
      item.focus();
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
            onFocus={this.setFocus}>
            {getSvg(this.icon, { class: 'dc-item-menu-icon' })}
            {this.itemText}
            <slot></slot>
          </div>
        )}
      </Host>
    );
  }
}

export type HTMLDatacomMenuItemElement = HTMLElement & DatacomMenuItem;
