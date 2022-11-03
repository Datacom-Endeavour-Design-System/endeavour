import { Component, Host, h, Prop, State, Listen, Event, EventEmitter } from '@stencil/core';
import { randomString } from '../../utils';
import { Error } from '../../common/images/icons';

export type DatacomInputType = 'text' | 'number' | 'password' | 'tel' | 'time' | 'url' | 'week' | 'month' | 'email';

/**
 * Datacom Input field
 *
 * The control is scoped rather than shadow so the input field can participate in a form submit.
 *
 * @see https://brandhub.datacom.com/d/fjZSq4WewHBg/components#/components/button
 */
@Component({
  tag: 'datacom-input',
  styleUrl: 'datacom-input.css',
  scoped: true,
})
export class DatacomInput {
  private inputElement: HTMLInputElement;

  /**
   * HTML element input properties
   */
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

  /**
   * Optional label for control.
   * This can be omitted if the host element has a text children.
   */
  @Prop() label?: string;

  /**
   * Error message to display in the case of input validity checks
   * or explicitly with 'valid' property
   */
  @Prop() message?: string;
  @Prop({ attribute: 'valid' }) isValid?: boolean;

  /**
   * Optional help text
   */
  @Prop() help?: string;

  /**
   * Error mutable state will re-render the control to display error message, icon and focus border
   */
  @State() isInError = false;

  /**
   * Editing mutable state will re-render the control to display input element
   */
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
  private changed: EventEmitter<string>;

  /**
   * Random id used by label to associate with the input control.
   *
   * This is randomly generated as it cannot be coded to a known value as all instances
   * on the page would have the same value.
   */
  private inputId = randomString();

  /**
   * Switch the control to edit mode if it is not already editing.
   */
  private doEdit(): void {
    if (!this.isEditing && !this.disabled) {
      // Mutate control to display edit mode
      this.isEditing = true;

      // Delay sending focus until the element has rendered with the input visible.
      setTimeout(() => this.inputElement.focus(), 100);
    }
  }

  /**
   * Entering the control switches to edit mode
   */
  @Listen('focus', { capture: true })
  onFocus(/* event: FocusEvent */): void {
    this.doEdit();
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
   * Leaving the input field:
   * - switches to view mode
   * - validates the control and displays error message
   */
  @Listen('blur', { capture: true })
  onBlur(event: FocusEvent): void {
    const elem = event.target as HTMLElement;

    if (elem.tagName.toLowerCase() === 'input') {
      this.value = this.inputElement.value;

      /**
       * Delay moving to view mode so the tabbing action moves out of the
       * control before enabling tabindex (view mode)
       */
      setTimeout(() => (this.isEditing = false), 10);

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
    /**
     * The control is in edit mode if explicitly editing or there is a non-empty value
     */
    const edit = this.isEditing || this.value?.length > 0;

    /**
     * When in edit mode, we disable tabindex within the control so that keyboard actions
     * like tab and shift-tab move correctly to the next form control.
     */
    const tabindex = this.isEditing ? -1 : 0;

    const classes = {
      root: true,
      disabled: this.disabled,
      edit: edit,
      view: !edit,
      error: (this.isInError && this.isDirty) || this.isValid == false,
      dirty: this.isDirty,
    };

    /**
     * Notes:
     * - 'value' must be last property of input
     */
    return (
      <Host tabIndex={tabindex}>
        <div class={classes}>
          <div class="label-wrap">
            <label htmlFor={this.inputId} tabIndex={tabindex}>
              {this.label}
              <slot></slot>
            </label>
            <Error class="error-icon" />
          </div>

          <div class="input-wrap">
            <input
              ref={el => this.setInputElementRef(el)}
              tabIndex={tabindex}
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
              title={this.title}
              disabled={this.disabled}
              value={this.value}
            ></input>
            <p tabIndex={-1} class="error-message">
              {this.message}
            </p>
          </div>
          <aside tabIndex={-1} class="help">
            {this.help}
          </aside>
        </div>
      </Host>
    );
  }
}
