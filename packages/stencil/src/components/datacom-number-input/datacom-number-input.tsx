import { Component, Host, h, Prop, Element, State, Listen } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

@Component({
  tag: 'datacom-number-input',
  styleUrl: 'datacom-number-input.css',
  shadow: false,
})
export class DatacomNumberInput {
  @Element() host: HTMLInputElement;

  @Prop() readonly? = false;
  @Prop() required? = false;
  @Prop() numberTitle: string;
  @Prop() name: string;
  @Prop() text: string;
  @Prop() min: number;
  @Prop() max: number;
  @Prop() step: number;
  @Prop() help: string;
  @Prop() message: string;
  @Prop() disabled: false;
  @Prop() placeholder: string;
  @State() value?: number | null = null;

  handleIncrement = () => {
    if (this.value === null) {
      this.value = this.min;
    } else {
      this.value += this.step;
      if (this.value > this.max) {
        this.value = this.max;
      }
    }
  };

  handleDecrement = () => {
    if (this.value === null) {
      this.value = this.min;
    } else {
      this.value -= this.step;
      if (this.value < this.min) {
        this.value = this.min;
      }
    }
  };

  @Listen('input', { capture: true })
  onInput(event: InputEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value !== '' ? +inputElement.value : null;
    if (newValue !== null && (newValue < this.min || newValue > this.max)) {
      return;
    }
    this.value = newValue;
  }

  render() {
    const Classes = {
      'dc-number-disabled': this.disabled,
      'dc-number-input-wrapper': true,
    };
    return (
      <Host>
        <div class={Classes}>
          <datacom-input
            type="number"
            class="dc-number-input"
            title={this.numberTitle}
            max={this.max}
            min={this.min}
            name={this.name}
            value={this.value !== null ? this.value.toString() : ''}
            step={this.step}
            help={this.help}
            required={this.required}
            message={this.message}
            disabled={this.disabled}
            placeholder={this.placeholder}
          >
            {this.text}
          </datacom-input>
          <button type="button" disabled={this.disabled} onClick={this.handleDecrement} class="dc-number-decrement">
            {getSvg('remove', { class: 'dc-decrement-icon' })}
          </button>
          <button type="button" disabled={this.disabled} onClick={this.handleIncrement} class="dc-number-increment">
            {getSvg('add', { class: 'dc-increment-icon' })}
          </button>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomNumberInput = HTMLElement & DatacomNumberInput;
