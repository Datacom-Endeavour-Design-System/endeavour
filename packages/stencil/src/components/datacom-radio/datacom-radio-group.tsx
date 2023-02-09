import { Component, Host, h, Element } from '@stencil/core';
import { HTMLDatacomRadioElement } from './datacom-radio';

@Component({
  tag: 'datacom-radio-group',
  styleUrl: 'datacom-radio-group.css',
  scoped: true,
})
export class DatacomRadioGroup {
  @Element() host: HTMLElement;

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

  async componentDidLoad() {
    const children = this.getChildren();

    await Promise.all(children.map(c => c.setGrouped(true)));
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
