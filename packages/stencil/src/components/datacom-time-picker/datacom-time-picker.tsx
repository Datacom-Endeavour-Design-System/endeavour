import {
  Component,
  Element,
  Fragment,
  Host,
  h,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { FormControl } from '../form-control';
import { debounce, randomString } from '../../utils';
import { getSvg } from '../../common/images';

type Time = {
  hour?: string;
  minute?: string;
  period?: string;
};

@Component({
  tag: 'datacom-time-picker',
  styleUrl: 'datacom-time-picker.css',
  scoped: true,
})
export class DatacomTimePicker implements FormControl {
  private timeInputElement: HTMLInputElement;
  private formElement: HTMLFormElement;
  private hourOptionsWrapper: HTMLDivElement;
  private minuteOptionsWrapper: HTMLDivElement;
  private periodOptionsWrapper: HTMLDivElement;
  private optionHeight = 56;
  private visibleOptionsCount = 4;
  private inputId = randomString();

  @Element() private host: HTMLDatacomTimePickerElement;

  @Prop() name: string;
  @Prop({ mutable: true }) value? = '';
  @Prop() placeholder?: string = 'Select item(s)';
  @Prop() disabled? = false;
  @Prop() readonly? = false;
  @Prop() required? = false;
  @Prop() form?: string;
  @Prop() title: string;

  @Prop() label: string;
  @Prop() minuteInterval? = 1;
  @Prop() militaryTime? = false;

  @Prop() message?: string;
  @Prop({ attribute: 'valid' }) isValid?: boolean;
  @Prop() autoValidate? = true;

  @State() time: Time;
  @State() isInError = false;
  @State() isOpen = false;
  @State() isChanged = false;
  @State() selectedHour: string;
  @State() selectedMinute: string;
  @State() selectedPeriod: string;
  @State() hourOptions: string[] = [];
  @State() minuteOptions: string[] = [];
  @State() periodOptions: string[] = [];
  @State() tabCount = 4;
  @State() activeOptionsWrapper: HTMLDivElement;
  @State() isValidTime = true;

  @Listen('click', { target: 'document' })
  handleOutsideClick(event: MouseEvent) {
    if (this.disabled) {
      return;
    }

    if (!this.host.contains(event.target as Node)) {
      this.close();
    }
  }

  @Method()
  async validate(): Promise<boolean> {
    return true;
  }

  @Method()
  async checkValidity(): Promise<boolean> {
    return this.timeInputElement.checkValidity();
  }

  @Watch('selectedHour')
  @Watch('selectedMinute')
  @Watch('selectedPeriod')
  watchSelection(newValue: string, _, propName: string) {
    this.setTimeValue(newValue, propName);
  }

  @Watch('time')
  watchTime(newTime: Time): void {
    let time: string = '';
    if (newTime.hour !== undefined) {
      time = `${newTime.hour}:`;
    }
    if (newTime.minute !== undefined) {
      time = `${time}${newTime.minute}`;
    }
    if (newTime.period !== undefined) {
      time = `${time} ${newTime.period}`;
    }
    this.value = time;
  }

  @Watch('minuteInterval')
  watchMinuteInterval(): void {
    this.initMinuteOptions();
  }

  disconnectedCallback(): void {
    if (this.formElement !== undefined && this.formElement !== null) {
      this.formElement.removeEventListener('submit', this.submitForm);
    }
    this.hourOptionsWrapper?.removeEventListener('scroll', this.scrollUpdate);
    this.minuteOptionsWrapper?.removeEventListener('scroll', this.scrollUpdate);
    this.periodOptionsWrapper?.removeEventListener('scroll', this.scrollUpdate);
  }

  componentWillLoad(): void {
    this.initOptions();
  }

  componentDidLoad(): void {
    this.addNearestFormSubmitEvent();
    this.addScrollEvent();
  }

  private setTimeValue = (value: string, type: string): void => {
    const newTime: Time = { ...this.time };
    if (type === 'selectedHour') {
      newTime.hour = value;
    }

    if (type === 'selectedMinute') {
      newTime.minute = value;
    }

    if (type === 'selectedPeriod') {
      newTime.period = value;
    }
    this.time = newTime;
  };

  private initOptions = (): void => {
    this.initHourOptions();
    this.initMinuteOptions();
    this.initPeriodOptions();
  };

  private initHourOptions = (): void => {
    let hourOptions: string[] = [];
    const hour = this.militaryTime ? 24 : 12;
    const hourStart = this.militaryTime ? 0 : 1;
    for (let i = hourStart; i <= hour; i++) {
      if (!this.militaryTime && i === 12) {
        hourOptions = [i.toString(), ...hourOptions];
      } else {
        hourOptions.push(i.toString().padStart(2, '0'));
      }
    }
    this.hourOptions = hourOptions;
  };

  private initMinuteOptions = (): void => {
    const minuteOptions: string[] = [];
    const minute = 60 / this.minuteInterval;
    const minuteStart = 0;
    for (let i = minuteStart; i < minute; i++) {
      minuteOptions.push((i * this.minuteInterval).toString().padStart(2, '0'));
    }
    this.minuteOptions = minuteOptions;
  };

  private initPeriodOptions = (): void => {
    this.periodOptions = ['AM', 'PM'];
  };

  private addNearestFormSubmitEvent = (): void => {
    if (this.autoValidate) {
      this.formElement = this.host.closest('form');
      if (this.formElement !== undefined && this.formElement !== null) {
        this.formElement.noValidate = true;
        this.formElement.addEventListener('submit', this.submitForm);
      }
    }
  };

  private addScrollEvent = (): void => {
    this.hourOptionsWrapper?.addEventListener('scroll', this.scrollUpdate);
    this.minuteOptionsWrapper?.addEventListener('scroll', this.scrollUpdate);
    this.periodOptionsWrapper?.addEventListener('scroll', this.scrollUpdate);
  };

  private submitForm = (event: SubmitEvent): void => {
    event.preventDefault();
    // TODO: submit form
  };

  private scrollUpdate = (event: Event): void => {
    const element = event.target as HTMLDivElement;

    const options = Array.from(
      element.querySelectorAll('.dc-time-picker-time-option'),
    ) as HTMLButtonElement[];
    //
    const noneCloneOptionsCount = options.length / 2;

    if (element.scrollTop === element.scrollHeight - element.clientHeight) {
      const remainder = noneCloneOptionsCount % this.visibleOptionsCount;
      if (remainder === 0) {
        element.scrollTo({
          top:
            this.optionHeight *
            (noneCloneOptionsCount - this.visibleOptionsCount),
        });
      } else {
        element.scrollTo({
          top: this.optionHeight * (noneCloneOptionsCount - remainder),
        });
      }
    }
  };

  private handleClick = (event: MouseEvent): void => {
    event.preventDefault();
    if (!this.isOpen) {
      this.open();
    }
  };

  private handleTimeChange = (event: InputEvent): void => {
    event.preventDefault();
    this.isChanged = true;
    this.isValidTime = true;
    const el = event.target as HTMLInputElement;
    this.debouncedTimeInput(el.value);
  };

  private handleConfirm = (event: MouseEvent): void => {
    event.preventDefault();
    this.close();
  };

  private handleOptionSelect = (event: MouseEvent): void => {
    event.preventDefault();
    const option = event.target as HTMLButtonElement;

    switch (option.name) {
      case 'hourOption': {
        if (this.hourOptions.length > this.visibleOptionsCount) {
          this.scrollToSelectedOption(option);
        } else {
          this.hourOptions = this.startOptionsWithSelectedOption(
            option.value,
            this.hourOptions,
          );
        }
        this.selectedHour = option.value;
        break;
      }
      case 'minuteOption': {
        if (this.minuteOptions.length > this.visibleOptionsCount) {
          this.scrollToSelectedOption(option);
        } else {
          this.minuteOptions = this.startOptionsWithSelectedOption(
            option.value,
            this.minuteOptions,
          );
        }
        this.selectedMinute = option.value;
        break;
      }
      case 'periodOption': {
        this.periodOptions = this.startOptionsWithSelectedOption(
          option.value,
          this.periodOptions,
        );
        this.selectedPeriod = option.value;
        break;
      }
      default:
        break;
    }

    setTimeout(() => {
      this.timeInputElement?.focus();
    }, 100);

    this.tabCount = 4;
    this.activeOptionsWrapper = undefined;
  };

  private debouncedTimeInput = debounce((debouncedValue: string): void => {
    let newDebouncedValue = debouncedValue;
    newDebouncedValue = newDebouncedValue.replace(/\s+/g, '');

    const time = this.parseValueToTime(newDebouncedValue);
    this.updateTimeControl(time);

    if (this.isValidTime) {
      this.time = time;
    }
  }, 1000);

  private parseValueToTime = (value: string): Time => {
    const time: Time = {};
    const hourPattern: RegExp = /^(0?[1-9]|1\d|2[0-4])$/;
    const timePattern: RegExp = /^(\d{1,2}):(\d{2})(?:\s*([AP]M))?$/i;

    if (hourPattern.test(value)) {
      const match = value.match(hourPattern);

      let hour = match[1];

      if (parseInt(hour) >= 12 && !this.militaryTime) {
        hour = String(parseInt(hour) % 12).padStart(2, '0');
      } else {
        hour = String(parseInt(hour)).padStart(2, '0');
      }

      time.hour = hour;
    } else if (timePattern.test(value)) {
      const match = value.match(timePattern);

      let hour = match[1];
      let minute = match[2];
      let period = match[3]?.toUpperCase();

      if (parseInt(hour) >= 12 && !this.militaryTime) {
        hour = String(parseInt(hour) % 12).padStart(2, '0');
        period = period || 'PM';
      } else {
        hour = String(parseInt(hour)).padStart(2, '0');
        period = period || 'AM';
      }

      const minuteRemainder = parseInt(minute) % this.minuteInterval;
      if (minuteRemainder > 0) {
        minute = String(parseInt(minute) - minuteRemainder).padStart(2, '0');
      }

      time.hour = hour;
      time.minute = minute;
      time.period = period;
    } else {
      this.isValidTime = false;
    }

    return time;
  };

  private updateTimeControl = (time: Time): void => {
    const hourOptions = Array.from(
      this.hourOptionsWrapper.querySelectorAll(
        '.dc-time-picker-time-option:not(.dc-time-picker-time-option-clone)',
      ),
    ) as HTMLButtonElement[];
    const firstHourOption = hourOptions[0] as HTMLButtonElement;
    if (hourOptions.length > this.visibleOptionsCount) {
      const hourOption = hourOptions.find(
        (option: HTMLButtonElement) => option.value === time.hour,
      );
      this.scrollToSelectedOption(hourOption || firstHourOption);
    } else {
      this.hourOptions = this.startOptionsWithSelectedOption(
        time.hour || firstHourOption.value,
        this.hourOptions,
      );
    }
    this.selectedHour = time.hour;

    const minuteOptions = Array.from(
      this.minuteOptionsWrapper.querySelectorAll(
        '.dc-time-picker-time-option:not(.dc-time-picker-time-option-clone)',
      ),
    ) as HTMLButtonElement[];
    const firstMinuteOption = minuteOptions[0] as HTMLButtonElement;
    if (minuteOptions.length > this.visibleOptionsCount) {
      const minuteOption = minuteOptions.find(
        (option: HTMLButtonElement) => option.value === time.minute,
      );
      this.scrollToSelectedOption(minuteOption || firstMinuteOption);
    } else {
      this.minuteOptions = this.startOptionsWithSelectedOption(
        time.minute || firstMinuteOption.value,
        this.minuteOptions,
      );
    }
    this.selectedMinute = time.minute;

    this.periodOptions = this.startOptionsWithSelectedOption(
      time.period || 'AM',
      this.periodOptions,
    );
    this.selectedPeriod = time.period;
  };

  private scrollToSelectedOption = (option: HTMLButtonElement): void => {
    let totalScrollTop: number;
    const optionsWrapper = option.parentNode as HTMLDivElement;
    const options = Array.from(
      optionsWrapper.querySelectorAll(
        '.dc-time-picker-time-option:not(.dc-time-picker-time-option-clone)',
      ),
    ) as HTMLButtonElement[];
    const optionIndex = options.indexOf(option);
    if (optionIndex >= 0) {
      totalScrollTop = this.optionHeight * optionIndex;
    } else {
      // Get all clone options
      const cloneOptions = Array.from(
        optionsWrapper.querySelectorAll('.dc-time-picker-time-option-clone'),
      ) as HTMLButtonElement[];
      const cloneChildIndex = cloneOptions.indexOf(option);
      totalScrollTop = this.optionHeight * cloneChildIndex;
    }
    optionsWrapper.scrollTo({ top: totalScrollTop });
  };

  private startOptionsWithSelectedOption = (
    option: string,
    options: string[],
  ): string[] => {
    // New options
    const newOptions: string[] = [...options];
    // Find the index of the selected element
    const selectedIndex = newOptions.indexOf(option);
    // If the selected element is found, rearrange the array
    if (selectedIndex !== -1) {
      // Move the selected element to the beginning of the array
      const removedElement = newOptions.splice(selectedIndex, 1)[0];
      newOptions.unshift(removedElement);
    }
    return newOptions;
  };

  private open = (): void => {
    if (this.disabled) {
      return;
    }

    this.isOpen = true;

    setTimeout(() => this.timeInputElement?.focus(), 100);
  };

  private close = (): void => {
    this.isOpen = false;

    if (this.timeInputElement?.value === '') {
      this.isChanged = false;
    }
  };

  // Accessibility
  private handleKeyUp = (event: KeyboardEvent): void => {
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
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled) {
      return;
    }

    switch (event.key) {
      case 'Tab':
        this.changeOptionFocus(event);
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        this.changeActiveSelection(event);
        break;
      default:
        break;
    }
  };

  private changeOptionFocus = (event: KeyboardEvent): void => {
    setTimeout(() => {
      const activeElement = document.activeElement;

      if (activeElement.classList.contains('dc-time-picker-time-option')) {
        const parent = activeElement.parentNode as HTMLDivElement;
        const children = Array.from(
          parent.querySelectorAll('.dc-time-picker-time-option'),
        ) as HTMLButtonElement[];
        const childIndex = children.indexOf(activeElement as HTMLButtonElement);
        let tabCount = this.tabCount;

        if (event.key === 'Tab') {
          // Focus first on first tab
          if (
            this.activeOptionsWrapper === undefined &&
            this.activeOptionsWrapper !== parent
          ) {
            const firstChild = children[0] as HTMLButtonElement;
            firstChild.focus();
            this.scrollToSelectedOption(firstChild);
            this.activeOptionsWrapper = parent;
          }

          if (event.shiftKey) {
            const isLastChild = childIndex + 1 === children.length;
            if (isLastChild) {
              const noCloneChildCount = children.length / 2;
              const lastNoCloneChild = children[
                childIndex - noCloneChildCount
              ] as HTMLButtonElement;
              lastNoCloneChild.focus();
              return;
            }

            if (childIndex >= this.visibleOptionsCount) {
              const remainder = (childIndex + 1) % this.visibleOptionsCount;
              if (remainder === 0) {
                const child = children[
                  childIndex + 1 - this.visibleOptionsCount
                ] as HTMLButtonElement;
                this.scrollToSelectedOption(child);
                tabCount -= this.visibleOptionsCount;
              }
            } else {
              const child = children[0] as HTMLButtonElement;
              this.scrollToSelectedOption(child);
              tabCount = this.visibleOptionsCount;
            }
          } else {
            if (childIndex === tabCount) {
              const noCloneChildCount = children.length / 2;
              if (children.length - childIndex <= noCloneChildCount) {
                const childIndexToFocus = childIndex - noCloneChildCount;
                const child = children[childIndexToFocus] as HTMLButtonElement;
                child.focus();
                this.scrollToSelectedOption(child);
                tabCount = childIndexToFocus + this.visibleOptionsCount;
              } else {
                const child = children[childIndex] as HTMLButtonElement;
                this.scrollToSelectedOption(child);
                tabCount += this.visibleOptionsCount;
              }
            }
          }
        }

        this.tabCount = tabCount;
      } else {
        this.tabCount = 4;
        this.activeOptionsWrapper = undefined;
      }
    }, 100);
  };

  private changeActiveSelection = (event: KeyboardEvent): void => {
    setTimeout(() => {
      const activeElement = document.activeElement;

      if (activeElement.classList.contains('dc-time-picker-time-option')) {
        let currentValue: string;

        const currentSelection =
          this.activeOptionsWrapper || this.hourOptionsWrapper;
        let leftSelection: HTMLDivElement;
        let rightSelection: HTMLDivElement;

        if (currentSelection === this.hourOptionsWrapper) {
          currentValue = this.selectedHour;

          leftSelection = this.militaryTime
            ? this.minuteOptionsWrapper
            : this.periodOptionsWrapper;
          rightSelection = this.minuteOptionsWrapper;
        } else if (currentSelection === this.minuteOptionsWrapper) {
          currentValue = this.selectedMinute;

          leftSelection = this.hourOptionsWrapper;
          rightSelection = this.militaryTime
            ? this.hourOptionsWrapper
            : this.periodOptionsWrapper;
        } else if (currentSelection === this.periodOptionsWrapper) {
          currentValue = this.selectedPeriod;

          leftSelection = this.minuteOptionsWrapper;
          rightSelection = this.hourOptionsWrapper;
        }

        // Reset scroll top of current wrapper before moving to another wrapper
        this.initScrollTop(currentSelection, currentValue);

        if (event.key === 'ArrowLeft') {
          this.initScrollTop(leftSelection);
          this.activeOptionsWrapper = leftSelection;
        }

        if (event.key === 'ArrowRight') {
          this.initScrollTop(rightSelection);
          this.activeOptionsWrapper = rightSelection;
        }

        this.tabCount = 4;
      }
    }, 100);
  };

  private initScrollTop = (wrapper: HTMLDivElement, selectedValue?: string) => {
    const options = Array.from(
      wrapper.querySelectorAll(
        '.dc-time-picker-time-option:not(.dc-time-picker-time-option-clone)',
      ),
    ) as HTMLButtonElement[];
    let optionToFocus = options[0] as HTMLButtonElement;

    if (selectedValue !== undefined) {
      optionToFocus = options.find(
        (option: HTMLButtonElement) => option.value === selectedValue,
      );
    }

    optionToFocus.focus();
    this.scrollToSelectedOption(optionToFocus);
  };

  private getHourOptionActiveClass = (value: string): string => {
    if (this.selectedHour === value) {
      return 'dc-time-picker-option-active';
    }
    return;
  };

  private getMinuteOptionActiveClass = (value: string): string => {
    if (this.selectedMinute === value) {
      return 'dc-time-picker-option-active';
    }
    return;
  };

  private getPeriodOptionActiveClass = (value: string): string => {
    if (this.selectedPeriod === value) {
      return 'dc-time-picker-option-active';
    }
    return;
  };

  private renderTimePickerInput() {
    return (
      <Fragment>
        <label
          class="dc-time-picker-label"
          htmlFor={this.inputId}
          tabIndex={-1}>
          {this.label}
        </label>
        {this.value}
      </Fragment>
    );
  }

  private renderTimePickerControl() {
    return (
      <Fragment>
        <div class="dc-time-picker-control-content">
          <input
            tabIndex={this.isOpen ? 0 : -1}
            ref={(el: HTMLInputElement) => (this.timeInputElement = el)}
            name={this.name}
            id={this.inputId}
            placeholder={this.placeholder}
            required={this.required}
            form={this.form}
            onInput={this.handleTimeChange}
            value={this.value}
          />
          <div class="dc-time-picker-control-container">
            <div class="dc-time-picker-time-control-container">
              <div
                class="dc-time-picker-options-wrapper"
                ref={(el: HTMLDivElement) => (this.hourOptionsWrapper = el)}>
                {this.hourOptions.map((option: string) => (
                  <button
                    name="hourOption"
                    class={`dc-time-picker-time-option ${this.getHourOptionActiveClass(
                      option,
                    )}`}
                    value={option}
                    onClick={this.handleOptionSelect}>
                    {option}
                  </button>
                ))}
                {/* clone options */}
                {this.hourOptions.length > this.visibleOptionsCount &&
                  this.hourOptions.map((option: string) => (
                    <button
                      name="hourOption"
                      class={`dc-time-picker-time-option dc-time-picker-time-option-clone ${this.getHourOptionActiveClass(
                        option,
                      )}`}
                      value={option}
                      onClick={this.handleOptionSelect}>
                      {option}
                    </button>
                  ))}
              </div>
              <div class="dc-time-picker-divider"></div>
              <div
                class="dc-time-picker-options-wrapper"
                ref={(el: HTMLDivElement) => (this.minuteOptionsWrapper = el)}>
                {this.minuteOptions.map((option: string) => (
                  <button
                    name="minuteOption"
                    class={`dc-time-picker-time-option ${this.getMinuteOptionActiveClass(
                      option,
                    )}`}
                    value={option}
                    onClick={this.handleOptionSelect}>
                    {option}
                  </button>
                ))}
                {/* clone options */}
                {this.minuteOptions.length > this.visibleOptionsCount &&
                  this.minuteOptions.map((option: string) => (
                    <button
                      name="minuteOption"
                      class={`dc-time-picker-time-option dc-time-picker-time-option-clone ${this.getMinuteOptionActiveClass(
                        option,
                      )}`}
                      value={option}
                      onClick={this.handleOptionSelect}>
                      {option}
                    </button>
                  ))}
              </div>
              {!this.militaryTime && (
                <Fragment>
                  <div class="dc-time-picker-divider"></div>
                  <div
                    class="dc-time-picker-options-wrapper"
                    ref={(el: HTMLDivElement) =>
                      (this.periodOptionsWrapper = el)
                    }>
                    {this.periodOptions.map((option: string) => (
                      <button
                        name="periodOption"
                        class={`dc-time-picker-time-option ${this.getPeriodOptionActiveClass(
                          option,
                        )}`}
                        value={option}
                        onClick={this.handleOptionSelect}>
                        {option}
                      </button>
                    ))}
                  </div>
                </Fragment>
              )}
            </div>
            <div class="dc-time-picker-confirm-container">
              <datacom-button
                variant="secondary"
                size="small"
                disabled={this.disabled}
                onClick={this.handleConfirm}>
                Confirm
              </datacom-button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  render() {
    const classes = {
      'dc-time-picker-disabled': this.disabled,
      'dc-time-picker-open': this.isOpen,
      'dc-time-picker-changed': this.value !== '' || this.isChanged,
      'dc-time-picker-error': this.isInError || this.isValid == false,
      'dc-time-picker': true,
    };

    return (
      <Host>
        <div
          class={classes}
          onKeyUp={this.handleKeyUp}
          onKeyDown={this.handleKeyDown}
          onClick={this.handleClick}>
          <div tabIndex={!this.disabled ? 0 : -1} class="dc-time-picker-input">
            {this.renderTimePickerInput()}
          </div>
          <p tabIndex={-1} class="dc-time-picker-error-msg">
            {this.message}
          </p>
          <div tabIndex={-1} class="dc-time-picker-control">
            {this.renderTimePickerControl()}
          </div>
          <button class="dc-time-picker-clock" disabled={this.disabled}>
            {getSvg('clock', { class: 'dc-time-picker-clock-icon' })}
          </button>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomTimePickerElement = HTMLElement & DatacomTimePicker;
