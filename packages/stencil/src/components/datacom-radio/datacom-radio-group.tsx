import { Component, Host, h, Element, Prop } from '@stencil/core';
// import { DatacomRadio } from './datacom-radio';

@Component({
  tag: 'datacom-radio-group',
  styleUrl: 'datacom-radio-group.css',
  scoped: true,
})
export class DatacomRadioGroup {
  @Element() host: HTMLElement;
  /*  for variant display layout  when wrap with group radio component  */
  @Prop() horizontal = true;

  render() {
    return (
      <Host>
        <div class={this.horizontal ? 'dc-horizontal-layout' : 'dc-vertical-layout'}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
