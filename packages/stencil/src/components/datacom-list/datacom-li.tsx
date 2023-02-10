import { Component, Host, h, Element, Prop } from '@stencil/core';

@Component({
  tag: 'datacom-li',
  styleUrl: 'datacom-li.css',
  shadow: true,
})
export class DatacomLi {
  @Element() el: HTMLElement;

  /**
   * Heading  for list inside of paragraph.
   */
  @Prop() heading: false;

  render() {
    const classes = {
      'dc-li-heading': this.heading,
      'dc-li-item': true,
    };

    return (
      <Host>
        <li class={classes}>
          <slot></slot>
        </li>
      </Host>
    );
  }
}

export type HTMLDatacomLiElement = HTMLElement & DatacomLi;
