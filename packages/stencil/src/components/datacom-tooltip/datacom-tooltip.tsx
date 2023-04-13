import { Component, h, Host, Prop, State } from '@stencil/core';
import { debounce } from '../../utils';

export type TooltipPositionType =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

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
  @Prop() disableAutoPosition = false;
  @Prop() dark = false;
  @Prop() id: string;
  @Prop() hideTip = false;
  @Prop() position: TooltipPositionType = 'top';
  @Prop() text: string;

  @State() isTooltipVisible = false;

  private currentPosition: TooltipPositionType;
  private slotElement: HTMLSlotElement;
  private slottedElement: Element;
  private tooltipElement: HTMLElement;
  private tooltipWrapperElement: HTMLElement;

  private setSlotElementRef(el: HTMLSlotElement) {
    this.slotElement = el;
  }

  private setTooltipElementRef(el: HTMLElement) {
    this.tooltipElement = el;
  }

  private setTooltipWrapperElementRef(el: HTMLElement) {
    this.tooltipWrapperElement = el;
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
      fullyHidden: !topEdgeVisible && !leftEdgeVisible && !bottomEdgeVisible && !rightEdgeVisible,
      fullyVisible: topEdgeVisible && leftEdgeVisible && bottomEdgeVisible && rightEdgeVisible,
      bottomEdgeVisible,
      leftEdgeVisible,
      rightEdgeVisible,
      topEdgeVisible,
    };
  }

  /**
   * Updates position class on wrapper element. Doing it this way
   * prevents re-renders for performance.
   */
  updatePositionClass(newPosition: TooltipPositionType) {
    this.tooltipWrapperElement.classList.remove(this.currentPosition);
    this.currentPosition = newPosition;
    this.tooltipWrapperElement.classList.add(this.currentPosition);
  }

  /**
   * Checks current tooltip position and corrects its position to
   * make it fully visible in current viewport.
   */
  adjustTooltipPosition = () => {
    const positionData = this.getViewportPositionData(this.tooltipElement);

    if (!positionData.fullyVisible && !positionData.fullyHidden) {
      const splitClass = this.currentPosition.split('-');
      const mainPosition = splitClass[0];
      const subPosition = splitClass?.[1] || '';

      let positionFinal = mainPosition;
      let subPositionFinal = subPosition;

      if (mainPosition === 'top' || mainPosition === 'bottom') {
        if (!positionData.topEdgeVisible) {
          positionFinal = 'bottom';
        }

        if (!positionData.bottomEdgeVisible) {
          positionFinal = 'top';
        }

        if (!positionData.leftEdgeVisible && positionData.rightEdgeVisible) {
          subPositionFinal = 'start';
        } else if (positionData.leftEdgeVisible && !positionData.rightEdgeVisible) {
          subPositionFinal = 'end';
        } else if (!positionData.leftEdgeVisible && !positionData.rightEdgeVisible) {
          subPositionFinal = '';
        }
      } else if (mainPosition === 'left' || mainPosition === 'right') {
        if (!positionData.leftEdgeVisible) {
          positionFinal = 'right';
        }

        if (!positionData.rightEdgeVisible) {
          positionFinal = 'left';
        }

        if (!positionData.topEdgeVisible && positionData.bottomEdgeVisible) {
          subPositionFinal = 'start';
        } else if (positionData.topEdgeVisible && !positionData.bottomEdgeVisible) {
          subPositionFinal = 'end';
        } else if (!positionData.topEdgeVisible && !positionData.bottomEdgeVisible) {
          subPositionFinal = '';
        }
      }

      if (subPositionFinal !== '') {
        positionFinal = `${positionFinal}-${subPositionFinal}`;
      }

      if (positionFinal !== this.position || positionFinal !== this.currentPosition) {
        this.updatePositionClass(positionFinal as TooltipPositionType);
      }
    }
  };

  /**
   * Debounced function for resetting tooltip position
   * to initially configured position and re-triggering
   * tooltip correction logic (adjustTooltipPosition()).
   */
  resetTooltipPosition = debounce(() => {
    this.updatePositionClass(this.position);
    this.adjustTooltipPosition();
  }, 100);

  /**
   * Lifecycle method for setting event listeners for showing tooltip,
   * as well as setting the position class. Will also set event
   * listeners for tooltip correction logic if allowed.
   */
  componentDidLoad() {
    const slottedElement: Element = this.slotElement?.assignedElements()[0];

    if (slottedElement !== undefined && this.slottedElement !== null) {
      this.slottedElement = slottedElement;
      this.slottedElement.addEventListener('focusin', this.showTooltip);
      this.slottedElement.addEventListener('focusout', this.hideTooltip);
    }

    this.updatePositionClass(this.position);

    if (!this.disableAutoPosition) {
      // Initial check for adjusting tooltip position
      this.adjustTooltipPosition();

      // Apply listeners to update tooltip position
      window.addEventListener('scroll', this.resetTooltipPosition);
      window.addEventListener('resize', this.resetTooltipPosition);
    }
  }

  /**
   * Lifecycle method for removing event listeners for showing tooltip,
   * as well as removing event listeners for tooltip correction logic
   * if they were allowed.
   */
  disconnectedCallback() {
    if (this.slottedElement !== undefined && this.slottedElement !== null) {
      this.slottedElement.removeEventListener('focusin', this.showTooltip);
      this.slottedElement.removeEventListener('focusout', this.hideTooltip);
    }

    if (!this.disableAutoPosition) {
      this.tooltipWrapperElement.classList.remove(this.currentPosition);
      window.removeEventListener('scroll', this.resetTooltipPosition);
      window.removeEventListener('resize', this.resetTooltipPosition);
    }
  }

  render() {
    const wrapperClasses = {
      'dark': this.dark,
      'dc-tooltip-wrapper': true,
      'show': this.isTooltipVisible,
    };

    const arrowClasses = {
      'dc-tooltip-arrow': true,
      'hide-tip': this.hideTip,
    };

    return (
      <Host>
        <div class="dc-tooltip-hoc">
          <div class={wrapperClasses} ref={el => this.setTooltipWrapperElementRef(el as HTMLElement)}>
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
