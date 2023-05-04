import { Component, Host, h, Prop, Element, Listen, Event, EventEmitter } from '@stencil/core';
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
  @Prop() label: string;
  @Prop() min: number;
  @Prop() max: number;
  @Prop() step: number;
  @Prop() help: string;
  @Prop() message: string;
  @Prop() disabled: false;
  @Prop() placeholder: string;
  @Prop({ mutable: true }) value?: number;

  /**
   * Emit valueChanged event when number input changes.
   */
  @Event({
    composed: true,
  })
  private valueChanged: EventEmitter<number>;

  handleIncrement = () => {
    if (this.value === undefined) {
      this.value = this.min;
    } else {
      this.value += this.step;
      if (this.value > this.max) {
        this.value = this.max;
      }
    }
    this.valueChanged.emit(this.value);
  };

  handleDecrement = () => {
    if (this.value === undefined) {
      this.value = this.min;
    } else {
      this.value -= this.step;
      if (this.value < this.min) {
        this.value = this.min;
      }
    }
    this.valueChanged.emit(this.value);
  };

  @Listen('input', { capture: true })
  onInput(event: InputEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value !== '' ? +inputElement.value : undefined;
    if (newValue !== undefined && (newValue < this.min || newValue > this.max)) {
      return;
    }
    this.value = newValue;
    this.valueChanged.emit(this.value);
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
            readonly={this.readonly}
            title={this.numberTitle}
            max={this.max}
            min={this.min}
            name={this.name}
            value={this.value !== undefined ? this.value.toString() : ''}
            step={this.step}
            help={this.help}
            required={this.required}
            message={this.message}
            disabled={this.disabled}
            placeholder={this.placeholder}
          >
            {this.label}
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
