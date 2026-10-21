import { style } from '@vanilla-extract/css';
import { colors } from '@/styles/tokens';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const errorMsg = style({
  color: colors.alert,
});

export const submitBtn = style({
  color: colors.mainLight,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
});
