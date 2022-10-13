import { Component, h, Prop, Event, EventEmitter, Host } from '@stencil/core';

@Component({
  tag: 'datacom-checkbox',
  styleUrl: 'datacom-checkbox.css',
  shadow: true,
})
export class DatacomCheckbox {
  @Prop() checked: boolean = false;
  @Prop() label: string;
  @Prop() size: ['sm:14px', 'md:16px', 'lg'];

  @Event() toggle: EventEmitter<boolean>;

  handleChange = () => {
    this.checked = !this.checked;
    this.toggle.emit(this.checked);
  };

  render() {
    return (
      <Host>
        <div class="checkbox-container">
          <input name="datacom-checkbox" type="checkbox" class="checkbox" id="datacom-checkbox1" checked={this.checked} onChange={this.handleChange} />
          <label htmlFor="datacom-checkbox1" class="label">
            {this.label}
          </label>
        </div>
       
      </Host>
    );
  }
}
