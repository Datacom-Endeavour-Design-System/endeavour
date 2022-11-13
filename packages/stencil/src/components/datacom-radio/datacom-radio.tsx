import { Component, Host, h, Prop, Element, EventEmitter, Event, VNode, State, Method } from '@stencil/core';
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

  //  @Event()

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

    // this.toggle.emit(this.checked)
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

    let image: VNode;
    if (this.icon !== undefined && !this.checked) {
      image = getSvg(this.icon, { class: 'dc-radio-image' });
    } else if (this.src !== undefined) {
      image = <img src={this.src} class="dc-radio-image"></img>;
    }

    const classes = {
      'dc-radio-disabled': this.disabled,
      'dc-radio-checked': this.checked,
      [`dc-radio-${variant}`]: true,
      [`dc-radio-size-${size}`]: true,
      [this.type]: true,
      [`image-${this.imagePosition}`]: image && this.label?.length > 0,
    };

    return (
      <Host>
        <div class="dc-radio-wraper">
          <input
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
            onChange={this.handleChange}
            disabled={this.disabled}
            required={this.required}
            value={this.value}
            id={this.inputId}
            class={classes}
          />
          <label htmlfor={this.inputId} class="dc-radio-label">
            {image}
            {this.label}
          </label>
        </div>
      </Host>
    );
  }
}
