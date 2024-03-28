import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { debounce, randomString } from '../../utils';
import { format, isMatch, isValid, parse } from 'date-fns';
import { getSvg } from '../../common/images';

@Component({
  tag: 'datacom-datepicker-input',
  styleUrl: 'datacom-datepicker-input.css',
  scoped: true,
})
export class DatacomDatepickerInput {
  private inputId = randomString();
  private inputElement: HTMLInputElement;
  private formElement: HTMLFormElement;

  @Element() host: HTMLDatacomDatepickerInputElement;

  @Event({ eventName: 'datepickerChanged', bubbles: true, composed: true })
  changed: EventEmitter<Date | Date[]>;
  @Event({ eventName: 'inputFocused', bubbles: true, composed: true })
  focused: EventEmitter;
  @Event({ eventName: 'inputInvalid', bubbles: true, composed: true })
  invalid: EventEmitter<boolean>;

  @Prop() placeholder?: string;
  @Prop() disabled? = false;
  @Prop() required? = false;

  @Prop() label?: string;
  @Prop({ mutable: true }) selectedDate?: Date;
  @Prop({ mutable: true }) startDate?: Date;
  @Prop({ mutable: true }) endDate?: Date;
  @Prop() range? = false;
  @Prop() dateFormat? = 'dd/MM/yyyy';
  @Prop() supportedFormat? = [
    'MMMM',
    'dd MMMM',
    'dd MMMM yyyy',
    'ddMM',
    'ddMMyyyy',
  ];
  @Prop() message?: string;
  @Prop() autoValidate? = true;

  @State() value = '';
  @State() oldValue = '';
  @State() isEditing = false;
  @State() focusedDate: Date;
  @State() isError = false;
  @State() isSubmitted = false;
  @State() isChanged = false;

  @Watch('selectedDate')
  @Watch('startDate')
  @Watch('endDate')
  watchDates(newDate: Date, _, propName: string): void {
    this.setValue(newDate, propName);
  }

  @Watch('value')
  watchInputValue(): void {
    if (this.isSubmitted) {
      this.validateValue();
    }
  }

