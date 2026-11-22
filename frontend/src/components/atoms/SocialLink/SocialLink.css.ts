import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/tokens';

export const link = style({
  display: 'flex',
  color: colors.white,
  opacity: 0.7,
  cursor: 'pointer',
  transition: 'color 0.2s ease, opacity 0.2s ease',
  ':hover': {
    color: colors.secondary,
    opacity: 1,
  },
});
