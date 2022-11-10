## Datacom Input

```html
<form>
  <div>
    <datacom-input
      help="Enter first and middle names"
      maxlength="50"
      auto-validate="true"
      name="firstname"
      required="true"
      placeholder="First name"
      message="First name is required"
      >First name</datacom-input
    >
    <datacom-input auto-validate="true" name="surname" required="true" placeholder="Surname name" message="Surname name is required">Surname</datacom-input>
    <datacom-input disabled="true" name="disabled" placeholder="This is disabled">Field Disabled</datacom-input>
    <datacom-input auto-validate="true" name="error" required="true" placeholder="Already in error" message="Please enter a value" valid="false">Surname</datacom-input>
  </div>
  <hr />
  <datacom-button type="submit">Submit</datacom-button>
</form>
```
