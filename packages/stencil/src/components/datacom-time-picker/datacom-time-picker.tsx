import {
  Component,
  Element,
  Event,
  EventEmitter,
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

type HourPeriod = {
  hour?: string;
  period?: string;
};

@Component({
  tag: 'datacom-time-picker',
  styleUrl: 'datacom-time-picker.css',
  scoped: true,
})
export class DatacomTimePicker implements FormControl {
  private inputElement: HTMLInputElement;
  private timeInputElement: HTMLInputElement;
  private formElement: HTMLFormElement;
  private hourOptionsWrapper: HTMLDivElement;
  private minuteOptionsWrapper: HTMLDivElement;
  private periodOptionsWrapper: HTMLDivElement;
  private optionHeight: number = 56;
  private visibleOptionsCount: number = 4;
  private inputId = randomString();

  @Element() private host: HTMLDatacomTimePickerElement;

  @Event({ bubbles: true, composed: true }) changed: EventEmitter<string>;

  @Prop() name: string;
  @Prop({ mutable: true }) value?: string = '';
  @Prop() placeholder?: string = 'Select item(s)';
  @Prop() disabled?: boolean = false;
  @Prop() readonly?: boolean = false;
  @Prop() required?: boolean = false;
  @Prop() form?: string;
  @Prop() title: string;

  @Prop() label: string;
  @Prop() minuteInterval?: number = 1;
  @Prop() militaryTime?: boolean = false;

  @Prop() message?: string;
  @Prop({ attribute: 'valid' }) isValid?: boolean;
  @Prop() autoValidate?: boolean = true;

  @State() transientValue: string;
  @State() time: Time;
  @State() isValidTime: boolean = true;
  @State() isInError: boolean = false;
  @State() isOpen: boolean = false;
  @State() isChanged: boolean = false;
  @State() isOnInputChange: boolean = false;
  @State() selectedHour: string;
  @State() selectedMinute: string;
  @State() selectedPeriod: string;
  @State() hourOptions: string[] = [];
  @State() minuteOptions: string[] = [];
  @State() periodOptions: string[] = [];
  @State() activeOptionsWrapper: HTMLDivElement;
  @State() activeOptionIndex: number;
  @State() tabCount: number;

  @Listen('click', { target: 'document' })
  handleOutsideClick(event: MouseEvent): void {
    if (!this.isOpen || this.disabled) {
      return;
    }

    if (!this.host.contains(event.target as Node)) {
      this.close();
    }
  }

  @Listen('keydown', { capture: true })
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen || this.disabled) {
      event.preventDefault();
      return;
    }

    switch (event.key) {
      case 'Tab':
        this.changeOptionFocusOnTab();
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        this.changeActiveSelection(event);
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        this.changeActiveOption(event);
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

  @Method()
  async validate(): Promise<boolean> {
    this.isInError = !(await this.checkValidity());

    return this.isInError;
  }

  @Method()
  async checkValidity(): Promise<boolean> {
    if (this.isValidTime) {
      this.inputElement.value = this.timeInputElement.value;
    } else {
      this.inputElement.value = '';
    }
    return this.inputElement.checkValidity();
  }

  @Watch('time')
  watchTime(newTime: Time): void {
    let time: string = this.timeInputElement.value;
    if (newTime.hour !== undefined) {
      time = `${newTime.hour}:`;
    }
    if (newTime.minute !== undefined) {
      time = `${time}${newTime.minute}`;
    }
    if (newTime.period !== undefined) {
      time = `${time} ${newTime.period}`;
    }
    this.transientValue = time;
  }

  @Watch('minuteInterval')
  watchMinuteInterval(): void {
    this.initMinuteOptions();
  }

  @Watch('militaryTime')
  watchMilitaryTime(): void {
    this.initHourOptions();
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

  private initOptions = (): void => {
    this.initHourOptions();
    this.initMinuteOptions();
    this.initPeriodOptions();
  };

  private initHourOptions = (): void => {
    let hourOptions: string[] = [];
    const hour: number = this.militaryTime ? 24 : 12;
    const hourStart: number = this.militaryTime ? 0 : 1;
    for (let i: number = hourStart; i <= hour; i++) {
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
    const minute: number = 60 / this.minuteInterval;
    const minuteStart: number = 0;
    for (let i: number = minuteStart; i < minute; i++) {
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

  private submitForm = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();

    const valid = await this.checkValidity();
    if (!valid) {
      this.isInError = true;
    }
  };

  private scrollUpdate = (event: Event): void => {
    const optionsWrapper: HTMLDivElement = event.target as HTMLDivElement;

    const options: HTMLButtonElement[] = Array.from(
      optionsWrapper.querySelectorAll<HTMLButtonElement>(
        '.dc-time-picker-time-option',
      ),
    );

    const noneCloneOptionsCount: number = options.length / 2;

    if (
      optionsWrapper.scrollTop ===
      optionsWrapper.scrollHeight - optionsWrapper.clientHeight
    ) {
      const remainder: number =
        noneCloneOptionsCount % this.visibleOptionsCount;
      if (remainder === 0) {
        optionsWrapper.scrollTo({
          top:
            this.optionHeight *
            (noneCloneOptionsCount - this.visibleOptionsCount),
        });
      } else {
        optionsWrapper.scrollTo({
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

  private handleConfirm = (event: MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    this.isInError = false;
    this.value = this.timeInputElement.value;
    this.changed.emit(this.timeInputElement.value);
    this.close();
  };

  private handleOptionSelect = (event: MouseEvent): void => {
    event.preventDefault();
    this.isChanged = true;
    this.isOnInputChange = false;
    this.isValidTime = true;
    const option: HTMLButtonElement = event.target as HTMLButtonElement;

    const newTime: Time = { ...this.time };
    if (option.name === 'hourOption') {
      newTime.hour = option.value;
    } else if (option.name === 'minuteOption') {
      newTime.minute = option.value;
    } else if (option.name === 'periodOption') {
      newTime.period = option.value;
    }

    this.updateTimeControl(newTime);

    this.time = newTime;

    setTimeout((): void => {
      this.timeInputElement.focus();
    }, 100);
  };

  private handleTimeChange = (event: InputEvent): void => {
    event.preventDefault();
    this.isChanged = true;
    this.isOnInputChange = true;
    this.isValidTime = true;
    const el: HTMLInputElement = event.target as HTMLInputElement;
    this.debouncedTimeInput(el.value);
  };

  private debouncedTimeInput = debounce((debouncedValue: string): void => {
    this.populateTime(debouncedValue.replace(/\s+/g, ''));
  }, 500);

  private populateTime = (value: string): void => {
    const time: Time = this.parseValueToTime(value);

    this.updateTimeControl(time);

    this.time = time;
  };

  private parseValueToTime = (value: string): Time => {
    const time: Time = {};
    const hourPattern: RegExp = /^(0?\d|1\d|2[0-3])(:)?$/;
    const timePattern: RegExp = /^(\d{1,2}):(\d{2})(?:\s*([AP]M))?$/i;
    const militaryTimePattern: RegExp = /^(0?\d|1\d|2[0-3]):([0-5]?\d)$/;

    if (hourPattern.test(value)) {
      const match: RegExpMatchArray = value.match(hourPattern);

      const hour: string = match[1];

      time.hour = this.parseHour(hour).hour;

      this.isValidTime = false;
    } else if (militaryTimePattern.test(value)) {
      const match: RegExpMatchArray = value.match(militaryTimePattern);

      const hour: string = match[1];
      const minute: string = match[2];

      time.hour = this.parseHour(hour).hour;
      time.minute = this.parseMinute(minute);
      time.period = this.parseHour(hour).period;

      if (!this.militaryTime) {
        this.isValidTime = false;
      }
    } else if (timePattern.test(value)) {
      const match: RegExpMatchArray = value.match(timePattern);

      const hour: string = match[1];
      const minute: string = match[2];
      const period: string = match[3]?.toUpperCase();

      time.hour = this.parseHour(hour).hour;
      time.minute = this.parseMinute(minute);
      time.period = period;
    } else {
      this.isValidTime = false;
    }

    return time;
  };

  private parseHour = (value: string): HourPeriod => {
    const hourPeriod: HourPeriod = {};
    if (!this.militaryTime && parseInt(value) === 0) {
      hourPeriod.hour = '12';
      hourPeriod.period = 'AM';
    } else if (!this.militaryTime && parseInt(value) > 12) {
      hourPeriod.hour = String(parseInt(value) - 12).padStart(2, '0');
      hourPeriod.period = 'PM';
    } else {
      hourPeriod.hour = String(parseInt(value)).padStart(2, '0');
    }
    return hourPeriod;
  };

  private parseMinute = (value: string): string => {
    let minute: string = value;
    const minuteRemainder: number = parseInt(minute) % this.minuteInterval;
    if (minuteRemainder > 0) {
      minute = String(parseInt(minute) - minuteRemainder).padStart(2, '0');
    }
    return minute;
  };

  private updateTimeControl = (time: Time): void => {
    if (this.hourOptions.length > this.visibleOptionsCount) {
      this.initScrollTop(this.hourOptionsWrapper, time.hour);
    } else {
      this.hourOptions = this.startOptionsWithSelectedOption(
        time.hour,
        this.hourOptions,
      );
    }
    this.selectedHour = time.hour;

    if (this.minuteOptions.length > this.visibleOptionsCount) {
      this.initScrollTop(this.minuteOptionsWrapper, time.minute);
    } else {
      this.minuteOptions = this.startOptionsWithSelectedOption(
        time.minute,
        this.minuteOptions,
      );
    }
    this.selectedMinute = time.minute;

    this.periodOptions = this.startOptionsWithSelectedOption(
      time.period,
      this.periodOptions,
    );
    this.selectedPeriod = time.period;
  };

  private scrollToSelectedOption = (option: HTMLButtonElement): void => {
    let totalScrollTop: number;
    const optionsWrapper: HTMLDivElement = option.parentNode as HTMLDivElement;
    const options: HTMLButtonElement[] = Array.from(
      optionsWrapper.querySelectorAll<HTMLButtonElement>(
        '.dc-time-picker-time-option:not(.dc-time-picker-time-option-clone)',
      ),
    );
    const optionIndex = options.indexOf(option);
    if (optionIndex >= 0) {
      totalScrollTop = this.optionHeight * optionIndex;
    } else {
      // Get all clone options
      const cloneOptions: HTMLButtonElement[] = Array.from(
        optionsWrapper.querySelectorAll<HTMLButtonElement>(
          '.dc-time-picker-time-option-clone',
        ),
      );
      const cloneOptionIndex: number = cloneOptions.indexOf(option);
      totalScrollTop = this.optionHeight * cloneOptionIndex;
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

    if (!this.isOpen) {
      this.isOpen = true;

      setTimeout(() => {
        this.populateTime(this.value);
        this.timeInputElement.focus();
      }, 100);
    }
  };

  private close = (): void => {
    this.transientValue = this.value;

    if (this.value === '') {
      this.isChanged = false;
    }

    setTimeout(() => {
      this.populateTime(this.value);
    }, 100);

    this.isOpen = false;
  };

  // Accessibility
  private changeOptionFocusOnTab = (): void => {
    setTimeout((): void => {
      const activeElement: Element = document.activeElement;

      const timeInputElement: HTMLInputElement = this.timeInputElement;
      const confirmButtonElement = this.host.querySelector<HTMLButtonElement>(
        '.dc-time-picker-confirm button',
      );
      const tabLoopStart: HTMLDivElement =
        this.host.querySelector<HTMLDivElement>(
          '.dc-time-picker-tab-loop-start',
        );
      const tabLoopEnd: HTMLDivElement =
        this.host.querySelector<HTMLDivElement>('.dc-time-picker-tab-loop-end');
      const controlInStart: HTMLDivElement =
        this.host.querySelector<HTMLDivElement>(
          '.dc-time-picker-control-in-start',
        );
      const controlOutStart: HTMLDivElement =
        this.host.querySelector<HTMLDivElement>(
          '.dc-time-picker-control-out-start',
        );
      const controlInEnd: HTMLDivElement =
        this.host.querySelector<HTMLDivElement>(
          '.dc-time-picker-control-in-end',
        );
      const controlOutEnd: HTMLDivElement =
        this.host.querySelector<HTMLDivElement>(
          '.dc-time-picker-control-out-end',
        );

      if (activeElement === tabLoopStart) {
        confirmButtonElement.focus();
      } else if (activeElement === tabLoopEnd) {
        timeInputElement.focus();
      } else if (
        activeElement === controlInStart ||
        activeElement === controlInEnd
      ) {
        this.initScrollTop(this.hourOptionsWrapper, this.selectedHour, true);
        this.activeOptionsWrapper = this.hourOptionsWrapper;
        this.tabCount = 4 + this.activeOptionIndex;
      } else if (activeElement === controlOutStart) {
        timeInputElement.focus();
      } else if (activeElement === controlOutEnd) {
        confirmButtonElement.focus();
      }
    }, 100);
  };

  private changeActiveSelection = (event: KeyboardEvent): void => {
    setTimeout((): void => {
      const activeElement: Element = document.activeElement;

      if (activeElement.classList.contains('dc-time-picker-time-option')) {
        let currentValue: string;
        let leftValue: string;
        let rightValue: string;

        const currentSelection: HTMLDivElement = this.activeOptionsWrapper;
        let leftSelection: HTMLDivElement;
        let rightSelection: HTMLDivElement;

        if (currentSelection === this.hourOptionsWrapper) {
          currentValue = this.selectedHour;

          if (this.militaryTime) {
            leftSelection = this.minuteOptionsWrapper;
            leftValue = this.selectedMinute;
          } else {
            leftSelection = this.periodOptionsWrapper;
            leftValue = this.selectedPeriod;
          }

          rightSelection = this.minuteOptionsWrapper;
          rightValue = this.selectedMinute;
        } else if (currentSelection === this.minuteOptionsWrapper) {
          currentValue = this.selectedMinute;

          leftSelection = this.hourOptionsWrapper;
          leftValue = this.selectedHour;

          if (this.militaryTime) {
            rightSelection = this.hourOptionsWrapper;
            rightValue = this.selectedHour;
          } else {
            rightSelection = this.periodOptionsWrapper;
            rightValue = this.selectedPeriod;
          }
        } else if (currentSelection === this.periodOptionsWrapper) {
          currentValue = this.selectedPeriod;

          leftSelection = this.minuteOptionsWrapper;
          leftValue = this.selectedMinute;

          rightSelection = this.hourOptionsWrapper;
          rightValue = this.selectedHour;
        }

        // Reset scroll top of current wrapper before moving to another wrapper
        this.initScrollTop(currentSelection, currentValue);

        if (event.key === 'ArrowLeft') {
          this.initScrollTop(leftSelection, leftValue, true);
          this.activeOptionsWrapper = leftSelection;
        } else if (event.key === 'ArrowRight') {
          this.initScrollTop(rightSelection, rightValue, true);
          this.activeOptionsWrapper = rightSelection;
        }

        this.tabCount = 4;
      }
    }, 100);
  };

  private changeActiveOption = (event: KeyboardEvent): void => {
    event.preventDefault();
    setTimeout((): void => {
      const activeElement: Element = document.activeElement;

      if (activeElement.classList.contains('dc-time-picker-time-option')) {
        const activeOptionsWrapper: HTMLDivElement = this.activeOptionsWrapper;
        const options: HTMLButtonElement[] = Array.from(
          activeOptionsWrapper.querySelectorAll<HTMLButtonElement>(
            '.dc-time-picker-time-option',
          ),
        );

        let tabCount: number = this.tabCount;
        let activeOptionIndex: number;

        if (event.key === 'ArrowDown') {
          activeOptionIndex = this.activeOptionIndex + 1;
          const activeOption: HTMLButtonElement = options[activeOptionIndex];
          activeOption.focus();

          if (activeOptionIndex === tabCount) {
            const noCloneOptionCount: number = options.length / 2;

            if (options.length - activeOptionIndex <= noCloneOptionCount) {
              const optionIndex: number =
                activeOptionIndex - noCloneOptionCount;
              const option: HTMLButtonElement = options[optionIndex];
              option.focus();

              this.scrollToSelectedOption(option);

              tabCount = optionIndex + this.visibleOptionsCount;
              activeOptionIndex = optionIndex;
            } else {
              const option: HTMLButtonElement = options[activeOptionIndex];
              option.focus();

              this.scrollToSelectedOption(option);

              tabCount += this.visibleOptionsCount;
            }
          }
        } else if (event.key === 'ArrowUp') {
          activeOptionIndex =
            this.activeOptionIndex > 0 ? this.activeOptionIndex - 1 : 0;
          const newTabCount = tabCount - this.visibleOptionsCount;

          if (activeOptionIndex < newTabCount) {
            let option: HTMLButtonElement;
            const optionIndex: number =
              activeOptionIndex + 1 - this.visibleOptionsCount;

            if (optionIndex > 0) {
              option = options[optionIndex];
            } else {
              option = options[0];
            }

            this.scrollToSelectedOption(option);

            tabCount = newTabCount;
          }

          options[activeOptionIndex].focus();
        }

        this.activeOptionIndex = activeOptionIndex;
        this.tabCount = tabCount;
      }
    }, 100);
  };

  private initScrollTop = (
    wrapper: HTMLDivElement,
    selectedValue: string,
    autoFocus?: boolean,
  ): void => {
    const options: HTMLButtonElement[] = Array.from(
      wrapper.querySelectorAll<HTMLButtonElement>(
        '.dc-time-picker-time-option:not(.dc-time-picker-time-option-clone)',
      ),
    );

    let option: HTMLButtonElement = options[0];
    let optionIndex: number = 0;

    if (selectedValue !== undefined) {
      option = options.find(
        (option: HTMLButtonElement): boolean => option.value === selectedValue,
      );
      optionIndex = options.indexOf(option);
    }

    if (autoFocus) {
      option.focus();
    }

    this.scrollToSelectedOption(option);

    this.activeOptionIndex = optionIndex;
  };

  private getHourOptionActiveClass = (value: string): string => {
    if (this.selectedHour === value) {
      return 'dc-time-picker-option-active';
    }
    return '';
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
    return <Fragment>{this.value}</Fragment>;
  }

  private renderTimePickerControl() {
    return (
      <Fragment>
        <div class="dc-time-picker-control-content">
          <div
            class="dc-time-picker-tab-loop-start"
            tabIndex={this.isOpen ? 0 : -1}></div>
          <input
            tabIndex={this.isOpen ? 0 : -1}
            ref={(el: HTMLInputElement) => (this.timeInputElement = el)}
            id={this.inputId}
            placeholder={this.placeholder}
            required={this.required}
            onInput={this.handleTimeChange}
            value={this.transientValue}
          />
          <div class="dc-time-picker-control-container">
            <div
              class="dc-time-picker-control-in-start"
              tabIndex={this.isOpen ? 0 : -1}></div>
            <div
              class="dc-time-picker-control-out-start"
              tabIndex={this.isOpen ? 0 : -1}></div>
            <div class="dc-time-picker-time-control-container">
              <div
                class="dc-time-picker-options-wrapper"
                ref={(el: HTMLDivElement) => (this.hourOptionsWrapper = el)}>
                {this.hourOptions.map((option: string) => (
                  <button
                    tabIndex={-1}
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
                      tabIndex={-1}
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
                    tabIndex={-1}
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
                      tabIndex={-1}
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
                        tabIndex={-1}
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
            <div
              class="dc-time-picker-control-out-end"
              tabIndex={this.isOpen ? 0 : -1}></div>
            <div
              class="dc-time-picker-control-in-end"
              tabIndex={this.isOpen ? 0 : -1}></div>
            <div class="dc-time-picker-confirm-container">
              <datacom-button
                class="dc-time-picker-confirm"
                variant="secondary"
                size="small"
                disabled={this.disabled}
                onClick={this.handleConfirm}>
                Confirm
              </datacom-button>
            </div>
          </div>
          <div
            class="dc-time-picker-tab-loop-end"
            tabIndex={this.isOpen ? 0 : -1}></div>
        </div>
      </Fragment>
    );
  }

  private renderLabel() {
    return (
      <label class="dc-time-picker-label" htmlFor={this.inputId} tabIndex={-1}>
        {this.label}
      </label>
    );
  }

  private renderClockIcon() {
    return (
      <button class="dc-time-picker-clock" disabled={this.disabled}>
        {getSvg('clock', { class: 'dc-time-picker-clock-icon' })}
      </button>
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
        <div class={classes} onClick={this.handleClick}>
          <div tabIndex={-1} class="dc-time-picker-control">
            {this.renderClockIcon()}
            {this.renderLabel()}
            {this.renderTimePickerControl()}
          </div>
          <div tabIndex={!this.disabled ? 0 : -1} class="dc-time-picker-input">
            {this.renderClockIcon()}
            {this.renderLabel()}
            {this.renderTimePickerInput()}
          </div>
          <p tabIndex={-1} class="dc-time-picker-error-msg">
            {this.message}
          </p>
        </div>

        <input
          class="dc-time-picker-input-hidden"
          ref={(el: HTMLInputElement) => (this.inputElement = el)}
          name={this.name}
          required={this.required}
          form={this.form}
        />
      </Host>
    );
  }
}

export type HTMLDatacomTimePickerElement = HTMLElement & DatacomTimePicker;
