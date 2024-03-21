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
  private datepickerInputElement: HTMLInputElement;
  private formElement: HTMLFormElement;
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
   * Optional property to automatically validate datepicker input value on form submit
   */
  @Prop() autoValidate? = true;

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
  /**
   * State that handle the datepicker status after form submission
   */
  @State() isSubmitted = false;

  @Watch('inputValue')
  watchInputValue(newValue: string): void {
    if (this.isSubmitted) {
      this.validateInputValue(newValue);
    }
  }

  @Watch('isOpen')
  watchCalendarToggle(open: boolean): void {
    // Re-instantiate states and set element focus on calendar toggle
    if (open) {
      this.mouseoverDate = undefined;
      setTimeout(() => {
        // Instantiate focused element name
        let focusedElementName: string = '';
        if (this.inputValue === '') {
          // Retrieve active element
          const activeDateElement = this.datepickerElement.querySelector(
            '.dc-datepicker-active',
          ) as HTMLButtonElement;
          if (activeDateElement instanceof HTMLButtonElement) {
            // Autofocus active element on the calendar if opened and no inputted value
            activeDateElement.focus();
            // Set active element name sa focused element
            focusedElementName = activeDateElement.name;
          }
        } else {
          /* Range datepicker */
          if (this.range) {
            // Retrieve start date element
            const startDateElement = this.datepickerElement.querySelector(
              '.dc-datepicker-start-date',
            ) as HTMLButtonElement;
            if (startDateElement instanceof HTMLButtonElement) {
              // Autofocus start date element on the calendar if opened and with inputted value
              startDateElement.focus();
              // Set start element name sa focused element
              focusedElementName = startDateElement.name;
            }
          } else {
            /* Single datepicker */
            // Retrieve selected date element
            const selectedDateElement = this.datepickerElement.querySelector(
              '.dc-datepicker-selected',
            ) as HTMLButtonElement;
            if (selectedDateElement instanceof HTMLButtonElement) {
              // Autofocus selected date element on the calendar if opened and with inputted value
              selectedDateElement.focus();
              // Set selected element name sa focused element
              focusedElementName = selectedDateElement.name;
            }
          }
        }
        if (focusedElementName !== '') {
          // Parse focused element name to date and set to focused date variable
          this.focusedDate = parse(
            focusedElementName,
            this.dateFormat,
            new Date(),
          );
        }
      }, 100);
    } else {
      // Update base date state on calendar close
      if (isValid(this.selectedDate) || isValid(this.startDate)) {
        /* Range datepicker */
        if (this.range) {
          // Set start of day of the chosen start date
          this.date = startOfDay(this.startDate);
        } else {
          /* Single datepicker */
          // Set start of day of the selected date
          this.date = startOfDay(this.selectedDate);
        }
      } else {
        // Set start of day of the current date if no inputted value
        this.date = startOfDay(new Date());
      }
      // Re-initialize calendar details
      this.setCalendarDetails();
      setTimeout(() => {
        // Retrieve calendar show element
        const calendarShowElement = this.datepickerElement.querySelector(
          '.dc-datepicker-calendar-show',
        ) as HTMLButtonElement;
        if (calendarShowElement instanceof HTMLButtonElement) {
          // Autofocus calendar show button on calendar close
          calendarShowElement.focus();
        }
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

  componentDidLoad() {
    // Add submit event listener to the nearest form
    this.addNearestFormSubmitEvent();
  }

  disconnectedCallback() {
    // When removed from the DOM, remove submit event listener
    if (this.formElement !== undefined && this.formElement !== null) {
      this.formElement.removeEventListener('submit', () =>
        this.validateInputValue(this.inputValue),
      );
    }
  }

  /**
   * Validate date input value
   *
   * @param inputValue
   */
  private validateInputValue = (inputValue: string): void => {
    this.isInvalid = false;
    if (this.required && inputValue === '') {
      this.isInvalid = true;
    } else if (inputValue !== '') {
      // Remove all spaces on the inputted value
      const value = inputValue.replace(/\s+/g, '');
      // Validate inputted value by date format for both single and range datepicker
      this.isInvalid = false;
      if (this.range) {
        /* Range datepicker validation */
        const { startDate, endDate } = this.getStartEndDateString(value);
        // Validate
        if (!this.isValidDate(startDate) || !this.isValidDate(endDate)) {
          this.isInvalid = true;
        }
      } else {
        /* Single datepicker validation */
        // Substring the inputted value from 0 to formatted date string count to get the selected date
        const selectedDate = value.substring(
          0,
          this.formattedDateStringCount(),
        );
        // Validate
        if (!this.isValidDate(selectedDate)) {
          this.isInvalid = true;
        }
      }
    }
    this.isSubmitted = true;
  };

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
   * Update input value state with the inputted value
   *
   * @param value
   */
  private setInputValue = (value = ''): void => {
    let inputValue = value;
    if (this.range && isValid(this.startDate) && isValid(this.endDate)) {
      this.date = startOfDay(this.startDate);
      inputValue = `${format(this.startDate, this.dateFormat)} - ${format(
        this.endDate,
        this.dateFormat,
      )}`;
    } else if (
      this.range &&
      isValid(this.startDate) &&
      !isValid(this.endDate)
    ) {
      this.date = startOfDay(this.startDate);
      inputValue = `${format(this.startDate, this.dateFormat)} - `;
    } else if (isValid(this.selectedDate)) {
      this.date = startOfDay(this.selectedDate);
      inputValue = format(this.selectedDate, this.dateFormat);
    }
    this.inputValue = inputValue;
    if (this.datepickerInputElement instanceof HTMLInputElement) {
      this.datepickerInputElement.value = inputValue;
    }
  };

  /**
   * Add submit event listeners to the nearest form
   */
  private addNearestFormSubmitEvent = (): void => {
    if (this.autoValidate) {
      this.formElement = this.datepickerElement.closest('form');
      if (this.formElement !== undefined && this.formElement !== null) {
        this.formElement.noValidate = true;
        this.formElement.addEventListener('submit', () =>
          this.validateInputValue(this.inputValue),
        );
      }
    }
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
        if (
          tabLoopStart instanceof HTMLDivElement &&
          lastElement instanceof HTMLButtonElement &&
          tabLoopStart === activeElement
        ) {
          lastElement.focus();
        }
        // Set the focus to the last element if the active element is equal to tab loop start
        if (
          tabLoopEnd instanceof HTMLDivElement &&
          firstElement instanceof HTMLButtonElement &&
          tabLoopEnd === activeElement
        ) {
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
      if (dateElement instanceof HTMLButtonElement) {
        // Update tabIndex attribute of the focused date element to exclude in the accessibility tabbing
        dateElement.tabIndex = -1;
        // Remove focus on focused date element
        dateElement.blur();
      }
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
        if (dateElement instanceof HTMLButtonElement) {
          // Update tabIndex attribute of the focused date element to include in the accessibility tabbing
          dateElement.tabIndex = 0;
          // Autofocus the new focused date element
          dateElement.focus();
        }
      }, 100);
    }
    this.focusedDate = focusedDate;
  };

  /**
   * Capture day mouseover and update mouseover date state if in selecting state
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
   * Handle day selection and hide calendar after selection
   *
   * @param event
   * @param day
   */
  private daySelectHandler = (event: Event, day: number): void => {
    event.preventDefault();
    const date = setDate(this.date, day);
    /* Range datepicker */
    if (this.range) {
      // End selection if in selecting state and the selected day is before the start date
      // Else, Start selection
      if (this.isSelecting && isBefore(this.startDate, date)) {
        this.endSelection(date);
        // Hide calendar
        this.toggleCalendar();
      } else {
        this.startSelection(date);
      }
    } else {
      /* Single datepicker */
      // Update selected date state
      this.selectedDate = date;
      // Hide calendar
      this.toggleCalendar();
    }
    this.setInputValue();
  };

  /**
   * Hide/show calendar
   */
  private toggleCalendar = (event?: Event): void => {
    event && event.preventDefault();
    this.isOpen = !this.isOpen;
  };

  /**
   * Enable editing state and close opened calendar if date input field is focused
   */
  private dateFocusHandler = (): void => {
    this.isEditing = true;
    if (this.isOpen) {
      this.toggleCalendar();
    }
  };

  /**
   * Disable editing state if date input value is empty string
   */
  private dateBlurHandler = (): void => {
    if (this.inputValue === '') {
      this.isEditing = false;
    }
  };

  /**
   * Handle year input change
   *
   * @param event
   */
  private yearInputHandler = (event: InputEvent): void => {
    const el = event.target as HTMLInputElement;
    this.changeYear(parseInt(el.value));
  };

  /**
   * Handle date input change and debounced the input value
   *
   * @param event
   */
  private dateInputHandler = (event: InputEvent): void => {
    const el = event.target as HTMLInputElement;
    this.debouncedDateInput(el.value.replace(/\s+/g, ''));
  };

  /**
   * Handle the debounced date input adding 500 milliseconds delays on input
   *
   * @private
   */
  private debouncedDateInput = debounce((debouncedValue: string): void => {
    // Validate inputted value by date format for both single and range datepicker
    // Set the valid date to its corresponding state
    // Range datepicker sets start date and end date states
    // Single datepicker set selected date state
    if (this.range) {
      let parsedStartDate: Date;
      let parsedEndDate: Date;
      const { startDate, endDate } = this.getStartEndDateString(debouncedValue);
      if (this.isValidDate(startDate)) {
        // Parse the start date string to date
        parsedStartDate = parse(startDate, this.dateFormat, new Date());
        // Set the parsed start date to start date state
        this.startDate = parsedStartDate;
      } else {
        // Invalid start date value sets the start date and end date to initial state value
        this.startDate = undefined;
        this.endDate = undefined;
      }
      if (this.isValidDate(endDate)) {
        // Parse the end date string to date
        parsedEndDate = parse(endDate, this.dateFormat, new Date());
        // Validate parsed end date if after the parsed start date
        // If yes, set the parsed end date to end date state
        // Else, set the parsed start date to end date state
        if (parsedStartDate > parsedEndDate) {
          this.endDate = parsedStartDate;
        } else {
          this.endDate = parsedEndDate;
        }
      } else {
        // Invalid start date value sets the end date to initial state value
        this.endDate = undefined;
      }
    } else {
      // Substring the debounced value from 0 to formatted date string count to get the selected date
      const selectedDate = debouncedValue.substring(
        0,
        this.formattedDateStringCount(),
      );
      if (this.isValidDate(selectedDate)) {
        // Parse the selected date string to date
        this.selectedDate = parse(selectedDate, this.dateFormat, new Date());
      } else {
        this.selectedDate = undefined;
      }
    }
    // Set the debounce value to input value state
    this.setInputValue(debouncedValue);
  }, 500);

  /**
   * Count the number of string of the formatted date
   */
  private formattedDateStringCount = (): number => {
    return format(new Date(), this.dateFormat).length;
  };

  /**
   * Retrieve start date and end date string of the provided ranged date string
   *
   * @param value
   */
  private getStartEndDateString = (
    value: string,
  ): { startDate: string; endDate: string } => {
    // Count the formatted date string
    const formattedDateStringCount = this.formattedDateStringCount();
    // Substring the inputted value from 0 to formatted date string count to get the start date
    const startDate = value.substring(0, formattedDateStringCount);
    // Substring the inputted value from formatted date string count + 1 to get the end date
    const endDate = value.substring(formattedDateStringCount + 1);
    return { startDate, endDate };
  };

  /**
   * Validation for date if matched the date format
   *
   * @param date
   */
  private isValidDate = (date: string): boolean => {
    const dateStringCount = this.formattedDateStringCount();
    return date.length === dateStringCount && isMatch(date, this.dateFormat);
  };

  /**
   * Handle calendar update by switching to previous month and re-initialize calendar details
   */
  private switchToPreviousMonth = (event?: Event): void => {
    event && event.preventDefault();
    this.date = subMonths(this.date, 1);
    this.setCalendarDetails();
  };

  /**
   * Handle calendar update by switching to next month and re-initialize calendar details
   */
  private switchToNextMonth = (event?: Event): void => {
    event && event.preventDefault();
    this.date = addMonths(this.date, 1);
    this.setCalendarDetails();
  };

  /**
   * Handle calendar update by changing the year
   *
   * @param year
   */
  private changeYear = (year: number): void => {
    this.date = setYear(this.date, year);
    this.setCalendarDetails();
  };

  /**
   * Range datepicker
   * Enable selecting flag and set the selected date to start date state
   * Reset the initial state value of end date and mouseover date state to ensure no value on start selection
   *
   * @param selectedDate
   */
  private startSelection = (selectedDate: Date): void => {
    this.isSelecting = true;
    this.startDate = selectedDate;
    this.endDate = undefined;
    this.mouseoverDate = undefined;
  };

  /**
   * Range datepicker
   * Disable selecting flag and set the selected date to end date state
   *
   * @param selectedDate
   */
  private endSelection = (selectedDate: Date): void => {
    this.isSelecting = false;
    this.endDate = selectedDate;
  };

  /**
   * Accessibility:
   * Setting the tab index of the calendar days
   * If the date input is empty, set the calendar current date tab index to 0 to include in tabbing
   * If the date input and selected date is not empty, set the calendar selected date tab index to 0 to include in tabbing
   * If the date input and start date is not empty, set the calendar start date tab index to 0 to include in tabbing
   * Else, tab index is -1 to exclude in tabbing
   *
   * @param day
   * @param index
   */
  private getDayTabIndex = (day: number, index: number): number => {
    let tabIndex = -1;

    if (this.inputValue === '' && this.isToday(day, index)) {
      tabIndex = 0;
    }

    if (this.selectedDate && this.isSelectedDay(day, index)) {
      tabIndex = 0;
    }

    if (this.startDate && this.isStartDate(day)) {
      tabIndex = 0;
    }

    return tabIndex;
  };

  /**
   * Retrieve the corresponding class per calendar day
   *
   * @param day
   * @param index
   */
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

  /**
   * Checks if the selected day from calendar is equal to current date
   *
   * @param day
   * @param index
   */
  private isToday = (day: number, index: number): boolean => {
    const date = setDate(this.date, day);
    return (
      this.currentDate.toDateString() === date.toDateString() &&
      !(index < this.daysOfPrevMonthCount || index >= this.daysOfNextMonthCount)
    );
  };

  /**
   * Checks if the selected day from calendar is equal to selected date
   *
   * @param day
   * @param index
   */
  private isSelectedDay = (day: number, index: number) => {
    const date = setDate(this.date, day);
    return (
      this.selectedDate.toDateString() === date.toDateString() &&
      !(index < this.daysOfPrevMonthCount || index >= this.daysOfNextMonthCount)
    );
  };

  /**
   * Checks if the selected day from calendar is equal to start date
   *
   * @param day
   */
  private isStartDate = (day: number) => {
    const date = setDate(this.date, day);
    return this.startDate.toDateString() === date.toDateString();
  };

  /**
   * Checks if the selected day from calendar is equal to end date
   *
   * @param day
   */
  private isEndDate = (day: number) => {
    const date = setDate(this.date, day);
    return this.endDate.toDateString() === date.toDateString();
  };

  /**
   * Checks if the selected day from calendar is between the start date and end date
   *
   * @param day
   */
  private isInBetween = (day: number) => {
    const date = setDate(this.date, day);
    return this.startDate < date && date < this.endDate;
  };

  /**
   * Checks if the selected day from calendar is in range of the start date and mouseover date
   *
   * @param day
   */
  private isInRange = (day: number) => {
    const date = setDate(this.date, day);
    return this.startDate <= date && date <= this.mouseoverDate;
  };

  /**
   * Generate a day name for calendar day element
   *
   * @param day
   */
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
                ref={(el) => (this.datepickerInputElement = el)}
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
                          onClick={(e) => this.daySelectHandler(e, day)}>
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
