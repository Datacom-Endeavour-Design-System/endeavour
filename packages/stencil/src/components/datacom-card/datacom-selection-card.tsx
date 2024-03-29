import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Listen } from '@stencil/core';
import { HTMLDatacomRadioElement } from '../datacom-radio/datacom-radio';
import { getSvg } from '../../common/images/icon-provider';

/**
 * Cards components are used to display content and actions about a
 * single subject, providing at-a-glance information and easy access
 * to more details.
 *
 * Selection cards are components used for displaying a set of options
 * relating to a subject that requires users to choose a single option.
 */
@Component({
  tag: 'datacom-selection-card',
  styleUrl: 'datacom-selection-card.css',
  shadow: true,
})
export class DatacomSelectionCard {
  @Element() host: HTMLElement;

  @Prop() cardTitle: string;
  @Prop() ctaText: string;
  @Prop() imageUrl: string;

  @State() expanded = false;
  @State() optionSelected: string;
  @State() hasOptionSlotElements = false;
  @State() hasDescriptionSlotElements = false;

  @Event() submitClicked: EventEmitter<string>;

  private children: HTMLDatacomRadioElement[] = [];

  /**
   * Click handler function when submit button is clicked.
   *
   * @param event - Click event of submit button
   */
  private onSubmitClick = (event: Event) => {
    event.preventDefault();
    this.submitClicked.emit(this.optionSelected);
  };

  /**
   * Click handler function when expand button is clicked.
   */
  private onExpandClick = () => {
    this.expanded = !this.expanded;
  };

  /**
   * Returns all radio components within this component.
   *
   * @returns
   */
  private getRadioComponents(): HTMLDatacomRadioElement[] {
    if (this.host == undefined) {
      return [];
    }

    if (this.children?.length > 0) {
      return this.children;
    }

    this.host.querySelectorAll<HTMLDatacomRadioElement>('datacom-radio').forEach(element => this.children.push(element));
    return this.children;
  }

  /**
   * Listener function on radio components.
   * Used to update currently selected option in state.
   *
   * @param event - Custom 'selected' state from radio component.
   */
  @Listen('selected', { capture: true })
  onRadioChange(event: CustomEvent<string>) {
    this.optionSelected = event.detail;
  }

  /**
   * Lifecycle function which applies shared name value to
   * radio components, establishing them as a radio group.
   *
   * Also checks for presence of slotted elements (info
   * needed for conditionally rendering said elements.)
   */
  async componentWillLoad(): Promise<void> {
    const children = this.getRadioComponents();
    children.forEach(option => {
      option.name = this.cardTitle + ' options';
      option.size = 'small';
      option.variant = 'button';
    });

    this.hasOptionSlotElements = !!this.host.querySelector('[slot="options"]');
    this.hasDescriptionSlotElements = !!this.host.querySelector('[slot="description"]');
  }

  render() {
    const chevronIcon = getSvg('chevron', { class: 'dc-card-chevron' });

    const mainClasses = {
      'dc-card': true,
      'expand': this.expanded,
    };

    const tagClasses = {
      'dc-card-tags': true,
      'with-image': this.imageUrl?.length > 0,
    };

    return (
      <Host>
        <div class={mainClasses}>
          <div class="dc-card-media-wrapper">
            <div class={tagClasses}>
              <slot name="tags" />
            </div>
            {this.imageUrl && <img class="dc-card-image" src={this.imageUrl} />}
          </div>
          <div class="dc-card-content-wrapper">
            <div class="dc-card-title-wrapper">
              {this.cardTitle && <div class="dc-card-title">{this.cardTitle}</div>}
              {this.hasDescriptionSlotElements && (
                <div class="dc-card-expand-wrapper">
                  <button class="dc-card-expand" onClick={this.onExpandClick}>
                    {chevronIcon}
                  </button>
                </div>
              )}
            </div>
            <form class="dc-card-form">
              {this.hasOptionSlotElements && (
                <div class="dc-card-options-wrapper">
                  <div class="dc-card-options">
                    <slot name="options" />
                  </div>
                </div>
              )}
              {this.ctaText && (
                <datacom-button class="dc-card-cta" variant="secondary" size="small" type="submit" onClick={this.onSubmitClick}>
                  {this.ctaText}
                </datacom-button>
              )}
            </form>
          </div>
          {this.hasDescriptionSlotElements && (
            <div class="dc-card-description-wrapper">
              <div class="dc-card-divider" />
              <div class="dc-card-description">
                <div class="dc-card-description-text">
                  <slot name="description" />
                </div>
              </div>
            </div>
          )}
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomSelectionCardElement = HTMLElement & DatacomSelectionCard;
