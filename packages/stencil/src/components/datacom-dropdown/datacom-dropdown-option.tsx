import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

@Component({
  tag: 'datacom-dropdown-option',
  styleUrl: 'datacom-dropdown-option.css',
  shadow: true,
})
export class DatacomDropdownOption {
  @Event({ eventName: 'selected', bubbles: true }) selectEvent: EventEmitter<number>;

  /**
   * Option id
   */
  @Prop() index = 0;

  /**
   * Form submit value
   */
  @Prop() value: string;

  /**
   * Display label
   */
  @Prop() label: string;

  /**
   * Icon name
   */
  @Prop() icon?: string;

  /**
   * Icon source
   */
  @Prop() src?: string;

  /**
   * Text for use in option search
   */
  @Prop() search?: string;

  /**
   * Show the item
   */
  @Prop({ mutable: true }) visible = true;

  /**
   * True if the option is selected
   */
  @Prop({ mutable: true }) selected = false;

  private toggle() {
    this.selected = !this.selected;
    this.selectEvent.emit(this.index);
    console.log(`Toggled select on ${this.index}`);
  }

  onClick = (/* event: MouseEvent */) => {
    this.toggle();
  };

  onKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Return' || event.key == ' ') {
      this.toggle();
    }
  };

  render() {
    /**
     * Dynamically retrieve SVG functional component based on its name,
     * or use image src if supplied.
     */
    let image;
    if (this.icon?.length > 0) {
      image = getSvg(this.icon, { class: 'dc-ddl-option-image' });
    } else if (this.src?.length > 0) {
      image = <img src={this.src} class="dc-dll-option-image"></img>;
    }

    const classes = {
      'dc-ddl-option': true,
      'dc-ddl-option-selected': this.selected,
      'dc-ddl-option-hidden': !this.visible,
    };

    return (
      <Host>
        <div class={classes} tabIndex={0} onClick={this.onClick} onKeyPress={this.onKeyPress}>
          <label class="dc-ddl-option-content">
            <span class="dc-dll-option-icon">{image}</span>
            <span class="dc-dll-option-label">
              {this.label}
              <slot></slot>
            </span>
          </label>
        </div>
      </Host>
    );
  }
}

export type DatacomDropdownOptionElement = HTMLElement & DatacomDropdownOption;
