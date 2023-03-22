### Datacom link



The link is a single component. The links can be used as individual elements, blocks of links  or inline with text. Examples are below.

```html 
<datacom-link url='https://datacom.com/nz/'  icon='download'  image-position='right'>Learn more</datacom-link>
```
```html
   <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit.
    <datacom-link url='#' variant='inline'>Lorem ipsum dolor sit amet.</datacom-link>
    Duis at tincidunt orci. Ut velit ipsum, lacinia at ex quis, aliquet
     rhoncus purus. Praesent et scelerisque ligula
    </p>
```
    
```html
    <datacom-link url='https://datacom.com/nz/' variant='stacked'>Learn more</datacom-link>
    <datacom-link url='https://datacom.com/nz/' variant='stacked'>Learn more</datacom-link>
```
 ### Properties
 The component has following properties.


- url: This sets the url that the element will link to.
- variant: This property handles the color and style.Default variant is standalone.
- disabled: This prop is used to stop being interactive.
- icon: This sets the svg icon along with link text. 
- imagePosition: It changes the icon position with link element.Default is left.



 