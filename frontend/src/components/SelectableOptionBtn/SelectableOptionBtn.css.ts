import { style } from '@vanilla-extract/css';
import { colors, fonts } from '@/styles/tokens';

export const base = style({
  position: 'relative',
  width: '8rem',
  paddingTop: '0.25rem',
  paddingBottom: '0.25rem',
  margin: '0.5rem',
  border: `2px solid ${colors.secondary}`,
  borderRadius: '0.25rem',
  letterSpacing: '0.1em',
  fontFamily: fonts.poppins,
  fontWeight: '500',
  transition: 'all 0.3s ease-out',
  cursor: 'pointer',
  ':hover': {
    background: colors.secondary,
    color: colors.cardMediumBg,
  },
});

export const active = style({
  color: colors.cardMediumBg,
  background: colors.secondary,
});

export const inactive = style({
  color: colors.secondary,
  background: 'transparent',
  backdropFilter: 'blur(12px)',
});
