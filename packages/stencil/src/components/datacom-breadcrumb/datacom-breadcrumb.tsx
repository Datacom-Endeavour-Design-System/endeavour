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
  @Prop() text: string;

  NavIcon = getSvg('drill-down', { class: 'dc-breadcrumb-icon' });

  render() {
    return (
      <Host>
        {!!this.url ? (
          <div>
            <a href={this.url} class="dc-breadcrumb">
              {this.text}
              <slot></slot> {this.NavIcon}
            </a>
            <slot></slot>
          </div>
        ) : (
          <div class="dc-current">
            {this.text}
            <slot></slot>
          </div>
        )}
      </Host>
    );
  }
}

export type HTMLDatacomBreadcrumbElement = HTMLElement & DatacomBreadcrumb;
