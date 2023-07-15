/* eslint-disable max-lines-per-function */

import React from 'react';
import type { TouchableOpacityProps } from 'react-native';
import { Platform } from 'react-native';

import { Spacing } from '@/configs';

import { ActivityIndicator } from './activity-indicator';
import { Text } from './text';
import { TouchableOpacity } from './touchable-opacity';
import { View } from './view';
import { ViewLinear } from './view-linear-gradient';

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
    container: 'flex-row items-center justify-center  px-4 py-3 my-1',
    label: 'text-[16px] font-semibold text-white',
    indicator: 'text-white ',
  },
  primary: {
    container: 'bg-primary-700',
    label: '',
    indicator: 'text-white',
  },
  secondary: {
    container: 'bg-primary-600',
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
  textLabel?: any;
  color?: (string | number)[];
  labelColor?: any;
  borderRadius?: 'medium' | 'full';
  backgroundColor?: string;
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
const ButtonLinear = ({
  label,
  iconLeft,
  labelColor,
  textLabel,
  iconRight,
  color = ['#0065FF', '#03EFFF'],
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
    <TouchableOpacity disabled={disabled || loading} {...props}>
      <ViewLinear
        start={{ x: 0, y: 0 }}
        end={{ x: 1.2, y: 0 }}
        style={[
          {
            height: size === 'small' ? 45 : size === 'large' ? 55 : 50,
          },
        ]}
        className={` ${
          borderRadius === 'medium' ? 'rounded-lg' : 'rounded-full'
        }
            ${buttonVariants.defaults.container}
            ${buttonVariants[variant].container}
            ${disabled ? 'opacity-50' : ''}
            `}
        colors={color}
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
      </ViewLinear>
    </TouchableOpacity>
  );
};

export default ButtonLinear;
/* eslint-enable max-lines-per-function */
