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

  @State() currentPosition: TooltipPositionType = this.position;
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
      fullyHidden: !topEdgeVisible && !leftEdgeVisible && !bottomEdgeVisible && !rightEdgeVisible,
      fullyVisible: topEdgeVisible && leftEdgeVisible && bottomEdgeVisible && rightEdgeVisible,
      bottomEdgeVisible,
      leftEdgeVisible,
      rightEdgeVisible,
      topEdgeVisible,
    };
  }

  resetTooltipPosition = debounce(() => {
    this.currentPosition = this.position;
  }, 300);

  adjustTooltipPosition = () => {
    const positionData = this.getViewportPositionData(this.tooltipElement);

    if (!positionData.fullyVisible && !positionData.fullyHidden) {
      console.log('Fixing position!');
      const splitClass = this.position.split('-');
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

      console.log(`Updating from "${this.position}" to "${positionFinal}" using following data: `);
      if (positionFinal !== this.position) {
        this.currentPosition = positionFinal as TooltipPositionType;
      }
    }
  };

  componentDidLoad() {
    const slottedElement: Element = this.slotElement?.assignedElements()[0];

    if (slottedElement !== undefined && this.slottedElement !== null) {
      this.slottedElement = slottedElement;
      this.slottedElement.addEventListener('mouseenter', this.showTooltip);
      this.slottedElement.addEventListener('mouseleave', this.hideTooltip);
      this.slottedElement.addEventListener('focusin', this.showTooltip);
      this.slottedElement.addEventListener('focusout', this.hideTooltip);
    }

    if (!this.disableAutoPosition) {
      this.adjustTooltipPosition();
      //  THese should reser position of tooltip (which should update currentPosition state, which should trigger new render)
      window.addEventListener('scroll', this.resetTooltipPosition);
      window.addEventListener('resize', this.resetTooltipPosition);
    }
  }

  componentDidRender() {
    if (!this.disableAutoPosition && this.currentPosition === this.position) {
      this.adjustTooltipPosition();
    }
  }

  disconnectedCallback() {
    if (this.slottedElement !== undefined && this.slottedElement !== null) {
      this.slottedElement.removeEventListener('mouseenter', this.showTooltip);
      this.slottedElement.removeEventListener('mouseleave', this.hideTooltip);
      this.slottedElement.removeEventListener('focusin', this.showTooltip);
      this.slottedElement.removeEventListener('focusout', this.hideTooltip);
    }

    if (!this.disableAutoPosition) {
      window.removeEventListener('scroll', this.resetTooltipPosition);
      window.removeEventListener('resize', this.resetTooltipPosition);
    }
  }

  render() {
    const wrapperClasses = {
      'dark': this.dark,
      'dc-tooltip-wrapper': true,
      'show': this.isTooltipVisible,
      [`${this.currentPosition}`]: true,
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
