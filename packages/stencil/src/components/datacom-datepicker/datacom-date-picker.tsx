import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import {
  addDays,
  addWeeks,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isValid,
  parse,
  startOfMonth,
  subDays,
  subWeeks,
} from 'date-fns';
import { randomString } from '../../utils';
import { HTMLDatacomDatePickerCalendarElement } from './datacom-date-picker-calendar';
import { HTMLDatacomDatePickerInputElement } from './datacom-date-picker-input';
import { getSvg } from '../../common/images';

type Direction = 'up' | 'down' | 'left' | 'right';
@Component({
  tag: 'datacom-date-picker',
  styleUrl: 'datacom-date-picker.css',
  scoped: true,
})
export class DatacomDatePicker {
  private inputElement: HTMLInputElement;
  private formElement: HTMLFormElement;
  private inputId: string = randomString();

  @Element() host: HTMLDatacomDatePickerElement;

  @Event({ bubbles: true, composed: true }) changed: EventEmitter<
    Date | Date[]
  >;

  @Prop() name: string;
  @Prop() placeholder?: string;
  @Prop() disabled?: boolean = false;
  @Prop() required?: boolean = false;
  @Prop() form?: string;

  @Prop() label?: string;
  @Prop({ mutable: true }) selectedDate?: Date;
  @Prop({ mutable: true }) startDate?: Date;
  @Prop({ mutable: true }) endDate?: Date;
  @Prop() range?: boolean = false;
  @Prop() dateFormat?: string = 'dd/MM/yyyy';
  @Prop() supportedFormat?: string[];
  @Prop() message?: string;
  @Prop({ attribute: 'valid' }) isValid?: boolean;
  @Prop() autoValidate?: boolean = true;

  @State() value: string = '';
  @State() isChanged: boolean = false;
  @State() isEditing: boolean = false;
  @State() isOpen: boolean = false;
  @State() isInError: boolean = false;
  // Accessibility
  @State() focusedDate: Date;

  @Listen('click', { target: 'document' })
  handleOnClick(event: MouseEvent): void {
    if (!this.host.contains(event.target as Node)) {
      if (this.isOpen) {
        this.close();
      }
      this.isEditing = isValid(this.selectedDate) || isValid(this.startDate);
    }
  }

  @Listen('datePickerInputFocused')
  async handleOnInputFocused(): Promise<void> {
    if (!this.isOpen) {
      this.open();
    }
  }

  @Listen('datePickerChanged')
  handleOnDateChanged(event: CustomEvent): void {
    if (event.detail instanceof Array) {
      const [startDate, endDate] = event.detail;
      this.startDate = startDate;
      this.endDate = endDate;
      this.inputElement.value = 'valid start date and end date';
    } else if (isValid(event.detail)) {
      this.selectedDate = event.detail;
      this.inputElement.value = 'valid selected date';
    } else {
      this.selectedDate = undefined;
      this.startDate = undefined;
      this.endDate = undefined;
      this.inputElement.value = '';
    }

    this.changed.emit(event.detail);
  }

  @Listen('datePickerInputChanged')
  async handleOnInputChanged(event: CustomEvent): Promise<void> {
    this.value = event.detail;
  }

