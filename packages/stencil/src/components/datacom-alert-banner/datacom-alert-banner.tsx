import {
  Component,
  Host,
  h,
  Prop,
  State,
  Event,
  EventEmitter,
} from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

export type AlertBannerVariant =
  | 'admiral-blue'
  | 'midnight-blue'
  | 'candy-pink'
  | 'electric-blue'
  | 'datapay-turquoise'
  | 'datascape-indigo'
  | 'empress-teal'
  | 'gateway-gold'
  | 'sky-blue'
  | 'timpani-sapphire'
  | 'tangerine-orange'
  | 'connect-fuchsia';

@Component({
  tag: 'datacom-alert-banner',
  styleUrl: 'datacom-alert-banner.css',
  shadow: true,
})
export class DatacomAlertBanner {
  @Prop() variant: AlertBannerVariant = 'admiral-blue';
  @Prop() ctaLabel: string;
  @Prop() ctaURL: string;
  @State() isOpen = true;

  @Event() close: EventEmitter<void>;

  closeIcon = getSvg('close', { class: 'dc-close-icon' });

  private onClickHandler = () => {
    this.isOpen = false;
    this.close.emit();
  };

  render() {
    const hasActions = this.ctaLabel;
    const Classes = {
      'dc-alert-banner': true,
      [`dc-alert-banner-${this.variant}`]: true,
    };

    return (
      <Host>
        {this.isOpen && (
          <div class={Classes}>
            <div class="dc-alert-banner-content">
              <slot />
              {hasActions && (
                <span>
                  <span> - </span>
                  <datacom-link url={this.ctaURL} variant="stacked">
                    {this.ctaLabel}
                  </datacom-link>
                </span>
              )}
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
