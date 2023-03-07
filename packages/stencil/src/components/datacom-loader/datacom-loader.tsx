import { Component, Host, h, Prop } from '@stencil/core';
import { Error, Spinner, CheckCircle } from '../../common/images/icons';

export type LoaderSize = 'large' | 'small';
export type LoadingType = 'none' | 'default' | 'error' | 'success';

/**
 *  elements are used to notify users when performing computation or retrieving data.
 */

@Component({
  tag: 'datacom-loader',
  styleUrl: 'datacom-loader.css',
  shadow: true,
})
export class DatacomLoader {
  @Prop() size: LoaderSize = 'small';
  @Prop() loading: LoadingType = 'default';

  render() {
    const Classes = {
      [`dc-loader-size-${this.size}`]: true,
    };

    return (
      <Host>
        <div class={Classes}>
          {this.loading == 'default' && <Spinner class="dc-loader-spinner dc-loader-default" />}
          {this.loading == 'success' && <CheckCircle class="dc-loader-success-mark dc-loader-success" />}
          {this.loading == 'error' && <Error class=" dc-loader-error-icon dc-loader-error" />}
          <slot></slot>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomLoaderElement = HTMLElement & DatacomLoader;
