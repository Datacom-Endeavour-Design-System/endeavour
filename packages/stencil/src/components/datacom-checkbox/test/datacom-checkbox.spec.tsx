import { newSpecPage } from '@stencil/core/testing';
import { DatacomCheckbox } from '../datacom-checkbox';

describe('datacom-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DatacomCheckbox],
      html: `<datacom-checkbox></datacom-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <datacom-checkbox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </datacom-checkbox>
    `);
  });
});
