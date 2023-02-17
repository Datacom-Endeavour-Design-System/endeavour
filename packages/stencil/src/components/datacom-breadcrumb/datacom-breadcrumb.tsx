import { Component, Host, h, Prop } from '@stencil/core';
import { getSvg } from '../../common/images/icon-provider';
/**
 * Breadcrumb element represents  navigation
 */

@Component({
  tag: 'datacom-breadcrumb',
  styleUrl: 'datacom-breadcrumb.css',
  shadow: true,
})
export class DatacomBreadcrumb {
  @Prop() url?: string;

  NavIcon = getSvg('drill-down', { class: 'dc-breadcrumb-icon' });

  render() {
    return (
      <Host>
        {!!this.url ? (
          <div>
            <a href={this.url} class="dc-breadcrumb">
              <slot></slot> {this.NavIcon}
            </a>
          </div>
        ) : (
          <div class="dc-current">
            <slot></slot>
          </div>
        )}
      </Host>
    );
  }
}

export type HTMLDatacomBreadcrumbElement = HTMLElement & DatacomBreadcrumb;