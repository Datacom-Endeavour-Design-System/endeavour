import { newSpecPage } from '@stencil/core/testing';
import { DatacomAvataravatar } from '../datacom-avataravatar';

describe('datacom-avataravatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DatacomAvataravatar],
      html: `<datacom-avataravatar></datacom-avataravatar>`,
    });
    expect(page.root).toEqualHtml(`
      <datacom-avataravatar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </datacom-avataravatar>
    `);
  });
});
