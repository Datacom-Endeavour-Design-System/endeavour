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
  @Prop() enableAutoPosition = false;
  @Prop() dark = false;
  @Prop() id: string;
  @Prop() hideTip = false;
  @Prop() position: TooltipPositionType = 'top';
  @Prop() text: string;
  @Prop() width: number;

  @State() isTooltipVisible = false;

  private currentPosition: TooltipPositionType;
  private currentWidth: number;
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
    this.isTooltipVisible = true;
  };

  hideTooltip = () => {
    this.isTooltipVisible = false;
  };

  /**
   * Updates position class on wrapper element. Doing it this way
   * prevents re-renders for performance.
   */
  updateTooltipPosition(newPosition: TooltipPositionType) {
    // console.log(`Current pos: ${this.currentPosition} - New Pos: ${newPosition}`);
    this.tooltipWrapperElement.classList.remove(this.currentPosition);
    this.currentPosition = newPosition;
    this.tooltipWrapperElement.classList.add(this.currentPosition);
  }

  /**
   * Updates position class on wrapper element. Doing it this way
   * prevents re-renders for performance.
   */
  updateTooltipWidth(newWidth: number) {
    this.currentWidth = newWidth;
    this.tooltipWrapperElement.style.width = `${this.currentWidth}px`;
  }

  /**
   * Returns data about element's visiblity in viewport and its distance from viewport's edges.
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
    };
  }

  /**
   * Function for creating CSS position class for tooltip
   * @param mainPosition
   * @param subPosition
   * @returns
   */
  concatenatePositionClass(mainPosition: string, subPosition?: string): TooltipPositionType {
    return (subPosition !== undefined && subPosition !== '' ? `${mainPosition}-${subPosition}` : mainPosition) as TooltipPositionType;
  }

  /**
   * Logic for identifying appropriate position for tooltip
   */
  adjustTooltipPosition = () => {
    const slottedElementPositionData = this.getViewportPositionData(this.slottedElement);
    const verticalBuffer = 40;
    const horizontalBuffer = 100;

    console.log('Slotted element data', slottedElementPositionData);

    let mainPosition;

    // Check slotted elements distance from viewport edges to determine best cardinal direction to place.
    if (slottedElementPositionData.distanceFromTop >= verticalBuffer) {
      mainPosition = 'top';
    } else if (slottedElementPositionData.distanceFromTop < 0) {
      mainPosition = 'bottom';
    } else if (slottedElementPositionData.distanceFromLeft >= horizontalBuffer) {
      mainPosition = 'left';
    } else if (slottedElementPositionData.distanceFromRight >= horizontalBuffer) {
      mainPosition = 'right';
    } else {
      mainPosition = 'bottom';
    }

    console.log('Proposed cardinal direction: ', mainPosition);
  };

  /**
   * Debounced function for resetting tooltip position
   * to initially configured position and re-triggering
   * tooltip correction logic (adjustTooltipPosition()).
   */
  resetTooltipPosition = debounce(() => {
    // console.log("Resetting!");
    this.updateTooltipPosition(this.position);
    this.updateTooltipWidth(this.width);
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
      this.slottedElement = slottedElement as HTMLElement;
      this.slottedElement.addEventListener('focusin', this.showTooltip);
      this.slottedElement.addEventListener('focusout', this.hideTooltip);
    }

    this.updateTooltipPosition(this.position);

    if (!this.enableAutoPosition) {
      // Initial check for adjusting tooltip position
      this.updateTooltipPosition('top');
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

    if (!this.enableAutoPosition) {
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
          <div class={wrapperClasses} ref={el => this.setTooltipWrapperElementRef(el as HTMLElement)} style={{ width: `${this.width}` }}>
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
