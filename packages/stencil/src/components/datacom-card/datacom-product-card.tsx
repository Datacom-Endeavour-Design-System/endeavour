import { Component, Host, h, Prop, Event, EventEmitter, Element, Fragment } from '@stencil/core';
import { IconBackOrder } from './assets/icon-back-order';
import { IconEye } from './assets/icon-eye';
import { IconExchange } from './assets/icon-exchange';
import { IconInStock } from './assets/icon-in-stock';
import { IconOutOfStock } from './assets/icon-out-of-stock';
import { IconPreOrder } from './assets/icon-pre-order';
import { IconShoppingCart } from './assets/icon-shopping-cart';

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
  @Prop() ratingValue: number;
  @Prop() ratingLabel: string;
  @Prop() stockStatus: StockStatus;
  @Prop() url: string;

  @Event() addToCartClicked: EventEmitter;
  @Event() quickViewClicked: EventEmitter;
  @Event() productComparisonClicked: EventEmitter;

  /**
   * Click handler for "Add to cart" action icon.
   */
  onAddToCartClicked = () => {
    this.addToCartClicked.emit();
  };

  /**
   * Click handler for "Quick view" action icon.
   */
  onQuickViewClicked = () => {
    this.quickViewClicked.emit();
  };

  /**
   * Click handler for "Product Comparison" action icon.
   */
  onProductComparisonClicked = () => {
    this.productComparisonClicked.emit();
  };

  /**
   * Formats given number into a price format.
   * @param price - numerical value of price to be formatted.
   * @returns formatted price as string
   */
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
    let icon;
    let text: string;

    switch (this.stockStatus) {
      case 'in-stock':
        icon = <IconInStock />;
        text = 'In stock';
        break;
      case 'pre-order':
        icon = <IconPreOrder />;
        text = 'Pre order';
        break;
      case 'back-order':
        icon = <IconBackOrder />;
        text = 'Back order';
        break;
      case 'out-of-stock':
        icon = <IconOutOfStock />;
        text = 'Out of stock';
        break;
    }

    return (
      <div class="dc-stock-status">
        <div class="dc-stock-status-icon">{icon}</div>
        {text}
      </div>
    );
  };

  /**
   * Helper function to render correct product title element.
   * @returns HTML element for displaying product title.
   */
  renderTitleElement = () => {
    return this.url?.length > 0 ? (
      <a href={this.url} class="dc-product-title">
        {this.productTitle}
      </a>
    ) : (
      <div class="dc-product-title">{this.productTitle}</div>
    );
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
              <div class="dc-action-icons">
                <div class="dc-action-icon-wrapper">
                  <datacom-tooltip label="Add to cart">
                    <button class="dc-action-icon" onClick={this.onAddToCartClicked}>
                      <IconShoppingCart />
                    </button>
                  </datacom-tooltip>
                </div>
                <div class="dc-action-icon-wrapper">
                  <datacom-tooltip label="Quick view">
                    <button class="dc-action-icon" onClick={this.onQuickViewClicked}>
                      <IconEye />
                    </button>
                  </datacom-tooltip>
                </div>
                <div class="dc-action-icon-wrapper">
                  <datacom-tooltip label="Compare product">
                    <button class="dc-action-icon" onClick={this.onProductComparisonClicked}>
                      <IconExchange />
                    </button>
                  </datacom-tooltip>
                </div>
              </div>
              {this.stockStatus && this.renderStockStatusElement()}
              {this.productTitle && this.renderTitleElement()}
              {this.price && this.renderPriceElement()}
              {/* TODO make rating configurable */}
              <datacom-rating slot="rating" rating-value={this.ratingValue} label={this.ratingLabel} readonly></datacom-rating>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}

export type HTMLDatacomProductCardElement = HTMLElement & DatacomProductCard;
