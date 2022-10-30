import { Component, Host, h, Prop } from '@stencil/core';
export type RadioSize = 'standard' | 'small';
export type RadioVariant = 'radio' | 'button';

@Component({
  tag: 'datacom-radio',
  styleUrl: 'datacom-radio.css',
  shadow: true,
})
export class DatacomRadio {
  @Prop() label: string;
  @Prop() variant: RadioVariant = 'radio';
  @Prop() size: RadioSize = 'standard';
  @Prop() type = 'radio';
  @Prop() checked: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() value: string;
  @Prop() autofocus: boolean = false;

  // @Event() toggle: EventEmitter<boolean>;

  handleChange = () => {
    this.checked = !this.checked;
    // this.toggle.emit(this.checked)
  };

  render() {
    if (!['standard', 'small'].includes(this.size)) {
      throw Error('Check size must be either standard or small.');
    }
    if (!['radio', 'button'].includes(this.variant)) {
      console.log('radio variant must be either radio or button.');
      this.variant = 'radio';
    }

    const classes = {
      disabled: this.disabled,
      [this.variant]: true,
      [`size-${this.size}`]: true,
      [this.type]: true,
    };

    return (
      <Host>
        <input
          autofocus={this.autofocus}
          class={classes}
          name="datacom-radio"
          type={this.type}
          checked={this.checked}
          onChange={this.handleChange}
          disabled={this.disabled}
          required={this.required}
          value={this.value}
        />
        <label class={`size-${this.size}`}>{this.label}</label>
      </Host>
    );
  }
}
