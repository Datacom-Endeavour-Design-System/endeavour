import { Component, Host, h, Prop, VNode } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';
import { Spinner } from '../../common/images/icons';
import { randomString } from '../../utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'large' | 'small';
export type ImagePosition = 'left' | 'right';
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Datacom styled button which extends HTML button.
 *
 * The control is scoped rather than shadow so the input field can participate in a form submit.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
 */
@Component({
  tag: 'datacom-button',
  styleUrl: 'datacom-button.css',
  scoped: true,
})
export class DatacomButton {
  /**
   * HTML button element properties
   */
  @Prop() disabled = false;
  @Prop() autofocus: boolean;
  @Prop() type = 'button';
  @Prop() name: string;
  @Prop() value: string;
  @Prop() formmethod: string;
  @Prop() form: string;
  @Prop() formenctype: string;
  @Prop() formaction: string;
  @Prop() formtarget: string;

  /**
   * Button text content. If not present use component children
   */
  @Prop() text?: string;

  /**
   * Button variant:
   * - primary
   * - seconday
   * - ghost
   */
  @Prop() variant: ButtonVariant = 'primary';

  /**
   * Button size:
   * - large
   * - small
   */
  @Prop() size: ButtonSize = 'large';

  /**
   * Image position:
   * - left
   * - right
   */
  @Prop({ attribute: 'image-position' }) imagePosition: ImagePosition = 'left';

  /**
   * Image source as either relative or obsolute URI
   */
  @Prop() src: string;

  /**
   * Name of built-in icon named using dash case. E.g. "back-to-top"
   */
  @Prop() icon: string;

  /**
   * If true, show loading icon
   */
  @Prop() loading: boolean;

  /**
   * Generated ids for label accessibility
   */
  private labelId = randomString();
  private buttonId = randomString();

  render() {
    // Shouldn't overwrite immutable properties so we must use local variables
    let variant = this.variant;
    let size = this.size;
    let imagePosition = this.imagePosition;

    if (!['primary', 'secondary', 'ghost'].includes(variant)) {
      console.log('Button variant must be either primary, secondary or ghost. Defaulting to primary');
      variant = 'primary';
    }

    if (this.size?.length > 0 && !['large', 'small'].includes(size)) {
      console.log('Button size must be either large or small. Defaulting to large');
      size = 'large';
    }

    if (!['left', 'right'].includes(this.imagePosition)) {
      console.log('Button image position must be either left or right. Defaulting to left');
      imagePosition = 'left';
    }

    /**
     * Dynamically retrieve SVG functional component based on its name,
     * or use image src if supplied.
     */
    let image: VNode;
    if (this.icon?.length > 0) {
      image = getSvg(this.icon, { class: 'image' });
    } else if (this.src?.length > 0) {
      image = <img src={this.src} class="image"></img>;
    }

    const classes = {
      disabled: this.disabled,
      loading: this.loading,
      [variant]: true,
      [`size-${size}`]: true,
      [`image-${imagePosition}`]: image && this.text?.length > 0,
    };

    return (
      <Host>
        <button
          id={this.buttonId}
          type={this.type}
          form={this.form}
          name={this.name}
          value={this.value}
          formmethod={this.formmethod}
          formaction={this.formaction}
          formtarget={this.formtarget}
          formenctype={this.formenctype}
          autoFocus={this.autofocus}
          aria-labelledby={this.labelId}
          disabled={this.disabled}
          class={classes}
        >
          {image}
          <span id={this.labelId} class="text">
            {this.text}
            <slot></slot>
          </span>
          {this.loading && <Spinner class="spinner" />}
        </button>
      </Host>
    );
  }
}
