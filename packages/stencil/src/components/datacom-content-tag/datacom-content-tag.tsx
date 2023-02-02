import { Component, Host, h, Prop } from '@stencil/core';

export type ContentTagVariant = 'standard' | 'event';

/**
 * Content Tag elements are used to label, categorize and organize other UI objects using keywords that describe the items.
 */
@Component({
  tag: 'datacom-content-tag',
  styleUrl: 'datacom-content-tag.css',
  shadow: true,
})
export class DatacomContentTag {
  @Prop() variant: ContentTagVariant = 'standard';
  @Prop() solid = false;

  render() {
    const mainElementClasses = {
      'dc-content-tag': true,
      'dc-content-tag-event': this.variant === 'event',
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
