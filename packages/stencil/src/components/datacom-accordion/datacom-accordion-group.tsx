import { Component, Host, h } from '@stencil/core';

/**
 * Accordion element represents the wrapping element around a set of
 * AccordionSection elements.
 */
@Component({
  tag: 'datacom-accordion-group',
  styleUrl: 'datacom-accordion-group.css',
  shadow: true,
})
export class DatacomAccordion {
  // @Prop() initiallyexpanded?: boolean;
  // @Prop() disabled = false;
  // @Prop() label: string;

  // @State() expanded = (this.initiallyexpanded && !this.disabled) || false;

  // onHeaderClick = () => {
  //   if (!this.disabled) {
  //     this.expanded = !this.expanded;
  //   }
  // };
  render() {
    // const mainElementClasses = {
    //   'dc-accordion': true,
    //   'expand': this.expanded,
    //   'disabled': this.disabled,
    // };

    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
