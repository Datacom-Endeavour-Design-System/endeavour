import { Component, h, Prop, Host, Fragment } from '@stencil/core';

export type ToggleSizeType = 'standard' | 'small';

@Component({
  tag: 'datacom-toggle',
  styleUrl: 'datacom-toggle.css',
  shadow: true,
})
export class DatacomToggle {
  /**
   * Checkbox label (right of tickbox)
   */
  @Prop() label: string;

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
  @Prop() toggled = false;

  /**
   * Checkbox is either standard size (default) or small
   */
  @Prop() variant: ToggleSizeType = 'standard';

  renderToggleElement = () => {
    return (
      <Fragment>
        <input class="dc-toggle-input" type="checkbox" disabled={this.disabled} />
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
      'dc-toggle-small': this.variant === 'small',
    };

    const labelClasses = {
      'dc-toggle-label': true,
      'dc-toggle-label-on-left': this.labelOnLeft,
    };

    // htmlFor={this.inputId}

    return (
      <Host>
        <label class={classes}>
          {!this.labelOnLeft && this.renderToggleElement()}
          <span class={labelClasses}>
            <slot />
          </span>
          {this.labelOnLeft && this.renderToggleElement()}
        </label>
      </Host>
    );
  }
}

export type HTMLDatacomCheckboxElement = HTMLElement & DatacomToggle;
