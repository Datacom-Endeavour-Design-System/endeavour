import {
  Component,
  h,
  Prop,
  Element,
  EventEmitter,
  Event,
  VNode,
  State,
  Method,
  Host,
} from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';
import { randomString } from '../../utils';
import { FormControl } from '../form-control';

export type RadioSize = 'standard' | 'small';
export type RadioVariant = 'radio' | 'button';
export type ImagePosition = 'left' | 'right';

@Component({
  tag: 'datacom-radio',
  styleUrl: 'datacom-radio.css',
  scoped: true,
})
export class DatacomRadio implements FormControl {
  @Element() host: HTMLDatacomRadioElement;
  @Prop() label: string;
  @Prop() variant: RadioVariant = 'radio';
  @Prop() size: RadioSize = 'standard';
  @Prop({ attribute: 'image-position' }) iconPosition: ImagePosition = 'left';
  @Prop() type = 'radio';
  @Prop({ mutable: true }) checked = false;
  @Prop() disabled = false;
  @Prop() required = false;
  @Prop({ mutable: true }) name: string;
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
  @Event() selected: EventEmitter<string>;
  @State() grouped = false;

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

  handleChange = () => {
    this.selected.emit(this.value);
  };

  /**
   * control use for radio button group   */
  @Method()
  async setGrouped(grouped: boolean): Promise<boolean> {
    this.grouped = grouped;
    return this.grouped;
  }

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
    let variant = this.variant;
    let size = this.size;
    let iconPosition = this.iconPosition;

    if (!['standard', 'small'].includes(size)) {
      console.log('radio size must be either standard or small.');
      size = 'standard';
    }

    if (!['radio', 'button'].includes(variant)) {
      console.log('radio variant must be either radio or buttons.');
      variant = 'radio';
    }

    if (!['left', 'right'].includes(this.iconPosition)) {
      console.log('radio group image position must be either left or right.');
      iconPosition = 'left';
    }

    let image: VNode;
    if (this.icon != null) {
      image = getSvg(this.icon, { class: 'dc-radio-image' });
    } else if (this.src != null) {
      image = <img src={this.src} class="dc-radio-image"></img>;
    }

    const classes = {
      'dc-radio-grouped': this.grouped,
      'dc-radio-disabled': this.disabled,
      'dc-radio-checked': this.checked,
      [`dc-radio-${variant}`]: true,
      [`dc-radio-size-${size}`]: true,
    };

    return (
      <Host>
        <div class={classes}>
          <div class="dc-radio-wrapper">
            <input
              class="dc-radio-input"
              ref={(el) => this.setInputElementRef(el)}
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
              onChange={this.handleChange}
              tabIndex={0}
            />
            <label htmlFor={this.inputId} class="dc-radio-label" tabIndex={-1}>
              <span tabIndex={-1} class={`dc-radio-image-${iconPosition}`}>
                {this.label}
                {variant !== 'radio' && image}
              </span>
              <slot></slot>
            </label>
          </div>
        </div>
      </Host>
    );
  }
}
export type HTMLDatacomRadioElement = HTMLElement & DatacomRadio;
