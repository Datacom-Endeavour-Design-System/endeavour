import { Component, Host, h, Prop, State, Method, Element, Listen, Fragment } from '@stencil/core';
import { randomString } from '../../utils';
import { FormControl } from '../form-control';
import { DatacomDropdownOptionElement } from './datacom-dropdown-option';
import { Chevron, Clear } from '../../common/images/icons';

export type DatacomDropDownVariantType = 'select' | 'combo';
type DropdownSize = 'small' | 'large';

/**
 * HTML Select component with styled options.
 *
 * The multiple select option unlike the standard select is within the drop down.
 * Multiple items are selected with simple click rather than requiring ctrl+click
 */
@Component({
  tag: 'datacom-dropdown',
  styleUrl: 'datacom-dropdown.css',
  scoped: true,
})
export class DatacomDropdown implements FormControl {
  /**
   * HTML element input properties
   */
  @Prop() name: string;
  @Prop({ mutable: true }) value?: string;
  @Prop() placeholder?: string = 'Select item(s)';
  @Prop() disabled? = false;
  @Prop() readonly? = false;
  @Prop() required? = false;
  @Prop() form?: string;
  @Prop() title: string;

  /**
   * Drop down variant
   */
  @Prop() variant: DatacomDropDownVariantType = 'select';

  /**
   * Drop down size
   */
  @Prop() size: DropdownSize = 'large';

  /**
   * Enable type ahead search for options.
   */
  @Prop() search = true;

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
  @Prop({ attribute: 'autovalidate' }) autoValidate? = true;

  /**
   * Error mutable state will re-render the control to display error message, icon and focus border
   */
  @State() isInError = false;

  /**
   * Is the drop down list displayed
   */
  @State() isOpen = false;

  /**
   * Host element
   */
  @Element() private host: HTMLElement;

  /**
   * The html select element used in form submit
   */
  private selectElement: HTMLSelectElement;

  /**
   * The text input to filter options
   */
  private searchInputElement: HTMLInputElement;

  /**
   * The nearest form for the component
   */
  private formElement: HTMLFormElement;

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

  /**
   * List of selected option indexes
   */
  @State() selected: number[] = [];

  /**
   * Get a list of select values
   *
   * @returns string[]
   */
  @Method()
  async getSelected(): Promise<string[]> {
    return this.selected.map(ind => this.getOption(ind).value);
  }

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
   * Capture input element reference on mount. The element is used
   * for form submission.
   *
   * @param el
   */
  private setSelectElementRef(el: HTMLSelectElement): void {
    this.selectElement = el;
  }

  /**
   * Get reference to text input for option searching
   *
   * @param el
   */
  private setInputElementRef(el: HTMLInputElement): void {
    this.searchInputElement = el;
  }

  /**
   * Cache of children options
   */
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

    this.host.querySelectorAll<DatacomDropdownOptionElement>('datacom-option').forEach(t => this.options.push(t));

