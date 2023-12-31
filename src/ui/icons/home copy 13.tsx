import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Home({ color = '#112950', ...props }: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        stroke={color}
        d="M9.079 16.135h5.815M2.4 13.713c0-5.631.614-5.238 3.919-8.303C7.765 4.246 10.015 2 11.958 2c1.942 0 4.237 2.235 5.696 3.41 3.305 3.065 3.918 2.672 3.918 8.303C21.572 22 19.613 22 11.986 22 4.359 22 2.4 22 2.4 13.713z"
      />
    </Svg>
  );
}
