## Datacom Time Piker

```html
<form>
  <div>
    <datacom-time-picker
      label="Enter time"
      placeholder="00:00 AM"
      message="Please enter a valid time"
      minuteInterval="{10}"
      militaryTime="{false}"
      required="{true}"
      value="{selectedValue}"
      onChanged="{handleOnChanged}" />
  </div>
  <datacom-button variant="primary" type="submit"> Submit </datacom-button>
</form>
```
