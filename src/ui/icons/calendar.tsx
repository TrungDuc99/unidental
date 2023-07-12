import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Calendar({ color = '#112950', ...props }: SvgProps) {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        stroke={color}
        d="M2.75 12.776c0-6.956 2.319-9.274 9.274-9.274 6.956 0 9.275 2.318 9.275 9.274 0 6.956-2.32 9.274-9.275 9.274S2.75 19.732 2.75 12.776zM3.025 9.324h18.008m-4.605 3.937h.01m-4.408 0h.008m-4.417 0h.01m8.797 3.852h.01m-4.408 0h.008m-4.417 0h.01M16.033 2.05v3.262M8.025 2.05v3.262"
      />
    </Svg>
  );
}
