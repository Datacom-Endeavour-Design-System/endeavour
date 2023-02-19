import { Component, Host, h, Prop, State, Listen, Method, Event, EventEmitter, Fragment } from '@stencil/core';
import { Error } from '../../common/images/icons';
import { randomString } from '../../utils';
import { FormControl } from '../form-control';
/**
 
 *
 * The control is scoped rather than shadow so the textarea field can participate in a form submit.
 *
 * @see https://brandhub.datacom.com/d/fjZSq4WewHBg/components#/components/text-area-field
 */

@Component({
  tag: 'datacom-textarea',
  styleUrl: 'datacom-textarea.css',
  scoped: true,
})
export class DatacomTextarea implements FormControl {
  private textElement: HTMLTextAreaElement;
  private formElement: HTMLFormElement;

  /**
   * HTML element textarea properties
   *
   */
  @Prop() name: string;
  @Prop() rows: number;
  @Prop() cols: number;
  @Prop() placeholder?: string;
  @Prop() disabled? = false;
  @Prop() maxlength?: number = 100;
  @Prop() minlength?: number;
  @Prop() readonly? = false;
  @Prop() required? = false;
  @Prop() form?: string;
  @Prop() formaction?: string;
  @Prop() formenctype?: string;
  @Prop() formmethod?: string;
  @Prop() formnovalidate? = false;
  @Prop() formtarget?: string;
  @Prop() label?: string;
  @Prop() inputAutofocus?: boolean;
  @Prop() autocorrect = false;

  @Prop() value: string;

  /**
   * The component is 'dirty' if it has been touched by user input
   *
   * @see onInput
   */
  private isDirty = false;

  /**
   * Error message to display in the case of validity checks
   * or explicitly with 'valid' property
   */
  @Prop() message?: string;
  @Prop({ attribute: 'valid' }) isValid?: boolean;

  /**
   * Random id used by label to associate with the input control.
   *
   * This is randomly generated as it cannot be coded to a known value as all instances
   * on the page would have the same value.
   */
  private inputId = randomString();
  /**
   * Optional help text
   */
  @Prop() help?: string;

  /**
   * Automatically show error state if invalid on form submit
   */
  @Prop() autoValidate? = true;

  /**
   * Error mutable state will re-render the control to display error message,  focus border
   */
  @State() isInError = false;

  @State() counter = 0;

  @Event({
    composed: true,
  })
  private changed: EventEmitter<string>;

  /**
   * Editing mutable state will re-render the control to display input element
   */
  @State() isEditing = false;
  //  private isTouched = false;

  /**
   * Switch the control to edit mode if it is not already editing.
   */
  private setTextElementRef(el: HTMLTextAreaElement): void {
    this.textElement = el;
  }

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
    return this.textElement.checkValidity();
  }

  /**
   * Sets edit state for element
   */
  @Method()
  async edit(): Promise<void> {
    if (!this.isEditing && !this.disabled) {
      // Mutate control to display edit mode
      this.isEditing = true;

      // Delay sending focus until the element has rendered with the input visible.
      setTimeout(() => this.textElement.focus(), 100);
    }
  }

  @Listen('focus', { capture: true })
  onFocus(/* event: FocusEvent */): void {
    this.edit();
  }

  @Listen('blur', { capture: true })
  onBlur(event: any): void {
    this.isEditing = false;
    const elem = event.target as HTMLElement;

    if (elem.tagName.toLowerCase() === 'input') {
      this.value = this.textElement.value;

      /**
       * Delay moving to view mode so the tabbing action moves out of the
       * control before enabling tabindex (view mode)
       */
      setTimeout(() => (this.isEditing = false), 10);

      /* Set internal error state */
      this.isInError = !this.textElement.checkValidity();
      this.textElement.scroll({ left: 0 });
    }
  }

  @Listen('input', { capture: true })
  onInput(): void {
    this.isDirty = true;
    this.changed.emit(this.textElement.value);
    if (this.isInError) {
      this.isInError = false;
    }
    this.counter = this.textElement.value.length;
  }

  onFormSubmit = (event: SubmitEvent) => {
    if (!this.textElement.checkValidity()) {
      /**
       * Stop the form submit and show errors
       */
      event.preventDefault();

      this.isEditing = true;
      this.isInError = true;
      this.isDirty = true;
    }
  };

  componentDidLoad() {
    if (this.autoValidate) {
      this.formElement = this.textElement.closest('form');

      if (this.formElement !== undefined && this.formElement !== null) {
        this.formElement.noValidate = true;
        this.formElement.addEventListener('submit', this.onFormSubmit);
      }
    }
  }

  disconnectedCallback() {
    if (this.formElement !== undefined && this.formElement !== null) {
      this.formElement.removeEventListener('submit', this.onFormSubmit);
    }
  }

  render() {
    /* When in edit mode, we disable tabindex within the control so that keyboard actions
     * like tab and shift-tab move correctly to the next form control.
     */
    const edit = this.isEditing || this.value?.length > 0 || this.isDirty || this.isValid == false;

    const tabindex = this.isEditing ? -1 : 0;
    const error = (this.isInError && this.isDirty) || this.isValid == false;
    const classes = {
      'dc-textarea': true,
      'dc-textarea-disabled': this.disabled,
      'dc-textarea-error': error,
      'dc-textarea-edit': edit,
      'dc-textarea-view': !edit,
      'dc-text-dirty': this.isDirty,
    };

    return (
      <Host>
        <div class={classes}>
          <label class="dc-textarea-label" htmlFor={this.inputId} tabIndex={-1}>
            {this.label}
          </label>
          <div class="dc-textarea-counter">
            {this.counter}/{this.maxlength}
          </div>
          <div class="dc-textarea-wrap">
            <textarea
              class="dc-textarea-input"
              ref={el => this.setTextElementRef(el)}
              tabIndex={tabindex}
              id={this.inputId}
              placeholder={this.placeholder}
              minlength={this.minlength}
              readonly={this.readonly}
              required={this.required}
              name={this.name}
              rows={this.rows}
              cols={this.cols}
              form={this.form}
              disabled={this.disabled}
              maxlength={this.maxlength}
              value={this.value}
            ></textarea>
            {error && (
              <Fragment>
                <Error class="dc-textarea-error-icon" />
                <p tabIndex={-1} class="dc-textarea-error-msg">
                  {this.message}
                </p>
              </Fragment>
            )}
          </div>
          {this.help && !error && <div class="dc-textarea-help">{this.help}</div>}
        </div>
      </Host>
    );
  }
}
