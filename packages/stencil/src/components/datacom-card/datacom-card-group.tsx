import { Component, Host, Prop, h } from '@stencil/core';

export type NumberOfItemsPerRow = 3 | 4;

/**
 * Card Group components are used to hold a number of card
 * components and handles the responsiveness of how the cards
 * wrap on smaller screens.
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
