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
  @Prop() link?: string;
  @Prop() text: string;
  @Prop() index: number;
  @Prop() selected = false;

  onClickHandler = () => {
    this.selected = true;
  };

  NavIcon = getSvg('drill-down', { class: 'dc-breadcrumb-icon' });

  render() {
    const classes = {
      'dc-breadcrumb': true,
      'dc-selected': this.selected || this.link == null,
    };

    return (
      <Host>
        <div class={classes}>
          <nav aria-selected={this.selected} onClick={this.onClickHandler}>
            <a href={this.link} class="dc-breadcrumb-item">
              {this.text} <slot></slot>
            </a>
            {this.NavIcon}
            <slot></slot>
          </nav>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomBreadcrumbElement = HTMLElement & DatacomBreadcrumb;
