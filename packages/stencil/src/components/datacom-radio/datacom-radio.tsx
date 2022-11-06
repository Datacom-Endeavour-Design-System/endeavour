import { Component, Host, h, Prop ,Element} from '@stencil/core';
export type RadioSize = 'standard' | 'small';
export type RadioVariant = 'radio' | 'button';

@Component({
  tag: 'datacom-radio',
  styleUrl: 'datacom-radio.css',
  scoped: true,
})
export class DatacomRadio {
  @Element() el;
  @Prop() label: string;
  @Prop() variant: RadioVariant = 'radio';
  @Prop() size: RadioSize = 'standard';
  @Prop() type = 'radio';
  @Prop() checked: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() name:string;
  @Prop() inputId:string;
 




  @Prop() value: string;
  @Prop() autofocus: boolean = false;
  @Prop() formmethod: string;
  @Prop() form: string;
  @Prop() formenctype: string;
  @Prop() formaction: string;
  @Prop() formtarget: string;

 
//  @Event()
// 

//   //    }

//    let form: HTMLFormElement;
//    if (this.form) {
//      form = document.querySelector(this.form);
//    } else {
//      form = this.el.closest('form');
//    }



  handleChange = (e) => {
    console.log(e.target.value);
    this.checked = !this.checked;
    // this.toggle.emit(this.checked)
  };
  // getFocus() {
  //   document.getElementById(this.inputId).focus();
  // }

  render() {
    if (!['standard', 'small'].includes(this.size)) {
      throw Error('Check size must be either standard or small.');
    }
    if (!['radio', 'button'].includes(this.variant)) {
      console.log('radio variant must be either radio or button.');
      this.variant = 'radio';
    }

    const classes = {
      disabled: this.disabled,
      checked:this.checked,
      [this.variant]: true,
      [`size-${this.size}`]: true,
      [this.type]: true,
    };

    return (
      <Host>
      
        <div>
        <label htmlfor={this.inputId} class={classes}>{this.label}
        <input
      
          autofocus={this.autofocus}
          name={this.name}
          type={this.type}
          checked={this.checked}
          onChange={this.handleChange}
          disabled={this.disabled}
          required={this.required}
          value={this.value}
          id={this.inputId}
        />
        <span class={`size-${this.size}`}></span>
        </label>
        </div>
       
     
      </Host>
    );
  }
}
