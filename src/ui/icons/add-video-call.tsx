import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function AddVideoCall({ color, ...props }: SvgProps) {
  return (
    <Svg width={28} height={29} viewBox="0 0 24 24" {...props}>
      <Path
        fill={color}
        d="M9 16h2v-3h3v-2h-3V8H9v3H6v2h3v3zm-5 4q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h12q.825 0 1.413.588T18 6v4.5l4-4v11l-4-4V18q0 .825-.588 1.413T16 20H4zm0-2h12V6H4v12zm0 0V6v12z"
      />
    </Svg>
  );
}
