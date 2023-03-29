import { Component, Host, h, Prop } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

/**
 *Scroll button component automatically scroll to specific point when clicked.
 */
@Component({
  tag: 'datacom-scroll-button',
  styleUrl: 'datacom-scroll-button.css',
  shadow: true,
})
export class DatacomScrollButton {
  @Prop({ mutable: true }) anchorId: string;
  @Prop() btnTitle: string;

  chevronIcon = getSvg('chevron', { class: 'dc-scroll-btn-chevron' });

  onClickHandler = (event: MouseEvent) => {
    event.preventDefault();
    const targetElement = document.getElementById(this.anchorId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  render() {
    return (
      <Host>
        <button class="dc-scroll-btn" title={this.btnTitle} onClick={this.onClickHandler}>
          {this.chevronIcon}
        </button>
      </Host>
    );
  }
}

export type HTMLDatacomScrollButtonElement = HTMLElement & DatacomScrollButton;
