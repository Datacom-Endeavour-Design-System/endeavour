import { Component, Host, h, Prop, Event, EventEmitter, Element, Fragment } from '@stencil/core';

type StockStatus = 'in-stock' | 'pre-order' | 'back-order' | 'out-of-stock';

/**
 * Cards components are used to display content and actions about a
 * single subject, providing at-a-glance information and easy access
 * to more details.
 *
 * This card variant should be used to display an overview of a product.
 * A snapshot enough for users to evaluate the product before committing
 * to action.
 */
@Component({
  tag: 'datacom-product-card',
  styleUrl: 'datacom-product-card.css',
  shadow: true,
})
export class DatacomProductCard {
  @Element() host: HTMLElement;

  @Prop() imageUrl: string;
  @Prop() price: number;
  @Prop() productTitle: string;
  @Prop() promoPrice: number;
  @Prop() stockStatus: StockStatus;
  @Prop() url: string;

  @Event() addToCartClicked: EventEmitter;
  @Event() quickViewClicked: EventEmitter;
  @Event() productComparisonClicked: EventEmitter;

  formatPrice = (price: number) => {
    const formatter = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'USD',
    });

    return formatter.format(price);
  };

  /**
   * Helper function to render correct stock status element.
   * @returns HTML element for displaying stock status.
   */
  renderStockStatusElement = () => {
    let text;

    switch (this.stockStatus) {
      case 'in-stock':
        text = 'In stock';
        break;
      case 'pre-order':
        text = 'Pre order';
        break;
      case 'in-stock':
        text = 'Back order';
        break;
      case 'in-stock':
        text = 'Out of stock';
        break;
    }

    return <div class="dc-stock-status">{text}</div>;
  };

  /**
   * Helper function to render correct price-related element(s).
   * @returns HTML element for displaying price.
   */
  renderPriceElement = () => {
    return (
      <div class="dc-price-wrapper">
        {this.promoPrice > 0 ? (
          <Fragment>
            <div class="dc-price">{this.formatPrice(this.promoPrice)}</div>
            <div class="dc-previous-price">{this.formatPrice(this.price)}</div>
          </Fragment>
        ) : (
          <div class="dc-price">{this.formatPrice(this.price)}</div>
        )}
      </div>
    );
  };

  render() {
    const tagClasses = {
      'dc-card-tags': true,
      'with-image': this.imageUrl?.length > 0,
    };

    return (
      <Host>
        <div class="dc-card">
          <div class="dc-card-media-wrapper">
            <div class={tagClasses}>
              <slot name="tags" />
            </div>
            {this.imageUrl && <img class="dc-card-image" src={this.imageUrl} />}
          </div>
          <div class="dc-card-content-wrapper">
            <div class="dc-card-content">
              {this.stockStatus && this.renderStockStatusElement()}
              {this.productTitle && <div class="dc-product-title">{this.productTitle}</div>}
              {this.price && this.renderPriceElement()}
              <datacom-rating slot="rating" rating-value="4" readonly></datacom-rating>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomProductCardElement = HTMLElement & DatacomProductCard;
