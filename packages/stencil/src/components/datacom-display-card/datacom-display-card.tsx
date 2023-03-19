import { Component, Host, h, Prop } from '@stencil/core';

/**
 *Display card component is used to display text image and navigation together using a clear visual hierarchy.
 */

@Component({
  tag: 'datacom-display-card',
  styleUrl: 'datacom-display-card.css',
  shadow: true,
})
export class DatacomDisplayCard {
  @Prop() url?: string;
  @Prop() heading: string;
  @Prop() ctaText: string;
  @Prop() imageUrl: string;

  render() {
    return (
      <Host>
        <a href={this.url} class="dc-display-card-link">
          <div class="dc-display-card-media">
            <div class="dc-display-card-image" style={{ backgroundImage: 'url(' + this.imageUrl + ')' }} />
            <div class="dc-display-card-content">
              <div class="dc-display-content">
                <span class="dc-display-card-heading">{this.heading}</span>
                <span class="dc-display-card-description">
                  <slot />
                </span>
              </div>
              <div>
                <div class="dc-display-card-cta-wrapper">
                  <span class="dc-display-card-cta-text">{this.ctaText}</span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Host>
    );
  }
}

export type HTMLDatacomDisplayCardElement = HTMLElement & DatacomDisplayCard;
