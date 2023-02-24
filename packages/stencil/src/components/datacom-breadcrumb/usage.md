# Breadcrumb Usage

## Web component

Breadcrumb has one component: 'datacom-breadcrumb'

```html
<datacom-breadcrumb url="https://datacom.com/nz/en/discover" separator>Breadcrumb</datacom-breadcrumb>
```

```html
<div>
  <datacom-breadcrumb url="https://datacom.com/nz/en/discover" separator>Breadcrumb</datacom-breadcrumb>
  <datacom-breadcrumb url="https://datacom.com/nz/en/discover" separator>Breadcrumb</datacom-breadcrumb>
  <datacom-breadcrumb>Breadcrumb</datacom-breadcrumb>
</div>
```
### Properties - datacom-breadcrumb

url-This is the url to the page where breadcrumb link redirects to.
separator- This is prop which is used to show Icon(>) alongside breadcrumb text.

"If no url is provided, the component will be rendered as plain text."