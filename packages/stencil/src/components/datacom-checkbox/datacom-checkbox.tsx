import { Component, h, Prop, Event, EventEmitter, Host } from '@stencil/core';

export type CheckboxSize = 'standard' | 'small';
export type Checkboxtype = 'checkbox'|'form';


@Component({
  tag: 'datacom-checkbox',
  styleUrl: 'datacom-checkbox.css',
  shadow: true,
})
export class DatacomCheckbox {
  @Prop() type: Checkboxtype = 'checkbox';
  @Prop() size: CheckboxSize = 'standard';
  @Prop() checked: boolean = false;
  @Prop() label: string;
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() span: string;
  @Prop() value: string;
  @Prop() autofocus: boolean = false;

  @Event() toggle: EventEmitter<boolean>;

  handleChange = () => {
    this.checked = !this.checked;
    this.toggle.emit(this.checked);
  };
  render() {
    if (!['standard', 'small'].includes(this.size)) {
      throw Error('Check size must be either standard or small.');
    }

    const classes = {
      "disabled": this.disabled,
      [`size-${this.size}`]: true,
      [this.type]:true
    };

    return (
      <Host>
          <input
          autofocus={this.autofocus}
            class={classes}
            name="datacom-checkbox"
            type={this.type}
            checked={this.checked}
            onChange={this.handleChange}
            disabled={this.disabled}
            required={this.required}
            value={this.value}
          />
          <label class={`size-${this.size}`}>
         
          {this.label}</label>
       
        <span class="small">{this.span}</span>
      </Host>
    );
  }
}
