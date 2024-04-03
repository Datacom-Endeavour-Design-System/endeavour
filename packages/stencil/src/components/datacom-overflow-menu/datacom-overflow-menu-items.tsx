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
  @Event() buttonClicked: EventEmitter;

  onHandleClick = (event: MouseEvent) => {
    this.buttonClicked;
  };

  render() {
    return (
      <Host>
        <div class="dc-menu-item-wrapper">
          {this.icon?.length > 0 &&
            (this.itemUrl ? (
              <a href={this.itemUrl}>
                {getSvg(this.icon, { class: 'dc-item-menu-icon' })}
                {this.itemText}
              </a>
            ) : (
              <button class="dc-item-menu-button" onClick={this.onHandleClick}>
                {getSvg(this.icon, { class: 'dc-item-menu-icon' })}
                {this.itemText}
              </button>
            ))}
          {this.itemText}
        </div>
      </Host>
    );
  }
}

export type DatacomMenuItemsElement = HTMLElement & DatacomMenuItems;
