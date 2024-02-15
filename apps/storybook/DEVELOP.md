# How to develop web components with Stencil

## Properties

Use explicit and narrow typescript types where possible:

```ts
export type ButtonVariant = 'primary' | 'seconday' | 'tertiary';

// Prop uses type definition (it will still be a string)
@Prop() variant: ButtonVariant = 'primary';
```

Give properties default values where possible.

## Render

Prefer conditional rendering and styling using css classes rather than javascript with JSX.

## Styling

For styling that changes on properties (e.g. variant), add classes at the root element and cascade styling on the child.

**Good**

```html
<button class="primary image-left size-small">
  <svg class="image"></svg><span class="text">{this.text}</span>{spinner}
</button>
```

```css
.size-small .image {
  height: 18px;
  width: 18px;
}
```

**Bad**
There should be no need to add classes to the image like "image-small".

```html
<button class="primary image-left size-small">
  <svg class="image image-small"></svg
  ><span class="text">{this.text}</span>{spinner}
</button>
```

### Host

Only style the host element for layout not theme:

**Good**

```css
:host {
  display: inline;
}
```

**Bad**

```css
:host {
  border: 1px solid red;
}
```

Instead, theme elements within the component.

## Error handling

### Property validation

Validate a property explicitly if it has a set of possible values. Issue a warning if the property is incorrectly configured and revert to a sensible default.

```ts
if (!['primary', 'secondary', 'tertiary'].includes(this.variant)) {
  console.warn('Button variant must be either primary, secondary or tertiary.');
  this.variant = 'primary';
}
```

or

```ts
if (this.length) {
  console.warn('Length must be greater than zero');
  this.length = 100;
}
```
