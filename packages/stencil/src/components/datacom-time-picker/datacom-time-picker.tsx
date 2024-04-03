import { Component, Host, h, Method, Prop } from '@stencil/core';
import { FormControl } from '../form-control';

@Component({
  tag: 'datacom-time-picker',
  styleUrl: 'datacom-time-picker.css',
  scoped: true,
})
export class DatacomTimePicker implements FormControl {
  private inputElement: HTMLInputElement;
  // private formElement: HTMLFormElement;

  @Prop() timezone? = false;

  @Prop() message?: string;
  @Prop() autoValidate? = true;

  @Method()
  async validate(): Promise<boolean> {
    return true;
  }

  @Method()
  async checkValidity(): Promise<boolean> {
    return this.inputElement.checkValidity();
  }

  render() {
    return (
      <Host>
        <div></div>
      </Host>
    );
  }
}
