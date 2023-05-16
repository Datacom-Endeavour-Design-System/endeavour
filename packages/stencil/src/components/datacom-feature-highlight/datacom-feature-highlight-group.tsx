import { Component, Host, Prop, h } from '@stencil/core';

export type NumberOfItemsPerRow = 3 | 4;

/**
 * Feature highlight Group component is  used to hold a number of feature highlight
 * components and manages the responsiveness within it.
 */
@Component({
  tag: 'datacom-feature-highlight-group',
  styleUrl: 'datacom-feature-highlight-group.css',
  shadow: true,
})
export class DatacomFeatureHighlightGroup {
  @Prop() itemsPerRow?: NumberOfItemsPerRow = 3;

  render() {
    const featureGroupClasses = {
      'dc-feature-highlight-group': true,
      'four-items': this.itemsPerRow === 4,
    };

    return (
      <Host>
        <div class={featureGroupClasses}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomFeatureHighlightElement = HTMLElement & DatacomFeatureHighlightGroup;
