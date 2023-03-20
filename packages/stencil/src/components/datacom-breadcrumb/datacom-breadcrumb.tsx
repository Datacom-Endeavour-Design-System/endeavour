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
  @Prop() separator?: boolean = false;

  NavIcon = getSvg('drill-down', { class: 'dc-breadcrumb-icon' });

  render() {
    return (
      <Host>
        {!!this.url ? (
          <div class="dc-breadcrumb">
            <a href={this.url} class="dc-text">
              <slot></slot>
            </a>
            {this.separator && this.NavIcon}
          </div>
        ) : (
          <div class="dc-current">
            <slot></slot>
            {this.separator && this.NavIcon}
          </div>
        )}
      </Host>
    );
  }
}

export type HTMLDatacomBreadcrumbElement = HTMLElement & DatacomBreadcrumb;
