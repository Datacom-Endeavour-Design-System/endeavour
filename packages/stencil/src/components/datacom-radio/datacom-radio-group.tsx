import { Component, Host, h, Element, Prop } from '@stencil/core';
import { HTMLDatacomRadioElement } from './datacom-radio';

@Component({
  tag: 'datacom-radio-group',
  styleUrl: 'datacom-radio-group.css',
  scoped: true,
})
export class DatacomRadioGroup {
  @Element() host: HTMLElement;
  @Prop() child: boolean;
  /*  for variant display layout  when wrap with group radio component  */
  @Prop() horizontal = true;

  private children: HTMLDatacomRadioElement[] = [];
  /**
   * Gets a list of all immediate children of this group element
   *
   */
  private getChildren(): HTMLDatacomRadioElement[] {
    if (this.host == undefined) {
      return [];
    }

    if (this.children?.length > 0) {
      return this.children;
    }

    this.host.querySelectorAll<HTMLDatacomRadioElement>('datacom-radio').forEach(t => this.children.push(t));

    return this.children;
  }

  componentWillLoad() {
    const children = this.getChildren();
    if (children.length <= 1) {
      return;
    }
    for (let i = 0; i < children.length; i++) {
      children[i].setGrouped(true);
    }
  }

  render() {
    return (
      <Host>
        <div class="dc-radio-group">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
