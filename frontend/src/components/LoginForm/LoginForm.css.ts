import { style } from '@vanilla-extract/css';
import { colors } from '@/styles/tokens';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const errorMsg = style({
  color: 'rgb(220, 38, 38)',
});

export const submitBtn = style({
  color: colors.mainLight,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
});
