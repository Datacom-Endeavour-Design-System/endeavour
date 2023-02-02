import { Component, Host, h, Prop } from '@stencil/core';

export type ListVariant = 'ordered' | 'unordered';
export type TypeList = 'numbers' | 'lowercase' | 'upercase' | 'roman';

@Component({
  tag: 'datacom-list',
  styleUrl: 'datacom-list.css',
  shadow: true,
})
export class DatacomList {
  @Prop() variant: ListVariant = 'ordered';
  @Prop() type: TypeList = 'numbers';
  render() {
    const classes = {
      [`list-${this.variant}`]: true,
      [`list-${this.type}`]: true,
    };
    const ListElement = this.variant === 'ordered' ? 'ol' : 'ul';
    return (
      <Host>
        <ListElement class={classes}>
          <slot></slot>
        </ListElement>
      </Host>
    );
  }
}
