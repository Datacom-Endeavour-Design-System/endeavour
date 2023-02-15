import { Component, Host, h, Element, Listen } from '@stencil/core';
import { HTMLDatacomBreadcrumbElement } from './datacom-breadcrumb';

/**
 * BreadcrumbGroup element represents the wrapping element around a set of
 * Breadcrumb element(s).
 */
@Component({
  tag: 'datacom-breadcrumb-group',
  styleUrl: 'datacom-breadcrumb-group.css',
  shadow: true,
})
export class DatacomBreadcrumbGroup {
  @Element() host: HTMLElement;
  /**
   * List of children breadcrumb items
   */
  private children: HTMLDatacomBreadcrumbElement[] = [];

  /**
   * Gets a list of all immediate children of this group element
   *
   * @returns List of Breadcrumb elements
   */
  private getChildren(): HTMLDatacomBreadcrumbElement[] {
    if (this.host == undefined) {
      return [];
    }

    if (this.children?.length > 0) {
      return this.children;
    }

    this.host.querySelectorAll<HTMLDatacomBreadcrumbElement>('datacom-breadcrumb').forEach(t => this.children.push(t));

    return this.children;
  }
  @Listen('itemClicked', { capture: true })
  onItemClicked(event: CustomEvent<number>) {
    const indexClicked = event.detail;
    const children = this.getChildren();

    children.forEach((item, index) => {
      if (index == indexClicked) {
        item.selected == true;
      } else {
        item.selected = false;
      }
    });
    event.stopPropagation();
  }
  componentWillLoad() {
    const children = this.getChildren();
    for (let i = 0; i < children.length; i++) {
      children[i].index = i;
    }
  }

  render() {
    return (
      <Host>
        <div>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
