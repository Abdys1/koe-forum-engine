import { style } from '@vanilla-extract/css';
import { colors, fonts } from '@/styles/tokens';

export const link = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '18rem',
  height: '3.5rem',
  paddingBottom: '0.125rem',
  fontSize: '1.5rem',
  color: colors.white,
  background: 'transparent',
  fontFamily: fonts.sumana,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  borderRadius: '0.375rem',
  border: `2px solid ${colors.white}`,
  textDecoration: 'none',
  transition: 'all 0.3s ease-in-out',
  ':hover': {
    background: 'rgba(255,255,255,0.3)',
  },
});
