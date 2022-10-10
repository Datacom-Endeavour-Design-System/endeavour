import { newSpecPage } from '@stencil/core/testing';
import { DatacomButton } from '../datacom-button';

describe('datacom-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DatacomButton],
      html: `<datacom-button></datacom-button>`,
    });
    expect(page.root).toEqualHtml(`
      <datacom-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </datacom-button>
    `);
  });
});
