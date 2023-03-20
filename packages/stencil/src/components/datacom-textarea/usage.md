## Datacom Textarea

Textarea component is used like below and takes most of the same attributes a normal
textarea element would take. Notable exception would be the label attribute which will render
the label text of the textarea element.

```html
<form>
  <div>
    <datacom-textarea
      help="Make sure complete this."
      id="my textarea"
      cols="2"
      rows="3"
      auto-validate="true"
      name="Textarea"
      required="true"
      placeholder="Example here"
      message="This is required"
      label="Label"
    ></datacom-textarea>
  </div>
  <hr />
  <datacom-button type="submit">Submit</datacom-button>
</form>
```
