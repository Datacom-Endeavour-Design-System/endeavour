import React from 'react';
import { StoryObj } from '@storybook/react';
import { DatacomAlertBanner } from '@datacom/endeavour-react';

type AlertBannerProps = React.ComponentProps<typeof DatacomAlertBanner>;

export default {
  title: 'Alert Banner',
  component: DatacomAlertBanner,
};

export const Default: StoryObj<
  AlertBannerProps & {
    variantForMasterbrand: string;
    variantForDatapay: string;
    variantForDatascape: string;
    variantForGateway: string;
    variantForTimpani: string;
    variantForConnect: string;
    message: string;
  }
> = {
  argTypes: {
    variantForMasterbrand: {
      name: 'Variant',
      description:
        "Alert banner variant. Defaults to 'admiral-blue' if not set.",
      control: 'select',
      options: ['admiral-blue', 'midnight-blue', 'candy-pink', 'electric-blue'],
      type: { name: 'string' },
      if: { global: 'endeavour-theme-name', eq: 'masterbrand' },
    },
    variantForDatapay: {
      name: 'Variant',
      description:
        "Alert banner variant. Defaults to 'datapay-turquoise' if not set.",
      control: 'select',
      options: [
        'datapay-turquoise',
        'midnight-blue',
        'candy-pink',
        'electric-blue',
      ],
      type: { name: 'string' },
      if: { global: 'endeavour-theme-name', eq: 'datapay' },
    },
    variantForDatascape: {
      name: 'Variant',
      description:
        "Alert banner variant. Defaults to 'datascape-indigo' if not set.",
      control: 'select',
      options: [
        'datascape-indigo',
        'midnight-blue',
        'empress-teal',
        'electric-blue',
      ],
      type: { name: 'string' },
      if: { global: 'endeavour-theme-name', eq: 'datascape' },
    },
    variantForGateway: {
      name: 'Variant',
      description:
        "Alert banner variant. Defaults to 'gateway-gold' if not set.",
      control: 'select',
      options: ['gateway-gold', 'midnight-blue', 'sky-blue', 'electric-blue'],
      type: { name: 'string' },
      if: { global: 'endeavour-theme-name', eq: 'gateway' },
    },
    variantForTimpani: {
      name: 'Variant',
      description:
        "Alert banner variant. Defaults to 'admiral-blue' if not set.",
      control: 'select',
      options: [
        'timpani-sapphire',
        'midnight-blue',
        'tangerine-orange',
        'electric-blue',
      ],
      type: { name: 'string' },
      if: { global: 'endeavour-theme-name', eq: 'timpani' },
    },
    variantForConnect: {
      name: 'Variant',
      description:
        "Alert banner variant. Defaults to 'connect-fuchsia' if not set.",
      control: 'select',
      options: [
        'connect-fuchsia',
        'midnight-blue',
        'empress-teal',
        'electric-blue',
      ],
      type: { name: 'string' },
      if: { global: 'endeavour-theme-name', eq: 'connect' },
    },
    message: {
      name: 'Message',
      type: { name: 'string' },
    },
    ctaLabel: {
      name: 'CTA Label',
      type: { name: 'string' },
    },
    ctaURL: {
      name: 'CTA URL',
      type: { name: 'string' },
    },
  },
  args: {
    variantForMasterbrand: 'admiral-blue',
    variantForDatapay: 'datapay-turquoise',
    variantForDatascape: 'datascape-indigo',
    variantForGateway: 'gateway-gold',
    variantForTimpani: 'timpani-sapphire',
    variantForConnect: 'connect-fuchsia',
    message: 'A message to our Datacom community about COVID-19',
    ctaLabel: 'Learn more',
    ctaURL: 'https://datacom.com',
  },
  render: (props) => {
    const variant =
      props.variantForMasterbrand ||
      props.variantForDatapay ||
      props.variantForDatascape ||
      props.variantForGateway ||
      props.variantForTimpani ||
      props.variantForConnect;
    return (
      <DatacomAlertBanner
        variant={variant}
        ctaLabel={props.ctaLabel}
        ctaURL={props.ctaURL}>
        {props.message}
      </DatacomAlertBanner>
    );
  },
};
