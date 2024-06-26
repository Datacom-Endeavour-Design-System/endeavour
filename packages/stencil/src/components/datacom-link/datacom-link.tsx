import { Component, Host, h, Prop, VNode } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

export type LinkVariant = 'standalone' | 'stacked' | 'inline' | 'footer';
export type ImagePosition = 'left' | 'right';

/**
 * Link component is used for navigation.
 */
@Component({
  tag: 'datacom-link',
  styleUrl: 'datacom-link.css',
  scoped: true,
})
export class DatacomLink {
  @Prop() variant: LinkVariant = 'standalone';
  @Prop() url: string;
  @Prop() icon?: string;
  @Prop() disabled: boolean;
  @Prop() iconPosition: ImagePosition = 'left';
  @Prop() linkLabel: string;

  render() {
    let image: VNode;
    if (this.icon?.length > 0) {
      image = getSvg(this.icon, { class: 'dc-link-icon' });
    }

    const Classes = {
      'dc-link': true,
      [`dc-link-${this.variant}`]: true,
      'dc-link-disabled': this.disabled,
      [`dc-link-image-${this.iconPosition}`]: true,
    };

    return (
      <Host>
        {!this.disabled ? (
          <a class={Classes} href={this.url}>
            {image}
            {this.linkLabel}
            <slot></slot>
          </a>
        ) : (
          <div class={Classes}>
            {image}
            {this.linkLabel}
            <slot></slot>
          </div>
        )}
      </Host>
    );
  }
}

export type HTMLDatacomLinkElement = HTMLElement & DatacomLink;
