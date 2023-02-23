import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

export type CardVariant = 'content' | 'product' | 'selection';

/**
 * Cards components are used to display content and actions about a
 * single subject, providing at-a-glance information and easy access
 * to more details.
 */
@Component({
  tag: 'datacom-content-card',
  styleUrl: 'datacom-content-card.css',
  shadow: true,
})
export class DatacomCard {
  @Prop() ctaText: string;
  @Prop() date: string;
  @Prop() icon: string;
  @Prop() imageUrl: string;
  @Prop() title: string;
  @Prop() url: string;

  @Event() actionIconClicked: EventEmitter<string>;

  onActionIconClick = () => {
    this.actionIconClicked.emit(this.icon);
  };

  onCtaClick = () => {
    if (!!this.url) {
      location.href = this.url;
    }
  };

  render() {
    const mainElementClasses = {
      'dc-card': true,
    };

    return (
      <Host>
        <div class={mainElementClasses}>
          <div class="dc-card-media-wrapper">
            <div class="dc-card-tags">
              <slot name="tags" />
            </div>
            <div class="dc-card-image" style={{ backgroundImage: 'url(' + this.imageUrl + ')' }} />
          </div>
          <div class="dc-card-content-wrapper">
            <div class="dc-card-content">
              <div class="dc-card-date">{this.date}</div>
              <div class="dc-card-title">{this.title}</div>
              <div class="dc-card-text">
                <slot />
              </div>
            </div>
            <div class="dc-card-actions">
              <datacom-button variant="secondary" size="small" onClick={this.onCtaClick}>
                {this.ctaText}
              </datacom-button>
              {this.icon?.length > 0 && (
                <button class="dc-card-action-icon-button" onClick={this.onActionIconClick}>
                  {getSvg(this.icon, { class: 'dc-card-action-icon' })}
                </button>
              )}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomCardElement = HTMLElement & DatacomCard;
