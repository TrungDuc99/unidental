import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

export function Facebook({ color = '#112950', ...props }: SvgProps) {
  return (
    <Svg width={35} height={35} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fill="url(#a)"
        fillRule="evenodd"
        d="M21 5v14a2 2 0 0 1-2 2h-3.75a.5.5 0 0 1-.5-.5v-6h2.34a.5.5 0 0 0 .49-.4l.36-1.8a.25.25 0 0 0-.24-.3h-2.95V8.75A.25.25 0 0 1 15 8.5h2.5A.5.5 0 0 0 18 8V6.5a.5.5 0 0 0-.5-.5H15a3 3 0 0 0-3 3v3h-1.23a.5.5 0 0 0-.5.5V14a.5.5 0 0 0 .5.5H12v6a.5.5 0 0 1-.5.5H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={12}
          x2={12}
          y1={3}
          y2={21}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2FB1FE" />
          <Stop offset={1} stopColor="#026AE3" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
