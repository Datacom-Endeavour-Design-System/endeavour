import { Component, h, Host, Prop, State } from '@stencil/core';

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
  | 'right-end'
  | 'auto';

/**
 * Tooltip component is a floating, non-actionable label
 * used to explain a user interface element or feature.
 */
@Component({
  tag: 'datacom-tooltip',
  styleUrl: 'datacom-tooltip.css',
  shadow: true,
})
export class DatacomTooltip {
  @Prop() dark = false;
  @Prop() hideArrow = false;
  @Prop() id: string;
  @Prop() label: string;
  @Prop() position: TooltipPositionType = 'auto';
  @Prop() width: number;

  @State() isTooltipVisible = false;

  private hasAutoPositionEventListeners = false;
  private currentPosition: TooltipPositionType;
  private slotElement: HTMLSlotElement;
  private slottedElement: HTMLElement;
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
    if (this.position === 'auto') {
      this.resetTooltipPosition();
    }

    this.isTooltipVisible = true;
  };

  hideTooltip = () => {
    this.isTooltipVisible = false;
  };

  /**
   * Updates position class on wrapper element. Doing it this way
   * prevents re-renders for performance.
   */
  updateTooltipPosition(mainPosition: string, subPosition?: string) {
    const newPosition = (subPosition !== undefined && subPosition !== '' ? `${mainPosition}-${subPosition}` : mainPosition) as TooltipPositionType;
    this.tooltipWrapperElement.classList.remove(this.currentPosition);
    this.currentPosition = newPosition;
    this.tooltipWrapperElement.classList.add(this.currentPosition);
  }

  /**
   * Updates position class on wrapper element. Doing it this way
   * prevents re-renders for performance.
   */
  updateTooltipWidth(newWidth: number) {
    if (newWidth === undefined) {
      this.tooltipWrapperElement.style.removeProperty('width');
    } else {
      this.tooltipWrapperElement.style.width = `${newWidth}px`;
    }
  }

  /**
   * Returns data about element's visibility in viewport and its distance from viewport's edges.
   * @param element - Element to check is in viewport.
   * @returns object with properties related element's position in viewport.
   */
  getViewportPositionData(element: HTMLElement) {
    const { top, left, bottom, right } = element?.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    const distanceFromTop = top;
    const distanceFromLeft = left;
    const distanceFromRight = viewportWidth - right;
    const distanceFromBottom = viewportHeight - bottom;

    return {
      partiallyVisible: ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)),
      fullyVisible: top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth,
      distanceFromBottom,
      distanceFromLeft,
      distanceFromRight,
      distanceFromTop,
      viewportWidth,
      viewportHeight,
    };
  }

  /**
   * Logic for identifying appropriate position for tooltip
   */
  adjustTooltipPosition = () => {
    const slottedElementPositionData = this.getViewportPositionData(this.slottedElement);
    const verticalBuffer = 40;
    const horizontalBuffer = 100;
    const tooltipPositionBuffer = 10;

    let mainPosition;
    let subPosition;

    // Check slotted element's distance from viewport edges to determine best cardinal direction for main tooltip position.
    if (slottedElementPositionData.distanceFromBottom >= verticalBuffer) {
      mainPosition = 'bottom';
    } else if (slottedElementPositionData.distanceFromBottom < 0) {
      mainPosition = 'top';
    } else if (slottedElementPositionData.distanceFromLeft >= horizontalBuffer && slottedElementPositionData.distanceFromLeft >= slottedElementPositionData.distanceFromRight) {
      mainPosition = 'left';
    } else if (slottedElementPositionData.distanceFromRight >= horizontalBuffer && slottedElementPositionData.distanceFromRight >= slottedElementPositionData.distanceFromLeft) {
      mainPosition = 'right';
    } else {
      mainPosition = 'top';
    }

    // Update tooltip position and verify tooltip position data for next steps.
    this.updateTooltipPosition(mainPosition);
    let tooltipPositionData = this.getViewportPositionData(this.tooltipElement);

    // Now determine if sub position should be start, end or center depending on where element is placed in viewport.
    if (mainPosition === 'top' || mainPosition === 'bottom') {
      // Vertical cardinal directions
      if (tooltipPositionData.distanceFromLeft < 0 && tooltipPositionData.distanceFromRight >= 0) {
        subPosition = 'start';
      } else if (tooltipPositionData.distanceFromLeft >= 0 && tooltipPositionData.distanceFromRight < 0) {
        subPosition = 'end';
      } else {
        subPosition = '';
      }
    } else {
      // Horizontal cardinal directions

      // Check and adjust width if needed.
      if (tooltipPositionData.distanceFromLeft < 0) {
        this.updateTooltipWidth(tooltipPositionData.viewportWidth - tooltipPositionData.distanceFromRight - tooltipPositionBuffer);
        tooltipPositionData = this.getViewportPositionData(this.tooltipElement);
      } else if (tooltipPositionData.distanceFromRight < 0) {
        this.updateTooltipWidth(tooltipPositionData.viewportWidth - tooltipPositionData.distanceFromLeft - tooltipPositionBuffer);
        tooltipPositionData = this.getViewportPositionData(this.tooltipElement);
      }

      if (tooltipPositionData.distanceFromTop < 0 && tooltipPositionData.distanceFromBottom >= 0) {
        subPosition = 'start';
      } else if (tooltipPositionData.distanceFromTop >= 0 && tooltipPositionData.distanceFromBottom < 0) {
        subPosition = 'end';
      } else {
        subPosition = '';
      }
    }

    this.updateTooltipPosition(mainPosition, subPosition);
  };

  /**
   * Function for resetting tooltip position
   * to initially configured position and re-triggering
   * tooltip correction logic (adjustTooltipPosition()).
   */
  resetTooltipPosition = () => {
    this.updateTooltipPosition('bottom');
    this.updateTooltipWidth(undefined);
    this.adjustTooltipPosition();
  };

  initializeAutoPositionLogic = () => {
    // Initial reset for tooltip position
    this.resetTooltipPosition();

    if (!this.hasAutoPositionEventListeners) {
      // Set boolean to track that "auto" position event listener has been added.
      this.hasAutoPositionEventListeners = true;

      // Apply listeners to update tooltip position
      this.slottedElement.addEventListener('mouseenter', this.resetTooltipPosition);
    }
  };

  removeAutoPositionLogic = () => {
    if (this.hasAutoPositionEventListeners) {
      // Set boolean to track that "auto" position event listener has been added.
      this.hasAutoPositionEventListeners = false;

      this.tooltipWrapperElement.classList.remove(this.currentPosition);
      this.slottedElement.removeEventListener('mouseenter', this.resetTooltipPosition);
    }
  };

  /**
   * Lifecycle method for setting event listeners for showing tooltip,
   * as well as setting the position class. Will also set event
   * listeners for tooltip correction logic if allowed.
   */
  async componentDidLoad() {
    const slottedElement: Element = this.slotElement?.assignedElements()[0];

    if (slottedElement !== undefined && this.slottedElement !== null) {
      this.slottedElement = slottedElement as HTMLElement;
      this.slottedElement.addEventListener('focusin', this.showTooltip);
      this.slottedElement.addEventListener('focusout', this.hideTooltip);

      if (this.position === 'auto') {
        this.initializeAutoPositionLogic();
      }
    }
  }

  componentDidUpdate() {
    if (this.position === 'auto') {
      this.initializeAutoPositionLogic();
    } else {
      this.removeAutoPositionLogic();
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

    if (this.position === 'auto') {
      this.removeAutoPositionLogic();
    }
  }

  render() {
    const wrapperClasses = {
      'dark': this.dark,
      'dc-tooltip-wrapper': true,
      'hide-arrow': this.hideArrow,
      'show': this.isTooltipVisible,
      [`${this.position}`]: this.position !== 'auto',
    };

    // TODO - Clean up arrow classes if multiple classes aren't needed here.
    const arrowClasses = {
      'dc-tooltip-arrow': true,
    };

    return (
      <Host>
        <div class="dc-tooltip-hoc">
          <div class={wrapperClasses} ref={el => this.setTooltipWrapperElementRef(el as HTMLElement)}>
            <div class="dc-tooltip" id={this.id} role="tooltip" ref={el => this.setTooltipElementRef(el as HTMLElement)} style={{ width: `${this.width}px` }}>
              {this.label}
              <div class={arrowClasses} />
            </div>
          </div>
          <slot ref={el => this.setSlotElementRef(el as HTMLSlotElement)} />
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomTooltipElement = HTMLElement & DatacomTooltip;