  @Watch('isError')
  watchInputError(error: boolean): void {
    this.invalid.emit(error);
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

  private submitForm = (event: SubmitEvent): void => {
    event.preventDefault();
    this.isSubmitted = true;
    this.validateValue();
  };

  private validateValue = (): void => {
    this.isError = false;
    if (this.required && this.value === '') {
      this.isError = true;
    } else if (this.value !== '') {
      const value = this.value.replace(/\s+/g, '');
      if (this.range) {
        const { startDate, endDate } = this.getStartEndDateString(value);
        if (!this.validateDate(startDate) || !this.validateDate(endDate)) {
          this.isError = true;
        }
      } else {
        const selectedDate = value.substring(
          0,
          this.getFormattedDateStringCount(),
        );
        if (!this.validateDate(selectedDate)) {
          this.isError = true;
        }
      }
    }
  };

  private focusDateHandler = (event: FocusEvent | MouseEvent): void => {
    event.preventDefault();
    this.isEditing = true;
    this.focused.emit();
  };

  private changeDateHandler = (event: InputEvent): void => {
    event.preventDefault();
    this.isChanged = true;
    const el = event.target as HTMLInputElement;
    this.debouncedDateInput(el.value);
  };

  private clearDateInputHandler = (event: MouseEvent | KeyboardEvent): void => {
    event.preventDefault();
    this.value = '';
    this.inputElement.value = '';
    if (this.range) {
      this.startDate = undefined;
      this.endDate = undefined;
    } else {
      this.selectedDate = undefined;
    }
  };

  private parseToDate = (
    value: string,
  ): { format?: string; date?: Date; isValid: boolean } => {
    let date: { format?: string; date?: Date; isValid: boolean } = {
      isValid: false,
    };
    for (let i = 0; i < this.supportedFormat.length; i++) {
      const format = this.supportedFormat[i];
      const parsedDate = parse(value, format, new Date());
      if (isValid(parsedDate)) {
        date = {
          format: this.supportedFormat[i],
          date: parsedDate,
          isValid: true,
        };
        break;
      }
    }
    return date;
  };

  private debouncedDateInput = debounce((debouncedValue: string): void => {
    let newDebouncedValue = debouncedValue;

    const valueToParse = debouncedValue.substring(this.oldValue.length);
    const parsedDate = this.parseToDate(valueToParse);
    if (parsedDate.isValid) {
      newDebouncedValue = newDebouncedValue.replace(
        valueToParse,
        format(parsedDate.date, this.dateFormat),
      );
    }

    newDebouncedValue = newDebouncedValue.replace(/\s+/g, '');
    if (this.range) {
      let parsedStartDate: Date;
      let parsedEndDate: Date;
      const { startDate, endDate } =
        this.getStartEndDateString(newDebouncedValue);
      if (this.validateDate(startDate)) {
        parsedStartDate = parse(startDate, this.dateFormat, new Date());
        this.startDate = parsedStartDate;
        this.endDate = undefined;
      } else {
        this.startDate = undefined;
        this.endDate = undefined;
      }
      if (this.validateDate(endDate)) {
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
      const selectedDate = newDebouncedValue.substring(
        0,
        this.getFormattedDateStringCount(),
      );
      if (selectedDate !== '' && this.validateDate(selectedDate)) {
        this.selectedDate = parse(selectedDate, this.dateFormat, new Date());
      } else {
        this.selectedDate = undefined;
      }
    }
  }, 500);

  private setValue = (date: Date, propName: string): void => {
    let oldValue: string = '';
    let value: string = this.inputElement.value;

    if (propName === 'selectedDate' && isValid(date)) {
      value = format(date, this.dateFormat);
      this.changed.emit(date);
    } else if (propName === 'selectedDate' && !isValid(date)) {
      this.changed.emit();
    }

    if (propName === 'startDate' && isValid(date)) {
      const startDateStr = `${format(date, this.dateFormat)} - `;
      const endDateString = value.substring(startDateStr.length);
      oldValue = startDateStr;
      value = this.isChanged ? `${startDateStr}${endDateString}` : startDateStr;
      this.changed.emit([date]);
    } else if (propName === 'startDate' && !isValid(date)) {
      this.changed.emit([]);
    }

    if (propName === 'endDate' && isValid(date)) {
      value = `${format(this.startDate, this.dateFormat)} - ${format(
        date,
        this.dateFormat,
      )}`;
      this.changed.emit([this.startDate, date]);
    } else if (propName === 'endDate' && !isValid(date)) {
      this.changed.emit([this.startDate]);
    }

    this.oldValue = oldValue;
    this.value = value;
    this.inputElement.value = value;
    this.isChanged = false;
  };

  private getStartEndDateString = (
    value: string,
  ): { startDate: string; endDate: string } => {
    const formattedDateStringCount = this.getFormattedDateStringCount();
    const startDate = value.substring(0, formattedDateStringCount);
    const endDate = value.substring(formattedDateStringCount + 1);
    return { startDate, endDate };
  };

  private validateDate = (date: string): boolean => {
    const dateStringCount = this.getFormattedDateStringCount();
    return date.length === dateStringCount && isMatch(date, this.dateFormat);
  };

  private getFormattedDateStringCount = (): number => {
    return format(new Date(), this.dateFormat).length;
  };

  @Method()
  public async toggleIsEditing(isEditing: boolean): Promise<void> {
    this.isEditing = isEditing;
  }

  render() {
    const classes = {
      'dc-datepicker-input-wrapper': true,
      'dc-datepicker-input-edit': this.isEditing || this.value !== '',
      'dc-datepicker-input-disabled': this.disabled,
      'dc-datepicker-input-error': this.isError,
    };
    return (
      <Host>
        <div class={classes}>
          <label htmlFor={this.inputId}>{this.label}</label>
          <input
            type="text"
            id={this.inputId}
            class="dc-datepicker-input"
            ref={(el) => (this.inputElement = el)}
            name={this.inputId}
            required={this.required}
            disabled={this.disabled}
            placeholder={this.placeholder}
            onFocus={this.focusDateHandler}
            onInput={this.changeDateHandler}
            value={this.value}
          />
          {this.value && (
            <button
              class="dc-datepicker-clear"
              onClick={this.clearDateInputHandler}>
              {getSvg('clear', { class: 'dc-datepicker-clear-icon' })}
            </button>
          )}
          <button
            tabIndex={-1}
            class="dc-datepicker-calendar"
            onClick={(event: MouseEvent) => {
              event.preventDefault();
              this.inputElement.focus();
            }}>
            {getSvg('calendar-alt', { class: 'dc-datepicker-calendar-icon' })}
          </button>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomDatepickerInputElement = HTMLElement &
  DatacomDatepickerInput;
