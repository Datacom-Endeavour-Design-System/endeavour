import { Component, Host, h, Prop, State, Method, Element, Listen } from '@stencil/core';
import { randomString } from '../../utils';
import { FormControl } from '../form-control';
import { DatacomDropdownOptionElement } from './datacom-dropdown-option';
import { Chevron } from '../../common/images/icons';

export type DatacomDropDownVariantType = 'single' | 'multiple';

@Component({
  tag: 'datacom-dropdown',
  styleUrl: 'datacom-dropdown.css',
  scoped: true,
})
export class DatacomDropdown implements FormControl {
  @Element() host: HTMLElement;

  private selectElement: HTMLSelectElement;
  private inputElement: HTMLInputElement;

  //private formElement: HTMLFormElement;

  /**
   * HTML element input properties
   */
  @Prop() name: string;
  @Prop({ mutable: true }) value?: string;
  @Prop() placeholder?: string;
  @Prop() disabled? = false;
  @Prop() readonly? = false;
  @Prop() required? = false;
  @Prop() form?: string;
  @Prop() title: string;

  /**
   * Drop down variant
   */
  @Prop() variant: DatacomDropDownVariantType = 'single';

  /**
   * Enable type ahead search for options.
   */
  @Prop() search = false;

  /**
   * Control label
   */
  @Prop() label: string;

  /**
   * Error message to display in the case of input validity checks
   * or explicitly with 'valid' property
   */
  @Prop() message?: string;
  @Prop({ attribute: 'valid' }) isValid?: boolean;

  /**
   * Optional help text
   */
  @Prop() help?: string;

  /**
   * Automatically show error state if invalid on form submit
   */
  @Prop() autoValidate? = true;

  /**
   * Error mutable state will re-render the control to display error message, icon and focus border
   */
  @State() isInError = false;

  /**
   * Editing mutable state will re-render the control to display input element
   */
  @State() isEditing = false;

  /**
   * Is the drop down list displayed
   */
  @State() isOpen = false;

  /**
   * Is the drop down list in filter mode
   */
  private isFiltering = false;

  /**
   * The component is 'dirty' if it has been touched by user input
   *
   * @see onInput
   */
  private isDirty = false;

  /**
   * Random id used by label to associate with the input control.
   *
   * This is randomly generated as it cannot be coded to a known value as all instances
   * on the page would have the same value.
   */
  private inputId = randomString();

  private selected: DatacomDropdownOptionElement[] = [];

  /**
   * Force validation on the form control to display any error messages
   *
   * @returns boolean
   */
  @Method()
  async validate(): Promise<boolean> {
    this.isInError = !(await this.checkValidity());

    if (this.isInError) {
      this.isDirty = true;
    }

    return this.isInError;
  }

  /**
   * Check if the control is valid
   */
  @Method()
  async checkValidity(): Promise<boolean> {
    return this.selectElement.checkValidity();
  }

  /**
   * Capture input element reference on mount
   *
   * @param el
   */
  private setSelectElementRef(el: HTMLSelectElement): void {
    this.selectElement = el;
  }

  private setInputElementRef(el: HTMLInputElement): void {
    this.inputElement = el;
  }

  private options: DatacomDropdownOptionElement[] = [];

  /**
   * Get a list of options children
   *
   * @returns List of options
   */
  private getOptions(): DatacomDropdownOptionElement[] {
    if (this.host == undefined) {
      return [];
    }

    if (this.options?.length > 0) {
      return this.options;
    }

    this.host.querySelectorAll<DatacomDropdownOptionElement>('datacom-dropdown-option').forEach(t => this.options.push(t));

    return this.options;
  }

  private getOption(index: number): DatacomDropdownOptionElement {
    const options = this.getOptions();
    if (index < 0 || index > options.length - 1) {
      return undefined;
    }

    return options[index];
  }

  private clearFilter() {
    const options = this.getOptions();
    options.forEach(opt => {
      opt.visible = true;
    });

    this.isFiltering = false;
  }

  /**
   * Filter options based on typed text
   *
   * @param find
   * @returns
   */
  private filter(find: string) {
    if (find?.length < 3) {
      if (this.isFiltering) {
        this.clearFilter();
      }

      return;
    }

    const options = this.getOptions();

    find = find.toLowerCase();
    options.forEach(opt => {
      const text = (opt.search ?? opt.label)?.toLowerCase();
      if (text !== undefined) {
        opt.visible = text.indexOf(find) >= 0;
      }
    });

    this.isFiltering = true;
  }

  @Listen('selected', { capture: true })
  handleItemSelected(event: CustomEvent<number>) {
    const option = this.getOption(event.detail);
    if (option != undefined) {
      this.selectElement.value = option.value;
      this.selected[0] = option;
    }

    this.isOpen = false;
    this.isEditing = false;
  }

  handleInputEntry = (/* event: KeyboardEvent */) => {
    if (this.search) {
      this.filter(this.inputElement.value);
    }
  };

  handleOpen = () => {
    this.isOpen = !this.isOpen;
    this.isEditing = true;
  };

  /**
   *
   *
   * @returns void
   */
  async connectedCallback(): Promise<void> {
    const children = this.getOptions();
    children.forEach((c, i) => (c.index = i));
  }

  render() {
    /**
     * When in edit mode, we disable tabindex within the control so that keyboard actions
     * like tab and shift-tab move correctly to the next form control.
     */
    const tabindex = this.isEditing ? -1 : 0;

    /**
     * The control is in edit mode if explicitly editing or there is a non-empty value or explicitly in error
     */
    const edit = this.isEditing || this.value?.length > 0 || this.isDirty || this.isValid == false;

    /**
     *
     */
    let selected;
    if (this.selected.length == 1) {
      selected = this.selected[0].label;
    } else if (this.selected.length > 1) {
      selected = `${this.selected.length} selected`;
    }

    const classes = {
      'dc-ddl-disabled': this.disabled,
      'dc-ddl-dirty': this.isDirty,
      'dc-ddl-edit': edit,
      'dc-ddl-open': this.isOpen,
      'dc-ddl-view': !edit,
      'dc-ddl-selected': selected !== undefined,
      'dc-ddl': true,
    };

    return (
      <Host>
        <div class={classes}>
          <div class="dc-ddl-label-wrap" onClick={this.handleOpen}>
            <label class="dc-ddl-label" htmlFor={this.inputId} tabIndex={tabindex}>
              {this.label}
            </label>
            <span class="dc-ddl-selected-text">{selected}</span>
            <Chevron class="dc-ddl-chevron-down" />
          </div>

          <div class="dc-ddl-list">
            <input class="dc-ddl-input" type="text" placeholder="Select item..." onKeyUp={this.handleInputEntry} ref={el => this.setInputElementRef(el)}></input>

            <div class="dc-ddl-options">
              <slot></slot>
            </div>

            <span onClick={this.handleOpen}>
              <Chevron class="dc-ddl-chevron-up" />
            </span>
          </div>
        </div>

        <select class="dc-ddl-select" ref={el => this.setSelectElementRef(el)} name={this.name} form={this.form}></select>
      </Host>
    );
  }
}
