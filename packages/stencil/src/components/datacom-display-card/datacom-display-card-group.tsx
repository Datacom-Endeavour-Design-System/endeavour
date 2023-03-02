import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'datacom-display-card-group',
  styleUrl: 'datacom-display-card-group.css',
  shadow: true,
})
export class DatacomDisplayCardGroup {
  render() {
    const Classes = {
      'dc-display-card-group': true,
    };
    return (
      <Host>
        <div class={Classes}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
export type HTMLDatacomDisplayCardElement = HTMLElement & DatacomDisplayCardGroup;
