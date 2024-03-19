import { Component, Prop, h, State, Host, Listen, Watch } from '@stencil/core';
import { debounce, randomString } from '../../utils';
import { Calendar } from '../../utils/calendar';
import { getSvg } from '../../common/images';
import { format, isMatch, parse } from 'date-fns';

@Component({
  tag: 'datacom-datepicker',
  styleUrl: 'datacom-datepicker.css',
  scoped: true,
})
export class DatacomDatepicker {
  private datepickerElement: HTMLDivElement;
  private currentDate = new Date();
  private focusedDate: Date;
  private daysOfPrevMonthCount: number;
  private daysOfNextMonthCount: number;
  private inputId = randomString();
  private dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  /**
   *
   */
  @Prop() required? = false;
  /**
   *
   */
  @Prop() disabled? = false;
  /**
   *
   */
  @Prop() placeholder?: string;
  /**
   *
   */
  @Prop() dateFormat?: string = 'dd/MM/yyyy';
  /**
   *
   */
  @Prop({ mutable: true }) selectedDate?: Date;
  /**
   *
   */
  @Prop({ mutable: true }) startDate?: Date;
  /**
   *
   */
  @Prop({ mutable: true }) endDate?: Date;
  /**
   *
   */
  @Prop() label?: string;
  /**
   *
   */
  @Prop() range?: boolean = false;
  /**
   *
   */
  @Prop() message?: string;

  /**
   *
   */
  @State() inputValue = '';
  /**
   *
   */
  @State() calendarDays: number[];
  /**
   *
   */
  @State() date = new Date(new Date().setHours(0, 0, 0, 0));
  /**
   *
   */
  @State() isEditing = false;
  /**
   *
   */
  @State() isInvalid = false;
  /**
   *
   */
  @State() isOpen = false;
  /**
   *
   */
  @State() isSelecting = false;
  /**
   *
   */
  @State() mouseoverDate: Date;

  @Watch('inputValue')
  watchInputValue(newValue: string): void {
    const value = newValue.replace(/\s+/g, '');
    this.isInvalid = false;
    if (this.range) {
      const startDate = value.substring(0, 10);
      const endDate = value.substring(11);
      if (!this.isValidDate(startDate) || !this.isValidDate(endDate)) {
        this.isInvalid = true;
      }
    } else {
      const selectedDate = value.substring(0, 10);
      if (!this.isValidDate(selectedDate)) {
        this.isInvalid = true;
      }
    }
  }

  @Watch('isOpen')
  watchCalendarToggle(newValue: boolean): void {
    if (newValue) {
      setTimeout(() => {
        const activeDate = this.datepickerElement.querySelector(
          '.dc-datepicker-active',
        ) as HTMLButtonElement;
        if (this.inputValue === '') {
          activeDate.focus();
          this.focusedDate = new Date(activeDate.name);
        } else {
          if (this.range) {
            const startDate = this.datepickerElement.querySelector(
              '.dc-datepicker-start-date',
            ) as HTMLButtonElement;
            startDate.focus();
          } else {
            const selectedDate = this.datepickerElement.querySelector(
              '.dc-datepicker-selected',
            ) as HTMLButtonElement;
            selectedDate.focus();
          }
        }
      }, 100);
    } else {
      this.setCalendarDetails();
      setTimeout(() => {
        const calendarShowElement = this.datepickerElement.querySelector(
          '.dc-datepicker-calendar-show',
        ) as HTMLButtonElement;
        calendarShowElement.focus();
      }, 100);
    }
  }

  @Listen('click', { target: 'document' })
  onClick(event: Event): void {
    if (!this.datepickerElement.contains(event.target as Node)) {
      if (this.isOpen) {
        this.toggleCalendar();
      }
      this.isEditing =
        this.selectedDate !== undefined || this.startDate !== undefined;
    }
  }

