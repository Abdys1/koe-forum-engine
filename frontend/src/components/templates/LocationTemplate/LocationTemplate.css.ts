import { style } from '@vanilla-extract/css';

import { mainBg } from '@/styles/shared.css';
import { alphaColors, colors } from '@/styles/tokens';

export const page = style([mainBg, {
  width: '100%',
  minHeight: '100vh',
}]);

export const stream = style({
  position: 'relative',
  paddingBottom: '4rem',
  background: `linear-gradient(to bottom, ${colors.pageDarkBg} 0, ${alphaColors.pageDarkVeil} 8rem, transparent 18rem, transparent calc(100% - 18rem), ${alphaColors.pageDarkVeil} calc(100% - 8rem), ${colors.pageDarkBg} 100%)`,
});
