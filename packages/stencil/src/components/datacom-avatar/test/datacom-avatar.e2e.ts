import { newE2EPage } from '@stencil/core/testing';

describe('datacom-avatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<datacom-avatar></datacom-avatar>');

    const element = await page.find('datacom-avatar');
    expect(element).toHaveClass('hydrated');
  });
});
