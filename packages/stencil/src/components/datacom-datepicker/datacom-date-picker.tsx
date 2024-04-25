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
import { HTMLDatacomDatePickerCalendarElement } from './datacom-date-picker-calendar';
import { HTMLDatacomDatePickerInputElement } from './datacom-date-picker-input';

@Component({
  tag: 'datacom-date-picker',
  styleUrl: 'datacom-date-picker.css',
  scoped: true,
})
export class DatacomDatePicker {
  private inputElement: HTMLInputElement;
  private formElement: HTMLFormElement;

  @Element() host: HTMLDatacomDatePickerElement;

  @Event({ bubbles: true, composed: true }) changed: EventEmitter<
    Date | Date[]
  >;

  @Prop() name: string;
  @Prop() placeholder?: string;
  @Prop() disabled? = false;
  @Prop() required? = false;
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

  @State() isEditing: boolean = false;
  @State() isError: boolean = false;
  // Accessibility
  @State() focusedDate: Date;
  // Calendar toggle state
  @State() isOpenCalendar = false;

  @Listen('click', { target: 'document' })
  async handleOnClick(event: MouseEvent): Promise<void> {
    if (!this.host.contains(event.target as Node)) {
      if (this.isOpenCalendar) {
        await this.toggleCalendarHandler();
      }
      this.isEditing = isValid(this.selectedDate) || isValid(this.startDate);
    }
  }

  @Listen('inputFocused')
  async handleOnInputFocused(): Promise<void> {
    if (!this.isOpenCalendar) {
      await this.toggleCalendarHandler();
    }
  }

  @Listen('datePickerChanged')
  handleOnInputChanged(event: CustomEvent): void {
    if (event.detail instanceof Array) {
      const [startDate, endDate] = event.detail;
      this.startDate = startDate;
      this.endDate = endDate;
      this.inputElement.value = 'valid date';
    } else {
      this.startDate = undefined;
      this.endDate = undefined;
      this.inputElement.value = '';
    }

    if (isValid(event.detail)) {
      this.selectedDate = event.detail;
      this.inputElement.value = 'valid date';
    } else {
      this.selectedDate = undefined;
      this.inputElement.value = '';
    }

    this.changed.emit(event.detail);
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
        await this.toggleCalendarHandler();
        break;
      default:
        break;
    }
  }

  @Watch('isOpenCalendar')
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
  async watchDates(newDate: Date, _, propName: string): Promise<void> {
    if (
      (propName === 'selectedDate' || propName === 'endDate') &&
      isValid(newDate) &&
      this.isOpenCalendar
    ) {
      await this.toggleCalendarHandler();
    }
  }

  @Watch('isValid')
  async watchIsValid(): Promise<void> {
    if (!this.isOpenCalendar) {
      await this.toggleCalendarHandler();
    }
  }

  @Watch('disabled')
  async watchDisabled(): Promise<void> {
    if (this.isOpenCalendar) {
      await this.toggleCalendarHandler();
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

    const inputElement: HTMLDatacomDatePickerInputElement =
      this.host.querySelector<HTMLDatacomDatePickerInputElement>(
        'datacom-date-picker-input',
      );

    const valid: boolean = await inputElement.checkValidity();

    this.isError = !valid;
  };

  private toggleCalendarHandler = async (
    event?: KeyboardEvent | MouseEvent | CustomEvent,
  ): Promise<void> => {
    if (
      event instanceof MouseEvent ||
      event instanceof KeyboardEvent ||
      event instanceof CustomEvent
    ) {
      event.preventDefault();

      const activeElement: HTMLElement = document.activeElement as HTMLElement;
      activeElement.blur();
    }
    const inputElement: HTMLDatacomDatePickerInputElement =
      this.host.querySelector<HTMLDatacomDatePickerInputElement>(
        'datacom-date-picker-input',
      );
    await inputElement.toggleIsEditing(!this.isOpenCalendar);

    this.isOpenCalendar = !this.isOpenCalendar;
  };

  private loopTabFocus = (): void => {
    setTimeout((): void => {
      const activeElement = document.activeElement;
      if (this.isOpenCalendar) {
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

  private moveDateFocus = async (
    direction: 'up' | 'down' | 'left' | 'right',
  ): Promise<void> => {
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

  render() {
    const classes = {
      'dc-date-picker-container': true,
      'dc-date-picker-open-calendar': this.isOpenCalendar,
      'dc-date-picker-error': this.isError || this.isValid === false,
      'dc-date-picker-disabled': this.disabled,
      'dc-date-picker-required': !this.required,
    };

    const inputProps = {
      placeholder: this.placeholder,
      disabled: this.disabled,
      required: this.required,
      label: this.label,
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
      <Host>
        <div class={classes}>
          <div
            class="dc-date-picker-tab-loop-start"
            tabIndex={this.isOpenCalendar ? 0 : -1}></div>
          <datacom-date-picker-input {...inputProps} />
          <div class="dc-date-picker-calendar-container">
            <datacom-date-picker-calendar {...calendarProps} />
            <div class="dc-date-picker-close-wrapper">
              <datacom-button
                class="dc-date-picker-close"
                variant="secondary"
                size="small"
                onClick={this.toggleCalendarHandler}
                disabled={this.disabled}>
                Close
              </datacom-button>
            </div>
          </div>
          <p tabIndex={-1} class="dc-date-picker-error-msg">
            {this.message}
          </p>
        </div>
        <div
          class="dc-date-picker-tab-loop-end"
          tabIndex={this.isOpenCalendar ? 0 : -1}></div>

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
