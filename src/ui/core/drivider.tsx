import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Spacing } from '@/configs';

import { View } from './view';

interface DividerProps {
  orientation: 'vertical' | 'horizontal';
  color?: 'dark' | 'normal' | 'bland';
  spacing?: number;
  height?: string;
  width?: string | number;
}

const Divider = (props: DividerProps) => {
  const { orientation, color, spacing, height, width } = props;
  const styles = StyleSheet.create({
    container: {},
    lineVer: {
      width: 1,
      backgroundColor: '#c2c2c2',
      height: height ? height : '100%',
      marginBottom: 2,
      // marginHorizontal: Spacing(4),
    },
    lineHor: {
      width: width ? width : '100%',
      backgroundColor: '#c2c2c2',
      height: 1,
      marginVertical: Spacing(spacing ? spacing : 1),
      // marginHorizontal: Spacing(4),
    },
  });
  return (
    <View
      style={[
        orientation === 'vertical' ? styles.lineVer : styles.lineHor,
        {
          backgroundColor:
            color === 'bland'
              ? '#f0f0f0'
              : color === 'dark'
              ? '#acacac'
              : '#e3e3e3',
        },
      ]}
    />
  );
};

export default Divider;
