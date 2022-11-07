## Web Component

```html
<datacom-tabgroup id="tabs" style="height: 30vh">
  <datacom-tab label="Overview">
    <h1>Overview</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </datacom-tab>

  <datacom-tab label="Solutions">
    <h1>Solutions</h1>
  </datacom-tab>

  <datacom-tab label="Industries" disabled="true">
    <h1>Industries</h1>
  </datacom-tab>

  <datacom-tab label="Discover">
    <h1>Discover</h1>
  </datacom-tab>
</datacom-tabgroup>

<datacom-button id="btn">Discover</datacom-button>

<!-- Programatically select a tab -->
<script>
  function select(n) {
    const tabs = document.querySelector('#tabs');
    if (tabs) {
      tabs.select(n);
    }
  }

  const btn = document.querySelector('#btn');
  if (btn) {
    btn.addEventListener('click', () => select(3));
  }
</script>
```
