import { style } from '@vanilla-extract/css';
import { colors, fonts } from '@/styles/tokens';

export const base = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: colors.white,
  fontSize: '0.875rem',
  fontWeight: '500',
  letterSpacing: '0.025em',
  textTransform: 'uppercase',
  fontFamily: fonts.poppins,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  zIndex: 10,
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -10,
    },
  },
});

export const navBtnInactive = style({
  selectors: {
    '&::after': {
      background: 'linear-gradient(to right, rgba(255,255,255,0.5), transparent)',
      opacity: 0.3,
    },
    '&:hover::after': {
      background: `linear-gradient(to right, ${colors.mainLight}, transparent)`,
      opacity: 0.7,
    },
  },
});

export const navBtnActive = style({
  selectors: {
    '&::after': {
      background: `linear-gradient(to right, ${colors.mainLight}, transparent)`,
      opacity: 0.7,
    },
  },
});
