import { Component, Host, h, Prop } from '@stencil/core';

/**
 * DatacomList has two variants ordered(ol) and unordered(ul).
 */
export type ListVariant = 'ordered' | 'unordered';
export type TypeList = 'numbers' | 'lowercase' | 'uppercase' | 'roman';

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
      'dc-list-ordered': true,
      [`dc-list-${this.type}`]: true,
    };

    return (
      <Host>
        {this.variant == 'ordered' ? (
          <ol class={classes}>
            <slot></slot>
          </ol>
        ) : (
          <ul class="dc-list-unordered">
            <slot></slot>
          </ul>
        )}
      </Host>
    );
  }
}
