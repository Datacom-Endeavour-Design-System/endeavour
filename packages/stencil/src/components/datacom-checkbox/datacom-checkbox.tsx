import { Component, h, Prop, Event, EventEmitter, Host } from '@stencil/core';

// type CheckboxSize = 'standard'|'small';

@Component({
  tag: 'datacom-checkbox',
  styleUrl: 'datacom-checkbox.css',
  shadow: true,
})
export class DatacomCheckbox {
  @Prop() checked: boolean = false;
  @Prop() label: string;
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() small: string;
  // @Prop() value:string;

  // @Prop() intermediate: boolean = false;

  //  @State() CheckboxState: {checked,unchecked,indtermediate}

  // @Prop() size : CheckboxSize = 'standard';

@Event() toggle: EventEmitter<boolean>;

  handleChange = () => {
    this.checked = !this.checked;
    this.toggle.emit(this.checked);
  };

  render() {
    return (
      <Host>
        <div class="checkbox-container">
          <input name="datacom-checkbox" type="checkbox" class="checkbox" checked={this.checked} onChange={this.handleChange} disabled={this.disabled} required={this.required} />
          <label htmlFor="datacom-checkbox1" class="label">
            {this.label}
          </label>
          <small class="small">{this.small}</small>
          {/* <p class = "error">{this.checked ? "selected  ":"unselected  "}</p>  */}
        </div>
      </Host>
    );
  }
}
