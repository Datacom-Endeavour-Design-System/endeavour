import { newE2EPage } from '@stencil/core/testing';

describe('datacom-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<datacom-button></datacom-button>');

    const element = await page.find('datacom-button');
    expect(element).toHaveClass('hydrated');
  });
});
