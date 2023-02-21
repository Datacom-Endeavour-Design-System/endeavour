import { Component, Host, h, Prop } from '@stencil/core';

export type CardVariant = 'content' | 'product' | 'selection';

/**
 * Cards components are used to display content and actions about a
 * single subject, providing at-a-glance information and easy access
 * to more details.
 */
@Component({
  tag: 'datacom-content-card',
  styleUrl: 'datacom-content-card.css',
})
export class DatacomCard {
  @Prop() date;
  @Prop() title;

  render() {
    const mainElementClasses = {
      'dc-card': true,
    };

    return (
      <Host>
        <div class={mainElementClasses}>
          <div class="dc-card-media">
            <div class="dc-card-tags">
              <slot name="tags" />
            </div>
          </div>
          <div class="dc-card-content-wrapper">
            <div class="dc-card-content">
              <div class="dc-card-date">{this.date}</div>
              <div class="dc-card-heading">{this.title}</div>
              <div class="dc-card-text">
                <slot />
              </div>
            </div>
            <div class="dc-card-actions">
              <datacom-button variant="secondary" size="small">
                Learn more
              </datacom-button>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomCardElement = HTMLElement & DatacomCard;
