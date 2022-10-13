import { Component, h, getAssetPath } from '@stencil/core';

@Component({
  tag: 'datacom-menubar',
  styleUrl: 'datacom-menubar.css',
  shadow: true,
  assetsDirs: ['assets']
})
export class DatacomMenuBar {
  render() {
    const imageSrc = getAssetPath(`/assets/images/logo-white-bg.svg`);

    return (
        <div class="menu-wrap">
          <div class="menu-bar">
            <span class="logo">
              <a href="/" title="Datacom">
                <img src={imageSrc}/>
              </a>
            </span>
            <nav class="navigation">
              <ul>
                <li>Components</li>
                <li>Discover</li>
              </ul>
            </nav>
          </div>
        </div>
    );
  }

}
