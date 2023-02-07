# list Usage

-List composed of two components : 'datacom-list' and 'datacom-li'.
-List have two main variant ordered and unordered.
-Ordered list type is numbered by default but it can be changed by using type (lowercase, roman,upercase ).
-'datacom-list'- wrapping element around 'datacom-li'.
-Example

```html
<datacom-list variant="unordered">
  <datacom-li>Borm</datacom-li>
  <datacom-li>Borm</datacom-li>
</datacom-list>
<datacom-list type="lowercase">
  <datacom-li>Borm</datacom-li>
  <datacom-li>Borm</datacom-li>
</datacom-list>
```

-List as heading .
-Example

```html
<datacom-list variant="unordered">
<datacom-li heading>Borm</datacom-li>
  <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla orci eget turpis scelerisque facilisis.</p>
   <datacom-li heading>Borm</datacom-li>
    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla orci eget turpis scelerisque facilisis.</p>
</datacom-list>
```

-Nested ordered list
-Example

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
