import { newE2EPage } from '@stencil/core/testing';

describe('datacom-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<datacom-checkbox></datacom-checkbox>');

    const element = await page.find('datacom-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});
