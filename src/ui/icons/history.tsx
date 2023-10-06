import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function History({ color = '#112950', ...props }: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fill={color}
        d="M21 11.11V5a2 2 0 0 0-2-2h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h6.11c1.26 1.24 2.98 2 4.89 2 3.87 0 7-3.13 7-7 0-1.91-.76-3.63-2-4.89M12 3c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1M5 19V5h2v2h10V5h2v4.68c-.91-.43-1.92-.68-3-.68H7v2h4.1c-.6.57-1.06 1.25-1.42 2H7v2h2.08c-.05.33-.08.66-.08 1 0 1.08.25 2.09.68 3H5m11 2c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m.5-4.75 2.86 1.69-.75 1.22L15 17v-5h1.5v4.25z"
      />
    </Svg>
  );
}