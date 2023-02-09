# Toggle Usage

The toggle component is composed of one web component: 'datacom-toggle'.

The component can be rendered as shown below, where the label content is passed as a prop on the component.

### Example

```html
<datacom-toggle label="Label content goes here"></datacom-toggle>
```

### Properties

variant - This property handles the size of the toggle element and it's label. 

It accepts two values:
    - 'standard' - The default size of the toggle element.
    - 'small' - A smaller toggle size.

If no variant prop is passed (or an invalid value is inserted), the default standard size will be rendered.

```html
<datacom-toggle label="Label content goes here" variant="standard"></datacom-toggle>
<datacom-toggle label="Label content goes here" variant="small"></datacom-toggle>
```

labelPosition - This property changes the position of the label of the toggle element (default is on the right).

```html
<datacom-toggle label="Label content goes here" label-position="left"></datacom-toggle>
```

disabled - If true, disables the toggle element and stops it from being interactable.

```html
<datacom-toggle label="Label content goes here" disabled></datacom-toggle>
```

expanded - If true, the toggle element will be toggled on initial load.

```html
<datacom-toggle label="Label content goes here" toggled></datacom-toggle>
```