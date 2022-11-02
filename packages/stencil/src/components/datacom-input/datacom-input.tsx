import { Component, Host, h, Prop, State, Listen, Event, EventEmitter } from '@stencil/core';
import { randomString } from '../../utils';
import { Error } from '../../common/images/icons';

export type DatacomInputType = 'text' | 'number' | 'password' | 'tel' | 'time' | 'url' | 'week' | 'month' | 'email';

/**
 * Datacom Input field
 */
@Component({
  tag: 'datacom-input',
  styleUrl: 'datacom-input.css',
  scoped: true,
})
export class DatacomInput {
  private inputElement: HTMLInputElement;

  /* HTML input properties */
  @Prop() name: string;
  @Prop({ mutable: true }) value?: string;
  @Prop() type: DatacomInputType = 'text';
  @Prop() placeholder?: string;
  @Prop() disabled? = false;
  @Prop() maxlength?: number;
  @Prop() minlength?: number;
  @Prop() readonly? = false;
  @Prop() required? = false;
  @Prop() form?: string;
  @Prop() formaction?: string;
  @Prop() formenctype?: string;
  @Prop() formmethod?: string;
  @Prop() formnovalidate? = false;
  @Prop() formtarget?: string;
  @Prop() pattern?: string;
  @Prop() min?: number;
  @Prop() max?: number;
  @Prop() inputmode?: string;
  @Prop() size?: number;
  @Prop() title: string;
  @Prop() tabindex?: number;

  /* Label properties */
  @Prop() label: string;

  /* Synthetic properties */
  @Prop() message: string;
  @Prop({ attribute: 'valid' }) isValid: boolean;

  /* Mutable component state which may trigger render */
  @State() isInError = false;
  @State() isEditing = false;

  /**
   * The component is 'dirty' if it has been touched by user input
   *
   * @see onInput
   */
  private isDirty = false;

  /**
   * Emit changed event when input changes. This relays up the 'input' event, but with
   * the control's current value rather than the input value.
   */
  @Event({
    composed: true,
  })
  changed: EventEmitter<string>;

  /* One-off generated unique id */
  private inputId = randomString();

  private doEdit(): void {
    // Mutate control to display edit mode
    this.isEditing = true;

    // Delay sending focus until the element has rendered with the input visible.
    setTimeout(() => this.inputElement.focus(), 0);
  }

  /**
   * Process click and focus on label
   *
   * @param event
   * @returns
   */
  @Listen('click', { capture: true })
  onClick(/* event: MouseEvent */): void {
    this.doEdit();
  }

  /**
   * Entering the input field switch to edit mode
   *
   */
  @Listen('focus', { capture: true })
  onFocus(event: FocusEvent): void {
    const elem = event.target as HTMLElement;

    // Only edit mode if focus is to the control.
    if (elem.tagName.toLowerCase() === 'datacom-input') {
      this.doEdit();
    }
  }

  /**
   * Capture input event and reemit a custom 'changed' event with the new control value
   */
  @Listen('input', { capture: true })
  onInput(/* event: InputEvent */): void {
    this.isDirty = true;
    this.changed.emit(this.inputElement.value);
  }

  /**
   * Leaving the input field switches to view mode
   */
  @Listen('blur', { capture: true })
  onBlur(event: FocusEvent): void {
    const elem = event.target as HTMLElement;

    if (elem.tagName.toLowerCase() === 'input') {
      this.value = this.inputElement.value;
      this.isEditing = false;

      /* Set internal error state */
      this.isInError = !this.inputElement.checkValidity();
      this.inputElement.scroll({ left: 0 });
    }
  }

  /**
   * Capture input element reference on mount
   *
   * @param el
   */
  private setInputElementRef(el: HTMLInputElement): void {
    this.inputElement = el;
  }

  render() {
    const edit = this.isEditing || this.value?.length > 0;
    const classes = {
      root: true,
      disabled: this.disabled,
      edit: edit,
      view: !edit,
      error: (this.isInError && this.isDirty) || this.isValid == false,
      dirty: this.isDirty,
    };

    return (
      <Host>
        <div class={classes}>
          <div class="label-wrap">
            <label htmlFor={this.inputId}>
              {this.label}
              <slot></slot>
            </label>
            <Error class="error-icon" />
          </div>

          <div class="input-wrap">
            <input
              ref={el => this.setInputElementRef(el)}
              id={this.inputId}
              type={this.type}
              name={this.name}
              placeholder={this.placeholder}
              maxlength={this.maxlength}
              minlength={this.minlength}
              readonly={this.readonly}
              required={this.required}
              size={this.size}
              min={this.min}
              max={this.max}
              form={this.form}
              formAction={this.formaction}
              formEncType={this.formenctype}
              formMethod={this.formmethod}
              formNoValidate={this.formnovalidate}
              formtarget={this.formtarget}
              pattern={this.pattern}
              inputMode={this.inputmode}
              tabindex={this.tabindex}
              title={this.title}
              value={this.value}
            ></input>
            <p class="error-message">{this.message}</p>
          </div>
        </div>
      </Host>
    );
  }
}
