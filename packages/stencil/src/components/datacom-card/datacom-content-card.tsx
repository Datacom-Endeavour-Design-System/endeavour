import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  State,
  Element,
} from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

/**
 * Cards components are used to display content and actions about a
 * single subject, providing at-a-glance information and easy access
 * to more details.
 *
 * This card variant should be used to display an article or customer
 * story overview, designed to accommodate more supporting text and a
 * related call to action.
 */
@Component({
  tag: 'datacom-content-card',
  styleUrl: 'datacom-content-card.css',
  shadow: true,
})
export class DatacomCard {
  @Element() host: HTMLElement;

  @Prop() cardTitle: string;
  @Prop() ctaText: string;
  @Prop() date: string;
  @Prop() icon: string;
  @Prop() imageUrl: string;
  @Prop() url: string;
  @Prop() iconUrl: string;

  @State() hasDescriptionSlotElements = false;

  @Event() actionIconClicked: EventEmitter<string>;

  onActionIconClick = () => {
    this.actionIconClicked.emit(this.icon);
  };

  /**
   * Lifecycle function which checks for presence of slotted elements
   * (info needed for conditionally rendering said elements.)
   */
  async componentWillLoad(): Promise<void> {
    this.hasDescriptionSlotElements = !!this.host.querySelector(
      '[slot="description"]',
    );
  }

  render() {
    const hasActions = this.ctaText || this.icon?.length > 0;
    const tagClasses = {
      'dc-card-tags': true,
      'with-image': this.imageUrl?.length > 0,
    };

    return (
      <Host>
        <div class="dc-card">
          <div class="dc-card-media-wrapper">
            <div class={tagClasses}>
              <slot name="tags" />
            </div>
            {this.imageUrl && <img class="dc-card-image" src={this.imageUrl} />}
          </div>
          <div class="dc-card-content-wrapper">
            <div class="dc-card-content">
              {this.date && <div class="dc-card-date">{this.date}</div>}
              {this.cardTitle && (
                <div class="dc-card-title">{this.cardTitle}</div>
              )}
              {this.hasDescriptionSlotElements && (
                <div class="dc-card-text">
                  <slot name="description" />
                </div>
              )}
            </div>
            {hasActions && (
              <div class="dc-card-actions">
                {this.ctaText && (
                  <datacom-button
                    variant="secondary"
                    size="small"
                    url={this.url}>
                    {this.ctaText}
                  </datacom-button>
                )}
                {this.icon?.length > 0 &&
                  (this.iconUrl ? (
                    <a href={this.iconUrl}>
                      {getSvg(this.icon, { class: 'dc-card-action-icon' })}
                    </a>
                  ) : (
                    <button
                      class="dc-card-action-icon-button"
                      onClick={this.onActionIconClick}>
                      {getSvg(this.icon, { class: 'dc-card-action-icon' })}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomCardElement = HTMLElement & DatacomCard;
