import { Component, Host, h, Element, Prop } from '@stencil/core';
export type ItemStyle = 'item' | 'heading';
// adding style for list item inside  paragraph  and  as heading for paragraph

@Component({
  tag: 'datacom-li',
  styleUrl: 'datacom-li.css',
  shadow: true,
})
export class DatacomLi {
  @Element() el: HTMLElement;
  @Prop() variantItem: ItemStyle = 'item';

  render() {
    const classes = {
      [`Item-${this.variantItem}`]: true,
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
