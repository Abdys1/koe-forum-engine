import { style } from '@vanilla-extract/css';

import { alphaColors, fonts } from '@/styles/tokens';

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
