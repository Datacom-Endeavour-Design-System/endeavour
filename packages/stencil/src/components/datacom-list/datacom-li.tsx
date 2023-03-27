import { Component, Host, h, Element, Prop } from '@stencil/core';

@Component({
  tag: 'datacom-li',
  styleUrl: 'datacom-li.css',
  shadow: true,
})
export class DatacomLi {
  @Element() el: HTMLElement;

  /**
   * Heading Prop for list with paragraph.
   */
  @Prop() heading?: string;

  render() {
    const Classes = {
      'dc-li-item': true,
      'dc-li-marker': this.heading?.length > 0,
    };

    return (
      <Host>
        <li class={Classes}>
          {this.heading?.length > 0 && <span class="dc-li-heading">{this.heading}</span>}
          <div>
            <slot></slot>
          </div>
        </li>
      </Host>
    );
  }
}

export type HTMLDatacomLiElement = HTMLElement & DatacomLi;
