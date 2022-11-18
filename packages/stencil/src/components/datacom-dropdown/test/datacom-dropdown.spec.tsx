import { newSpecPage } from '@stencil/core/testing';
import { DatacomDropdown } from '../datacom-dropdown';

describe('datacom-dropdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DatacomDropdown],
      html: `<datacom-dropdown></datacom-dropdown>`,
    });
    expect(page.root).toEqualHtml(`
      <datacom-dropdown>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </datacom-dropdown>
    `);
  });
});
