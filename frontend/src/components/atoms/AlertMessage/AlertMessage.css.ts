import { style } from '@vanilla-extract/css';

import { colors, fonts, withAlpha } from '@/styles/tokens';

export const alert = style({
  padding: '0.5rem 0.75rem',
  borderRadius: '0.375rem',
  background: withAlpha(colors.alert, 0.12),
  border: `1px solid ${withAlpha(colors.alert, 0.4)}`,
  fontFamily: fonts.poppins,
  fontSize: '0.875rem',
  color: colors.alertLight,
});
