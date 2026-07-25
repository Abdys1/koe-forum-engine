import { style } from '@vanilla-extract/css';
import { colors } from '@/styles/tokens';

export const page = style({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: colors.darkBg,
});