    return this.options;
  }

  /**
   * Get a single child option by index number
   *
   * @param index
   * @returns
   */
  private getOption(index: number): DatacomDropdownOptionElement {
    const options = this.getOptions();
    if (index < 0 || index > options.length - 1) {
      return undefined;
    }

    return options[index];
  }

  /**
   * Clear the search filter and redisplay all options
   */
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

  /**
   * Close the drop down list
   */
  private close() {
    this.isOpen = false;
    this.clearFilter();

    if (this.searchInputElement !== undefined) {
      this.searchInputElement.value = '';
    }

    if (this.selected.length > 0) {
      this.isInError = false;
    }
  }

  /**
   * Open the drop down list
   */
  private open() {
    if (this.disabled) {
      return;
    }

    this.isOpen = true;
    if (this.searchInputElement !== undefined) {
      setTimeout(() => this.searchInputElement.focus(), 100);
    }
  }

  /**
   * Select an item from the drop down list.
   *
   * The behaviour varies depending on the 'multiple' property.
   *
   * @param index index of option selected or deselected
   * @param withToggle toggle the selected state
   */
  private select(index: number, withToggle = true) {
    const option = this.getOption(index);

    if (option == undefined) {
      console.error(`Option ${index} not found`);
      return;
    }

    if (withToggle) {
      if (this.variant == 'combo') {
        if (option.selected) {
          this.selected = this.selected.filter(k => k !== index);
          option.selected = false;
        } else {
          this.selected = [...this.selected, index];
          option.selected = true;
        }
      } else {
        if (this.selected.length == 1 && this.selected[0] == index) {
          this.selected = [];
        } else {
          this.selected = [index];
        }
      }
    }

    /**
     * For each selected item add an <option> element to the select.
     * This is easier than selectively removing the item from the DOM if deselected.
     */
    this.selectElement.replaceChildren();
    this.selected.forEach(ind => {
      const opt = this.getOption(ind);
      const node = document.createElement('option');

      node.value = opt.value;
      node.innerText = opt.label;
      node.selected = true;
      this.selectElement.appendChild(node);
    });

    // Close the drop down if just single select mode
    if (this.variant == 'select') {
      this.close();
    }
  }

  /**
   * Clear all selected items
   */
  private clear() {
    while (this.selected.length > 0) {
      this.select(this.selected[0]);
    }
  }

  /**
   * *** Event listeners ***
   */

  /**
   * Handle the custom select/deselect event from the option component.
   *
   * @param event
   */
  @Listen('selected', { capture: true })
  @Listen('deselected', { capture: true })
  handleItemSelected(event: CustomEvent<number>) {
    this.select(event.detail);
  }

  /**
   * Handle any click events outside the control and close the dropdown.
   */
  @Listen('click', { target: 'document' })
  handleOutsideClick(event: MouseEvent) {
    if (this.disabled) {
      return;
    }

    if (!this.host.contains(event.target as Node)) {
      this.close();
    }
  }

  /**
   * Handle key entry in to the search input and filter options
   */
  handleInputEntry = (event: KeyboardEvent) => {
    if (event.code == 'Escape') {
      this.close();
      return;
    }

    if (this.search) {
      this.filter(this.searchInputElement.value);
    }
  };

  /**
   * Handle opening and closing of options drop down from click on component
   *
   * @param event
   */
  handleClick = (event: MouseEvent) => {
    if (this.isOpen && event.target !== this.searchInputElement) {
      this.close();
    } else if (!this.isOpen) {
      this.open();
    }
  };

  /**
   * Watch for form submit and prevent if the input is invalid
   *
   * @param event
   */
  handleFormSubmit = async (event: SubmitEvent) => {
    if (!(await this.checkValidity())) {
      this.isInError = true;

      /**
       * Stop the form submit and show errors
       */
      event.preventDefault();
    }
  };

  /**
   * Handle key press on the control in a closed state should open the dropdown list
   *
   * @param event
   */
  handleKeyUp = (event: KeyboardEvent) => {
    if (this.disabled) {
      return;
    }

    if (event.key === 'Enter' || event.key === 'Return' || event.key == ' ') {
      this.open();
      return;
    }

    if (event.key === 'Delete' || event.key === 'Backspace') {
      this.clear();
      return;
    }

    /**
     * If escape bubbles up from the option list when open then close drop down
     */
    if (event.key === 'Escape' && this.isOpen) {
      this.close();
      return;
    }
  };

  /**
   * Handle clear selection event
   *
   * @param event
   * @returns
   */
  handleClear = (event: MouseEvent) => {
    if (this.disabled) {
      return;
    }

    this.clear();

    event.stopPropagation();
  };

  /**
   * *** Component lifecycle methods ***
   */

  /**
   * Set up the state of children options
   *
   * @returns void
   */
  async componentWillLoad(): Promise<void> {
    const children = this.getOptions();
    children.forEach((option, ind) => {
      option.index = ind;
      if (option.selected) {
        this.selected.push(ind);
      }
    });
  }

  /**
   * After the first render show any selected state
   *
   * @returns void
   */
  async componentDidLoad(): Promise<void> {
    const children = this.getOptions();

    children.forEach((option, ind) => {
      if (option.selected) {
        this.select(ind, false);
      }
    });

    if (this.autoValidate) {
      this.formElement = this.selectElement.closest('form');

      if (this.formElement !== undefined && this.formElement !== null) {
        this.formElement.noValidate = true;
        this.formElement.addEventListener('submit', this.handleFormSubmit);
      }
    }
  }

  /**
   * When removed from the DOM, remove any event listeners
   */
  disconnectedCallback() {
    if (this.formElement !== undefined && this.formElement !== null) {
      this.formElement.removeEventListener('submit', this.handleFormSubmit);
    }
  }

  /**
   * Render view control
   *
   * @returns JSX Fragment
   */
  private renderViewControl() {
    let selectedContent;
    let clearBtn;

    if (this.variant == 'combo') {
      if (this.selected.length > 0) {
        selectedContent = <pre>{this.selected.length}</pre>;
        clearBtn = (
          <span onClick={this.handleClear} class="dc-ddl-clear-btn">
            <Clear class="dc-ddl-clear-icon" />
          </span>
        );
      }
    } else if (this.selected.length == 1) {
      const selected = this.getOption(this.selected[0]);
      const props = {
        src: selected.src,
        icon: selected.icon,
        label: selected.label,
        mode: 'standalone',
        selected: false,
        tabIndex: -1,
      };

      selectedContent = <datacom-option {...props}></datacom-option>;
    }

    return (
      <Fragment>
        <label class="dc-ddl-label" htmlFor={this.inputId} tabIndex={-1}>
          {this.label}
        </label>

        <span class="dc-ddl-selected-option" tabIndex={-1}>
          {selectedContent}
        </span>

        <div class="dc-ddl-view-btns dc-ddl-buttons">
          {clearBtn}
          <span class="dc-ddl-open-btn">
            <Chevron class="dc-ddl-chevron-down" />
          </span>
        </div>
      </Fragment>
    );
  }

  /**
   * Render a dropdown list with search input for simple select, or
   * a combo droplist with a selection summary
   *
   * @returns JSX Fragment
   */
  renderDropdown() {
    if (this.variant == 'combo') {
      return (
        <Fragment>
          <div class="dc-ddl-list-area">
            {this.selected.length == 0 && <div class="dc-ddl-combo-placeholder">Select item(s)</div>}
            {this.selected.length > 0 && (
              <div class="dc-ddl-combo-count">
                <pre>{this.selected.length}</pre>&nbsp;selected
              </div>
            )}

            <div class="dc-ddl-list-btns dc-ddl-buttons">
              <span onClick={this.handleClear} class="dc-ddl-clear-btn">
                <Clear class="dc-ddl-clear-icon" />
              </span>

              <span class="dc-ddl-close-btn">
                <Chevron class="dc-ddl-chevron-up" />
              </span>
            </div>
          </div>

          <div class="dc-ddl-options" tabindex={-1}>
            <slot></slot>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <div class="dc-ddl-list-area">
            <input class="dc-ddl-input" type="text" tabIndex={0} placeholder={this.placeholder} onKeyUp={this.handleInputEntry} ref={el => this.setInputElementRef(el)}></input>

            <div class="dc-ddl-list-btns dc-ddl-buttons">
              <span class="dc-ddl-close-btn">
                <Chevron class="dc-ddl-chevron-up" />
              </span>
            </div>
          </div>

          <div class="dc-ddl-options" tabindex={-1}>
            <slot></slot>
          </div>
        </Fragment>
      );
    }
  }

  render() {
    if (!['select', 'combo'].includes(this.variant)) {
      console.warn(`Variant ${this.variant} is not valid. Defaulting to 'select'`);
      this.variant = 'select';
    }

    /**
     * When in edit mode, we disable tabindex within the control so that keyboard actions
     * like tab and shift-tab move correctly to the next form control.
     */
    //const tabindex = this.isEditing ? -1 : 0;

    /**
     * Is there a selected item to display
     */
    const selected = this.selected?.length > 0;

    /**
     * The control is in error if its state has change to error (isInError) and has
     * been touched by the user (isDirty) or it is explicitly set as invalid (isInvalid)
     */
    const error = this.isInError || this.isValid == false;

    const classes = {
      'dc-ddl-disabled': this.disabled,
      'dc-ddl-dirty': this.isDirty,
      'dc-ddl-open': this.isOpen,
      'dc-ddl-view': !selected,
      'dc-ddl-selected': selected,
      'dc-ddl-error': error,
      [`dc-ddl-size-${this.size}`]: true,
      'dc-ddl': true,
    };

    return (
      <Host>
        <div class={classes} onClick={this.handleClick} onKeyUp={this.handleKeyUp}>
          <div class="dc-ddl-control" tabIndex={!this.disabled ? 0 : -1}>
            {this.renderViewControl()}
          </div>

          <p tabIndex={-1} class="dc-ddl-error-msg">
            {this.message}
          </p>

          <div class="dc-ddl-list" tabIndex={-1}>
            {this.renderDropdown()}
          </div>
        </div>

        <select class="dc-ddl-select" ref={el => this.setSelectElementRef(el)} name={this.name} multiple={true} required={this.required} form={this.form}></select>
      </Host>
    );
  }
}
