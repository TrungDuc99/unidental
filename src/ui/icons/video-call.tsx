import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function VideoCall({ color, ...props }: SvgProps) {
  return (
    <Svg width={28} height={29} viewBox="0 0 24 24" {...props}>
      <Path
        fill={color}
        d="M16 16.25a3.25 3.25 0 0 1-3.25 3.25h-7.5A3.25 3.25 0 0 1 2 16.25v-8.5A3.25 3.25 0 0 1 5.25 4.5h7.5A3.25 3.25 0 0 1 16 7.75v8.5zm5.762-10.357a1 1 0 0 1 .238.648v10.918a1 1 0 0 1-1.648.762L17 15.37V8.628l3.352-2.849a1 1 0 0 1 1.41.114z"
      />
    </Svg>
  );
}
