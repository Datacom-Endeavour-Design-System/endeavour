# list Usage

- List composed of two components : 'datacom-list' and 'datacom-li'.
- List has two main variants ordered and unordered.
- Ordered list type is numbered by default but it can be changed by using type (lowercase, roman,uppercase ).
- 'datacom-list'- It is wrapping element around 'datacom-li'.
 

### Examples

```html
<datacom-list variant="unordered">
  <datacom-li>Borm</datacom-li>
  <datacom-li>Borm</datacom-li>
</datacom-list>
```
```html
<datacom-list type="lowercase">
  <datacom-li>Borm</datacom-li>
  <datacom-li>Borm</datacom-li>
</datacom-list>
```


- List as heading along with paragraph.
### Example

```html
<datacom-list variant="unordered">
 <datacom-li heading="Borm"><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></datacom-li>
 <datacom-li heading="Borm"><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></datacom-li>
</datacom-list>
```
- Nested ordered list
### Example

```html
<datacom-list>
  <datacom-li>Borm</datacom-li>
  <datacom-li
    >Lorem
    <datacom-list type="lowercase">
      <datacom-li>item</datacom-li>
      <datacom-li>item</datacom-li>
      <datacom-li>item</datacom-li>
    </datacom-list>
  </datacom-li>
  <datacom-li>Lorem</datacom-li>
</datacom-list>
```
