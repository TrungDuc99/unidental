import React from 'react';
import type { TouchableOpacityProps } from 'react-native';

import { ActivityIndicator } from './activity-indicator';
import { Text } from './text';
import { TouchableOpacity } from './touchable-opacity';

type Variant = {
  container: string;
  label: string;

  indicator: string;
};
type VariantName = 'defaults' | 'primary' | 'outline' | 'secondary';
type BVariant = {
  [key in VariantName]: Variant;
};

export const buttonVariants: BVariant = {
  defaults: {
    container:
      'flex-row items-center justify-center rounded-xl px-12 py-3 my-2',
    label: 'text-[16px] font-semibold text-white',
    indicator: 'text-white h-[30px]',
  },
  primary: {
    container: 'bg-primary-600',
    label: '',
    indicator: 'text-white',
  },
  secondary: {
    container: 'bg-primary-700',
    label: 'text-secondary-600',
    indicator: 'text-white',
  },
  outline: {
    container: 'border border-primary-600',
    label: 'text-primary-600 dark:text-charcoal-100',
    indicator: 'text-black',
  },
};

interface Props extends TouchableOpacityProps {
  variant?: VariantName;
  label?: string;
  type?: 'primary' | 'error' | 'warning' | 'info' | 'success';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

export const Button = ({
  label,
  loading = false,
  variant = 'primary',
  size = 'medium',
  type = 'primary',
  disabled = false,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      className={`
    ${buttonVariants.defaults.container}
     ${buttonVariants[variant].container}
     ${disabled ? 'opacity-50' : ''} ${
        size === 'small' ? 'py-1' : size === 'large' ? 'py-3' : 'py-3'
      } ${
        variant === 'outline' &&
        (type === 'success'
          ? 'border-success-500'
          : type === 'warning'
          ? 'border-warning-500'
          : type === 'error'
          ? 'border-danger-500'
          : 'white')
      } 
    `}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          className={`
          ${buttonVariants.defaults.indicator}
           ${buttonVariants[variant].indicator}
          `}
        />
      ) : (
        <Text
          className={` 
          ${buttonVariants.defaults.label}
           ${buttonVariants[variant].label}
           ${
             variant === 'outline' &&
             (type === 'success'
               ? 'text-success-500'
               : type === 'warning'
               ? 'text-warning-500'
               : type === 'error'
               ? 'text-danger-500'
               : 'text-primary-600')
           }
          `}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
