import { Component, h, Prop, Event, EventEmitter, Host } from '@stencil/core';

export type CheckboxSize = 'standard' | 'small';
@Component({
  tag: 'datacom-checkbox',
  styleUrl: 'datacom-checkbox.css',
  shadow: true,
})
export class DatacomCheckbox {
  @Prop() type: string = 'checkbox';
  @Prop() size: CheckboxSize = 'standard';
  @Prop() checked: boolean = false;
  @Prop() label: string;
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() small: string;
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
      [`size-${this.size}`]: true,
    };

    return (
      <Host>
        {/* <div class={classes}> */}
        <label>
          <input
            class={classes}
            name="datacom-checkbox"
            type="checkbox"
            checked={this.checked}
            onChange={this.handleChange}
            disabled={this.disabled}
            required={this.required}
            value={this.value}
            autoFocus={this.autofocus}
          />
          {/* <label htmlFor="datacom-checkbox1" class="label"> */}
          {this.label}
        </label>

        {/* <p class = "error">{this.checked ? "selected  ":"unselected  "}</p>  */}
        {/* </div> */}
        <small class="small">{this.small}</small>
      </Host>
    );
  }
}
