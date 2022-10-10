import { Component, h, Prop, Event, EventEmitter, Host } from '@stencil/core';

@Component({
  tag: 'datacom-checkbox',
  styleUrl: 'datacom-checkbox.css',
  shadow: true,
})
export class DatacomCheckbox {
  @Prop() checked: boolean = false;
  @Prop() label: string;

  @Event() toggle: EventEmitter<boolean>;  
  
  handleChange = () => {
    this.checked = !this.checked;
    console.log(`Checkbox changed to ${this.checked}`);
    
    this.toggle.emit(this.checked);
  }

  render() {
    return (
      <Host>
        <span>
          <label>{this.label}</label>
          <input type="checkbox" checked={this.checked} onChange={this.handleChange}/>
        </span>
      </Host>
    );
  }

}
