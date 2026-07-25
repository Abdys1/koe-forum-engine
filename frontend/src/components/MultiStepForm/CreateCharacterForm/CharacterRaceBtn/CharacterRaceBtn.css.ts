import { style } from '@vanilla-extract/css';
import { colors, fonts } from '@/styles/tokens';

export const btn = style({
  position: 'relative',
  width: '12rem',
  height: '2.75rem',
  marginBottom: '1rem',
  marginLeft: '1rem',
  marginRight: '1rem',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  background: colors.cardMediumBg,
  borderRadius: '0.125rem',
  outlineStyle: 'solid',
  outlineWidth: '1px',
  outlineOffset: '2px',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  zIndex: 10,
  listStyle: 'none',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '60%',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-1rem',
      right: '-2rem',
      height: '8rem',
      width: '5rem',
      background: '#94a3b8',
      transform: 'rotate(20deg)',
      opacity: 0.035,
    },
  },
});

export const btnActive = style({
  outlineColor: colors.mainLight,
  selectors: {
    '&::before': {
      background: `linear-gradient(to top, ${colors.mainLight}, transparent)`,
      opacity: 0.5,
    },
  },
});

export const btnInactive = style({
  outlineColor: colors.cardMediumBg,
  selectors: {
    '&::before': {
      background: 'linear-gradient(to top, #101112, transparent)',
      opacity: 0.8,
    },
    '&:hover': {
      outlineColor: colors.mainLight,
    },
    '&:hover::before': {
      background: `linear-gradient(to top, ${colors.mainLight}, transparent)`,
      opacity: 0.5,
    },
  },
});

export const btnImg = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '100%',
  width: 'auto',
});

export const btnLabel = style({
  position: 'relative',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  color: colors.white,
  letterSpacing: '0.1em',
  fontFamily: fonts.poppins,
});
