import { newE2EPage } from '@stencil/core/testing';

describe('datacom-avataravatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<datacom-avataravatar></datacom-avataravatar>');

    const element = await page.find('datacom-avataravatar');
    expect(element).toHaveClass('hydrated');
  });
});
