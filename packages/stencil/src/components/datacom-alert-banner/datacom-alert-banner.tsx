import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

export type AlertBannerVariant = 'dark-blue' | 'blue' | 'light-blue' | 'primary-pink';

@Component({
  tag: 'datacom-alert-banner',
  styleUrl: 'datacom-alert-banner.css',
  shadow: true,
})
export class DatacomAlertBanner {
  @Prop() variant: AlertBannerVariant = 'dark-blue';
  @Prop() label: string;
  @Prop() url: string;
  @State() isOpen = true;

  @Event() close: EventEmitter<void>;

  closeIcon = getSvg('close', { class: 'dc-close-icon' });

  private onClickHandler = () => {
    this.isOpen = false;
    this.close.emit();
  };

  render() {
    const Classes = {
      'dc-alert-banner': true,
      [`dc-alert-banner-${this.variant}`]: true,
    };

    return (
      <Host>
        {this.isOpen && (
          <div class={Classes}>
            <div class="dc-alert-banner-content">
              <slot name="message" /> &nbsp;
              <a href={this.url} class="dc-alert-banner-cta-text">
                {this.label}
              </a>
            </div>
            <button class="dc-alert-banner-btn" onClick={this.onClickHandler}>
              {this.closeIcon}
            </button>
          </div>
        )}
      </Host>
    );
  }
}
