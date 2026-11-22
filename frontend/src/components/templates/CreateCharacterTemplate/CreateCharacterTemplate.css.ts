import { style } from '@vanilla-extract/css';

import { mainBg } from '@/styles/shared.css';
import { layout } from '@/styles/tokens';

export const page = style([mainBg, {
  position: 'relative',
  width: '100%',
  minHeight: `calc(100vh - ${layout.headerTotalHeight})`,
  display: 'flex',
}]);
