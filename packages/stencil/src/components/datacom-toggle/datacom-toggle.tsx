import { Component, h, Prop, Host, Fragment } from '@stencil/core';

export type ToggleSizeType = 'standard' | 'small';

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
   * True if label is on the right of element
   */
  @Prop() labelOnLeft = false;

  /**
   * True if the toggle element must be disabled
   */
  @Prop() disabled = false;

  /**
   * True if the toggle element is initially toggled on.
   */
  @Prop({ mutable: true }) toggled = false;

  /**
   * Checkbox is either standard size (default) or small
   */
  @Prop() variant: ToggleSizeType = 'standard';

  /**
   * Function to handle when the toggle state has changed
   */
  onToggleChange = () => {
    this.toggled = !this.toggled;
  };

  renderToggleElement = () => {
    return (
      <Fragment>
        <input class="dc-toggle-input" type="checkbox" disabled={this.disabled} checked={this.toggled} onChange={this.onToggleChange} />
        <div class="dc-toggle-switch" />
      </Fragment>
    );
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

    const labelClasses = {
      'dc-toggle-label': true,
      'disabled': this.disabled,
      'label-on-left': this.labelOnLeft,
    };

    return (
      <Host>
        <div class="dc-toggle-wrapper">
          <label class={classes}>
            {!this.labelOnLeft && this.renderToggleElement()}
            {this.label && <span class={labelClasses}>{this.label}</span>}
            {this.labelOnLeft && this.renderToggleElement()}
          </label>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomToggleElement = HTMLElement & DatacomToggle;
