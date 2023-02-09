import { newSpecPage } from '@stencil/core/testing';
import { DatacomAvatar } from '../datacom-avatar';

describe('datacom-avatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DatacomAvatar],
      html: `<datacom-avatar></datacom-avatar>`,
    });
    expect(page.root).toEqualHtml(`
      <datacom-avatar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </datacom-avatar>
    `);
  });
});
