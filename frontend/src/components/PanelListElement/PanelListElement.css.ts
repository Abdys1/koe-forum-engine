import { style } from '@vanilla-extract/css';
import { colors, fonts, gradients } from '@/styles/tokens';

export const listItem = style({
  position: 'relative'
});

export const row = style({
  position: 'relative',
  height: '2.25rem',
  minHeight: '2.25rem',
  paddingLeft: '1rem',
  marginTop: '0.75rem',
  marginBottom: '0.75rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: colors.white,
  fontSize: '0.875rem',
  fontWeight: '500',
  letterSpacing: '0.05em',
  fontFamily: fonts.poppins,
  background: `linear-gradient(to top, ${colors.cardMediumBg}, ${colors.cardBlackBg})`,
  borderRadius: '0.125rem',
  overflow: 'hidden',
  zIndex: 20,
  cursor: 'pointer',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '5px',
      background: gradients.blackVeilDown,
      zIndex: 20,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.4,
      zIndex: -10,
    },
  },
});

export const rowActive = style({
  selectors: {
    '&::after': {
      background: `linear-gradient(to left, transparent, ${colors.mainMedium})`,
    },
  },
});

export const rowInactive = style({
  selectors: {
    '&::after': {
      background: 'linear-gradient(to left, transparent, transparent)',
    },
    '&:hover::after': {
      background: `linear-gradient(to left, transparent, ${colors.mainMedium})`,
    },
  },
});

export const selectBtn = style({
  position: 'relative',
  height: '100%',
  paddingRight: '0.5rem',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  background: colors.secondary,
  color: colors.cardMediumBg,
  fontSize: '0.875rem',
  fontWeight: '500',
  letterSpacing: '0.1em',
  cursor: 'pointer',
  zIndex: 10,
  border: 'none',
  ':hover': {
    background: colors.secondaryMedium,
  },
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-20px',
      height: '150%',
      width: '60px',
      background: colors.secondary,
      transform: 'rotate(25deg)',
      zIndex: -10,
    },
    '&:hover::before': {
      background: colors.secondaryMedium,
    },
  },
});

export const desc = style({
  position: 'relative',
  width: '100%',
  padding: '0.5rem',
  marginBottom: '0.5rem',
  color: colors.white,
  fontSize: '0.875rem',
  fontWeight: '300',
  letterSpacing: '0.05em',
  fontFamily: fonts.poppins,
  background: colors.cardBlackBg,
  borderRadius: '0.125rem',
  overflow: 'hidden',
  opacity: 0.9,
  zIndex: 20,
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '5px',
      background: gradients.blackVeilDown,
      zIndex: 20,
    },
  },
});

export const descVisible = style({ display: 'flex' });
export const descHidden = style({ display: 'none' });
