import { Component, h, Prop, Host, Event, EventEmitter } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';
export type MenuSizeType = 'standard' | 'small';

@Component({
  tag: 'datacom-menu-items',
  styleUrl: 'datacom-overflow-menu-items.css',
  shadow: true,
})
export class DatacomMenuItems {
  @Prop() itemText: string;
  @Prop() itemUrl: string;
  @Prop() icon: string;
  @Prop() size: MenuSizeType = 'small';

  @Event() buttonClicked: EventEmitter;

  onHandleClick = () => {
    this.buttonClicked;
  };

  render() {
    const menuClasses = {
      'dc-menu-item-wrapper': true,
      [`dc-menu-item-${this.size}`]: true,
      'dc-menu-item-button': true,
    };
    return (
      <Host>
        {this.itemUrl ? (
          <a href={this.itemUrl} class={menuClasses} tabIndex={0}>
            {getSvg(this.icon, { class: 'dc-item-menu-icon' })}
            {this.itemText}
            <slot></slot>
          </a>
        ) : (
          <button class={menuClasses} onClick={this.onHandleClick}>
            {getSvg(this.icon, { class: 'dc-item-menu-icon' })}
            {this.itemText}
            <slot></slot>
          </button>
        )}
      </Host>
    );
  }
}

export type DatacomMenuItemsElement = HTMLElement & DatacomMenuItems;
