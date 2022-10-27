import { Component, Host, h, Prop,} from '@stencil/core';
export type RadioSize = 'standard' | 'small';
export type Radiotype = 'radio'|'button';


@Component({
    tag: 'datacom-radio',
    styleUrl: 'datacom-radio.css',
    shadow: true,
  })
  export class DatacomRadio {

    @Prop() label :string
    @Prop() type: Radiotype = 'radio';
    @Prop() size: RadioSize = 'standard';
    @Prop() checked: boolean = false;
    @Prop() disabled: boolean = false;
    @Prop() required: boolean = false;
    @Prop() value: string;
    @Prop() autofocus: boolean = false;

    // @Event() toggle: EventEmitter<boolean>;

  handleChange = () => {
    this.checked = !this.checked;
    // this.toggle.emit(this.checked)
    
 
}

    render(){
    return(
    <Host>
          <input name="radio" type="radio" />
          <label>{this.label}</label>
        
    </Host>)
    }
  }
