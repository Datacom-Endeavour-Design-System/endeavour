import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { Calendar } from '../../utils/calendar';
import { getSvg } from '../../common/images';
import {
  addMonths,
  addYears,
  format,
  isValid,
  parse,
  setDate,
  setYear,
  startOfMonth,
  subMonths,
  subYears,
} from 'date-fns';

@Component({
  tag: 'datacom-date-picker-calendar',
  styleUrl: 'datacom-date-picker-calendar.css',
  scoped: true,
})
export class DatacomDatePickerCalendar {
  private dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  private yearInputElement: HTMLInputElement;
  private currentDate = new Date();
  private daysOfPrevMonthCount: number;
  private daysOfNextMonthCount: number;

  @Element() host: HTMLDatacomDatePickerCalendarElement;

  @Event({ eventName: 'datePickerChanged', bubbles: true, composed: true })
  changed: EventEmitter<Date | Date[]>;

  @Prop() disabled? = false;

  @Prop({ mutable: true }) selectedDate?: Date;
  @Prop({ mutable: true }) startDate?: Date;
  @Prop({ mutable: true }) endDate?: Date;
  @Prop() range? = false;
  @Prop() dateFormat? = 'dd/MM/yyyy';

  @State() yearChanged = false;
  @State() yearFocused = false;
  @State() yearMouseover = false;
  @State() calendarDate = startOfMonth(new Date());
  @State() calendarDays: number[];
  @State() isSelecting = false;
  @State() mouseoverDate: Date;

  @Listen('keydown', { capture: true })
  async handleOnKeydown(event: KeyboardEvent): Promise<void> {
    const keydownElement = event.target as HTMLElement;
    if (keydownElement.getAttribute('name') === 'yearInput') {
      switch (event.key) {
        case 'ArrowUp':
          this.yearIncreaseHandler(event);
          break;
        case 'ArrowDown':
          this.yearDecreaseHandler(event);
          break;
        default:
          break;
      }
    }
  }

  @Listen('mouseover', { capture: true })
  async handleOnMouseOver(event: MouseEvent): Promise<void> {
    const mouseoverElement = event.target as HTMLElement;

    const attributeName = [
      'yearInput',
      'yearUp',
      'yearDown',
      'yearDownIcon',
      'yearUpIcon',
    ];
    this.yearMouseover =
      !this.disabled &&
      !!attributeName.includes(mouseoverElement.getAttribute('name'));
  }

  @Watch('selectedDate')
  @Watch('startDate')
  @Watch('endDate')
  watchDates(newDate: Date, _, propName: string): void {
    this.setCalendarDate(newDate, propName);
  }

  @Watch('calendarDate')
  watchCalendarDate(): void {
    this.setCalendarDetails();
  }

  componentWillLoad(): void {
    this.setCalendarDetails();
  }

  private setCalendarDetails = (): void => {
    const month = this.calendarDate.getMonth();
    const year = this.calendarDate.getFullYear();
    const calendar = new Calendar(year, month);
    this.calendarDays = calendar.getCalendarDays();
    this.daysOfPrevMonthCount = calendar.getDaysOfPrevMonthCount();
    this.daysOfNextMonthCount =
      calendar.daysInCalendar - calendar.getDaysOfNextMonthCount();
  };

  private yearIncreaseHandler = (event: MouseEvent | KeyboardEvent): void => {
    event.preventDefault();
    this.yearChanged = true;
    this.yearFocused = true;
    this.yearInputElement.focus();
    this.calendarDate = addYears(this.calendarDate, 1);

    const buttonElement = this.host.querySelector<HTMLDivElement>(
      '.dc-date-picker-quantity-up',
    );
    buttonElement.classList.add('dc-date-picker-year-changed');
    setTimeout(() => {
      buttonElement.classList.remove('dc-date-picker-year-changed');
    }, 100);
  };

  private yearDecreaseHandler = (event: MouseEvent | KeyboardEvent): void => {
    event.preventDefault();
    this.yearChanged = true;
    this.yearFocused = true;
    this.yearInputElement.focus();
    this.calendarDate = subYears(this.calendarDate, 1);
    const buttonElement = this.host.querySelector<HTMLDivElement>(
      '.dc-date-picker-quantity-down',
    );
    buttonElement.classList.add('dc-test');
    setTimeout(() => {
      buttonElement.classList.remove('dc-test');
    }, 100);
  };

