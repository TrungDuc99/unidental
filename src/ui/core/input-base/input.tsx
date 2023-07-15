/* eslint-disable max-lines-per-function */

import { styled } from 'nativewind';
import * as React from 'react';
import type { TextInput, TextInputProps } from 'react-native';
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput as NTextInput } from 'react-native';

import { isRTL } from '@/core';

import colors from '../../theme/colors';
import { ActivityIndicator } from '../activity-indicator';
import { Text } from '../text';
import { TouchableOpacity } from '../touchable-opacity';
import { View } from '../view';

const STextInput = styled(NTextInput);

export interface NInputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  size?: 'small' | 'medium' | 'large';
  labelButtonRight?: string;
  onPressButtonRight?: () => void;
  iconLeft?: {
    name: any;
    color?: string;
    custom?: boolean;
    size?: number;
    onPress?: () => void;
  };
  iconRight?: {
    name: any;
    color?: string;
    size?: number;
    onPress?: () => void;
  };
}

export const Input = React.forwardRef<TextInput, NInputProps>((props, ref) => {
  const {
    label,
    error,
    required = false,
    iconLeft,
    iconRight,
    labelButtonRight,
    onPressButtonRight,

    ...inputProps
  } = props;
  const IconLeft = iconLeft?.name;
  const IconRight = iconRight?.name;
  const [isFocussed, setIsFocussed] = React.useState(false);
  const onBlur = React.useCallback(() => setIsFocussed(false), []);
  const onFocus = React.useCallback(() => setIsFocussed(true), []);

  // const borderColor = error
  //   ? 'border-danger-600'
  //   : isFocussed
  //   ? 'border-primary-700'
  //   : 'border-primary-400';
  const marginVertical = Platform.OS === 'ios' ? 'py-3' : 'py-2';

  // const bgColor = error ? 'bg-danger-50' : 'bg-neutral-200'; => ${bgColor}
  const textDirection = isRTL ? 'text-right' : 'text-left';
  return (
    <View className="mb-3">
      {label && (
        <Text
          variant="sm"
          className={`font-semibold ${
            error ? 'text-danger-600' : 'text-textprimary-100'
          } `}
        >
          {label} {required && <Text className="text-danger-600 ">*</Text>}
        </Text>
      )}

      <View
        style={[
          // {
          //   height: size === 'small' ? 50 : size === 'large' ? 60 : 55,
          // },
          error
            ? isFocussed
              ? {
                  borderBottomWidth: 1.5,
                  borderBottomColor: colors.danger[600],
                }
              : {
                  borderBottomWidth: 1.5,
                  borderBottomColor: colors.danger[600],
                }
            : isFocussed
            ? {
                borderBottomWidth: 1.5,
                borderBottomColor: colors.primary[600],
              }
            : {
                borderBottomWidth: 1.5,
                borderColor: colors.neutral[100],
              },
        ]}
        className={`w-full flex-row
        content-center 
        items-center 
        justify-center 
       
          ${textDirection}
           `}
      >
        {IconLeft && (
          <TouchableOpacity
            style={
              iconLeft.custom
                ? {
                    backgroundColor: colors.primary[500],
                    padding: 5,
                    borderRadius: 10,
                  }
                : {}
            }
            onPress={iconLeft.onPress && iconLeft.onPress}
          >
            <IconLeft
              size={20}
              color={
                iconLeft.color
                  ? iconLeft.color
                  : isFocussed
                  ? colors.primary[600]
                  : '#8894A7'
              }
            />
          </TouchableOpacity>
        )}

        <STextInput
          testID="STextInput"
          ref={ref}
          placeholderTextColor={colors.textprimary[50]}
          className={`ml-1 mt-0 ${marginVertical} ${
            error ? 'text-danger-600' : 'text-textprimary-100'
          } flex-1 rounded-md px-2 text-[16px] ${textDirection}`}
          onBlur={onBlur}
          onFocus={onFocus}
          {...inputProps}
          style={StyleSheet.flatten([
            { writingDirection: isRTL ? 'rtl' : 'ltr' },
          ])}
        />
        {labelButtonRight && (
          <TouchableOpacity
            onPress={onPressButtonRight}
            className={`bg-primary-700 flex-row items-center justify-center rounded-lg  p-2
         `}
          >
            {false ? (
              <ActivityIndicator />
            ) : (
              <View className="flex-row">
                <Text className="text-[12px] font-semibold text-white">
                  {labelButtonRight}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        {IconRight && !labelButtonRight && (
          <TouchableOpacity onPress={iconRight.onPress && iconRight.onPress}>
            <IconRight
              color={
                iconRight.color
                  ? iconRight.color
                  : isFocussed
                  ? colors.primary[600]
                  : '#8894A7'
              }
              variant="Bulk"
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text variant="error">{error}</Text>}
    </View>
  );
});
