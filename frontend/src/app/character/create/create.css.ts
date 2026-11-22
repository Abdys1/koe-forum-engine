import { style } from '@vanilla-extract/css';

import { mainBg } from '@/styles/shared.css';
import { alphaColors, fonts, layout } from '@/styles/tokens';

export const page = style([mainBg, {
  position: 'relative',
  width: '100%',
  minHeight: `calc(100vh - ${layout.headerTotalHeight})`,
  display: 'flex',
}]);

export const status = style({
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  fontFamily: fonts.poppins,
  fontSize: '0.9rem',
  lineHeight: 1.6,
  color: alphaColors.textBody,
  textAlign: 'center',
});
