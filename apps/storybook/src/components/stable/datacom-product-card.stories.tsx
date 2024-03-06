import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import {
  DatacomCardGroup,
  DatacomContentTag,
  DatacomProductCard,
} from '@datacom/endeavour-react';

export default {
  title: 'Card',
  component: DatacomProductCard,
  argTypes: {
    tagText: {
      name: 'Tag text',
      description: 'Text for content tag.',
      type: { name: 'string' },
    },
    hideAddToCart: {
      name: 'Hide "Add to cart" icon',
      description: 'Toggles visibility of "Add to cart" icon',
      type: { name: 'boolean' },
    },
    hideQuickView: {
      name: 'Hide "Quick view" icon',
      description: 'Toggles visibility of "Quick view" icon',
      type: { name: 'boolean' },
    },
    hideProductCompare: {
      name: 'Hide "Product compare" icon',
      description: 'Toggles visibility of "Product compare" icon',
      type: { name: 'boolean' },
    },
    stockStatus: {
      name: 'Stock status',
      description: 'Status of product stock',
      control: 'select',
      options: ['in-stock', 'pre-order', 'back-order', 'out-of-stock'],
      type: { name: 'string' },
    },
    productTitle: {
      name: 'Title',
      defaultValue: 'Product name',
      description: 'Text of product title displayed.',
      type: { name: 'string' },
    },
    url: {
      name: 'URL',
      description: 'URL that CTA should link to.',
      type: { name: 'string' },
    },
    price: {
      name: 'Price',
      description: 'Price of product displayed.',
      type: { name: 'number' },
    },
    promoPrice: {
      name: 'Promotional price',
      description: 'Promotional price of product displayed.',
      type: { name: 'number' },
    },
    ratingValue: {
      name: 'Rating value',
      description: 'Rating value of product (should be between 0 and 5).',
      type: { name: 'number' },
    },
    ratingLabel: {
      name: 'Rating label',
      description: 'Label displayed next to product rating.',
      type: { name: 'string' },
    },
    imageUrl: {
      name: 'Image URL',
      description: 'Image URL to be displayed at top of card.',
      type: { name: 'string' },
    },
  },
  args: {
    tagText: 'Sale',
    hideAddToCart: false,
    hideQuickView: false,
    hideProductCompare: false,
    stockStatus: 'in-stock',
    productTitle: 'Product name',
    url: 'https://datacom.com',
    price: 1000,
    promoPrice: 500,
    ratingValue: 3.5,
    ratingLabel: '(100)',
    imageUrl:
      'https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg',
  },
} as Meta<typeof DatacomProductCard>;

type Story = StoryObj<typeof DatacomProductCard>;

export const ProductCard: Story = {
  render: (
    args: React.ComponentProps<typeof DatacomProductCard> & {
      tagText?: string;
    },
  ) => {
    const { tagText } = args;

    return (
      <div style={{ height: 600 }}>
        <div style={{ maxWidth: 386 }}>
          <DatacomProductCard {...args}>
            {tagText && (
              <DatacomContentTag
                url="https://datacom.com"
                variant="product-promo"
                slot="tags">
                {tagText}
              </DatacomContentTag>
            )}
          </DatacomProductCard>
        </div>
      </div>
    );
  },
};

export const ProductCardGroup: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', height: 600 }}>
        <div style={{ maxWidth: 1254, width: '100%' }}>
          <DatacomCardGroup>
            <DatacomProductCard
              stockStatus="in-stock"
              productTitle="Product 1"
              imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
              url="https://datacom.com"
              price={100}
              promoPrice={80.5}
              ratingValue={4}
              ratingLabel="(25)">
              <DatacomContentTag
                url="https://datacom.com"
                variant="product-promo"
                slot="tags">
                Sale
              </DatacomContentTag>
            </DatacomProductCard>
            <DatacomProductCard
              stockStatus="in-stock"
              productTitle="Product 2"
              imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
              url="https://datacom.com"
              price={120}
              promoPrice={40}
              ratingValue={3.8}
              ratingLabel="(26)">
              <DatacomContentTag
                url="https://datacom.com"
                variant="product-promo"
                slot="tags">
                Sale
              </DatacomContentTag>
            </DatacomProductCard>
            <DatacomProductCard
              stockStatus="in-stock"
              productTitle="Product 3"
              imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
              url="https://datacom.com"
              price={20}
              promoPrice={10}
              ratingValue={2.3}
              ratingLabel="(255)">
              <DatacomContentTag
                url="https://datacom.com"
                variant="product-promo"
                slot="tags">
                Sale
              </DatacomContentTag>
            </DatacomProductCard>
            <DatacomProductCard
              stockStatus="pre-order"
              productTitle="Product 4"
              imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
              url="https://datacom.com"
              price={32.99}
              ratingValue={4.3}
              ratingLabel="(45)"></DatacomProductCard>
            <DatacomProductCard
              stockStatus="back-order"
              productTitle="Product 4"
              imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
              url="https://datacom.com"
              price={45}
              ratingValue={4.1}
              ratingLabel="(54)"></DatacomProductCard>
            <DatacomProductCard
              stockStatus="out-of-stock"
              productTitle="Product 6"
              imageUrl="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
              url="https://datacom.com"
              price={230}
              ratingValue={4.8}
              ratingLabel="(409)"></DatacomProductCard>
          </DatacomCardGroup>
        </div>
      </div>
    );
  },
};
