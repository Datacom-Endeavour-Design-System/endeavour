# Feature Highlight Usage

## Web Components

-Feature highlight component is used to display image, text and action together.
-The feature highlight component has two components: 'datacom-feature-highlight' , 'datacom-feature-highlight-group'.

### Example 

```html
<datacom-feature-highlight
  feature-title="Feature Heading"
  cta-text="Learn more"
  image-url="https://images.com"
  url='https://test.com'
  icon='globe'
>
  <span slot="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
</datacom-feature-highlight>
```

`<datacom-feature-highlight-group>` is used to wrap feature highlight components which managed components' responsiveness within it.

### Example
```html
<datacom-feature-highlight-group>
<datacom-feature-highlight
  feature-title="Feature Heading"
  cta-text="Learn more"
  image-url="https://images.com"
  url='https://test.com'
>
  <span slot="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
</datacom-feature-highlight>
 <datacom-feature-highlight
  feature-title="Feature Heading"
  cta-text="Learn more"
  image-url="https://images.com"
  url='https://test.com'
>
  <span slot="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
</datacom-feature-highlight>
 <datacom-feature-highlight
  feature-title="Feature Heading"
  cta-text="Learn more"
  image-url="https://images.com"
  url='https://test.com'
>
  <span slot="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
</datacom-feature-highlight>
</datacom-feature-highlight-group>
```

### Properties
The component accepts following properties.
- variant - It takes two values 'image' and 'icon'.The default value is icon.
- readonly - It enables icon and image variants.
- featureTitle - This sets the text for the feature title.
- ctaText - This sets the text within the CTA element.
- icon - This sets the svg icon used to be displayed at the top of the feature.
- imageUrl - This sets the url for the image to be displayed at the top of the feature.
- url - This sets the url that the CTA element will link to.