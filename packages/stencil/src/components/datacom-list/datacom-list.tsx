import { Component, Host, h, Prop } from '@stencil/core';

/**
 * DatacomList has two variants ordered(ol) and unordered(ul).
 */
export type ListVariant = 'ordered' | 'unordered';
export type TypeList = 'numbers' | 'lowercase' | 'upercase' | 'roman';

@Component({
  tag: 'datacom-list',
  styleUrl: 'datacom-list.css',
  shadow: true,
})
export class DatacomList {
  @Prop() variant: ListVariant = 'ordered';
  /**
   * type used for ordered list style.
   */
  @Prop() type: TypeList = 'numbers';

  render() {
    const classes = {
      [`dc-list-${this.variant}`]: true,
      [`dc-list-${this.type}`]: true,
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
