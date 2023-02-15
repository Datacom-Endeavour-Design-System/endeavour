# Breadcrumb Usage
## Web component
Breadcrumb is composed of two different web components: 'datacom-breadcrumb-group' and 'datacom-breadcrumb'

- 'datacom-breadcrumb-group' - Wrapping element around several breadcrumb instances.
- 'datacom-breadcrumb' - The individual section of an breadcrumb.


```html 
    <datacom-breadcrumb-group>
    <datacom-breadcrumb link="https://datacom.com/nz/en/discover?&page=2"  >Breadcrumb1  </datacom-breadcrumb>
    <datacom-breadcrumb link="https://datacom.com/nz/en/discover"  >Breadcrumb2  </datacom-breadcrumb>
   <datacom-breadcrumb selected >Breadcrumb3</datacom-breadcrumb>
   </datacom-breadcrumb-group>
``` 
Individual component usage 
   ```html
   <datacom-breadcrumb link="https://datacom.com/nz/en/discover"> Breadcrumb </datcom-breadcrumb>
    
   ```