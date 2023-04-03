import { Component, Host, h, Prop } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

@Component({
  tag: 'datacom-alert-banner',
  styleUrl: 'datacom-alert-banner.css',
  shadow: true,
})
export class DatacomAlertBanner {
  @Prop() copy: string;
  @Prop() link: string;
  @Prop() url: string;

  closeIcon = getSvg('close', { class: 'dc-close-icon' });

  render() {
    return (
      <Host>
        <div class="dc-alert-banner">
          {this.copy}
          <a href={this.url}>{this.link}</a>
          {this.closeIcon}
        </div>
      </Host>
    );
  }
}
