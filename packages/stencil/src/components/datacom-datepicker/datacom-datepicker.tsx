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
import { HTMLDatacomDatepickerCalendarElement } from './datacom-datepicker-calendar';
import { HTMLDatacomDatepickerInputElement } from './datacom-datepicker-input';

@Component({
  tag: 'datacom-datepicker',
  styleUrl: 'datacom-datepicker.css',
  scoped: true,
})
export class DatacomDatepicker {
  @Element() host: HTMLDatacomDatepickerElement;

  @Event({ bubbles: true, composed: true }) changed: EventEmitter<
    Date | Date[]
  >;

  @Prop() placeholder?: string;
  @Prop() disabled? = false;
  @Prop() required? = false;

  @Prop() label?: string;
  @Prop({ mutable: true }) selectedDate?: Date;
  @Prop({ mutable: true }) startDate?: Date;
  @Prop({ mutable: true }) endDate?: Date;
  @Prop() range? = false;
  @Prop() dateFormat? = 'dd/MM/yyyy';
  @Prop() supportedFormat?: string[];
  @Prop() message?: string;
  @Prop({ attribute: 'valid' }) isValid?: boolean;
  @Prop() autoValidate? = true;

  @State() isEditing = false;
  @State() isError = false;
  // Accessibility
  @State() focusedDate: Date;
  // Calendar toggle state
  @State() isOpenCalendar = false;

  @Listen('click', { target: 'document' })
  async handleOnClick(event: MouseEvent): Promise<void> {
    if (
      !this.host.contains(event.target as Node) &&
      typeof this.isValid !== 'boolean'
    ) {
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

  @Listen('datepickerChanged')
  handleOnInputChanged(event: CustomEvent): void {
    if (event.detail instanceof Array) {
      const [startDate, endDate] = event.detail;
      this.startDate = startDate;
      this.endDate = endDate;
    } else {
      this.startDate = undefined;
      this.endDate = undefined;
    }

    if (isValid(event.detail)) {
      this.selectedDate = event.detail;
    } else {
      this.selectedDate = undefined;
    }

    this.changed.emit(event.detail);
  }

  @Listen('inputInvalid')
  handleOnInputInvalid(event: CustomEvent): void {
    this.isError = event.detail;
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
    const inputElement = this.host.querySelector<HTMLInputElement>(
      'datacom-datepicker-input input',
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

  private toggleCalendarHandler = async (
    event?: KeyboardEvent | MouseEvent | CustomEvent,
  ): Promise<void> => {
    if (
      event instanceof MouseEvent ||
      event instanceof KeyboardEvent ||
      event instanceof CustomEvent
    ) {
      event.preventDefault();

      const activeElement = document.activeElement as HTMLElement;
      activeElement.blur();
    }
    const inputElement =
      this.host.querySelector<HTMLDatacomDatepickerInputElement>(
        'datacom-datepicker-input',
      );
    await inputElement.toggleIsEditing(!this.isOpenCalendar);

    this.isOpenCalendar = !this.isOpenCalendar;
  };

  private loopTabFocus = (): void => {
    setTimeout(() => {
      const activeElement = document.activeElement;
      if (this.isOpenCalendar) {
        const firstElement = this.host.querySelector<HTMLInputElement>(
          'datacom-datepicker-input input',
        );
        const lastElement = this.host.querySelector<HTMLButtonElement>(
          '.dc-datepicker-close',
        );
        const tabLoopStart = this.host.querySelector<HTMLDivElement>(
          '.dc-datepicker-tab-loop-start',
        );
        const tabLoopEnd = this.host.querySelector<HTMLDivElement>(
          '.dc-datepicker-tab-loop-end',
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

        const elementName = activeElement.getAttribute('name');
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
    let focusedDate = this.focusedDate;
    if (isValid(focusedDate)) {
      let focusedDateElementName = format(focusedDate, this.dateFormat);
      let dateElement = this.host.querySelector(
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

      const calendarElement =
        this.host.querySelector<HTMLDatacomDatepickerCalendarElement>(
          'datacom-datepicker-calendar',
        );
      await calendarElement.setMouseoverDate(focusedDate);
      const calendarDate = await calendarElement.getCalendarDate();

      const firstDayOfMonth = startOfMonth(calendarDate);
      const lastDayOfMonth = endOfMonth(calendarDate);
      if (isBefore(focusedDate, firstDayOfMonth)) {
        await calendarElement.switchToPreviousMonth();
      }
      if (isAfter(focusedDate, lastDayOfMonth)) {
        await calendarElement.switchToNextMonth();
      }

      setTimeout(() => {
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
      'dc-datepicker-container': true,
      'dc-datepicker-open-calendar': this.isOpenCalendar,
      'dc-datepicker-error': this.isError || this.isValid === false,
      'dc-datepicker-disabled': this.disabled,
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
    };

    const calendarProps = {
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
            class="dc-datepicker-tab-loop-start"
            tabIndex={this.isOpenCalendar ? 0 : -1}></div>
          <datacom-datepicker-input {...inputProps} />
          <datacom-datepicker-calendar {...calendarProps} />
          <button
            class="dc-datepicker-close"
            tabIndex={this.isOpenCalendar ? 0 : -1}
            onClick={this.toggleCalendarHandler}>
            Close Calendar
          </button>
          <p tabIndex={-1} class="dc-datepicker-error-msg">
            {this.message}
          </p>
        </div>
        <div
          class="dc-datepicker-tab-loop-end"
          tabIndex={this.isOpenCalendar ? 0 : -1}></div>
      </Host>
    );
  }
}

export type HTMLDatacomDatepickerElement = HTMLElement & DatacomDatepicker;
