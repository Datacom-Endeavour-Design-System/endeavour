import { Component, Host, h, Prop } from '@stencil/core';

/**
 *
 */

@Component({
  tag: 'datacom-display-card',
  styleUrl: 'datacom-display-card.css',
  shadow: true,
})
export class DatacomDisplayCard {
  @Prop() url?: string;
  @Prop() link: string;

  render() {
    const classes = {
      'dc-display-card': true,
    };
    return (
      <Host>
        <div class={classes}>
          <div class="dc-image-card">
            {this.link}
            <div></div>
          </div>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomDisplayCardElement = HTMLElement & DatacomDisplayCard;
