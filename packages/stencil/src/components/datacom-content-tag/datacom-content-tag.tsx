import { Component, Host, h, Prop } from '@stencil/core';

export type ContentTagVariant = 'article' | 'event' | 'productpromo' | 'productsale';

/**
 * Content Tag elements are used to label, categorize and organize other UI objects using keywords that describe the items.
 */
@Component({
  tag: 'datacom-content-tag',
  styleUrl: 'datacom-content-tag.css',
  shadow: true,
})
export class DatacomContentTag {
  @Prop() variant: ContentTagVariant = 'article';

  render() {
    const mainElementClasses = {
      'dc-content-tag': true,
      'event': this.variant === 'event',
      'product-promo': this.variant === 'productpromo',
      'product-sale': this.variant === 'productsale',
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

export type HTMLDatacomContentTagElement = HTMLElement & DatacomContentTag;
