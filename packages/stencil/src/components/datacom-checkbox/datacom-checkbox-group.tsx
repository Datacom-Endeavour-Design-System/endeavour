import { Component, h, Host, Element, Listen } from '@stencil/core';
import { HTMLDatacomCheckboxElement } from './datacom-checkbox';

@Component({
  tag: 'datacom-checkbox-group',
  styleUrl: 'datacom-checkbox-group.css',
  scoped: true,
})
export class DatacomCheckboxGroup {
  @Element() host: HTMLElement;

  /**
   * List of children checkboxes
   */
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

  /**
   * Listen for changes on the children checkbox components
   * - If the parent (first item) changes then set the children to the same state
   * - If a child changes, then set the parent state when all the children have the same state
   * - If not all the children do not have the same state then show the parent as "unknown"
   *
   * @param event
   */
  @Listen('changed', { capture: true })
  onChange(event: CustomEvent<number>) {
    const index = event.detail;
    const children = this.getChildren();
    const state = children[index].checked;
    const parent = children[0];

    /* Changing the parent changes all the children to the same state */
    if (index == 0) {
      children.forEach((c, i) => {
        if (i > 0) c.checked = state;
      });
    } else {
      /**
       * Reduced state of children
       * - when combined equals 0 then all false
       * - when combined greater 0 but combined is less than the number of children then in partial state
       * - when combined equals the number of children then all true
       */
      const combined = children
        .slice(1)
        .map<number>(c => (c.checked ? 1 : 0))
        .reduce((c, p) => p + c, 0);

      if (combined > 0 && combined != children.length - 1) {
        /* Show parent in unknown state */
        parent.unknown = true;
        parent.checked = false;
      } else {
        /* Show parent child combined state */
        parent.unknown = false;
        parent.checked = combined !== 0;
      }
    }

    // This is a private event, so prevent propagation
    event.stopPropagation();
  }

  /**
   * Set the first checkbox as the parent (first item) and the rest as children
   *
   * @returns void
   */
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
