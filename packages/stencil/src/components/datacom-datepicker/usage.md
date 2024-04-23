## Datacom Date Piker

```html
<form>
  <div>
    <datacom-date-picker
      label="Enter date"
      placeholder="DD/MM/YYYY"
      message="Please enter a valid date"
      required="{true}"
      selectedDate="{selectedDate}"
      onChanged="{handleOnChanged}" />
    <datacom-date-picker
      label="Enter dates"
      placeholder="Start - End"
      message="Please enter a valid date range"
      range="{true}"
      required="{true}"
      startDate="{startDate}"
      endDate="{endaDate}"
      onChanged="{handleOnChanged}" />
  </div>
  <datacom-button variant="primary" type="submit"> Submit </datacom-button>
</form>
```