  private mouseoverDayHandler = (event: MouseEvent): void => {
    event.preventDefault();
    if (this.isSelecting) {
      const mouseoverDayElement = event.target as HTMLButtonElement;
      this.mouseoverDate = parse(
        mouseoverDayElement.name,
        this.dateFormat,
        new Date(),
      );
    }
  };

  private selectDayHandler = (
    event: MouseEvent | KeyboardEvent,
    day: number,
  ): void => {
    event.preventDefault();
    const date = setDate(this.calendarDate, day);
    if (this.range) {
      if (this.isSelecting && this.startDate <= date) {
        this.endSelection(date);
      } else {
        this.startSelection(date);
      }
    } else {
      this.selectedDate = date;
      this.changed.emit(date);
    }
  };

  private focusYearHandler = (event: FocusEvent): void => {
    event.preventDefault();
    this.yearFocused = true;
  };

  private blurYearHandler = (event: FocusEvent): void => {
    event.preventDefault();
    setTimeout(() => {
      if (this.yearChanged) {
        this.yearChanged = false;
      } else {
        this.yearFocused = false;
      }
    }, 200);
  };

  private changeYearHandler = (event: InputEvent): void => {
    event.preventDefault();
    const el = event.target as HTMLInputElement;
    this.calendarDate = setYear(this.calendarDate, parseInt(el.value));
  };

  @Method()
  public async switchToPreviousMonth(): Promise<void> {
    this.calendarDate = subMonths(this.calendarDate, 1);
  }

  @Method()
  public async switchToNextMonth(): Promise<void> {
    this.calendarDate = addMonths(this.calendarDate, 1);
  }

  @Method()
  public async getCalendarDate(): Promise<Date> {
    return this.calendarDate;
  }

  @Method()
  public async setMouseoverDate(date: Date): Promise<void> {
    if (this.isSelecting) {
      this.mouseoverDate = date;
    }
  }

  private setCalendarDate(date: Date, propName: string): void {
    if (propName === 'selectedDate' && isValid(date)) {
      this.calendarDate = date;
    } else if (propName === 'startDate' && isValid(date)) {
      this.calendarDate = date;
      this.isSelecting = true;
      this.changed.emit([date]);
    } else if (propName === 'endDate' && isValid(date)) {
      this.isSelecting = false;
      this.changed.emit([this.startDate, date]);
    } else if (propName === 'endDate' && !isValid(date)) {
      this.isSelecting = true;
      this.changed.emit([this.startDate]);
    } else {
      this.calendarDate = startOfMonth(new Date());
    }
  }

  private startSelection = (date: Date): void => {
    this.startDate = date;
    this.endDate = undefined;
    this.mouseoverDate = undefined;
  };

  private endSelection = (date: Date): void => {
    this.endDate = date;
    this.mouseoverDate = undefined;
  };

