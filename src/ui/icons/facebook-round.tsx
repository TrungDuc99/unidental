import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

export function FacebookRound({ color = '#112950', ...props }: SvgProps) {
  return (
    <Svg width={30} height={30} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fill="url(#a)"
        d="M10 .042c-5.523 0-10 4.477-10 10 0 4.953 3.605 9.055 8.332 9.85v-7.764H5.92V9.334h2.412v-2.06c0-2.39 1.46-3.693 3.593-3.693 1.021 0 1.899.076 2.154.11v2.498l-1.48.001c-1.159 0-1.383.551-1.383 1.36v1.783h2.767l-.36 2.793h-2.406v7.832C16.163 19.356 20 15.15 20 10.038c0-5.52-4.477-9.996-10-9.996z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={10}
          x2={10}
          y1={0.042}
          y2={19.958}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2FB1FE" />
          <Stop offset={1} stopColor="#026AE3" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
