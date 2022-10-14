import { Component, Host, h, Prop} from '@stencil/core';
import {getSvg} from '../../common/images/icon-provider';

export type ButtonVariant = 'primary' | 'seconday' | 'ghost';
export type ButtonSize = 'standard' | 'small';
export type ImagePosition = 'left' | 'right';
export type ButtonType = 'button' | 'submit';

@Component({
  tag: 'datacom-button',
  styleUrl: 'datacom-button.css',
  shadow: true,
})
export class DatacomButton {
  @Prop() text: string;
  @Prop() type: string = 'button';
  @Prop() disabled: boolean = false;
  @Prop() variant: ButtonVariant = 'primary';
  @Prop() size: ButtonSize = 'standard';
  @Prop({ attribute: 'image-position' }) imagePosition: ImagePosition = 'left';
  @Prop() src: string;
  @Prop() icon: string;
  @Prop() loading: boolean;
  @Prop() autofocus: boolean = false;

  render() {
    if (!['primary','secondary', 'ghost'].includes(this.variant)) {
      throw Error('Button variant must be either primary, secondary or ghost.');
    }

    if (!['standard', 'small'].includes(this.size)) {
      throw Error('Button size must be either standard or small.');
    }

    if (!['left', 'right'].includes(this.imagePosition)) {
      throw Error('Button image position must be either left or right.');
    }

    let image;
    if (this.icon) {
      image = getSvg(this.icon, {class: 'image'});
    } else if (this.src) {
      image = <img src={this.src} class="image"></img>;
    }

    let spinner;
    if (this.loading) {
      spinner = getSvg('spinner', {class: 'spinner'});
    }

    const classes = {
      "disabled": this.disabled,
      "loading": this.loading,
      [this.variant]: true,
      [`size-${this.size}`]: true,
      [`image-${this.imagePosition}`]: (image != undefined && this.text !=undefined)
    }

    return (
      <Host>
        <button autoFocus={this.autofocus} aria-labelledby="button-text" type={this.type} disabled={this.disabled} class={classes}>
          {image}<span id="button-text" class="text">{this.text}</span>{spinner}   
        </button>
      </Host>
    );
  }

}
