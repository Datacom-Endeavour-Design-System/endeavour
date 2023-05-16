import { Component, Host, h, Prop, State, Element, VNode } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

/**
 * Feature highlight component is used to display content and actions relating to
 * single subject.
 */
@Component({
  tag: 'datacom-feature-highlight',
  styleUrl: 'datacom-feature-highlight.css',
  shadow: true,
})
export class DatacomFeatureHighlight {
  @Element() host: HTMLElement;

  @Prop() featureTitle: string;
  @Prop() ctaText: string;
  @Prop() icon?: string;
  @Prop() imageUrl: string;
  @Prop() url: string;

  @State() hasDescriptionSlotElements = false;

  /**
   * Lifecycle function which checks for presence of slotted elements
   * (info needed for conditionally rendering said elements.)
   */
  async componentWillLoad(): Promise<void> {
    this.hasDescriptionSlotElements = !!this.host.querySelector('[slot="description"]');
  }

  render() {
    let featureImage: VNode;
    if (this.icon?.length > 0) {
      featureImage = getSvg(this.icon, { class: 'dc-feature-icon' });
    } else {
      featureImage = this.imageUrl && <img class="dc-feature-image" src={this.imageUrl} />;
    }

    const hasActions = this.ctaText;

    return (
      <Host>
        <div class="dc-feature-highlight">
          <div class="dc-feature-media-wrapper">{featureImage}</div>
          <div class="dc-feature-content-wrapper">
            <div class="dc-feature-content">
              {this.featureTitle && <div class="dc-feature-title">{this.featureTitle}</div>}
              {this.hasDescriptionSlotElements && (
                <div class="dc-feature-text">
                  <slot name="description" />
                </div>
              )}
            </div>
            {hasActions && (
              <div class="dc-feature-actions">
                <datacom-link url={this.url}>{this.ctaText}</datacom-link>
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomFeatureHighlightElement = HTMLElement & DatacomFeatureHighlight;
