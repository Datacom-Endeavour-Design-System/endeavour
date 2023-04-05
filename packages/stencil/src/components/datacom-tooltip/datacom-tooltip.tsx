import { Component, h, Prop, Host } from '@stencil/core';

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
  @Prop() position: TooltipPositionType = 'bottom';
  @Prop() text: string;

  render() {
    const mainClasses = {
      'dc-tooltip': true,
      [`tooltip-${this.position}`]: true,
      'dark': this.dark,
    };

    const arrowClasses = {
      'dc-tooltip-arrow': true,
      'hide-tip': this.hideTip,
    };

    return (
      <Host>
        <div class={mainClasses} id={this.id} role="tooltip">
          {this.text}
          <div class={arrowClasses} />
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomToggleElement = HTMLElement & DatacomToggle;
