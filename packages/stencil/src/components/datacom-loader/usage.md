### Loader Usage
-The component is used to notify users when loading is underway.
-In addition, it reports the users regarding the status of loading such as error and success.


### Examples

```html
 <datacom-loader ></datacom-loader>

 ``
 
```html
 <datacom-loader  size='large'></datacom-loader>

 ```
 
```html
 <datacom-loader loading='error'></datacom-loader>

 ```
```html
<datacom-button>
    <datacom-loader primary ></datacom-loader>
    </datacom-button>
```

 ### Properties
 -size: It sets the size of spinner and default size is small.
 -loading: This prop indicates the loading status and render the icon respectively. 
 -primary: It sets the spinner color for primary button.