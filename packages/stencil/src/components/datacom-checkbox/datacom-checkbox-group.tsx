import { Component, h, Host, Element, Listen } from '@stencil/core';
import { HTMLDatacomCheckboxElement } from './datacom-checkbox';

@Component({
  tag: 'datacom-checkbox-group',
  styleUrl: 'datacom-checkbox-group.css',
  shadow: true,
})
export class DatacomCheckboxGroup {
  @Element() host: HTMLElement;

  private children: HTMLDatacomCheckboxElement[] = [];

  /**
   * Get a list of checkbox children
   *
   * @returns List of tabs
   */
  private getChildren(): HTMLDatacomCheckboxElement[] {
    if (this.host == undefined) {
      return [];
    }

    if (this.children?.length > 0) {
      return this.children;
    }

    // Only get immediate children of tab group to permit nested tabs
    this.host.querySelectorAll<HTMLDatacomCheckboxElement>('datacom-checkbox').forEach(t => this.children.push(t));

    return this.children;
  }

  @Listen('changed', { capture: true })
  onChange(event: CustomEvent<number>) {
    const index = event.detail;
    const children = this.getChildren();
    const state = children[index].checked;

    if (index == 0) {
      children.forEach((c, i) => {
        if (i > 0) c.checked = state;
      });
    } else {
      const parent = children
        .slice(1)
        .map(c => c.checked)
        .reduce((c, p) => c && p, true);
      children[0].checked = parent;
    }
  }

  componentWillLoad() {
    const children = this.getChildren();
    if (children.length <= 1) {
      return;
    }

    for (let i = 0; i < children.length; i++) {
      children[i].child = i > 0;
      children[i].grouped = true;
      children[i].index = i;
    }
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
