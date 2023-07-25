import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function ClinicVisit({ color = '#112950', ...props }: SvgProps) {
  return (
    <Svg width={32} height={32} fill="none" {...props}>
      <Path fill="#E3FCFD" d="M3.5 12h25v19h-25V12z" />
      <Path
        fill="#00E1F0"
        d="M11.5 21h9v10h-9V21zm4.5-4a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
      />
      <Path fill="#003CBF" d="M8.5 16.5a1 1 0 0 0-2 0v5a1 1 0 1 0 2 0v-5z" />
      <Path
        fill="#003CBF"
        d="M31 30h-1.5V12a1 1 0 0 0-1-1h-2a1 1 0 1 0 0 2h1v17h-6v-9a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1v9h-6V13h3.45a9.045 9.045 0 1 0-.718-2H3.5a1 1 0 0 0-1 1v18H1a1 1 0 1 0 0 2h30a1 1 0 0 0 0-2zM16 2a7 7 0 1 1-7 7 7.008 7.008 0 0 1 7-7zm-3.5 28v-8h7v8h-7z"
      />
      <Path
        fill="#003CBF"
        d="M13 10h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 1 0 0-2h-2V6a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2z"
      />
      <Path fill="#00E1F0" d="M7.5 26.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    </Svg>
  );
}
