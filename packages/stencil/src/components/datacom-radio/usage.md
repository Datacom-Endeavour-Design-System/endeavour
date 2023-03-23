# Datacom Radio Usage
Radio is a form component. Two variants ‘radio (Default)’ and ‘button’. Accept two values for size ‘standard (Default)’ and ‘small’.
 Example:
```html
<form action="submit">
  <datacom-radio label="Radio small" id="radio1" value="choice1" name="choose" size="small"> </datacom-radio>
  <datacom-radio label="Radio" id="radio1" value="choice2" name="choose" size="standard"> </datacom-radio>

  <datacom-radio label="Radio" id="radio1" value="choice3" name="choose" variant="buttons" size="small" disabled="true"> </datacom-radio>
  <datacom-radio label="Radio" id="radio1" value="choice4" name="choose" variant="buttons" icon="globe" image-position="left"> </datacom-radio>
  </form>
```
For Radio Group Selection style. Wrap the 'datacom-radio' component with 'datacom-radio-group' component and variant should be button. 
Example:

```html
<datacom-radio-group>
   <datacom-radio label="Radio 1" id="radio1" value="choice1" name="choose" icon="globe" variant="button"></datacom-radio>
   <datacom-radio label="Radio 2" id="radio2" value="choice2" name="choose"  icon="globe" variant="button"></datacom-radio>
   <datacom-radio label="Radio 3" id="radio3" value="choice3" name="choose"  icon="globe" variant="button"></datacom-radio>
   <datacom-radio label="Radio 4" id="radio4" value="choice4" name="choose" icon="globe"  variant="button"></datacom-radio>
 </datacom-radio-group>
```
