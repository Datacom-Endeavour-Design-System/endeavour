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
import { FormControl } from '../form-control';
import { debounce } from '../../utils';
import { format, isMatch, isValid, parse } from 'date-fns';

type RangeTime = {
  startDate: string;
  endDate: string;
};
@Component({
  tag: 'datacom-date-picker-input',
  styleUrl: 'datacom-date-picker-input.css',
  scoped: true,
})
export class DatacomDatePickerInput implements FormControl {
  private inputElement: HTMLInputElement;

  @Element() host: HTMLDatacomDatePickerInputElement;

  @Event({ eventName: 'datePickerInputFocused', bubbles: true, composed: true })
  focused: EventEmitter;
  @Event({ eventName: 'datePickerChanged', bubbles: true, composed: true })
  changed: EventEmitter<Date | Date[]>;
  @Event({ eventName: 'datePickerInputChanged', bubbles: true, composed: true })
  inputChanged: EventEmitter<string>;

  @Prop() placeholder?: string;
  @Prop() disabled?: boolean = false;
  @Prop() required?: boolean = false;

  @Prop() inputId?: string;
  @Prop({ mutable: true }) selectedDate?: Date;
  @Prop({ mutable: true }) startDate?: Date;
  @Prop({ mutable: true }) endDate?: Date;
  @Prop() range?: boolean = false;
  @Prop() dateFormat?: string = 'dd/MM/yyyy';
  @Prop() supportedFormat?: string[] = [
    'MMMM',
    'dd MMMM',
    'dd MMMM yyyy',
    'ddMM',
    'ddMMyyyy',
  ];
  @Prop() message?: string;
  @Prop() autoValidate?: boolean = true;

  @State() value: string = '';
  @State() oldValue: string = '';
  @State() focusedDate: Date;
  @State() isValid: boolean = false;
  @State() isSubmitted: boolean = false;
  @State() isChanged: boolean = false;

  @Method()
  async validate(): Promise<boolean> {
    return await this.checkValidity();
  }

  @Method()
  async checkValidity(): Promise<boolean> {
    return this.isValid;
  }

  @Method()
  async clearValue(): Promise<void> {
    this.value = '';
    this.inputElement.value = '';
    this.populateDate('');
  }

  @Watch('selectedDate')
  @Watch('startDate')
  @Watch('endDate')
  watchDates(newDate: Date, _, propName: string): void {
    this.setValue(newDate, propName);
  }

  private setValue(date: Date, propName: string): void {
    let value: string = this.inputElement.value;

    if (propName === 'selectedDate' && isValid(date)) {
      value = format(date, this.dateFormat);
      this.isValid = true;
      this.changed.emit(date);
    } else if (propName === 'selectedDate' && !isValid(date)) {
      this.isValid = false;
      this.changed.emit();
    }

    if (propName === 'startDate' && isValid(date)) {
      const startDateStr: string = `${format(date, this.dateFormat)} - `;
      const endDateString: string = value.substring(startDateStr.length);
      value = this.isChanged ? `${startDateStr}${endDateString}` : startDateStr;
      this.isValid = false;
      this.oldValue = startDateStr;
      this.changed.emit([date]);
    } else if (propName === 'startDate' && !isValid(date)) {
      this.isValid = false;
      this.changed.emit([]);
    }

    if (propName === 'endDate' && isValid(date)) {
      value = `${format(this.startDate, this.dateFormat)} - ${format(
        date,
        this.dateFormat,
      )}`;
      this.isValid = true;
      this.changed.emit([this.startDate, date]);
    } else if (propName === 'endDate' && !isValid(date)) {
      this.isValid = false;
      this.changed.emit([this.startDate]);
    }

    this.value = value;
    this.inputElement.value = value;
    this.inputChanged.emit(value);
    this.isChanged = false;
  }

  private focusDateHandler = (event: FocusEvent | MouseEvent): void => {
    event.preventDefault();
    this.focused.emit();
  };

  private changeDateHandler = (event: InputEvent): void => {
    event.preventDefault();
    this.isChanged = true;
    const el: HTMLInputElement = event.target as HTMLInputElement;
    this.inputChanged.emit(el.value);
    this.debouncedDateInput(el.value);
  };

  private debouncedDateInput = debounce((debouncedValue: string): void => {
    let newDebouncedValue: string = debouncedValue;

    const valueToParse: string = debouncedValue.substring(this.oldValue.length);

    const parsedDate = this.parseToDate(valueToParse);
    if (parsedDate.isValid) {
      newDebouncedValue = newDebouncedValue.replace(
        valueToParse,
        format(parsedDate.date, this.dateFormat),
      );
    }

    newDebouncedValue = newDebouncedValue.replace(/\s+/g, '');
    this.populateDate(newDebouncedValue);
  }, 1000);

  private populateDate = (value: string): void => {
    if (this.range) {
      let parsedStartDate: Date;
      let parsedEndDate: Date;
      const { startDate, endDate } = this.getStartEndDateString(value);
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
      const selectedDate: string = value.substring(
        0,
        this.getFormattedDateStringCount(),
      );
      if (selectedDate !== '' && this.validateDate(selectedDate)) {
        this.selectedDate = parse(selectedDate, this.dateFormat, new Date());
      } else {
        this.selectedDate = undefined;
      }
    }
  };

  private parseToDate = (
    value: string,
  ): { format?: string; date?: Date; isValid: boolean } => {
    let date: { format?: string; date?: Date; isValid: boolean } = {
      isValid: false,
    };
    for (let i: number = 0; i < this.supportedFormat.length; i++) {
      const format: string = this.supportedFormat[i];
      const parsedDate: Date = parse(value, format, new Date());
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

  private getStartEndDateString = (value: string): RangeTime => {
    const formattedDateStringCount: number = this.getFormattedDateStringCount();
    const startDate: string = value.substring(0, formattedDateStringCount);
    const endDate: string = value.substring(formattedDateStringCount + 1);
    return { startDate, endDate };
  };

  private validateDate = (date: string): boolean => {
    const dateStringCount: number = this.getFormattedDateStringCount();
    return date.length === dateStringCount && isMatch(date, this.dateFormat);
  };

  private getFormattedDateStringCount = (): number => {
    return format(new Date(), this.dateFormat).length;
  };

  render() {
    return (
      <Host>
        <div class="dc-date-picker-input-wrapper">
          <input
            type="text"
            id={this.inputId}
            ref={(el: HTMLInputElement) => (this.inputElement = el)}
            name={this.inputId}
            required={this.required}
            disabled={this.disabled}
            placeholder={this.placeholder}
            onFocus={this.focusDateHandler}
            onInput={this.changeDateHandler}
            value={this.value}
          />
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomDatePickerInputElement = HTMLElement &
  DatacomDatePickerInput;
