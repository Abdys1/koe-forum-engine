import { style } from '@vanilla-extract/css';

import { mainBg } from '@/styles/shared.css';

export const page = style([mainBg, {
  width: '100%',
}]);
