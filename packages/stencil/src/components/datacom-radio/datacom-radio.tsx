import { Component, Host, h, Prop, Element, EventEmitter, Event, VNode } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';
export type RadioSize = 'standard' | 'small';
export type RadioVariant = 'radios' | 'buttons';
export type ImagePosition = 'left' | 'right';

@Component({
  tag: 'datacom-radio',
  styleUrl: 'datacom-radio.css',
  scoped: true,
})
export class DatacomRadio {
  @Element() el;
  @Prop() label: string;
  @Prop() variant: RadioVariant = 'radios';
  @Prop() size: RadioSize = 'standard';
  @Prop({ attribute: 'image-position' }) imagePosition: ImagePosition = 'left';
  @Prop() type = 'radio';
  @Prop({ mutable: true }) checked = false;
  @Prop() disabled = false;
  @Prop() required = false;
  @Prop() name: string;
  @Prop() inputId: string;
  @Prop() src: string;
  @Prop() icon: string;

  @Prop() value: string;
  @Prop() autofocus = false;
  @Prop() formmethod: string;
  @Prop() form: string;
  @Prop() formenctype: string;
  @Prop() formaction: string;
  @Prop() formtarget: string;
  @Event() changed: EventEmitter<number>;

  //  @Event()

  handleChange = e => {
    console.log(e.target.value);
    this.checked = true;

    // this.toggle.emit(this.checked)
  };

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
      console.log('Buttons group image position must be either left or right.');
      this.imagePosition = 'left';
    }

    let image: VNode;
    if (this.icon !== undefined && !this.checked) {
      image = getSvg(this.icon, { class: 'image' });
    } else if (this.src !== undefined) {
      image = <img src={this.src} class="image"></img>;
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
