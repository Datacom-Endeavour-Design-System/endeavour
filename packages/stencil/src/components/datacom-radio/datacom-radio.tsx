import { Component, Fragment, h, Prop, Element, EventEmitter, Event, VNode, State, Method } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';
import { randomString } from '../../utils';
import { FormControl } from '../form-control';

export type RadioSize = 'standard' | 'small';
export type RadioVariant = 'radios' | 'buttons';
export type ImagePosition = 'left' | 'right';

@Component({
  tag: 'datacom-radio',
  styleUrl: 'datacom-radio.css',
  scoped: true,
})
export class DatacomRadio implements FormControl {
  @Element() host: HTMLElement;
  @Prop() label: string;
  @Prop() variant: RadioVariant = 'radios';
  @Prop() size: RadioSize = 'standard';
  @Prop({ attribute: 'image-position' }) imagePosition: ImagePosition = 'left';
  @Prop() type = 'radio';
  @Prop({ mutable: true }) checked = false;
  @Prop() disabled = false;
  @Prop() required = false;
  @Prop() name: string;
  @Prop() src: string;
  @Prop() icon: string;

  @Prop() value: string;
  @Prop() autofocus = false;
  @Prop() autocomplete?: boolean;
  @Prop() readonly?: boolean;
  @Prop() formmethod: string;
  @Prop() formnovalidate? = false;
  @Prop() form: string;
  @Prop() formenctype: string;
  @Prop() formaction: string;
  @Prop() formtarget: string;
  @Event() changed: EventEmitter<number>;
  private formElement: HTMLFormElement;

  /**
   * Auto-validate and display error message on form submit
   */
  @Prop() autoValidate?: boolean = true;
  /**
   * Unique input control id
   */
  private inputId = randomString();

  /**
   * Custom error message if control is invalid
   */
  @Prop() message: string;
  @State() isInError = false;
  private inputElement: HTMLInputElement;

  handleChange = e => {
    console.log(e.target.value);
    this.checked = true;

    // this.toggle.emit(this.checked);
  };
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
  private setInputElementRef(el: HTMLInputElement) {
    this.inputElement = el;
  }

  render() {
    // Shouldn't overwrite immutable properties so we must use local variables

    const variant = this.variant;
    const size = this.size;
    //let imagePosition = this.imagePosition;
    if (!['standard', 'small'].includes(size)) {
      throw Error('Check size must be either standard or small.');
    }
    if (!['radios', 'buttons'].includes(variant)) {
      console.log('radio variant must be either radio or buttons.');
      this.variant = 'radios';
    }
    if (!['left', 'right'].includes(this.imagePosition)) {
      console.log('radio group image position must be either left or right.');
      this.imagePosition = 'left';
    }

    {
      let image: VNode;
      if (this.icon != null) {
        image = getSvg(this.icon, { class: 'dc-radio-image' });
      } else if (this.src != null) {
        image = <img src={this.src} class="dc-radio-image"></img>;
        return;
      }
      console.log(image);

      const classes = {
        'dc-radio-disabled': this.disabled,
        'dc-radio-checked': this.checked,
        [`dc-radio-${variant}`]: true,
        [`dc-radio-size-${size}`]: true,
        [this.type]: true,
      };
      if (this.variant == 'buttons') {
        return (
          <Fragment>
            <div class="dc-ta-horizontal-layout">
              <div class="dc-radio-wrapper">
                <input
                  ref={el => this.setInputElementRef(el)}
                  form={this.form}
                  autofocus={this.autofocus}
                  formmethod={this.formmethod}
                  formaction={this.formaction}
                  formtarget={this.formtarget}
                  formenctype={this.formenctype}
                  formnovalidate={this.formnovalidate}
                  name={this.name}
                  type={this.type}
                  checked={this.checked}
                  disabled={this.disabled}
                  required={this.required}
                  value={this.value}
                  id={this.inputId}
                  class={classes}
                  onChange={this.handleChange}
                  tabIndex={0}
                />

                <label tabIndex={-1} htmlFor={this.inputId} class="dc-radio-label">
                  <span class={`dc-radio-image-${this.imagePosition}`}>
                    {image}
                    {this.label}
                  </span>
                </label>
              </div>
            </div>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <div class="dc-ta-vertical-layout">
              <div class="dc-radio-wrapper">
                <input
                  ref={el => this.setInputElementRef(el)}
                  form={this.form}
                  autofocus={this.autofocus}
                  formmethod={this.formmethod}
                  formaction={this.formaction}
                  formtarget={this.formtarget}
                  formenctype={this.formenctype}
                  formnovalidate={this.formnovalidate}
                  name={this.name}
                  type={this.type}
                  checked={this.checked}
                  disabled={this.disabled}
                  required={this.required}
                  value={this.value}
                  id={this.inputId}
                  class={classes}
                  onChange={this.handleChange}
                  tabIndex={0}
                />
                <label tabIndex={-1} htmlfor={this.inputId} class="dc-radio-label">
                  <span class={`dc-radio-image-${this.imagePosition}`}>
                    {this.label}
                    <slot></slot>
                  </span>
                </label>
              </div>
            </div>
          </Fragment>
        );
      }
    }
  }
}
export type HTMLDatacomRadioElement = HTMLElement & DatacomRadio;
