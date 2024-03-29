import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'datacom-display-card-group',
  styleUrl: 'datacom-display-card-group.css',
  shadow: true,
})
export class DatacomDisplayCardGroup {
  render() {
    return (
      <Host>
        <div class="dc-display-card-group">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
export type HTMLDatacomDisplayCardElement = HTMLElement & DatacomDisplayCardGroup;
