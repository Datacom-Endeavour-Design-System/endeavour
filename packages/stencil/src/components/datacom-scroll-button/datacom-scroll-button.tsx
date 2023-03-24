import { Component, Host, h, Prop } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

/**
 *
 */
@Component({
  tag: 'datacom-scroll-button',
  styleUrl: 'datacom-scroll-button.css',
  shadow: true,
})
export class DatacomScrollButton {
  @Prop() url: string;

  chevronIcon = getSvg('chevron', { class: 'dc-scroll-btn-chevron' });

  render() {
    return (
      <Host>
        <a href={this.url} class="dc-scroll-btn">
          {this.chevronIcon}
        </a>
      </Host>
    );
  }
}

export type HTMLDatacomScrollButtonElement = HTMLElement & DatacomScrollButton;
