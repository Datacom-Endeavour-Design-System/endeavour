# Card Usage

## Web Components

The card component is separated into three separate web components, one for each card style (Content, Product and Selection):

- `<datacom-content-card>`
- `<datacom-product-card>`
- `<datacom-selection-card>`

Additionally, the cards should be placed within a `<datacom-card-group>`, which handles the responsiveness of the card components within it.

### Example Usage

```html
<datacom-card-group>
  <datacom-content-card date="00-00-2022" card-title="Card 1" cta-text="Learn more" url="/test">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </datacom-content-card>
  <datacom-content-card date="00-00-2022" card-title="Card 2" cta-text="Learn more" url="/test">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </datacom-content-card>
  <datacom-content-card date="00-00-2022" card-title="Card 3" cta-text="Learn more" url="/test">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </datacom-content-card>
</datacom-card-group>
```

## Content Card - `datacom-content-card`

### Properties

The component takes in various properties to control the content within the card.

- ctaText - This sets the text within the CTA element on the bottom left of the card.
- date - This sets the text for the date value under the image.
- icon - This sets the svg icon used in the action icon element on the bottom right of the card.
- imageUrl - This sets the url for the image to be displayed at the top of the card.
- title - This sets the text for the card title.
- url - This sets the url that the CTA element will link to.

```html
<datacom-content-card date="00-00-2022" card-title="Card 1" cta-text="Learn more" icon="download" image-url="https://imageurl.com" url="https://redirect.url">
  ...
</datacom-content-card>
```

### Slots

In addition to the properties, the component also has named slots to configure some of its content.

#### Description

To add the text into the card's description, simply place it within an element with a defined slot value of "description".

```html
<datacom-content-card>
  <span slot="description">Card description content goes here</span>
</datacom-content-card>
```

#### Content Tags

To apply content tags (which are rendered at the top right of the card), add `<datacom-content-tag>` components within the element with a defined slot value of "tags".

```html
<datacom-content-card>
  <datacom-content-tag slot="tags" url="http://url1.com">Professional Services</datacom-content-tag>
  <datacom-content-tag slot="tags" url="http://url1.com">Articles</datacom-content-tag>
</datacom-content-card>
```

## Product Card - `datacom-product-card`

TBD

## Selection Card - `datacom-selection-card`

TBD
