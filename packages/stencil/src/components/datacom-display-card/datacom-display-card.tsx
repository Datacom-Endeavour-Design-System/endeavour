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
  @Prop() title: string;
  @Prop() details: string;

  render() {
    const classes = {
      'dc-display-card': true,
    };
    return (
      <Host>
        <div class={classes}>
          <div class="dc-display-card-image">
            <div class="dc-display-card-heading">{this.title}</div>
            <div class="dc-display-card-text">{this.details}</div>
            <a href={this.url}>
              <slot></slot>
            </a>
          </div>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomDisplayCardElement = HTMLElement & DatacomDisplayCard;
