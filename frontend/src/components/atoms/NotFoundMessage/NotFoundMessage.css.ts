import { style } from '@vanilla-extract/css';

import { colors, fonts } from '@/styles/tokens';

export const notFound = style({
  padding: '4rem 2rem',
  fontFamily: fonts.cinzel,
  textAlign: 'center',
  color: colors.white,
});
