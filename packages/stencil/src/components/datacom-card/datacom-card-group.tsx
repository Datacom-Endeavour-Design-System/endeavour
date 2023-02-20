import { Component, Host, Prop, h } from '@stencil/core';

export type CardVariant = 'content' | 'product' | 'selection';
export type NumberOfItemsPerRow = 3 | 4;

/**
 * Cards components are used to display content and actions about a
 * single subject, providing at-a-glance information and easy access
 * to more details.
 */
@Component({
  tag: 'datacom-card-group',
  styleUrl: 'datacom-card-group.css',
  shadow: true,
})
export class DatacomCardGroup {
  @Prop() itemsPerRow?: NumberOfItemsPerRow = 3;

  render() {
    const mainElementClasses = {
      'dc-card-group': true,
      'four-items': this.itemsPerRow === 4,
    };

    return (
      <Host>
        <div class={mainElementClasses}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomCardElement = HTMLElement & DatacomCardGroup;
