import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

type DropdownOptionMode = 'list' | 'standalone';

@Component({
  tag: 'datacom-option',
  styleUrl: 'datacom-dropdown-option.css',
  shadow: false,
})
export class DatacomDropdownOption {
  @Event({ eventName: 'selected', bubbles: true })
  selectedEvent: EventEmitter<number>;
  @Event({ eventName: 'deselected', bubbles: true })
  deselectedEvent: EventEmitter<number>;

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

  /**
   * Display type (mostly private)
   * - list = display as item in drop down list (default)
   * - standalone = display a standalone item outside of the list.
   */
  @Prop() mode: DropdownOptionMode = 'list';

  /**
   * Emit selected or deselected events for the parent and other consumers to observe.
   */
  private toggle() {
    if (this.selected) {
      this.deselectedEvent.emit(this.index);
    } else {
      this.selectedEvent.emit(this.index);
    }
  }

  /**
   * Handle mouse click on an option
   *
   * @param event
   */
  handleClick = (event: MouseEvent) => {
    this.toggle();

    /**
     * Do not propagate up in list as this will cause the parent to close
     */
    if (this.mode == 'list') {
      event.stopPropagation();
    }
  };

  /**
   * Handle keypress on option to select/deselect
   *
   * @param event
   */
  handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Return' || event.key == ' ') {
      this.toggle();

      /**
       * Do not propagate up in list as this will cause the parent to open
       */
      if (this.mode == 'list') {
        event.stopPropagation();
      }
    }
  };

  render() {
    /**
     * Dynamically retrieve SVG functional component based on its name, or use image src if supplied.
     */
    let image;
    if (this.icon?.length > 0) {
      image = getSvg(this.icon, { class: 'dc-ddl-option-image' });
    } else if (this.src?.length > 0) {
      image = <img src={this.src} class="dc-ddl-option-image"></img>;
    }

    const classes = {
      'dc-ddl-option': true,
      'dc-ddl-option-selected': this.selected,
      'dc-ddl-option-hidden': !this.visible,
      [`dc-ddl-option-mode-${this.mode}`]: true,
    };

    return (
      <Host data-index={this.index}>
        <div
          class={classes}
          tabIndex={0}
          onClick={this.handleClick}
          onKeyUp={this.handleKeyUp}>
          <label class="dc-ddl-option-content" title={this.label}>
            {image && <span class="dc-ddl-option-icon">{image}</span>}
            <div class="dc-ddl-option-label">
              {this.label}
              <slot></slot>
            </div>
          </label>
        </div>
      </Host>
    );
  }
}

export type DatacomDropdownOptionElement = HTMLElement & DatacomDropdownOption;
