# Accordion Usage

## Web component

The content tag is composed of a single component. The contents of the tag are placed within the component element like below.

### Example

```html
<datacom-content-tag>Tag content here</datacom-content-tag>
```

### Properties - datacom-content-tag

variant - This property handles the color variant of the content tag. 

It accepts two values:
    - 'article' - (Default) The default blue color.
    - 'event' - Pink/magenta-like color.

If no variant prop is passed (or an invalid value is inserted), the default variant will be used.

```html
<datacom-content-tag variant="article">Tag content here</datacom-content-tag>
<datacom-content-tag variant="event">Tag content here</datacom-content-tag>
```

solid - If applied, will render the tag with a solid aesthetic, mainly used for content tags on products.

```html
<datacom-content-tag solid>Tag content here</datacom-content-tag>
```
