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

  private onSubmitClick = (e: Event) => {
    e.preventDefault();
    this.submitClicked.emit(this.optionSelected);
  };

  private onExpandClick = () => {
    this.expanded = !this.expanded;
  };

  private getRadioComponents(): HTMLDatacomRadioElement[] {
    if (this.host == undefined) {
      return [];
    }

    if (this.children?.length > 0) {
      return this.children;
    }

    this.host.querySelectorAll<HTMLDatacomRadioElement>('datacom-radio').forEach(t => this.children.push(t));
    return this.children;
  }

  @Listen('selected', { capture: true })
  onRadioChange(event: CustomEvent<string>) {
    this.optionSelected = event.detail;
  }

  async componentWillLoad(): Promise<void> {
    const children = this.getRadioComponents();
    children.forEach(option => {
      option.name = this.cardTitle + ' options';
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
              <button class="dc-card-expand" onClick={this.onExpandClick}>
                {chevronIcon}
              </button>
            </div>
            <form class="dc-card-form">
              <div class="dc-card-options">
                <slot name="options" />
              </div>
              <datacom-button variant="secondary" size="small" type="submit" onClick={this.onSubmitClick}>
                {this.ctaText}
              </datacom-button>
            </form>
            {this.expanded && (
              <div class="dc-card-description">
                <slot />
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomSelectionCardElement = HTMLElement & DatacomSelectionCard;
