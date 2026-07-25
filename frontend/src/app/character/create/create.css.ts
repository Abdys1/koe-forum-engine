import { style } from '@vanilla-extract/css';
import { colors } from '@/styles/tokens';

export const page = style({
  position: 'relative',
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  background: colors.blackBg,
});