  @Listen('keydown', { capture: true })
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this.moveDateFocus('up');
        break;
      case 'ArrowDown':
        this.moveDateFocus('down');
        break;
      case 'ArrowLeft':
        this.moveDateFocus('left');
        break;
      case 'ArrowRight':
        this.moveDateFocus('right');
        break;
      case 'Tab':
        this.repeatFocusWithinDatepicker();
        break;
      case 'Escape':
        this.toggleCalendar();
        break;
      default:
        break;
    }
  }

  componentWillLoad() {
    this.setCalendarDetails();
    this.setInputValue();
  }

  private setCalendarDetails = (): void => {
    const month = this.date.getMonth();
    const year = this.date.getFullYear();
    const calendar = new Calendar(year, month);

    this.calendarDays = calendar.getCalendarDays();
    this.daysOfPrevMonthCount = calendar.getDaysOfPrevMonthCount();
    this.daysOfNextMonthCount =
      calendar.daysInCalendar - calendar.getDaysOfNextMonthCount();
  };

  private repeatFocusWithinDatepicker = (): void => {
    setTimeout(() => {
      if (this.isOpen) {
        const activeElement = document.activeElement;
        const firstElement = this.datepickerElement.querySelector(
          '.dc-datepicker-prev',
        ) as HTMLButtonElement;
        const lastElement = this.datepickerElement.querySelector(
          '.dc-datepicker-calendar-hide',
        ) as HTMLButtonElement;
        const tabLoopStart = this.datepickerElement.querySelector(
          '.dc-datepicker-tab-loop-start',
        ) as HTMLDivElement;
        const tabLoopEnd = this.datepickerElement.querySelector(
          '.dc-datepicker-tab-loop-end',
        ) as HTMLDivElement;
        if (tabLoopStart === activeElement) {
          lastElement.focus();
        }
        if (tabLoopEnd === activeElement) {
          firstElement.focus();
        }

        const elementName = activeElement.getAttribute('name');
        if (activeElement.getAttribute('name') !== null) {
          this.focusedDate = new Date(elementName);
        } else {
          this.focusedDate = undefined;
        }
      }
    }, 100);
  };

  private moveDateFocus = (
    direction: 'up' | 'down' | 'left' | 'right',
  ): void => {
    if (this.focusedDate instanceof Date) {
      let dateName = this.dateToLocaleDateString(this.focusedDate, 'en-US');
      let dateElement = this.datepickerElement.querySelector(
        `button[name="${dateName}"]`,
      ) as HTMLButtonElement;
      dateElement.tabIndex = -1;
      dateElement.blur();
      switch (direction) {
        case 'up':
          dateName = this.dateToLocaleDateString(
            new Date(this.focusedDate.setDate(this.focusedDate.getDate() - 7)),
            'en-US',
          );
          break;
        case 'down':
          dateName = this.dateToLocaleDateString(
            new Date(this.focusedDate.setDate(this.focusedDate.getDate() + 7)),
            'en-US',
          );
          break;
        case 'left': {
          dateName = this.dateToLocaleDateString(
            new Date(this.focusedDate.setDate(this.focusedDate.getDate() - 1)),
            'en-US',
          );
          dateElement = this.datepickerElement.querySelector(
            `button[name="${dateName}"]`,
          ) as HTMLButtonElement;
          break;
        }
        case 'right':
          dateName = this.dateToLocaleDateString(
            new Date(this.focusedDate.setDate(this.focusedDate.getDate() + 1)),
            'en-US',
          );
          break;
        default:
          break;
      }

      const date = new Date(this.date);
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      if (firstDay > this.focusedDate) {
        this.switchToPreviousMonth();
      }
      if (lastDay < this.focusedDate) {
        this.switchToNextMonth();
      }
      setTimeout(() => {
        dateElement = this.datepickerElement.querySelector(
          `button[name="${dateName}"]`,
        ) as HTMLButtonElement;
        if (dateElement instanceof HTMLButtonElement) {
          dateElement.tabIndex = 0;
          dateElement.focus();
        }
      }, 100);
    }
  };

  private dayMouseoverHandler = (event: MouseEvent): void => {
    const el = event.target as HTMLButtonElement;
    if (this.isSelecting) {
      this.mouseoverDate = new Date(el.name);
    }
  };

  private daySelectHandler = (day: number): void => {
    const date = new Date(this.date).setDate(day);
    if (this.range) {
      if (this.isSelecting && this.startDate < new Date(date)) {
        this.endSelection(new Date(date));
        this.toggleCalendar();
      } else {
        this.startSelection(new Date(date));
      }
    } else {
      this.selectedDate = new Date(date);
      this.toggleCalendar();
    }
    this.setInputValue();
  };

  private toggleCalendar = (): void => {
    this.isOpen = !this.isOpen;
  };

  private dateFocusHandler = (): void => {
    this.isEditing = true;
    if (this.isOpen) {
      this.toggleCalendar();
    }
  };

  private dateBlurHandler = (): void => {
    if (this.inputValue === '') {
      this.isEditing = false;
    }
  };

  private yearInputHandler = (event: InputEvent): void => {
    const el = event.target as HTMLInputElement;
    this.changeYear(+el.value);
  };

  private dateInputHandler = (event: InputEvent): void => {
    const el = event.target as HTMLInputElement;
    this.debouncedDateInput(el.value.replace(/\s+/g, ''));
  };

  private debouncedDateInput = debounce((newValue: string) => {
    if (this.range) {
      const startDate = newValue.substring(0, 10);
      const endDate = newValue.substring(11);
      let parsedStartDate: Date;
      let parsedEndDate: Date;
      if (this.isValidDate(startDate)) {
        parsedStartDate = parse(startDate, this.dateFormat, new Date());
        this.startDate = parsedStartDate;
      } else {
        this.startDate = undefined;
        this.endDate = undefined;
      }
      if (this.isValidDate(endDate)) {
        parsedEndDate = parse(endDate, this.dateFormat, new Date());
        if (parsedStartDate > parsedEndDate) {
          this.endDate = parsedStartDate;
        } else {
          this.endDate = parsedEndDate;
        }
      } else {
        this.endDate = undefined;
      }
    } else {
      const selectedDate = newValue.substring(0, 10);
      if (this.isValidDate(selectedDate)) {
        this.selectedDate = parse(selectedDate, this.dateFormat, new Date());
      } else {
        this.selectedDate = undefined;
      }
    }
    this.setInputValue(newValue);
  }, 500);

  private setInputValue = (value = ''): void => {
    if (
      this.range &&
      this.startDate !== undefined &&
      this.endDate !== undefined
    ) {
      this.inputValue = `${format(this.startDate, this.dateFormat)} - ${format(
        this.endDate,
        this.dateFormat,
      )}`;
      this.date = this.startDate;
    } else if (
      this.range &&
      this.startDate !== undefined &&
      this.endDate === undefined
    ) {
      this.inputValue = format(this.startDate, this.dateFormat);
      this.date = this.startDate;
    } else if (this.selectedDate !== undefined) {
      this.inputValue = format(this.selectedDate, this.dateFormat);
      this.date = this.selectedDate;
    } else {
      this.inputValue = value;
    }
  };

  private isValidDate = (date: string): boolean => {
    return isMatch(date, this.dateFormat);
  };

  private switchToPreviousMonth = (): void => {
    const date = new Date(this.date);
    this.date = new Date(date.setMonth(date.getMonth() - 1));
    this.setCalendarDetails();
  };

  private switchToNextMonth = (): void => {
    const date = new Date(this.date);
    this.date = new Date(date.setMonth(date.getMonth() + 1));
    this.setCalendarDetails();
  };

  private changeYear = (year: number): void => {
    const date = new Date(this.date);
    this.date = new Date(date.setFullYear(year));
    this.setCalendarDetails();
  };

  private startSelection = (date: Date): void => {
    this.isSelecting = true;
    this.startDate = date;
    this.endDate = undefined;
    this.mouseoverDate = undefined;
  };

  private endSelection = (date: Date): void => {
    this.isSelecting = false;
    this.endDate = date;
  };

  private getDayClasses = (day: number, index: number): string => {
    const classDigit = [];

    if (this.isToday(day, index)) {
      classDigit.push('dc-datepicker-active');
    }

    if (this.selectedDate && this.isSelectedDay(day, index)) {
      classDigit.push('dc-datepicker-selected');
    }

    if (this.startDate && this.isStartDate(day)) {
      classDigit.push('dc-datepicker-start-date');
    }

    if (this.endDate && this.isEndDate(day)) {
      classDigit.push('dc-datepicker-end-date');
    }

    if (this.startDate && this.endDate && this.isInBetween(day)) {
      classDigit.push('dc-datepicker-in-between');
    }

    if (this.mouseoverDate && this.isInRange(day)) {
      classDigit.push('dc-datepicker-in-range');
    }

    return classDigit.join(' ');
  };

  private isToday = (day: number, index: number): boolean => {
    const date = new Date(this.date).setDate(day);
    return (
      this.currentDate.toDateString() === new Date(date).toDateString() &&
      !(index < this.daysOfPrevMonthCount || index >= this.daysOfNextMonthCount)
    );
  };

  private isSelectedDay = (day: number, index: number) => {
    const date = new Date(this.date).setDate(day);
    return (
      this.selectedDate.toDateString() === new Date(date).toDateString() &&
      !(index < this.daysOfPrevMonthCount || index >= this.daysOfNextMonthCount)
    );
  };

  private isStartDate = (day: number) => {
    const date = new Date(this.date).setDate(day);
    return this.startDate.toDateString() === new Date(date).toDateString();
  };

  private isEndDate = (day: number) => {
    const date = new Date(this.date).setDate(day);
    return this.endDate.toDateString() === new Date(date).toDateString();
  };

  private isInBetween = (day: number) => {
    const date = new Date(this.date).setDate(day);
    return this.startDate < new Date(date) && new Date(date) < this.endDate;
  };

  private isInRange = (day: number) => {
    const date = new Date(this.date).setDate(day);
    return (
      this.startDate <= new Date(date) && new Date(date) <= this.mouseoverDate
    );
  };

  private getDayName = (day: number): string => {
    const date = new Date(this.date);
    return this.dateToLocaleDateString(new Date(date.setDate(day)), 'en-US');
  };

  private getDayTabIndex = (day: number, index: number): number => {
    let tabIndex = -1;

    if (this.inputValue === '') {
      if (this.isToday(day, index)) {
        tabIndex = 0;
      }
    } else {
      if (this.selectedDate && this.isSelectedDay(day, index)) {
        tabIndex = 0;
      }

      if (this.startDate && this.isStartDate(day)) {
        tabIndex = 0;
      }
    }

    return tabIndex;
  };

  private dateToLocaleDateString(
    date?: Date,
    locale: string = 'default',
    options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
  ): string {
    return date.toLocaleDateString(locale, options);
  }

  render() {
    const classes = {
      'dc-datepicker-container': true,
      'dc-datepicker-open-calendar': this.isOpen,
      'dc-datepicker-edit':
        this.isEditing ||
        this.isInvalid ||
        this.isOpen ||
        this.inputValue !== '',
      'dc-datepicker-error': this.isInvalid,
      'dc-datepicker-disabled': this.disabled,
    };

    return (
      <Host>
        <div class={classes} ref={(el) => (this.datepickerElement = el)}>
          <div class="dc-datepicker">
            <div class="dc-datepicker-date-input-wrapper">
              <label htmlFor={this.inputId}>{this.label}</label>
              <input
                type="text"
                id={this.inputId}
                class="dc-datepicker-input"
                name={this.inputId}
                required={this.required}
                disabled={this.disabled}
                placeholder={this.placeholder}
                onFocus={this.dateFocusHandler}
                onInput={this.dateInputHandler}
                onBlur={this.dateBlurHandler}
                value={this.inputValue}
              />
            </div>
            <div
              class="dc-datepicker-tab-loop-start"
              tabIndex={this.isOpen ? 0 : -1}></div>
            {this.isOpen && (
              <div class="dc-datepicker-calendar">
                <div class="dc-datepicker-header">
                  <button
                    class="dc-datepicker-prev"
                    onClick={this.switchToPreviousMonth}>
                    {getSvg('chevron', { class: 'dc-datepicker-prev-icon' })}
                  </button>
                  <div class="dc-datepicker-month-year-container">
                    <span class="dc-datepicker-month">
                      {this.dateToLocaleDateString(this.date, 'default', {
                        month: 'long',
                      })}
                    </span>
                    <input
                      class="dc-datepicker-year-input"
                      type="number"
                      onInput={this.yearInputHandler}
                      value={this.date.getFullYear()}
                    />
                  </div>
                  <button
                    class="dc-datepicker-next"
                    onClick={this.switchToNextMonth}>
                    {getSvg('chevron', { class: 'dc-datepicker-next-icon' })}
                  </button>
                </div>
                <div class="dc-datepicker-days">
                  {this.dayNames.map((dayName) => (
                    <span>{dayName}</span>
                  ))}
                </div>
                <div class="dc-datepicker-dates">
                  {this.calendarDays.map((day, index) => {
                    const dateClasses = this.getDayClasses(day, index);
                    if (
                      index < this.daysOfPrevMonthCount ||
                      index >= this.daysOfNextMonthCount
                    ) {
                      return (
                        <button class="dc-datepicker-disabled" tabIndex={-1}>
                          {day}
                        </button>
                      );
                    } else {
                      return (
                        <button
                          class={dateClasses}
                          tabIndex={this.getDayTabIndex(day, index)}
                          name={this.getDayName(day)}
                          onMouseOver={this.dayMouseoverHandler}
                          onClick={() => this.daySelectHandler(day)}>
                          {day}
                        </button>
                      );
                    }
                  })}
                </div>
              </div>
            )}
            {this.isOpen ? (
              <button
                class="dc-datepicker-calendar-hide"
                onClick={this.toggleCalendar}>
                {getSvg('clear', { class: 'dc-datepicker-calendar-hide-icon' })}
              </button>
            ) : (
              <button
                class="dc-datepicker-calendar-show"
                onClick={this.toggleCalendar}
                disabled={this.disabled}>
                {getSvg('calendar', {
                  class: 'dc-datepicker-calendar-show-icon',
                })}
              </button>
            )}
            <div
              class="dc-datepicker-tab-loop-end"
              tabIndex={this.isOpen ? 0 : -1}></div>
          </div>
          <p tabIndex={-1} class="dc-datepicker-error-msg">
            {this.message}
          </p>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomDatepickerElement = HTMLElement & DatacomDatepicker;
