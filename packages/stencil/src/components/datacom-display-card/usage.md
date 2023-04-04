# Display-Card Usage

## Web components

-Display card component is used to display image, text and action together.
-It has two components: 'datacom-display-card' , 'datacom-display-card-group'

### Example

```html
<datacom-display-card
  image-url="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg"
  url="https://datacom.com/nz/en/solutions/cloud/cloud-solutions"
  heading="Title"
  cta-Text="Learn More"
>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
</datacom-display-card>

```
'datacom-display-card-group' is managing the responsiveness of the of the components within it.

### Example 

```html
 <datacom-display-card-group>
  <datacom-display-card image-url="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg" 
  url="https://datacom.com/nz/en/solutions/cloud/cloud-solutions" heading="Title" 
  cta-text="Learn more">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
  </datacom-display-card>
  <datacom-display-card image-url="https://images.pexels.com/photos/15638791/pexels-photo-15638791.jpeg" 
  url="https://datacom.com/nz/en/solutions/cloud/cloud-solutions" heading="Title" 
  cta-text="Learn more">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
  </datacom-display-card>
  </datacom-display-card-group>

```

### Properties
This component has the following properties which are managing the display information in the card.
-heading - It uses to specify the card title.
-imageUrl - It uses to specify URL of the card image.
-ctaText - It uses to specify the text along url link.
-url -  It uses to specify the url for further pages.
