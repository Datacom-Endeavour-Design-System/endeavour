import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

@Component({
  tag: 'datacom-alert-banner',
  styleUrl: 'datacom-alert-banner.css',
  shadow: true,
})
export class DatacomAlertBanner {
  @Prop() message: string;
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
    return (
      <Host>
        {this.isOpen && (
          <div class="dc-alert-banner">
            <div class="dc-alert-banner-content">
              {this.message} &nbsp;
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