  @Listen('keydown', { target: 'document' })
  handleDocumentOnKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        event.preventDefault();
        break;
      default:
        break;
    }
  }

  @Listen('keydown', { capture: true })
  async handleOnKeydown(event: KeyboardEvent): Promise<void> {
    switch (event.key) {
      case 'ArrowUp':
        await this.moveDateFocus('up');
        break;
      case 'ArrowDown':
        await this.moveDateFocus('down');
        break;
      case 'ArrowLeft':
        await this.moveDateFocus('left');
        break;
      case 'ArrowRight':
        await this.moveDateFocus('right');
        break;
      case 'Tab':
        this.loopTabFocus();
        break;
      case 'Escape':
        this.close();
        break;
      default:
        break;
    }
  }

  @Listen('keyup', { capture: true })
  handleKeyUp(event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
        this.open();
        break;
      case 'Escape':
        this.close();
        break;
      default:
        break;
    }
  }

  @Watch('isOpen')
  watchCalendarToggle(open: boolean): void {
    const inputElement: HTMLInputElement =
      this.host.querySelector<HTMLInputElement>(
        'datacom-date-picker-input input',
      );
    if (inputElement instanceof HTMLInputElement) {
      if (!open) {
        inputElement.blur();
      }
    }
  }

  @Watch('selectedDate')
  @Watch('startDate')
  @Watch('endDate')
  watchDates(newDate: Date, _, propName: string): void {
    if (
      isValid(newDate) &&
      (propName === 'selectedDate' || propName === 'endDate')
    ) {
      this.close();
    }
  }

  @Watch('disabled')
  watchDisabled(): void {
    if (this.isOpen) {
      this.close();
    }
  }

  disconnectedCallback(): void {
    if (this.formElement !== undefined && this.formElement !== null) {
      this.formElement.removeEventListener('submit', this.submitForm);
    }
  }

  componentDidLoad(): void {
    this.addNearestFormSubmitEvent();
  }

  private addNearestFormSubmitEvent = (): void => {
    if (this.autoValidate) {
      this.formElement = this.host.closest('form');
      if (this.formElement !== undefined && this.formElement !== null) {
        this.formElement.noValidate = true;
        this.formElement.addEventListener('submit', this.submitForm);
      }
    }
  };

  private submitForm = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();

    const datePickerInput: HTMLDatacomDatePickerInputElement =
      this.host.querySelector<HTMLDatacomDatePickerInputElement>(
        'datacom-date-picker-input',
      );

    const valid: boolean = await datePickerInput.checkValidity();

    this.isInError = !valid;
  };

  private open = (): void => {
    this.isOpen = true;

    setTimeout((): void => {
      const inputElement: HTMLInputElement =
        this.host.querySelector<HTMLInputElement>(
          'datacom-date-picker-input input',
        );
      inputElement.focus();
    }, 100);
  };

  private close = (): void => {
    this.isOpen = false;
  };

  private clear = async (): Promise<void> => {
    this.value = '';
    const datePickerInputElement: HTMLDatacomDatePickerInputElement =
      this.host.querySelector<HTMLDatacomDatePickerInputElement>(
        'datacom-date-picker-input',
      );
    await datePickerInputElement.clearValue();
  };

  // Accessibility
  private loopTabFocus = (): void => {
    setTimeout((): void => {
      const activeElement = document.activeElement;

      if (this.isOpen) {
        const firstElement: HTMLInputElement =
          this.host.querySelector<HTMLInputElement>(
            'datacom-date-picker-input input',
          );
        const lastElement: HTMLButtonElement =
          this.host.querySelector<HTMLButtonElement>('.dc-date-picker-close');
        const tabLoopStart: HTMLDivElement =
          this.host.querySelector<HTMLDivElement>(
            '.dc-date-picker-tab-loop-start',
          );
        const tabLoopEnd: HTMLDivElement =
          this.host.querySelector<HTMLDivElement>(
            '.dc-date-picker-tab-loop-end',
          );
        if (
          tabLoopStart instanceof HTMLDivElement &&
          lastElement instanceof HTMLButtonElement &&
          tabLoopStart === activeElement
        ) {
          lastElement.focus();
        }
        if (
          tabLoopEnd instanceof HTMLDivElement &&
          firstElement instanceof HTMLInputElement &&
          tabLoopEnd === activeElement
        ) {
          firstElement.focus();
        }

        const elementName: string = activeElement.getAttribute('name');
        if (elementName !== null) {
          this.focusedDate = parse(elementName, this.dateFormat, new Date());
        } else {
          this.focusedDate = undefined;
        }
      }
    }, 100);
  };

  private moveDateFocus = async (direction: Direction): Promise<void> => {
    let focusedDate: Date = this.focusedDate;

    if (isValid(focusedDate)) {
      let focusedDateElementName: string = format(focusedDate, this.dateFormat);
      let dateElement: HTMLButtonElement = this.host.querySelector(
        `button[name="${focusedDateElementName}"]`,
      ) as HTMLButtonElement;

      if (dateElement instanceof HTMLButtonElement) {
        dateElement.tabIndex = -1;
        dateElement.blur();
      }

      switch (direction) {
        case 'up':
          focusedDate = subWeeks(this.focusedDate, 1);
          focusedDateElementName = format(focusedDate, this.dateFormat);
          break;
        case 'down':
          focusedDate = addWeeks(this.focusedDate, 1);
          focusedDateElementName = format(focusedDate, this.dateFormat);
          break;
        case 'left': {
          focusedDate = subDays(this.focusedDate, 1);
          focusedDateElementName = format(focusedDate, this.dateFormat);
          break;
        }
        case 'right':
          focusedDate = addDays(this.focusedDate, 1);
          focusedDateElementName = format(focusedDate, this.dateFormat);
          break;
        default:
          break;
      }

      const calendarElement: HTMLDatacomDatePickerCalendarElement =
        this.host.querySelector<HTMLDatacomDatePickerCalendarElement>(
          'datacom-date-picker-calendar',
        );

      await calendarElement.setMouseoverDate(focusedDate);

      const calendarDate: Date = await calendarElement.getCalendarDate();

      const firstDayOfMonth: Date = startOfMonth(calendarDate);
      const lastDayOfMonth: Date = endOfMonth(calendarDate);
      if (isBefore(focusedDate, firstDayOfMonth)) {
        await calendarElement.switchToPreviousMonth();
      }
      if (isAfter(focusedDate, lastDayOfMonth)) {
        await calendarElement.switchToNextMonth();
      }

      setTimeout((): void => {
        dateElement = this.host.querySelector(
          `button[name="${focusedDateElementName}"]`,
        ) as HTMLButtonElement;
        if (dateElement instanceof HTMLButtonElement) {
          dateElement.tabIndex = 0;
          dateElement.focus();
        }
      }, 100);
    }

    this.focusedDate = focusedDate;
  };

  private renderDatePickerControl() {
    const inputProps = {
      placeholder: this.placeholder,
      disabled: this.disabled,
      required: this.required,
      inputId: this.inputId,
      selectedDate: this.selectedDate,
      startDate: this.startDate,
      endDate: this.endDate,
      range: this.range,
      dateFormat: this.dateFormat,
      supportedFormat: this.supportedFormat,
      autoValidate: this.autoValidate,
    };

    const calendarProps = {
      disabled: this.disabled,
      selectedDate: this.selectedDate,
      startDate: this.startDate,
      endDate: this.endDate,
      range: this.range,
      dateFormat: this.dateFormat,
    };

    return (
      <div class="dc-date-picker-control-content">
        <div
          class="dc-date-picker-tab-loop-start"
          tabIndex={this.isOpen ? 0 : -1}></div>
        <datacom-date-picker-input {...inputProps} />
        <div class="dc-date-picker-control-container">
          <datacom-date-picker-calendar {...calendarProps} />
        </div>
        <div class="dc-date-picker-close-container">
          <datacom-button
            class="dc-date-picker-close"
            variant="secondary"
            size="small"
            onClick={this.close}
            disabled={this.disabled}>
            Close
          </datacom-button>
        </div>
        <div
          class="dc-date-picker-tab-loop-end"
          tabIndex={this.isOpen ? 0 : -1}></div>
      </div>
    );
  }

  private renderDatePickerInput() {
    return (
      <div class="dc-date-picker-input-content" onClick={this.open}>
        {this.value}
      </div>
    );
  }

  private renderLabel() {
    return (
      <label
        class="dc-date-picker-label"
        tabIndex={-1}
        htmlFor={this.inputId}
        onClick={this.open}>
        {this.label}
      </label>
    );
  }

  private renderCalendarIcon() {
    return (
      <button
        tabIndex={-1}
        class="dc-date-picker-calendar"
        disabled={this.disabled}
        onClick={this.open}>
        {getSvg('calendar-alt', { class: 'dc-date-picker-calendar-icon' })}
      </button>
    );
  }

  private renderClearIcon() {
    return (
      <button
        tabIndex={0}
        class="dc-date-picker-clear"
        disabled={this.disabled}
        onClick={this.clear}>
        {getSvg('clear', { class: 'dc-date-picker-clear-icon' })}
      </button>
    );
  }

  render() {
    const classes = {
      'dc-date-picker': true,
      'dc-date-picker-open': this.isOpen,
      'dc-date-picker-changed': this.value !== '',
      'dc-date-picker-error': this.isInError || this.isValid === false,
      'dc-date-picker-disabled': this.disabled,
      'dc-date-picker-required': !this.required,
    };

    return (
      <Host>
        <div class={classes}>
          <div class="dc-date-picker-control">
            {this.value !== ''
              ? this.renderClearIcon()
              : this.renderCalendarIcon()}
            {this.renderLabel()}
            {this.renderDatePickerControl()}
          </div>
          <div tabIndex={!this.disabled ? 0 : -1} class="dc-date-picker-input">
            {this.value !== ''
              ? this.renderClearIcon()
              : this.renderCalendarIcon()}
            {this.renderLabel()}
            {this.renderDatePickerInput()}
          </div>
          <p tabIndex={-1} class="dc-date-picker-error-msg">
            {this.message}
          </p>
        </div>

        <input
          class="dc-date-picker-input-hidden"
          ref={(el: HTMLInputElement) => (this.inputElement = el)}
          name={this.name}
          required={this.required}
          form={this.form}
        />
      </Host>
    );
  }
}

export type HTMLDatacomDatePickerElement = HTMLElement & DatacomDatePicker;
