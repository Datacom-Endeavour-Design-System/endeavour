## Web Component

The datacom tab is constructed with a tab group and a tab, which contains the label and content.

```html
<datacom-tabgroup id="tabs">
  <datacom-tab label="Overview">
    <h2>Overview</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </datacom-tab>

  <datacom-tab label="Solutions">
    <h2>Solutions</h2>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla orci eget turpis scelerisque facilisis. Nullam feugiat non ex eu egestas. Pellentesque habitant
      morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum sit amet sapien elit. Vivamus dictum, mi quis malesuada consequat, diam lorem ullamcorper
      massa, a aliquam lacus est a eros. Phasellus varius nisi in felis viverra sollicitudin. In hac habitasse platea dictumst.
    </p>

    <p>
      Nullam placerat id diam sed ultrices. Integer blandit velit in vehicula posuere. Ut eleifend pulvinar tortor. Suspendisse congue eleifend dolor, et tempus nisl sagittis eu.
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras egestas sagittis odio, vel accumsan dui varius id. Aliquam tempus sit amet risus
      eget pharetra. Mauris in ex finibus, iaculis eros et, pharetra urna.
    </p>
  </datacom-tab>

  <datacom-tab label="Industries" disabled="true">
    <h2>Industries</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae orci interdum, iaculis tortor vel, fringilla eros. Maecenas finibus pretium erat sed posuere. Donec
      massa velit, hendrerit quis elementum eget, pulvinar a urna. Aliquam in leo ac nibh dictum bibendum eu sed ex. Etiam bibendum nisl sit amet blandit imperdiet. Cras non massa
      vitae tellus mattis dignissim. Phasellus convallis eros ipsum, quis lobortis enim ornare et.
    </p>
  </datacom-tab>

  <datacom-tab label="Discover">
    <h2>Discover</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at pharetra nisi, at laoreet nisi. Pellentesque porta rutrum dolor, vel iaculis erat pretium nec. Vestibulum
      mattis magna sagittis tellus commodo, et finibus ligula cursus. Nunc lectus purus, efficitur nec tellus sed, gravida gravida lectus. Vivamus congue, diam non elementum
      feugiat, erat lectus auctor ex, non pharetra ipsum massa in lectus. Vestibulum id eros neque. Etiam volutpat suscipit nunc, nec pharetra nibh tristique ac. Vestibulum dapibus
      leo non faucibus eleifend. Sed tincidunt porttitor elit nec ultrices. In suscipit lorem purus, non mollis lacus tincidunt vel. Mauris nec condimentum nisl.
    </p>
  </datacom-tab>
</datacom-tabgroup>

<hr />

<datacom-button id="select">Select last</datacom-button>
<datacom-button id="selected">Selected</datacom-button>
<datacom-button id="enable">Enable</datacom-button>

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

  function enable() {
    const tabs = document.querySelector('#tabs');
    if (tabs) {
      tabs.enableTab(2);
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

  const enableBtn = document.querySelector('#enable');
  if (enableBtn) {
    enableBtn.addEventListener('click', () => enable());
  }
</script>
```

## React
