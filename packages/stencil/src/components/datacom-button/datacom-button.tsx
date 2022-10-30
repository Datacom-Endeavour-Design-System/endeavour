import { Component, Host, h, Prop, Element, VNode } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'large' | 'small';
export type ImagePosition = 'left' | 'right';
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Datacom styled button which extends HTML button. Custom attributes:
 *
 * text = button label
 * variant = primary | secondar | ghost
 * size = large | small
 * image-position = left | right
 * src = image url
 * icon = svg icon name
 * loading = true | false to show spinning icon
 *
 * This button cannot exist within the shadow root as it sits outside
 * the DOM flow with regards to form submit.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
 */
@Component({
  tag: 'datacom-button',
  styleUrl: 'datacom-button.css',
  scoped: true,
})
export class DatacomButton {
  @Element() el: HTMLElement;

  /* Custom properties */
  @Prop() text: string;
  @Prop() variant: ButtonVariant = 'primary';
  @Prop() size: ButtonSize = 'large';
  @Prop({ attribute: 'image-position' }) imagePosition: ImagePosition = 'left';
  @Prop() src: string;
  @Prop() icon: string;
  @Prop() loading: boolean;

  /* Pass through button properties */
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

  render() {
    if (!['primary', 'secondary', 'ghost'].includes(this.variant)) {
      console.log('Button variant must be either primary, secondary or ghost.');
      this.variant = 'primary';
    }

    if (!['large', 'small'].includes(this.size)) {
      console.log('Button size must be either large or small.');
      this.size = 'large';
    }

    if (!['left', 'right'].includes(this.imagePosition)) {
      console.log('Button image position must be either left or right.');
      this.imagePosition = 'left';
    }

    let image: VNode;
    if (this.icon !== undefined) {
      image = getSvg(this.icon, { class: 'image' });
    } else if (this.src !== undefined) {
      image = <img src={this.src} class="image"></img>;
    }

    let spinner;
    if (this.loading !== undefined) {
      spinner = getSvg('spinner', { class: 'spinner' });
    }

    const classes = {
      disabled: this.disabled,
      loading: this.loading,
      [this.variant]: true,
      [`size-${this.size}`]: true,
      [`image-${this.imagePosition}`]: image && this.text?.length > 0,
    };

    return (
      <Host>
        <button
          type={this.type}
          form={this.form}
          name={this.name}
          value={this.value}
          formmethod={this.formmethod}
          formaction={this.formaction}
          formtarget={this.formtarget}
          formenctype={this.formenctype}
          autoFocus={this.autofocus}
          aria-labelledby="button-text"
          disabled={this.disabled}
          class={classes}
        >
          {image}
          <span id="button-text" class="text">
            {this.text}
          </span>
          {spinner}
        </button>
      </Host>
    );
  }
}
