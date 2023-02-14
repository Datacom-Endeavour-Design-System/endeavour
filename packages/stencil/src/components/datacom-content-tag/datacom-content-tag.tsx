import { Component, Host, h, Prop } from '@stencil/core';

export type ContentTagVariant = 'article' | 'event' | 'product-highlight' | 'product-promo';

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
  @Prop() url: string;

  render() {
    const mainElementClasses = {
      'dc-content-tag': true,
      'event': this.variant === 'event',
      'product-highlight': this.variant === 'product-highlight',
      'product-promo': this.variant === 'product-promo',
    };

    return (
      <Host>
        {!!this.url ? (
          <a class={mainElementClasses} href={this.url}>
            <slot></slot>
          </a>
        ) : (
          <div class={mainElementClasses}>
            <slot></slot>
          </div>
        )}
      </Host>
    );
  }
}

export type HTMLDatacomContentTagElement = HTMLElement & DatacomContentTag;
