# Breadcrumb Usage
## Web component
Breadcrumb has one component 'datacom-breadcrumb'
### Properties - datacom-breadcrumb

-Component  is render separator (>) only when it is wrap with 'div' .
-Component is not render  the separator (>) for the last child. 
-Component is render different style for non-url.
```html
   <div>
   <datacom-breadcrumb url="https://datacom.com/nz/en/discover" > Breadcrumb </datcom-breadcrumb>
   </div>
    
   ```
   ```html 
   <div>
    <datacom-breadcrumb url="https://datacom.com/nz/en/discover?&page=2"  >Breadcrumb1<datacom-breadcrumb>
     <datacom-breadcrumb >Breadcrumb2  </datacom-breadcrumb>
   </div>
``` 