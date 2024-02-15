import { Component, Host, h, Prop } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';

/**
 * Datacom styled icon.
 *
 */
@Component({
  tag: 'datacom-icon',
})
export class DatacomIcon {
  /**
   * Icon
   */
  @Prop() icon = '';

  render() {
    const svg = getSvg(this.icon, { class: 'dc-button-image' });

    return <Host>{svg}</Host>;
  }
}

export type HTMLDatacomIconElement = HTMLElement & DatacomIcon;
