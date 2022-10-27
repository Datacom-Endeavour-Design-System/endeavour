import { Component, Host, h, Prop, Element, Listen } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'large' | 'small';
export type ImagePosition = 'left' | 'right';
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Datacom styled button which extends HTML button. Custom attributes:
 *
 * text = button label
 * variant = primary | secondary | ghost
 * size = large | small
 * image-position = left | right
 * src = image url
 * icon = svg icon name
 * loading = true | false to show spinning icon
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
 */
@Component({
  tag: 'datacom-button',
  styleUrl: 'datacom-button.css',
  shadow: true,
})
export class DatacomButton {
  @Element() el;

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

  /**
   * For submit buttons within a form the shadow dom elements are "outside" the form tree. To rectify this
   * the component must intercept the click event and temporarily create a button within the form.
   *
   * @returns void
   */
  @Listen('click')
  onClick() {
    if (this.type !== 'submit') {
      return;
    }

    let form: HTMLFormElement;
    if (this.form) {
      form = document.querySelector(this.form);
    } else {
      form = this.el.closest('form');
    }

    if (form) {
      const btn = document.createElement('button');
      btn.type = 'submit';
      btn.style.display = 'none';
      if (this.name) btn.name = this.name;
      if (this.value) btn.value = this.value;
      if (this.formmethod) btn.formMethod = this.formmethod;
      if (this.formaction) btn.formAction = this.formaction;
      if (this.formtarget) btn.formTarget = this.formtarget;
      if (this.formenctype) btn.formEnctype = this.formenctype;

      form.appendChild(btn);
      btn.click();
      btn.remove();
    }
  }

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

    let image;
    if (this.icon) {
      image = getSvg(this.icon, { class: 'image' });
    } else if (this.src) {
      image = <img src={this.src} class="image"></img>;
    }

    let spinner;
    if (this.loading) {
      spinner = getSvg('spinner', { class: 'spinner' });
    }

    const classes = {
      disabled: this.disabled,
      loading: this.loading,
      [this.variant]: true,
      [`size-${this.size}`]: true,
      [`image-${this.imagePosition}`]: image != undefined && this.text != undefined,
    };

    return (
      <Host>
        <button type={this.type} autoFocus={this.autofocus} aria-labelledby="button-text" disabled={this.disabled} class={classes}>
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
