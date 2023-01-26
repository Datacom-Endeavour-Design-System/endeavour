import { Component, Host, h, Prop, Element, EventEmitter, Event, VNode, State, Method } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';
import { randomString } from '../../utils';
import { FormControl } from '../form-control';

export type RadioSize = 'standard' | 'small';
export type ImagePosition = 'left' | 'right';

@Component({
  tag: 'datacom-radio-selection',
  styleUrl: 'datacom-radio-selection.css',
  scoped: true,
})
export class DatacomRadioSelection implements FormControl {
  @Prop() options = ['option1', 'option2', 'option3', 'option4'];
  @Element() host: HTMLElement;
  @Prop({ attribute: 'image-position' }) imagePosition: ImagePosition = 'left';

  /**
   * Display label
   */
  @Prop() label: string;
  /**
   * Form submit value
   */
  @Prop() value: string;
  /**
   * Icon name
   */
  @Prop() icon?: string;
  /**
   * Icon source
   */
  @Prop() src?: string;

  /** Size  */
  @Prop() size: RadioSize = 'standard';
  /** */
  @Prop({ mutable: true }) checked = false;
  @Prop() disabled = false;
  @Prop() required = false;
  @Prop() name: string;
  @Prop() autoValidate?: boolean = true;
  @Prop() type = 'radio';
  @Prop() selectedOption: string;
  /**
   * Unique input control id
   */
  private inputId = randomString();

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
   * Unique input control id
   */

  /**
   * Custom error message if control is invalid
   */
  @Prop() message: string;
  @State() isInError = false;
  private inputElement: HTMLInputElement;

  handleChange = e => {
    this.checked = true;
    e.target.value = this.inputId;
    console.log(e.target.value);
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
  // getImage=()=>
  // {
  //   let image:VNode
  //     if (this.icon != null) {
  //       image = getSvg(this.icon, { class: 'dc-radio-selection-image' });
  //     } else if (this.src != null) {
  //       image = <img src={this.src} class="dc-radio-image"></img>;
  //       return;
  //     }
  //     <span  class={`dc-radio-selection-image-${this.imagePosition}`}>{image}</span>

  // }

  render() {
    // Shouldn't overwrite immutable properties so we must use local variables

    // const variant = this.variant;
    const size = this.size;
    //let imagePosition = this.imagePosition;
    if (!['standard', 'small'].includes(size)) {
      throw Error('Check size must be either standard or small.');
    }

    if (!['left', 'right'].includes(this.imagePosition)) {
      console.log('radio group image position must be either left or right.');
      this.imagePosition = 'left';
    }

    let image;
    if (this.icon?.length > 0) {
      image = getSvg(this.icon, { class: 'dc-radio-selection-image' });
    } else if (this.src?.length > 0) {
      image = <img src={this.src} class="dc-radio-selection-image"></img>;
    }
    const classes = {
      'dc-radio-selection': true,
      'dc-radio-disabled': this.disabled,
      'dc-radio-selection-checked': this.checked,
      [`dc-radio-selection-size-${size}`]: true,
    };

    return (
      <Host>
        <div class="dc-radio-selection-wrapper">
          {this.options.map(option => (
            <div class="dc-button-wrapper">
              <input
                ref={el => this.setInputElementRef(el)}
                key={option}
                class={classes}
                tabIndex={-1}
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
                value={option}
                id={this.inputId}
                onChange={this.handleChange}
              />
              <label tabIndex={0} class="dc-radio-selection-label" htmlFor={this.inputId}>
                <span class={`dc-radio-selection-image-${this.imagePosition}`}>
                  {image}
                  {this.label}
                </span>
              </label>
            </div>
          ))}
        </div>
      </Host>
    );
  }
}
