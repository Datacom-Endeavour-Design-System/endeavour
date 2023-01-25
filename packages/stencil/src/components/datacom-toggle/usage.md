# Toggle Usage

The toggle component is composed of one web component: 'datacom-toggle'.

The component can be rendered as shown below, where the contents within the element will be rendered within the toggle element's label.

### Example

```html
<datacom-toggle>Label content goes here</datacom-toggle>
```

### Properties

variant - This property handles the size of the toggle element and it's label. 

It accepts two values:
    - 'standard' - The default size of the toggle element.
    - 'small' - A smaller toggle size.

If no variant prop is passed (or an invalid value is inserted), the default standard size will be rendered.

```html
<datacom-toggle variant="standard">Label content goes here</datacom-toggle>
<datacom-toggle variant="small">Label content goes here</datacom-toggle>
```

label-on-left - This property changes the position of the label to the left of the toggle element.

```html
<datacom-toggle label-on-left>Label content goes here</datacom-toggle>
```

disabled - If true, disables the toggle element and stops it from being interactable.

```html
<datacom-toggle disabled>Label content goes here</datacom-toggle>
```

expanded - If true, the toggle element will be toggled on initial load.

```html
<datacom-toggle toggled>Label content goes here</datacom-toggle>
```