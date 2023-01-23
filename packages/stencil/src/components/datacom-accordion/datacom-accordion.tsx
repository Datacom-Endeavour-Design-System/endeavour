import { Component, Host, h, Prop, Event, EventEmitter, Method } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

/**
 * Accordion element represents single collapsable section in an accordion
 */
@Component({
  tag: 'datacom-accordion',
  styleUrl: 'datacom-accordion.css',
  shadow: true,
})
export class DatacomAccordion {
  @Prop() disabled = false;
  @Prop({ mutable: true }) expanded: boolean;
  @Prop() index: number;
  @Prop() label: string;

  @Event() itemClicked: EventEmitter<number>;

  onLabelClick = () => {
    if (!this.disabled) {
      this.itemClicked.emit(this.index);
    }
  };

  /**
   * Function returns whether or not this accordion is currently expanded.
   */
  @Method()
  async isExpanded(): Promise<boolean> {
    return this.expanded;
  }

  /**
   * Function sets the expanded state of this individual accordion item.
   *
   * @param expanded
   */
  @Method()
  async setExpanded(expanded: boolean): Promise<void> {
    this.expanded = expanded;
  }

  chevronIcon = getSvg('chevron', { class: 'dc-accordion-chevron' });

  render() {
    const mainElementClasses = {
      'dc-accordion': true,
      'expand': this.expanded,
      'disabled': this.disabled,
    };

    return (
      <Host>
        <div class={mainElementClasses}>
          <button type="button" aria-expanded={this.expanded ? 'true' : 'false'} class="dc-accordion-heading" onClick={this.onLabelClick} disabled={this.disabled}>
            <div class="dc-accordion-heading-content">
              <div class="dc-accordion-heading-text">{this.label}</div>
              {this.chevronIcon}
            </div>
          </button>
          <div class="dc-accordion-content">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomAccordionElement = HTMLElement & DatacomAccordion;
