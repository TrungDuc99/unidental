import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function ArrowDown({ color = '#112950', ...props }: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path stroke={color} d="M19 8.5s-4.144 7-7 7c-2.855 0-7-7-7-7" />
    </Svg>
  );
}
