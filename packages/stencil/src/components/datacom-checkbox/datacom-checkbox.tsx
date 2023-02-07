import { Component, h, Prop, Host, Event, EventEmitter, Method, Element, State } from '@stencil/core';
import { randomString } from '../../utils';
import { FormControl } from '../form-control';

export type CheckboxSizeType = 'standard' | 'small';

@Component({
  tag: 'datacom-checkbox',
  styleUrl: 'datacom-checkbox.css',
  scoped: true,
})
export class DatacomCheckbox implements FormControl {
  @Element() host: HTMLElement;

  /**
   * Standard form props
   */
  @Prop() readonly?: boolean;
  @Prop() form?: string;
  @Prop() formaction?: string;
  @Prop() formenctype?: string;
  @Prop() formmethod?: string;
  @Prop() formnovalidate? = false;
  @Prop() formtarget?: string;
  @Prop({ mutable: true }) checked = false;
  @Prop() disabled: boolean;
  @Prop() required: boolean;
  @Prop() value?: string;
  @Prop() name: string;
  @Prop() autofocus: boolean;
  @Prop() autocomplete?: boolean;

  /**
   * Checkbox is either standard size (default) or small
   */
  @Prop() variant: CheckboxSizeType = 'standard';

  /**
   * Show control in indeterminate state (dash)
   */
  @Prop({ mutable: true }) indeterminate?: boolean = false;

  /**
   * Checkbox label (right of tickbox)
   */
  @Prop() label: string;

  /**
   * Auto-validate and display error message on form submit
   */
  @Prop({ attribute: 'autovalidate' }) autoValidate?: boolean = true;

  /**
   * Custom error message if control is invalid
   */
  @Prop() message: string;

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
   * Error mutable state will re-render the control to display error message, icon and focus border
   */
  @State() isInError = false;

  /**
   * Unique input control id
   */
  private inputId = randomString();

  /**
   * DOM reference to input control
   */
  private inputElement: HTMLInputElement;

  /**
   * DOM reference to associated form
   */
  private formElement: HTMLFormElement;

  /**
   * Toggle checked state
   */
  onChange = () => {
    this.checked = !this.checked;
    this.indeterminate = false;
    this.isInError = false;
    this.changed.emit(this.index);
  };

  /**
   * Force validation on the form control to display any error messages
   *
   * @returns boolean
   */
  @Method()
  async validate(): Promise<boolean> {
    this.isInError = !(await this.checkValidity());

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
   * Watch for form submit and prevent if the input is invalid
   *
   * @param event
   */
  onFormSubmit = async (event: SubmitEvent) => {
    if (!(await this.checkValidity())) {
      this.isInError = true;

      /**
       * Stop the form submit and show errors
       */
      event.preventDefault();
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

  /**
   * Capture input element on render
   *
   * @param el
   */
  private setInputElementRef(el: HTMLInputElement) {
    this.inputElement = el;
  }

  render() {
    if (!['standard', 'small'].includes(this.variant)) {
      console.warn('Check size must be either standard or small.');
      this.variant = 'standard';
    }

    const classes = {
      'dc-checkbox-grouped': this.grouped,
      'dc-checkbox-child': this.child,
      'dc-checkbox-error': this.isInError,
      'dc-checkbox-indeterminate': this.indeterminate,
      'dc-checkbox-disabled': this.disabled,
      [`dc-checkbox-size-${this.variant}`]: true,
    };

    const checked = this.checked && !this.indeterminate;

    return (
      <Host>
        <div class={classes}>
          <div class="dc-checkbox-wrap">
            <input
              ref={el => this.setInputElementRef(el)}
              id={this.inputId}
              class="dc-checkbox-input"
              autofocus={this.autofocus}
              name={this.name}
              type="checkbox"
              checked={checked}
              onChange={this.onChange}
              disabled={this.disabled}
              required={this.required}
              form={this.form}
              formAction={this.formaction}
              formEncType={this.formenctype}
              formMethod={this.formmethod}
              formNoValidate={this.formnovalidate}
              formtarget={this.formtarget}
              tabIndex={0}
              value={this.value}
            />
            <label tabIndex={-1} class="dc-checkbox-label" htmlFor={this.inputId}>
              {this.label}
              <slot />
            </label>
          </div>
          <span class="dc-checkbox-error-msg">{this.message}</span>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomCheckboxElement = HTMLElement & DatacomCheckbox;
