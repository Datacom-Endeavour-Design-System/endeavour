# Drop down list Useage

```html
<form action="/submit" method="get">
  <div>
    <datacom-dropdown size="small" name="options" label="Option" required="true" message="Please select an option" variant="select">
      <datacom-option value="1" label="Option 1"></datacom-option>
      <datacom-option value="2" label="Option 2"></datacom-option>
      <datacom-option value="3" label="Option 3"></datacom-option>
      <datacom-option value="4" label="Option 4"></datacom-option>
      <datacom-option value="5" label="Option 5"></datacom-option>
    </datacom-dropdown>
  </div>

  <div>
    <datacom-dropdown size="large" name="country" label="Country" required="true" message="Please select a country" variant="select">
      <datacom-option src="https://flagcdn.com/nz.svg" value="NZ" label="New Zealand"></datacom-option>
      <datacom-option src="https://flagcdn.com/au.svg" value="AU" label="Australia"></datacom-option>
      <datacom-option src="https://flagcdn.com/ki.svg" value="KI" label="Independent and Sovereign Republic of Kiribati"></datacom-option>
      <datacom-option src="https://flagcdn.com/gb.svg" search="Great Britan | England | Wales | Scotland" value="GB" label="Great Britan"></datacom-option>
      <datacom-option src="https://flagcdn.com/fr.svg" value="FR" label="France"></datacom-option>
      <datacom-option src="https://flagcdn.com/it.svg" value="IT" label="Italy"></datacom-option>
      <datacom-option src="https://flagcdn.com/es.svg" value="ES" label="Spain"></datacom-option>
      <datacom-option src="https://flagcdn.com/ua.svg" value="EA" label="Ukraine"></datacom-option>
    </datacom-dropdown>
  </div>

  <div>
    <datacom-dropdown size="large" name="countries" label="Country" required="true" message="Please select a country" variant="combo">
      <datacom-option src="https://flagcdn.com/nz.svg" value="NZ" label="New Zealand"></datacom-option>
      <datacom-option src="https://flagcdn.com/au.svg" value="AU" label="Australia"></datacom-option>
      <datacom-option src="https://flagcdn.com/ki.svg" value="KI" label="Independent and Sovereign Republic of Kiribati"></datacom-option>
      <datacom-option src="https://flagcdn.com/gb.svg" search="Great Britan | England | Wales | Scotland" value="GB" label="Great Britan"></datacom-option>
      <datacom-option src="https://flagcdn.com/fr.svg" value="FR" label="France"></datacom-option>
      <datacom-option src="https://flagcdn.com/it.svg" value="IT" label="Italy"></datacom-option>
      <datacom-option src="https://flagcdn.com/es.svg" value="ES" label="Spain"></datacom-option>
      <datacom-option src="https://flagcdn.com/ua.svg" value="EA" label="Ukraine"></datacom-option>
    </datacom-dropdown>
  </div>

  <div>
    <datacom-button type="submit">Submit</button>
  </div>
</form>
```
