import { Component, h, Host, Prop, State } from '@stencil/core';

export type TooltipPositionType =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'left-top'
  | 'left-bottom'
  | 'right'
  | 'right-top'
  | 'right-bottom';

/**
 * Tooltip component is a floating, non-actionable label
 * used to explain a user interface element or feature.
 */
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
  private tooltipElement: HTMLElement;

  private setSlotElementRef(el: HTMLSlotElement) {
    this.slotElement = el;
  }

  private setTooltipElementRef(el: HTMLElement) {
    this.tooltipElement = el;
  }

  showTooltip = () => {
    this.isTooltipVisible = true;
  };

  hideTooltip = () => {
    this.isTooltipVisible = false;
  };

  /**
   * Returns data about whether the element is fully visible in the viewport.
   * @param element - Element to check is in viewport.
   * @returns object with properties related element's position in viewport.
   */
  getViewportPositionData(element: HTMLElement) {
    const { top, left, bottom, right } = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    const topEdgeVisible = top >= 0;
    const leftEdgeVisible = left >= 0;
    const bottomEdgeVisible = bottom <= viewportHeight;
    const rightEdgeVisible = right <= viewportWidth;

    return {
      fullyVisible: topEdgeVisible && leftEdgeVisible && bottomEdgeVisible && rightEdgeVisible,
      bottomEdgeVisible,
      leftEdgeVisible,
      rightEdgeVisible,
      topEdgeVisible,
    };
  }

  adjustTooltipPosition() {
    const positionData = this.getViewportPositionData(this.tooltipElement);
    console.log(positionData);
  }

  componentDidLoad() {
    this.adjustTooltipPosition();

    const slottedElement: Element = this.slotElement.assignedElements()[0];

    if (slottedElement !== undefined && this.slottedElement !== null) {
      this.slottedElement = slottedElement;
      this.slottedElement.addEventListener('mouseenter', this.showTooltip);
      this.slottedElement.addEventListener('mouseleave', this.hideTooltip);
      this.slottedElement.addEventListener('focusin', this.showTooltip);
      this.slottedElement.addEventListener('focusout', this.hideTooltip);
    }
  }

  disconnectedCallback() {
    if (this.slottedElement !== undefined && this.slottedElement !== null) {
      this.slottedElement.removeEventListener('mouseenter', this.showTooltip);
      this.slottedElement.removeEventListener('mouseleave', this.hideTooltip);
      this.slottedElement.removeEventListener('focusin', this.showTooltip);
      this.slottedElement.removeEventListener('focusout', this.hideTooltip);
    }
  }

  render() {
    const wrapperClasses = {
      'dark': this.dark,
      'dc-tooltip-wrapper': true,
      'show': this.isTooltipVisible,
      [`${this.position}`]: true,
    };

    const arrowClasses = {
      'dc-tooltip-arrow': true,
      'hide-tip': this.hideTip,
    };

    return (
      <Host>
        <div class="dc-tooltip-hoc">
          <div class={wrapperClasses}>
            <div class="dc-tooltip" id={this.id} role="tooltip" ref={el => this.setTooltipElementRef(el as HTMLElement)}>
              {this.text}
              <div class={arrowClasses} />
            </div>
          </div>
          <slot ref={el => this.setSlotElementRef(el as HTMLSlotElement)} />
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomToggleElement = HTMLElement & DatacomToggle;
