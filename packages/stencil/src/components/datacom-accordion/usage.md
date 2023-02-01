# Accordion Usage

## Web components

Accordion is composed of two different web components: 'datacom-accordion-group' and 'datacom-accordion'

- 'datacom-accordion-group' - Wrapping element around several accordion instances.
- 'datacom-accordion' - The individual section of an accordion.

You can put as many 'datacom-accordion' elements as desired within a 'datacom-accordion-group'.

### Example

```html
<datacom-accordion-group>
  <datacom-accordion label="Section 1"> Content goes here </datacom-accordion>
  <datacom-accordion label="Section 2"> Content goes here </datacom-accordion>
  <datacom-accordion label="Section 3"> Content goes here </datacom-accordion>
</datacom-accordion-group>
```

### Properties - datacom-accordion-group

allow-multi-expand - If true, allows multiple sections to be expanded simultaneously.

```html
<datacom-accordion-group allow-multi-expand>
  <datacom-accordion label="Section 1"> Content goes here </datacom-accordion>
  <datacom-accordion label="Section 2"> Content goes here </datacom-accordion>
  <datacom-accordion label="Section 3"> Content goes here </datacom-accordion>
</datacom-accordion-group>
```

### Properties - datacom-accordion

disabled - If true, disables the accordion section, and stops it from being interactable.

```html
<datacom-accordion-group>
  <datacom-accordion label="Section 1" disabled> Content goes here </datacom-accordion>
  <datacom-accordion label="Section 2" disabled> Content goes here </datacom-accordion>
  <datacom-accordion label="Section 3"> Content goes here </datacom-accordion>
</datacom-accordion-group>
```

expanded - If true, the accordion section will be expanded on initial load.

```html
<datacom-accordion-group>
  <datacom-accordion label="Section 1" disabled> Content goes here </datacom-accordion>
  <datacom-accordion label="Section 2" disabled> Content goes here </datacom-accordion>
  <datacom-accordion label="Section 3"> Content goes here </datacom-accordion>
</datacom-accordion-group>
```
