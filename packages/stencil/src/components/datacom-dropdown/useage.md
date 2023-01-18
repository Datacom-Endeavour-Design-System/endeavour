# Drop down list Useage

```html
<style>
  .ddl {
    width: 350px;
  }
</style>

<form action="/submit" method="get">
  <div>
    <datacom-dropdown class="ddl" name="country" label="Country" required="true" message="Please select a country" multiple="false">
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
    <button type="submit">Submit</button>
  </div>
</form>
```
