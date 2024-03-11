import React from 'react';
import { StoryObj } from '@storybook/react';
import { DatacomAlertBanner } from '@datacom/endeavour-react';

type AlertBannerProps = React.ComponentProps<typeof DatacomAlertBanner>;

type AlertBannerVariant =
  | 'admiral-blue'
  | 'midnight-blue'
  | 'candy-pink'
  | 'electric-blue'
  | 'datapay-turquoise'
  | 'datascape-indigo'
  | 'empress-teal'
  | 'gateway-gold'
  | 'sky-blue'
  | 'timpani-sapphire'
  | 'tangerine-orange'
  | 'connect-fuchsia';

export default {
  title: 'Alert Banner',
  component: DatacomAlertBanner,
};

export const AlertBanner: StoryObj<
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
        "Alert banner variant. Defaults to 'Admiral blue' if not set.",
      options: ['admiral-blue', 'candy-pink', 'midnight-blue', 'electric-blue'],
      control: {
        type: 'select',
        labels: {
          'admiral-blue': 'Admiral blue',
          'candy-pink': 'Candy pink',
          'midnight-blue': 'Midnight blue',
          'electric-blue': 'Electric blue',
        },
      },
      type: { name: 'string' },
      if: { global: 'endeavour-theme-name', eq: 'masterbrand' },
    },
    variantForDatapay: {
      name: 'Variant',
      description:
        "Alert banner variant. Defaults to 'Datapay turquoise' if not set.",
      options: [
        'datapay-turquoise',
        'candy-pink',
        'midnight-blue',
        'electric-blue',
      ],
      control: {
        type: 'select',
        labels: {
          'datapay-turquoise': 'Datapay turquoise',
          'candy-pink': 'Candy pink',
          'midnight-blue': 'Midnight blue',
          'electric-blue': 'Electric blue',
        },
      },
      type: { name: 'string' },
      if: { global: 'endeavour-theme-name', eq: 'datapay' },
    },
    variantForDatascape: {
      name: 'Variant',
      description:
        "Alert banner variant. Defaults to 'Datascape indigo' if not set.",
      options: [
        'datascape-indigo',
        'empress-teal',
        'midnight-blue',
        'electric-blue',
      ],
      control: {
        type: 'select',
        labels: {
          'datascape-indigo': 'Datascape indigo',
          'empress-teal': 'Empress teal',
          'midnight-blue': 'Midnight blue',
          'electric-blue': 'Electric blue',
        },
      },
      type: { name: 'string' },
      if: { global: 'endeavour-theme-name', eq: 'datascape' },
    },
    variantForGateway: {
      name: 'Variant',
      description:
        "Alert banner variant. Defaults to 'Gateway gold' if not set.",
      options: ['gateway-gold', 'sky-blue', 'midnight-blue', 'electric-blue'],
      control: {
        type: 'select',
        labels: {
          'gateway-gold': 'Gateway gold',
          'sky-blue': 'Sky blue',
          'midnight-blue': 'Midnight blue',
          'electric-blue': 'Electric blue',
        },
      },
      type: { name: 'string' },
      if: { global: 'endeavour-theme-name', eq: 'gateway' },
    },
    variantForTimpani: {
      name: 'Variant',
      description:
        "Alert banner variant. Defaults to 'Timpani sapphire' if not set.",
      options: [
        'timpani-sapphire',
        'tangerine-orange',
        'midnight-blue',
        'electric-blue',
      ],
      control: {
        type: 'select',
        labels: {
          'timpani-sapphire': 'Timpani sapphire',
          'tangerine-orange': 'Tangerine orange',
          'midnight-blue': 'Midnight blue',
          'electric-blue': 'Electric blue',
        },
      },
      type: { name: 'string' },
      if: { global: 'endeavour-theme-name', eq: 'timpani' },
    },
    variantForConnect: {
      name: 'Variant',
      description:
        "Alert banner variant. Defaults to 'Connect fuchsia' if not set.",
      options: [
        'connect-fuchsia',
        'empress-teal',
        'midnight-blue',
        'electric-blue',
      ],
      control: {
        type: 'select',
        labels: {
          'connect-fuchsia': 'Connect fuchsia',
          'empress-teal': 'Empress teal',
          'midnight-blue': 'Midnight blue',
          'electric-blue': 'Electric blue',
        },
      },
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
    const variant = (props.variantForMasterbrand ||
      props.variantForDatapay ||
      props.variantForDatascape ||
      props.variantForGateway ||
      props.variantForTimpani ||
      props.variantForConnect) as AlertBannerVariant;
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
