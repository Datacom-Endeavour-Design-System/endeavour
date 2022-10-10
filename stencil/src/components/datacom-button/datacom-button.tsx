import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'datacom-button',
  styleUrl: 'datacom-button.css',
  shadow: true,
})
export class DatacomButton {
  @Prop() text: string;
  @Prop() disabled: boolean = false;

  render() {
    return (
      <Host>
        <button disabled={this.disabled}>{this.text}</button>
      </Host>
    );
  }

}
