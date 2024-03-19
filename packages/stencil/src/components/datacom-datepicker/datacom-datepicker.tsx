import { Component, Prop, h, State, Host, Listen, Watch } from '@stencil/core';
import { debounce, randomString } from '../../utils';
import { Calendar } from '../../utils/calendar';
import { getSvg } from '../../common/images';
import {
  addDays,
  addMonths,
  addWeeks,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isMatch,
  isValid,
  parse,
  setDate,
  setYear,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns';

@Component({
  tag: 'datacom-datepicker',
  styleUrl: 'datacom-datepicker.css',
  scoped: true,
})
export class DatacomDatepicker {
  private datepickerElement: HTMLDivElement;
  private currentDate = new Date();
  /**
   * Variable to track the focused date. Used for accessibility tabbing of calendar days.
   */
  private focusedDate: Date;
  private daysOfPrevMonthCount: number;
  private daysOfNextMonthCount: number;
  private inputId = randomString();
  private dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  /**
   * HTML element input properties
   */
  @Prop() placeholder?: string;
  @Prop() disabled? = false;
  @Prop() required? = false;

  /**
   * Optional property to handle the label for datepicker.
   */
  @Prop() label?: string;
  /**
   * Optional property to handle the desire date format as value. Default to 'dd/MM/yyyy'.
   */
  @Prop() dateFormat?: string = 'dd/MM/yyyy';
  /**
   * Optional property to handle the end date for single datepicker.
   */
  @Prop({ mutable: true }) selectedDate?: Date;
  /**
   * Optional property to handle the start date of range datepicker.
   */
  @Prop({ mutable: true }) startDate?: Date;
  /**
   * Optional property to handle the start date of range datepicker.
   */
  @Prop({ mutable: true }) endDate?: Date;
  /**
   * Optional property to enable date range datepicker. Default to false as single date picker.
   */
  @Prop() range?: boolean = false;
  /**
   * Optional property to handle the error message.
   */
  @Prop() message?: string;

  /**
   * State that handle the inputted value. Default to empty string.
   */
  @State() inputValue = '';
  /**
   * State that handle all the calendar days.
   */
  @State() calendarDays: number[];
  /**
   * Base date state. Default to start of day of the current date.
   */
  @State() date = startOfDay(new Date());
  /**
   * Flag state to determine the editing mode.
   */
  @State() isEditing = false;
  /**
   * Flag state to determine the validity of the inputted value. Default to false as valid.
   */
  @State() isInvalid = false;
  /**
   * Toggle state for calendar. Default to false or calendar close.
   */
  @State() isOpen = false;
  /**
   * Flag state to determine that the start date was selected and waiting for the end date.
   */
  @State() isSelecting = false;
  /**
   * State that handle the date of the hovered calendar day.
   */
  @State() mouseoverDate: Date;

  @Watch('inputValue')
  watchInputValue(newValue: string): void {
    // Remove all spaces on the inputted value
    const value = newValue.replace(/\s+/g, '');
    // Validate inputted value by date format for both single and range datepicker
    this.isInvalid = false;
    if (this.range) {
      /* Range datepicker validation */
      // Substring the inputted value from 0 to length of date format "dd/MM/yyyy" to get the start date
      const startDate = value.substring(0, this.dateFormat.length);
      // Substring the inputted value from length of date format "dd/MM/yyyy" + 1 to get the end date
      const endDate = value.substring(this.dateFormat.length + 1);
      // Validate
      if (!this.isValidDate(startDate) || !this.isValidDate(endDate)) {
        this.isInvalid = true;
      }
    } else {
      /* Single datepicker validation */
      // Substring the inputted value from 0 to length of date format "dd/MM/yyyy" to get the selected date
      const selectedDate = value.substring(0, this.dateFormat.length);
      // Validate
      if (!this.isValidDate(selectedDate)) {
        this.isInvalid = true;
      }
    }
  }

  @Watch('isOpen')
  watchCalendarToggle(open: boolean): void {
    // Re-instantiate states and set element focus on calendar toggle
    if (open) {
      setTimeout(() => {
        // Instantiate focused element name
        let focusedElementName: string;
        if (this.inputValue === '') {
          // Retrieve active element
          const activeDateElement = this.datepickerElement.querySelector(
            '.dc-datepicker-active',
          ) as HTMLButtonElement;
          // Autofocus active element on the calendar if opened and no inputted value
          activeDateElement.focus();
          // Set active element name sa focused element
          focusedElementName = activeDateElement.name;
        } else {
          /* Range datepicker */
          if (this.range) {
            // Retrieve start date element
            const startDateElement = this.datepickerElement.querySelector(
              '.dc-datepicker-start-date',
            ) as HTMLButtonElement;
            // Autofocus start date element on the calendar if opened and with inputted value
            startDateElement.focus();
            // Set start element name sa focused element
            focusedElementName = startDateElement.name;
          } else {
            /* Single datepicker */
            // Retrieve selected date element
            const selectedDateElement = this.datepickerElement.querySelector(
              '.dc-datepicker-selected',
            ) as HTMLButtonElement;
            // Autofocus selected date element on the calendar if opened and with inputted value
            selectedDateElement.focus();
            // Set selected element name sa focused element
            focusedElementName = selectedDateElement.name;
          }
        }
        // Parse focused element name to date and set to focused date variable
        this.focusedDate = parse(
          focusedElementName,
          this.dateFormat,
          new Date(),
        );
      }, 100);
    } else {
      // Update base date state on calendar close
      if (this.inputValue === '') {
        // Set start of day of the current date if no inputted value
        this.date = startOfDay(new Date());
      } else {
        /* Range datepicker */
        if (this.range) {
          // Set start of day of the chosen start date
          this.date = startOfDay(this.startDate);
        } else {
          /* Single datepicker */
          // Set start of day of the selected date
          this.date = startOfDay(this.selectedDate);
        }
      }
      // Re-initialize calendar details
      this.setCalendarDetails();
      setTimeout(() => {
        // Retrieve calendar show element
        const calendarShowElement = this.datepickerElement.querySelector(
          '.dc-datepicker-calendar-show',
        ) as HTMLButtonElement;
        // Autofocus calendar show button on calendar close
        calendarShowElement.focus();
      }, 100);
    }
  }

  @Listen('click', { target: 'document' })
  onClick(event: Event): void {
    // Close the calendar on clicking outside the component
    if (!this.datepickerElement.contains(event.target as Node)) {
      if (this.isOpen) {
        this.toggleCalendar();
      }
      // Set editing mode if selected date or start date states has date value
      this.isEditing = isValid(this.selectedDate) || isValid(this.startDate);
    }
  }

  @Listen('keydown', { capture: true })
  onKeyDown(event: KeyboardEvent): void {
    // Accessibility: Determine event key
    switch (event.key) {
      case 'ArrowUp':
        // move the focus upward
        this.moveDateFocus('up');
        break;
      case 'ArrowDown':
        // move the focus downward
        this.moveDateFocus('down');
        break;
      case 'ArrowLeft':
        // move the focus left side
        this.moveDateFocus('left');
        break;
      case 'ArrowRight':
        // move the focus right side
        this.moveDateFocus('right');
        break;
      case 'Tab':
        // repeat the focus within the calendar when tabbing
        this.loopFocusWithCalendar();
        break;
      case 'Escape':
        // close the calendar when esc
        this.toggleCalendar();
        break;
      default:
        break;
    }
  }

  componentWillLoad() {
    // Initialize calendar details before render
    this.setCalendarDetails();
    // Set input value before render
    this.setInputValue();
  }

  /**
   * Initialize the calendar details
   */
  private setCalendarDetails = (): void => {
    // Retrieve the month of the base date
    const month = this.date.getMonth();
    // Retrieve the year of the base date
    const year = this.date.getFullYear();
    // Initialize calendar class
    const calendar = new Calendar(year, month);
    // Retrieve calendar days
    this.calendarDays = calendar.getCalendarDays();
    // Retrieve the total fill in days count of previous month
    this.daysOfPrevMonthCount = calendar.getDaysOfPrevMonthCount();
    // Retrieve the total fill in days count of next month
    this.daysOfNextMonthCount =
      calendar.daysInCalendar - calendar.getDaysOfNextMonthCount();
  };

  /**
   * Accessibility:
   * Handle forward focus looping and reverse focus looping within the calendar if open
   *
   * Tab - forward looping
   * Shift + Tab - reverse looping
   */
  private loopFocusWithCalendar = (): void => {
    setTimeout(() => {
      if (this.isOpen) {
        // Retrieve the active element
        const activeElement = document.activeElement;
        // Retrieve change previous month button and assign first element
        const firstElement = this.datepickerElement.querySelector(
          '.dc-datepicker-prev',
        ) as HTMLButtonElement;
        // Retrieve calendar hide button and assign last element
        const lastElement = this.datepickerElement.querySelector(
          '.dc-datepicker-calendar-hide',
        ) as HTMLButtonElement;
        // Retrieve the tab loop start element
        const tabLoopStart = this.datepickerElement.querySelector(
          '.dc-datepicker-tab-loop-start',
        ) as HTMLDivElement;
        // Retrieve the tab loop end element
        const tabLoopEnd = this.datepickerElement.querySelector(
          '.dc-datepicker-tab-loop-end',
        ) as HTMLDivElement;
        // Set the focus to the first element if the active element is equal to tab loop start
        if (tabLoopStart === activeElement) {
          lastElement.focus();
        }
        // Set the focus to the last element if the active element is equal to tab loop start
        if (tabLoopEnd === activeElement) {
          firstElement.focus();
        }

        // Update the focused date when focus changed and the focused element is a calendar day
        const elementName = activeElement.getAttribute('name');
        if (activeElement.getAttribute('name') !== null) {
          this.focusedDate = parse(elementName, this.dateFormat, new Date());
        } else {
          this.focusedDate = undefined;
        }
      }
    }, 100);
  };

  /**
   * Accessibility:
   * Handle directional focus changes in calendar days
   * Update calendar month if the focused element falls to previous or next month
   *
   * ArrowUp - move the focus upward
   * ArrowDown - move the focus downward
   * ArrowLeft - move the left side
   * ArrowRight - move the right side
   *
   * @param direction
   */
  private moveDateFocus = (
    direction: 'up' | 'down' | 'left' | 'right',
  ): void => {
    let focusedDate = this.focusedDate;
    if (isValid(focusedDate)) {
      // Initialize focused date element name
      let focusedDateElementName = format(this.focusedDate, this.dateFormat);
      // Retrieve the focused date element
      let dateElement = this.datepickerElement.querySelector(
        `button[name="${focusedDateElementName}"]`,
      ) as HTMLButtonElement;
      // Update tabIndex attribute of the focused date element to exclude in the accessibility tabbing
      dateElement.tabIndex = -1;
      // Remove focus on focused date element
      dateElement.blur();
      switch (direction) {
        case 'up':
          // Update the focused date 1 week backward
          focusedDate = subWeeks(this.focusedDate, 1);
          // Re-initialize the new focused date element name
          focusedDateElementName = format(focusedDate, this.dateFormat);
          break;
        case 'down':
          // Update the focused date 1 week forward
          focusedDate = addWeeks(this.focusedDate, 1);
          // Re-initialize the new focused date element name
          focusedDateElementName = format(focusedDate, this.dateFormat);
          break;
        case 'left': {
          // Update the focused date on the previous day
          focusedDate = subDays(this.focusedDate, 1);
          // Re-initialize the new focused date element name
          focusedDateElementName = format(focusedDate, this.dateFormat);
          break;
        }
        case 'right':
          // Update the focused date on the next day
          focusedDate = addDays(this.focusedDate, 1);
          // Re-initialize the new focused date element name
          focusedDateElementName = format(focusedDate, this.dateFormat);
          break;
        default:
          break;
      }

      // Update calendar month if the focused element falls to previous or next month
      const firstDayOfMonth = startOfMonth(this.date);
      const lastDayOfMonth = endOfMonth(this.date);
      if (isBefore(focusedDate, firstDayOfMonth)) {
        this.switchToPreviousMonth();
      }
      if (isAfter(focusedDate, lastDayOfMonth)) {
        this.switchToNextMonth();
      }

      // Add delays on updating the focused date element on the calendar to wait the rendering is finished before setting the focus
      setTimeout(() => {
        // Retrieve the new focused date element
        dateElement = this.datepickerElement.querySelector(
          `button[name="${focusedDateElementName}"]`,
        ) as HTMLButtonElement;
        // Update tabIndex attribute of the focused date element to include in the accessibility tabbing
        dateElement.tabIndex = 0;
        // Autofocus the new focused date element
        dateElement.focus();
      }, 100);
    }
    this.focusedDate = focusedDate;
  };

  /**
   * Capture day mouseover and set to mouseover date state if in selecting state
   *
   * @param event
   */
  private dayMouseoverHandler = (event: MouseEvent): void => {
    // Retrieve the hovered day element
    const hoveredDayElement = event.target as HTMLButtonElement;
    // Set mouseoverDate if in selecting state
    if (this.isSelecting) {
      this.mouseoverDate = parse(
        hoveredDayElement.name,
        this.dateFormat,
        new Date(),
      );
    }
  };

  /**
   * Handle day selection
   *
   * @param day
   */
  private daySelectHandler = (day: number): void => {
    const date = setDate(this.date, day);
    if (this.range) {
      if (this.isSelecting && isBefore(this.startDate, date)) {
        this.endSelection(date);
        this.toggleCalendar();
      } else {
        this.startSelection(date);
      }
    } else {
      this.selectedDate = date;
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
    this.changeYear(parseInt(el.value));
  };

  private dateInputHandler = (event: InputEvent): void => {
    const el = event.target as HTMLInputElement;
    this.debouncedDateInput(el.value.replace(/\s+/g, ''));
  };

  private debouncedDateInput = debounce((newValue: string): void => {
    if (this.range) {
      const startDate = newValue.substring(0, this.dateFormat.length);
      const endDate = newValue.substring(this.dateFormat.length + 1);
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
      const selectedDate = newValue.substring(0, this.dateFormat.length);
      if (this.isValidDate(selectedDate)) {
        this.selectedDate = parse(selectedDate, this.dateFormat, new Date());
      } else {
        this.selectedDate = undefined;
      }
    }
    this.setInputValue(newValue);
  }, 500);

  private isValidDate = (date: string): boolean => {
    return (
      date.length === this.dateFormat.length && isMatch(date, this.dateFormat)
    );
  };

  private setInputValue = (value = ''): void => {
    if (this.range && isValid(this.startDate) && isValid(this.endDate)) {
      this.inputValue = `${format(this.startDate, this.dateFormat)} - ${format(
        this.endDate,
        this.dateFormat,
      )}`;
      this.date = startOfDay(this.startDate);
    } else if (
      this.range &&
      isValid(this.startDate) &&
      !isValid(this.endDate)
    ) {
      this.inputValue = format(this.startDate, this.dateFormat);
      this.date = startOfDay(this.startDate);
    } else if (isValid(this.selectedDate)) {
      this.inputValue = format(this.selectedDate, this.dateFormat);
      this.date = startOfDay(this.selectedDate);
    } else {
      this.inputValue = value;
    }
  };

  private switchToPreviousMonth = (): void => {
    this.date = subMonths(this.date, 1);
    this.setCalendarDetails();
  };

  private switchToNextMonth = (): void => {
    this.date = addMonths(this.date, 1);
    this.setCalendarDetails();
  };

  private changeYear = (year: number): void => {
    this.date = setYear(this.date, year);
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
    const date = setDate(this.date, day);
    return (
      this.currentDate.toDateString() === date.toDateString() &&
      !(index < this.daysOfPrevMonthCount || index >= this.daysOfNextMonthCount)
    );
  };

  private isSelectedDay = (day: number, index: number) => {
    const date = setDate(this.date, day);
    return (
      this.selectedDate.toDateString() === date.toDateString() &&
      !(index < this.daysOfPrevMonthCount || index >= this.daysOfNextMonthCount)
    );
  };

  private isStartDate = (day: number) => {
    const date = setDate(this.date, day);
    return this.startDate.toDateString() === date.toDateString();
  };

  private isEndDate = (day: number) => {
    const date = setDate(this.date, day);
    return this.endDate.toDateString() === date.toDateString();
  };

  private isInBetween = (day: number) => {
    const date = setDate(this.date, day);
    return this.startDate < date && date < this.endDate;
  };

  private isInRange = (day: number) => {
    const date = setDate(this.date, day);
    return this.startDate < date && date <= this.mouseoverDate;
  };

  private getDayName = (day: number): string => {
    return format(setDate(this.date, day), this.dateFormat);
  };

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
                      {format(this.date, 'LLLL')}
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
                          tabIndex={this.getDayTabIndex(day, index)}
                          class={this.getDayClasses(day, index)}
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
