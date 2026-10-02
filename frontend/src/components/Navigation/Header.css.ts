import { style } from '@vanilla-extract/css';
import { colors, fonts, shadows } from '@/styles/tokens';

export const HEADER_HEIGHT = '3.75rem';
const HEADER_BORDER_WIDTH = '1px';
export const HEADER_TOTAL_HEIGHT = `calc(${HEADER_HEIGHT} + ${HEADER_BORDER_WIDTH})`;

export const header = style({
  position: 'sticky',
  top: 0,
  zIndex: 40,
  width: '100%',
  background: colors.cardBlackBg,
  borderBottom: `${HEADER_BORDER_WIDTH} solid`,
  borderImage: `linear-gradient(to right, ${colors.cardMediumBg} 0%, ${colors.cardMediumBg} 30%, ${colors.secondary} 100%) 1`,
  boxShadow: shadows.card,
});

export const nav = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: HEADER_HEIGHT,
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

const mapIconSize = '100px';

export const mapBtn = style({
  display: 'block',
  width: mapIconSize,
  alignSelf: 'stretch',
  cursor: 'pointer',
});

export const mapIcon = style({
  position: 'absolute',
  bottom: 0,
  width: mapIconSize,
  height: mapIconSize,
  background: 'transparent',
  transform: 'translateY(calc(50% + 0.5px))',
  transition: 'transform 0.3s ease-in-out, filter 0.3s ease-in-out',
  selectors: {
    [`${mapBtn}:hover &`]: {
      transform: 'translateY(calc(50% + 0.5px)) scale(1.08)',
      filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.6)) brightness(1.1)',
    },
  },
});
