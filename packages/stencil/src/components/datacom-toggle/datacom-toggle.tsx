import { Component, h, Prop, Host, Event, EventEmitter } from '@stencil/core';

export type ToggleSizeType = 'standard' | 'small';
export type LabelPositionType = 'left' | 'right';

@Component({
  tag: 'datacom-toggle',
  styleUrl: 'datacom-toggle.css',
  shadow: true,
})
export class DatacomToggle {
  /**
   * Label of the toggle element
   */
  @Prop() label;

  /**
   * Sets whether the label is rendered on the left or right (default) of the toggle element
   */
  @Prop() labelPosition: LabelPositionType = 'right';

  /**
   * True if the toggle element must be disabled
   */
  @Prop() disabled = false;

  /**
   * True if the toggle element is initially toggled on.
   */
  @Prop({ mutable: true }) toggled = false;

  /**
   * Toggle element is either standard size (default) or small
   */
  @Prop() variant: ToggleSizeType = 'standard';

  /**
   * Event emitter to let external components know when the toggle element state has changed
   */
  @Event() toggleChanged: EventEmitter<boolean>;

  /**
   * Function to handle when the toggle state has changed
   */
  onToggleChange = () => {
    this.toggleChanged.emit(!this.toggled);
    this.toggled = !this.toggled;
  };

  /**
   * Function for rendering the label of the toggle element
   *
   * @returns label content in the form of a span element
   */
  renderLabelElement = () => {
    const labelClasses = {
      'dc-toggle-label': true,
      'disabled': this.disabled,
      'label-on-left': this.labelPosition == 'left',
    };

    return <span class={labelClasses}>{this.label}</span>;
  };

  render() {
    if (!['standard', 'small'].includes(this.variant)) {
      console.warn('Toggle component size must be either standard or small.');
      this.variant = 'standard';
    }

    const classes = {
      'dc-toggle': true,
      'small': this.variant === 'small',
    };

    return (
      <Host>
        <div class="dc-toggle-wrapper">
          <label class={classes}>
            {this.labelPosition == 'left' && this.renderLabelElement()}
            <input class="dc-toggle-input" type="checkbox" disabled={this.disabled} checked={this.toggled} onChange={this.onToggleChange} />
            <div class="dc-toggle-switch" />
            {this.labelPosition == 'right' && this.renderLabelElement()}
          </label>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomToggleElement = HTMLElement & DatacomToggle;
