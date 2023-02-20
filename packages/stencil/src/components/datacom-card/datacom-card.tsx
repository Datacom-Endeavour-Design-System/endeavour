import { Component, Host, h } from '@stencil/core';

export type CardVariant = 'content' | 'product' | 'selection';

/**
 * Cards components are used to display content and actions about a
 * single subject, providing at-a-glance information and easy access
 * to more details.
 */
@Component({
  tag: 'datacom-card',
  styleUrl: 'datacom-card.css',
  shadow: true,
})
export class DatacomCard {
  render() {
    const mainElementClasses = {
      'dc-card': true,
    };

    return (
      <Host>
        <div class={mainElementClasses}>
          <div class="dc-card-media"></div>
          <div class="dc-card-content-wrapper">
            <div class="dc-card-content">
              <div class="dc-card-date">00-00-2022</div>
              <div class="dc-card-heading">How to: Lorem Ipsum</div>
              <div class="dc-card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
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
