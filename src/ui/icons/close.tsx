import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Close({ color = '#6B727C', ...props }: SvgProps) {
  return (
    <Svg width={31} height={31} viewBox="0 0 24 24" fill="none" {...props}>
      <Path stroke={color} d="m7 7 10 10M7 17 17 7" />
    </Svg>
  );
}
