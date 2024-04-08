import { Component, h, Prop, Host, Event, EventEmitter } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

@Component({
  tag: 'datacom-menu-items',
  styleUrl: 'datacom-overflow-menu-items.css',
  shadow: true,
})
export class DatacomMenuItems {
  @Prop() itemText: string;
  @Prop() itemUrl: string;
  @Prop() icon: string;
  @Prop() size: string;

  @Event() buttonClicked: EventEmitter;

  onHandleClick = () => {
    this.buttonClicked;
  };

  render() {
    const itemsClasses = {
      'dc-menu-item-wrapper': true,
    };
    return (
      <Host>
        <div class={itemsClasses}>
          {this.itemUrl ? (
            <a href={this.itemUrl} class="dc-item-menu-link">
              {getSvg(this.icon, { class: 'dc-item-menu-icon' })}
              {this.itemText}
              <slot></slot>
            </a>
          ) : (
            <button class="dc-item-menu-button" onClick={this.onHandleClick}>
              {getSvg(this.icon, { class: 'dc-item-menu-icon' })}
              {this.itemText}
              <slot></slot>
            </button>
          )}
        </div>
      </Host>
    );
  }
}

export type DatacomMenuItemsElement = HTMLElement & DatacomMenuItems;
