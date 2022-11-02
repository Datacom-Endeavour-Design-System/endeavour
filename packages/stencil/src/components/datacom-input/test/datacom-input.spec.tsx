import { newSpecPage } from '@stencil/core/testing';
import { DatacomInput } from '../datacom-input';

describe('datacom-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DatacomInput],
      html: `<datacom-input error="Please enter a value" required="true">Input Label</datacom-input>`,
    });

    expect(page.root).toBeTruthy();
    expect(page.root.querySelector('input')).toBeTruthy();
  });
});
