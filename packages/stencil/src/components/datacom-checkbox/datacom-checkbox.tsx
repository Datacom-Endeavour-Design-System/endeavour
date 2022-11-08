import { Component, h, Prop, Host, Event, EventEmitter } from '@stencil/core';
import { randomString } from '../../utils';

export type CheckboxSize = 'standard' | 'small';
export type CheckboxType = 'checkbox' | 'form';

@Component({
  tag: 'datacom-checkbox',
  styleUrl: 'datacom-checkbox.css',
  shadow: true,
})
export class DatacomCheckbox {
  @Prop() type: CheckboxType = 'checkbox';
  @Prop() size: CheckboxSize = 'standard';
  @Prop({ mutable: true }) checked = false;
  @Prop() label: string;
  @Prop() disabled: boolean;
  @Prop() required: boolean;
  @Prop() message: string;
  @Prop() value: string;
  @Prop() name: string;
  @Prop() autofocus: boolean;
  @Prop() autocomplete?: boolean;

  /**
   * True if the checkbox is part of a group
   */
  @Prop() grouped = false;

  /**
   * True if the checkbox is a child and should be indented
   */
  @Prop() child = false;

  /**
   * Index of the checkbox in the group
   */
  @Prop() index: number;

  /**
   * Emit a changed event with the index number if the control changes state
   */
  @Event() changed: EventEmitter<number>;

  /**
   * Unique input control id
   */
  private inputId = randomString();

  /**
   * Toggle checked state
   */
  onChange = () => {
    this.checked = !this.checked;
    this.changed.emit(this.index);
  };

  render() {
    if (!['standard', 'small'].includes(this.size)) {
      throw Error('Check size must be either standard or small.');
    }

    const classes = {
      'dc-checkbox-grouped': this.grouped,
      'dc-checkbox-child': this.child,
      'dc-checkbox-wrap': true,
      'dc-checkbox-required': this.required,
      'dc-checkbox-disabled': this.disabled,
      [`dc-checkbox-size-${this.size}`]: true,
    };

    return (
      <Host>
        <div class={classes}>
          <input
            id={this.inputId}
            class="dc-checkbox-input"
            autofocus={this.autofocus}
            name={this.name}
            type={this.type}
            checked={this.checked}
            onChange={this.onChange}
            disabled={this.disabled}
            required={this.required}
            value={this.value}
            tabIndex={0}
          />
          <label tabIndex={-1} class="dc-checkbox-label" htmlFor={this.inputId}>
            {this.label}
            <slot />
          </label>
          <span class="dc-checkbox-error">{this.message}</span>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomCheckboxElement = HTMLElement & DatacomCheckbox;
