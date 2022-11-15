import { newE2EPage } from '@stencil/core/testing';

describe('datacom-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<datacom-dropdown></datacom-dropdown>');

    const element = await page.find('datacom-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
