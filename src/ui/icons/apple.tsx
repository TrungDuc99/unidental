import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Apple({ color = '#333', ...props }: SvgProps) {
  return (
    <Svg width={35} height={35} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fill={color}
        d="M11.76 6.69a.52.52 0 0 1-.59-.52 4.37 4.37 0 0 1 1-2.61A4.82 4.82 0 0 1 14.64 2a.51.51 0 0 1 .63.51 4.66 4.66 0 0 1-1 2.63 4.07 4.07 0 0 1-2.51 1.55zm5.42 5.82c0-2.72 2-3.33 2-3.92 0-.59-1.73-1.91-3.56-1.91s-2.54.86-3.78.86c-1.24 0-2.25-.86-3.79-.86a5.16 5.16 0 0 0-4.16 2.53A6.64 6.64 0 0 0 3 12.75C3 17.14 6.15 22 8.47 22c1.3 0 1.63-.85 3.42-.85S14 22 15.22 22c2.52 0 4.62-5 4.62-5.07a.51.51 0 0 0-.3-.46 4.44 4.44 0 0 1-2.36-3.96z"
      />
    </Svg>
  );
}