  private getDayTabIndex = (day: number, index: number): number => {
    let tabIndex = -1;

    if (this.isToday(day, index)) {
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

  private getDayClasses = (day: number, index: number): string => {
    const classDigit = [];

    if (this.disabled) {
      return 'dc-date-picker-disabled';
    }

    if (this.isToday(day, index)) {
      classDigit.push('dc-date-picker-active');
    }

    if (this.selectedDate && this.isSelectedDay(day, index)) {
      classDigit.push('dc-date-picker-selected');
    }

    if (this.startDate && this.isStartDate(day)) {
      classDigit.push('dc-date-picker-start-date');
    }

    if (this.endDate && this.isEndDate(day)) {
      classDigit.push('dc-date-picker-end-date');
    }

    if (this.startDate && this.endDate && this.isInBetween(day)) {
      classDigit.push('dc-date-picker-in-between');
    }

    if (this.mouseoverDate && this.isInRange(day)) {
      classDigit.push('dc-date-picker-in-range');
    }

    if (this.mouseoverDate && this.isMouseoverDate(day)) {
      classDigit.push('dc-date-picker-mouseover-date');
    }

    return classDigit.join(' ');
  };

  private isToday = (day: number, index: number): boolean => {
    const date = setDate(this.calendarDate, day);
    return (
      this.currentDate.toDateString() === date.toDateString() &&
      !(index < this.daysOfPrevMonthCount || index >= this.daysOfNextMonthCount)
    );
  };

  private isSelectedDay = (day: number, index: number) => {
    const date = setDate(this.calendarDate, day);
    return (
      this.selectedDate.toDateString() === date.toDateString() &&
      !(index < this.daysOfPrevMonthCount || index >= this.daysOfNextMonthCount)
    );
  };

  private isStartDate = (day: number) => {
    const date = setDate(this.calendarDate, day);
    return this.startDate.toDateString() === date.toDateString();
  };

  private isEndDate = (day: number) => {
    const date = setDate(this.calendarDate, day);
    return this.endDate.toDateString() === date.toDateString();
  };

  private isInBetween = (day: number) => {
    const date = setDate(this.calendarDate, day);
    return this.startDate < date && date < this.endDate;
  };

  private isInRange = (day: number) => {
    const date = setDate(this.calendarDate, day);
    return this.startDate <= date && date <= this.mouseoverDate;
  };

  private isMouseoverDate = (day: number) => {
    const date = setDate(this.calendarDate, day);
    return this.mouseoverDate.toDateString() === date.toDateString();
  };

  private getDayName = (day: number): string => {
    return format(setDate(this.calendarDate, day), this.dateFormat);
  };

  render() {
    const calendarClasses = {
      'dc-date-picker-calendar': true,
      'dc-date-picker-calendar-disabled': this.disabled,
    };

    const yearInputClasses = {
      'dc-date-picker-input-wrapper': true,
      'dc-date-picker-year-input-focused':
        this.yearFocused || this.yearMouseover,
    };
    return (
      <Host>
        <div class={calendarClasses}>
          <div class="dc-date-picker-header">
            <button
              class="dc-date-picker-prev"
              onClick={async (event: MouseEvent): Promise<void> => {
                event.preventDefault();
                await this.switchToPreviousMonth();
              }}
              disabled={this.disabled}>
              {getSvg('chevron', { class: 'dc-date-picker-prev-icon' })}
            </button>
            <div class="dc-date-picker-month-year-container">
              <span>{format(this.calendarDate, 'LLLL')}</span>
              <div class={yearInputClasses}>
                <input
                  type="number"
                  name="yearInput"
                  ref={(el) => (this.yearInputElement = el)}
                  min={1}
                  onFocus={this.focusYearHandler}
                  onBlur={this.blurYearHandler}
                  onInput={this.changeYearHandler}
                  value={this.calendarDate.getFullYear()}
                  disabled={this.disabled}
                />
                <div class="dc-date-picker-quantity-nav">
                  <button
                    tabIndex={-1}
                    name="yearUp"
                    class="dc-date-picker-quantity-up"
                    onClick={this.yearIncreaseHandler}
                    disabled={this.disabled}>
                    {getSvg('caret', {
                      class: 'dc-date-picker-quantity-up-icon',
                      name: 'yearUpIcon',
                    })}
                  </button>
                  <button
                    tabIndex={-1}
                    name="yearDown"
                    class="dc-date-picker-quantity-down"
                    onClick={this.yearDecreaseHandler}
                    disabled={this.disabled}>
                    {getSvg('caret', {
                      class: 'dc-date-picker-quantity-down-icon',
                      name: 'yearDownIcon',
                    })}
                  </button>
                </div>
              </div>
            </div>
            <button
              class="dc-date-picker-next"
              onClick={async (event: MouseEvent): Promise<void> => {
                event.preventDefault();
                await this.switchToNextMonth();
              }}
              disabled={this.disabled}>
              {getSvg('chevron', { class: 'dc-date-picker-next-icon' })}
            </button>
          </div>
          <div class="dc-date-picker-days">
            {this.dayNames.map((dayName) => (
              <span>{dayName}</span>
            ))}
          </div>
          <div class="dc-date-picker-dates">
            {this.calendarDays.map((day, index) => {
              if (
                index < this.daysOfPrevMonthCount ||
                index >= this.daysOfNextMonthCount
              ) {
                return (
                  <button class="dc-date-picker-disabled" tabIndex={-1}>
                    {day}
                  </button>
                );
              } else {
                return (
                  <button
                    tabIndex={this.getDayTabIndex(day, index)}
                    class={this.getDayClasses(day, index)}
                    name={this.getDayName(day)}
                    onMouseOver={this.mouseoverDayHandler}
                    onClick={(e) => this.selectDayHandler(e, day)}
                    disabled={this.disabled}>
                    {day}
                  </button>
                );
              }
            })}
          </div>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomDatePickerCalendarElement = HTMLElement &
  DatacomDatePickerCalendar;
