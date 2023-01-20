import { Component, Host, h, Prop, State } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

/**
 * AccordionSection element represents single collapsable section in an accordion
 */
@Component({
  tag: 'datacom-accordion-section',
  styleUrl: 'datacom-accordion-section.css',
  shadow: true,
})
export class DatacomAccordionSection {
  @Prop() initiallyexpanded?: boolean;
  @Prop() disabled = false;
  @Prop() label: string;

  @State() expanded = (this.initiallyexpanded && !this.disabled) || false;

  onHeaderClick = () => {
    if (!this.disabled) {
      this.expanded = !this.expanded;
    }
  };

  chevronIcon = getSvg('chevron', { class: 'dc-accordion-section-chevron' });

  render() {
    const mainElementClasses = {
      'dc-accordion-section': true,
      'expand': this.expanded,
      'disabled': this.disabled,
    };

    return (
      <Host>
        <div class={mainElementClasses}>
          <button type="button" aria-expanded={this.expanded ? 'true' : 'false'} class="dc-accordion-section-heading" onClick={this.onHeaderClick}>
            <div class="dc-accordion-section-heading-content">
              <div class="dc-accordion-section-heading-text">{this.label}</div>
              {this.chevronIcon}
            </div>
          </button>
          <div class="dc-accordion-section-content">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomAccordionSectionElement = HTMLElement & DatacomAccordionSection;
