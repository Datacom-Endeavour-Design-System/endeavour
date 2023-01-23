import { Component, Host, h, Prop, Element, Listen } from '@stencil/core';
import { HTMLDatacomAccordionElement } from './datacom-accordion';

/**
 * AccordionGroup element represents the wrapping element around a set of
 * Accordion element(s).
 */
@Component({
  tag: 'datacom-accordion-group',
  styleUrl: 'datacom-accordion-group.css',
  shadow: true,
})
export class DatacomAccordionGroup {
  @Element() host: HTMLElement;

  @Prop() allowMultiExpand?: boolean = false;

  /**
   * List of children accordion items
   */
  private children: HTMLDatacomAccordionElement[] = [];

  /**
   * Gets a list of all immediate children of this group element
   *
   * @returns List of accordion elements
   */
  private getChildren(): HTMLDatacomAccordionElement[] {
    if (this.host == undefined) {
      return [];
    }

    if (this.children?.length > 0) {
      return this.children;
    }

    this.host.querySelectorAll<HTMLDatacomAccordionElement>('datacom-accordion').forEach(t => this.children.push(t));

    return this.children;
  }

  @Listen('itemClicked', { capture: true })
  onItemClicked(event: CustomEvent<number>) {
    const indexClicked = event.detail;
    const children = this.getChildren();

    children.forEach((item, index) => {
      if (index == indexClicked) {
        item.expanded = !item.expanded;
      } else if (!this.allowMultiExpand) {
        item.expanded = false;
      }
    });

    event.stopPropagation();
  }

  // On load of group element, set index properties on children elements
  componentWillLoad() {
    const children = this.getChildren();

    for (let i = 0; i < children.length; i++) {
      children[i].index = i;
    }
  }

  render() {
    return (
      <Host>
        <div class="dc-accordion-group">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
