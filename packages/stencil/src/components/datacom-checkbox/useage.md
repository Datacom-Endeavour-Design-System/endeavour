# Checkbox Useage

## Web component

### In a form

Auto validate and show error message if form fails validation:

```html
<form method="get" action="submit">
  <datacom-checkbox autovalidate="true" name="agree" value="yes" required="true" message="Please confirm you agree">Agree to terms and conditions</datacom-checkbox>

  <div>
    <datacom-button name="submit" value="btn" type="submit">Submit</datacom-button>
  </div>
</form>
```

### Grouped

Group checkboxes with a parent that controls the children:

```html
<datacom-checkbox-group>
  <datacom-checkbox>Checkbox parent</datacom-checkbox>
  <datacom-checkbox>Checkbox 1</datacom-checkbox>
  <datacom-checkbox>Checkbox 2</datacom-checkbox>
  <datacom-checkbox>Checkbox 3</datacom-checkbox>
</datacom-checkbox-group>
```
