## Web Component

The datacom tab is constructed with a tab group and a tab, which contains the label and content.

> Important: The tab group should have an explicit height setting as the content does not set the maximum height.

```html
<datacom-tabgroup id="tabs" height="300px">
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

<datacom-button id="select">Select last</datacom-button>
<datacom-button id="selected">Selected</datacom-button>

<!-- Interact programatically -->
<script>
  function select(n) {
    const tabs = document.querySelector('#tabs');
    if (tabs) {
      tabs.select(n);
    }
  }

  function selected() {
    const tabs = document.querySelector('#tabs');
    if (tabs) {
      tabs.selected().then(n => window.alert(`${n} is selected`));
    }
  }

  const selectBtn = document.querySelector('#select');
  if (selectBtn) {
    selectBtn.addEventListener('click', () => select(3));
  }

  const selectedBtn = document.querySelector('#selected');
  if (selectedBtn) {
    selectedBtn.addEventListener('click', () => selected());
  }
</script>
```

## React
