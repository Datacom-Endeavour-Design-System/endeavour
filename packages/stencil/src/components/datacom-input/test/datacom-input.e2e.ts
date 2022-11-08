import { newE2EPage } from '@stencil/core/testing';

describe('datacom-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<datacom-input></datacom-input>');

    const element = await page.find('datacom-input');
    expect(element).toHaveClass('hydrated');
  });
});
