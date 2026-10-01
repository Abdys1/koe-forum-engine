import { style } from '@vanilla-extract/css';
import { colors, fonts, shadows } from '@/styles/tokens';

export const header = style({
  width: '100%',
  background: colors.cardBlackBg,
  borderBottom: '1px solid',
  borderImage: `linear-gradient(to right, ${colors.cardMediumBg} 0%, ${colors.cardMediumBg} 30%, ${colors.secondary} 100%) 1`,
  boxShadow: shadows.card,
});

export const nav = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  paddingLeft: '2rem',
  paddingRight: '2rem',
});

export const logo = style({
  fontFamily: fonts.cinzelDecorative,
  fontSize: '1.8rem',
  fontWeight: '700',
  letterSpacing: '0.08em',
  color: colors.secondary,
  textDecoration: 'none',
  textShadow: '0 2px 8px rgba(0,0,0,0.6)',
  transition: 'color 0.3s ease-in-out',
  ':hover': {
    color: colors.secondaryLight,
  },
});

export const menu = style({
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
});

export const menuItem = style({
  fontFamily: fonts.poppins,
  fontWeight: '500',
  letterSpacing: '0.05em',
  color: colors.white,
  textDecoration: 'none',
  transition: 'color 0.3s ease-in-out',
  ':hover': {
    color: colors.mainLight,
  },
});

export const mapBtn = style({
  display: 'inline-block',
  paddingTop: '0.4rem',
  paddingBottom: '0.4rem',
  paddingLeft: '1.25rem',
  paddingRight: '1.25rem',
  border: `2px solid ${colors.secondary}`,
  borderRadius: '0.25rem',
  background: colors.secondary,
  color: colors.darkText,
  fontFamily: fonts.poppins,
  fontWeight: '500',
  letterSpacing: '0.05em',
  textDecoration: 'none',
  transition: 'all 0.5s ease-in-out',
  ':hover': {
    background: colors.secondaryLight,
    borderColor: colors.secondaryDark,
    letterSpacing: '0.1em',
  },
});
