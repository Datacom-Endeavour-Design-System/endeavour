import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Listen } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

/**
 * Cards components are used to display content and actions about a
 * single subject, providing at-a-glance information and easy access
 * to more details.
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
   */
  async componentWillLoad(): Promise<void> {
    const children = this.getRadioComponents();
    children.forEach(option => {
      option.name = this.cardTitle + ' options';
      option.size = 'small';
      option.variant = 'button';
    });
  }

  render() {
    const chevronIcon = getSvg('chevron', { class: 'dc-card-chevron' });

    const mainClasses = {
      'dc-card': true,
      'expand': this.expanded,
    };

    return (
      <Host>
        <div class={mainClasses}>
          {this.imageUrl && (
            <div class="dc-card-media-wrapper">
              <div class="dc-card-tags">
                <slot name="tags" />
              </div>
              <div class="dc-card-image" style={{ backgroundImage: 'url(' + this.imageUrl + ')' }} />
            </div>
          )}
          <div class="dc-card-content-wrapper">
            <div class="dc-card-title-wrapper">
              <div class="dc-card-title">{this.cardTitle}</div>
              <div class="dc-card-expand-wrapper">
                <button class="dc-card-expand" onClick={this.onExpandClick}>
                  {chevronIcon}
                </button>
              </div>
            </div>
            <form class="dc-card-form">
              <div class="dc-card-options-wrapper">
                <div class="dc-card-options">
                  <slot name="options" />
                </div>
              </div>
              <datacom-button variant="secondary" size="small" type="submit" onClick={this.onSubmitClick}>
                {this.ctaText}
              </datacom-button>
            </form>
          </div>
          <div class="dc-card-description-wrapper">
            <div class="dc-card-divider" />
            <div class="dc-card-description">
              <div class="dc-card-description-text">
                <slot name="description" />
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomSelectionCardElement = HTMLElement & DatacomSelectionCard;
