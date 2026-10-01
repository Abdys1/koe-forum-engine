import { style } from '@vanilla-extract/css';
import { colors, fonts } from '@/styles/tokens';

export const footer = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '2.5rem',
  paddingBottom: '2.5rem',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  background: colors.cardBlackBg,
  borderTop: `1px solid ${colors.cardMediumBg}`,
});

export const logo = style({
  fontFamily: fonts.cinzelDecorative,
  fontSize: '1.5rem',
  fontWeight: '700',
  letterSpacing: '0.08em',
  color: colors.secondary,
  textDecoration: 'none',
});

export const copyright = style({
  fontFamily: fonts.poppins,
  fontSize: '0.875rem',
  color: colors.white,
  opacity: 0.7,
});
