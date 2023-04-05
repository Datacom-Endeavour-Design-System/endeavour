import { Component, h, Host, Prop, State } from '@stencil/core';

export type TooltipPositionType = 'top' | 'bottom' | 'left' | 'right';

@Component({
  tag: 'datacom-tooltip',
  styleUrl: 'datacom-tooltip.css',
  shadow: true,
})
export class DatacomToggle {
  @Prop() dark: boolean;
  @Prop() id: string;
  @Prop() hideTip = false;
  @Prop() position: TooltipPositionType = 'top';
  @Prop() text: string;

  @State() isTooltipVisible = false;

  private slotElement: HTMLSlotElement;
  private slottedElement: Element;

  private setSlottedElementRef(el: HTMLSlotElement) {
    this.slotElement = el;
  }

  showTooltip = () => {
    this.isTooltipVisible = true;
  };

  hideTooltip = () => {
    this.isTooltipVisible = false;
  };

  componentDidLoad() {
    const slottedElement: Element = this.slotElement.assignedElements()[0];

    if (slottedElement !== undefined && this.slottedElement !== null) {
      this.slottedElement = slottedElement;
      this.slottedElement.addEventListener('mouseenter', this.showTooltip);
      this.slottedElement.addEventListener('mouseleave', this.hideTooltip);
      this.slottedElement.addEventListener('focus', this.showTooltip);
      this.slottedElement.addEventListener('blur', this.hideTooltip);
    }
  }

  disconnectedCallback() {
    if (this.slottedElement !== undefined && this.slottedElement !== null) {
      this.slottedElement.removeEventListener('mouseenter', this.showTooltip);
      this.slottedElement.removeEventListener('mouseleave', this.hideTooltip);
      this.slottedElement.removeEventListener('focus', this.showTooltip);
      this.slottedElement.removeEventListener('blur', this.hideTooltip);
    }
  }

  render() {
    const wrapperClasses = {
      'dark': this.dark,
      'dc-tooltip-wrapper': true,
      'show': this.isTooltipVisible,
      [`tooltip-${this.position}`]: true,
    };

    const tooltipClasses = {
      'dc-tooltip': true,
    };

    const arrowClasses = {
      'dc-tooltip-arrow': true,
      'hide-tip': this.hideTip,
    };

    return (
      <Host>
        <div class="dc-tooltip-hoc">
          <div class={wrapperClasses}>
            <div class={tooltipClasses} id={this.id} role="tooltip">
              {this.text}
              <div class={arrowClasses} />
            </div>
          </div>
          <slot ref={el => this.setSlottedElementRef(el as HTMLSlotElement)} />
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomToggleElement = HTMLElement & DatacomToggle;
