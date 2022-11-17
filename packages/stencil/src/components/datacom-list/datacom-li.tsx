import { Component, Host, h, Element } from '@stencil/core';

@Component({
  tag: 'datacom-li',
  styleUrl: 'datacom-li.css',
  shadow: true,
})
export class DatacomLi {
  @Element() el: HTMLElement;

  render() {
    return (
      <Host>
        <li>
          <slot></slot>
        </li>
      </Host>
    );
  }
}
