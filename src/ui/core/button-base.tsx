/* eslint-disable max-lines-per-function */

import React from 'react';
import type { TouchableOpacityProps } from 'react-native';
import { Platform } from 'react-native';

import { Spacing } from '@/configs';

import { ActivityIndicator } from './activity-indicator';
import { Text } from './text';
import { TouchableOpacity } from './touchable-opacity';
import { View } from './view';

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
    container: 'flex-row items-center justify-center  px-4  my-2',
    label: 'text-[16px] font-semibold text-white',
    indicator: 'text-white ',
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
    container: 'border border-neutral_extra-900',
    label: 'text-neutral_extra-900',
    indicator: 'text-neutral_extra-900',
  },
};

interface Props extends TouchableOpacityProps {
  variant?: VariantName;
  label?: string;
  loading?: boolean;
  backgroundColor?: any;
  labelColor?: any;
  borderRadius?: 'medium' | 'full';
  textLabel?: any;
  size?: 'small' | 'medium' | 'large';
  iconLeft?: {
    name: any;
    color?: string;
    size?: number;
  };
  iconRight?: {
    name: any;
    color?: string;
    size?: number;
  };
}
const ButtonBase = ({
  label,
  iconLeft,
  labelColor,
  iconRight,
  textLabel,
  backgroundColor,
  size = 'medium',
  borderRadius = 'full',
  loading = false,
  variant = 'primary',
  disabled = false,

  ...props
}: Props) => {
  const IconLeft = iconLeft?.name;
  const IconRight = iconRight?.name;
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={[
        backgroundColor && {
          backgroundColor: backgroundColor,
        },
      ]}
      className={` ${
        size === 'small' ? 'py-2' : size === 'large' ? 'py-4' : 'py-3'
      } ${borderRadius === 'medium' ? 'rounded-lg' : 'rounded-full'}
    ${buttonVariants.defaults.container}
     ${buttonVariants[variant].container}
     ${disabled ? 'opacity-50' : ''}
    `}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color="#fff"
          className={`
          ${buttonVariants.defaults.indicator}
           ${buttonVariants[variant].indicator}
          `}
        />
      ) : (
        <View className="flex-row">
          {IconLeft && (
            <IconLeft color={iconLeft.color ? iconLeft.color : 'white'} />
          )}
          {textLabel ? (
            textLabel
          ) : (
            <Text
              style={[
                {
                  textTransform: 'uppercase',
                  marginLeft: Spacing(2),
                  fontSize:
                    size === 'small' && Platform.OS === 'android' ? 11 : 14,
                },
                labelColor && {
                  color: labelColor,
                },
              ]}
              className={` 
          ${buttonVariants.defaults.label}
           ${buttonVariants[variant].label}
          `}
            >
              {label}
            </Text>
          )}

          {IconRight && (
            <IconRight color={iconRight.color ? iconRight.color : 'white'} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ButtonBase;
