import { Component, Host, h, Prop, VNode } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

export type LinkVariant = 'standalone' | 'stacked' | 'inline';
export type LinkSize = 'large' | 'small';
export type ImagePosition = 'left' | 'right';

/**
 * Link component is used for navigation.
 */
@Component({
  tag: 'datacom-link',
  styleUrl: 'datacom-link.css',
  shadow: true,
})
export class DatacomLink {
  @Prop() variant: LinkVariant = 'standalone';
  @Prop() url: string;
  @Prop() icon?: string;
  @Prop() size: LinkSize = 'large';
  @Prop() disabled: boolean;
  @Prop({ attribute: 'image-position' }) imagePosition: ImagePosition = 'left';

  render() {
    let image: VNode;
    if (this.icon?.length > 0) {
      image = getSvg(this.icon, { class: 'dc-link-icon' });
    }

    const Classes = {
      'dc-link': true,
      [`dc-link-${this.variant}`]: true,
      'dc-link-disabled': this.disabled,
      [`dc-link-size-${this.size}`]: true,
    };

    return (
      <Host>
        <div class="dc-link-wrapper">
          <a class={Classes} href={this.url}>
            <span class={`dc-link-image-${this.imagePosition}`}>
              {image}
              <slot></slot>
            </span>
          </a>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomLinkElement = HTMLElement & DatacomLink;