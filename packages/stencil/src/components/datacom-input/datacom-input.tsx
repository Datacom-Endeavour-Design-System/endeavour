import { Component, Host, h, Prop, State, Listen, Event, EventEmitter, Method } from '@stencil/core';
import { randomString } from '../../utils';
import { Error, Spinner, Tick } from '../../common/images/icons';
import { FormControl } from '../form-control';

/**
 * This control only accepts a subset of input types
 */
export type DatacomInputType = 'text' | 'number' | 'password' | 'tel' | 'time' | 'url' | 'week' | 'month' | 'email';

/**
 * Display indicator. This has an explicit 'none' so the indicator
 * can be removed without having to remove the html attribute (or set it empty string).
 */
export type IndicatorType = 'none' | 'working' | 'done';

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
export class DatacomInput implements FormControl {
  private inputElement: HTMLInputElement;
  private formElement: HTMLFormElement;

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
   * Feedback indicator
   */
  @Prop() indicator?: IndicatorType = 'none';

  /**
   * Automatically show error state if invalid on form submit
   */
  @Prop() autoValidate? = true;

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
   * Force validation on the form control to display any error messages
   *
   * @returns boolean
   */
  @Method()
  async validate(): Promise<boolean> {
    this.isInError = !(await this.checkValidity());

    if (this.isInError) {
      this.isDirty = true;
      await this.edit();
    }

    return this.isInError;
  }

  /**
   * Check if the control is valid
   */
  @Method()
  async checkValidity(): Promise<boolean> {
    return this.inputElement.checkValidity();
  }

  /**
   * Switch the control to edit mode if it is not already editing.
   */
  @Method()
  async edit(): Promise<void> {
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
    this.edit();
  }

  /**
   * Capture input event and reemit a custom 'changed' event with the new control value
   */
  @Listen('input', { capture: true })
  onInput(/* event: InputEvent */): void {
    this.isDirty = true;
    this.changed.emit(this.inputElement.value);
    if (this.isInError) {
      this.isInError = false;
    }
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

  /**
   * Watch for form submit and prevent if the input is invalid
   *
   * @param event
   */
  onFormSubmit = (event: SubmitEvent) => {
    if (!this.inputElement.checkValidity()) {
      /**
       * Stop the form submit and show errors
       */
      event.preventDefault();
      this.isDirty = true;
      this.isEditing = true;
      this.isInError = true;
    }
  };

  /**
   * When the component loads for the first time find the nearest form
   * and watch for submit if autoValidate is true
   */
  componentDidLoad() {
    if (this.autoValidate) {
      this.formElement = this.inputElement.closest('form');

      if (this.formElement !== undefined && this.formElement !== null) {
        this.formElement.noValidate = true;
        this.formElement.addEventListener('submit', this.onFormSubmit);
      }
    }
  }

  /**
   * When removed from the DOM, remove any event listeners
   */
  disconnectedCallback() {
    if (this.formElement !== undefined && this.formElement !== null) {
      this.formElement.removeEventListener('submit', this.onFormSubmit);
    }
  }

  render() {
    /**
     * Validate enumerated props and warn
     */
    if (this.indicator !== undefined && !['working', 'done', 'none'].includes(this.indicator)) {
      console.warn(`Feedback indicator ${this.indicator} is not valid. Setting to 'none'`);
      this.indicator = 'none';
    }

    /**
     * The control is in edit mode if explicitly editing or there is a non-empty value
     */
    const edit = this.isEditing || this.value?.length > 0 || this.isDirty;

    /**
     * When in edit mode, we disable tabindex within the control so that keyboard actions
     * like tab and shift-tab move correctly to the next form control.
     */
    const tabindex = this.isEditing ? -1 : 0;

    /**
     * The control is in error if its state has change to error (isInError) and has
     * been touched by the user (isDirty) or it is explicitly set as invalid (isInvalid)
     */
    const error = (this.isInError && this.isDirty) || this.isValid == false;

    const classes = {
      'dc-input-root': true,
      'dc-input-disabled': this.disabled,
      'dc-input-edit': edit,
      'dc-input-view': !edit,
      'dc-input-error': error,
      'dc-input-dirty': this.isDirty,
    };

    /**
     * Notes:
     * - 'value' must be last property of input
     */
    return (
      <Host tabIndex={tabindex}>
        <div class={classes}>
          <div class="dc-input-label-wrap">
            <label class="dc-input-label" htmlFor={this.inputId} tabIndex={tabindex}>
              {this.label}
              <slot></slot>
            </label>
          </div>

          <div class="dc-input-input-wrap">
            <input
              class="dc-input-input"
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
            {this.indicator == 'working' && edit && <Spinner class="dc-input-spinner dc-input-indicator" />}
            {this.indicator == 'done' && edit && <Tick class="dc-input-tick dc-input-indicator" />}
            {error && <Error class="dc-input-error-icon" />}
            <p tabIndex={-1} class="dc-input-error-msg">
              {this.message}
            </p>
          </div>
          <aside tabIndex={-1} class="dc-input-help">
            {this.help}
          </aside>
        </div>
      </Host>
    );
  }
}
