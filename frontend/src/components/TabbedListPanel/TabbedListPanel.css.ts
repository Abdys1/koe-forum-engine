import { style } from '@vanilla-extract/css';
import { colors } from '@/styles/tokens';

export const panel = style({
  position: 'relative',
  width: '100%',
  maxWidth: '32rem',
  height: '18rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
  borderRadius: '0.25rem',
  overflow: 'hidden',
  background: 'rgba(25,26,28,0.9)',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '2rem',
      background: `linear-gradient(to bottom, transparent, ${colors.cardBlackBg})`,
      opacity: 0.7,
      zIndex: 30,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '2rem',
      background: `linear-gradient(to bottom, transparent, ${colors.cardBlackBg})`,
      opacity: 0.4,
      zIndex: 30,
    },
  },
});

export const nav = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: colors.cardMediumBg,
  zIndex: 20,
  borderBottom: '0.5px solid rgba(255,255,255,0.3)',
});

export const navItem = style({
  position: 'relative',
  height: '100%',
});

export const scrollArea = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  marginTop: '2rem',
  paddingTop: '0.25rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingBottom: '0.75rem',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
  overflowY: 'auto',
  zIndex: 10,
  scrollbarWidth: 'thin',
  scrollbarColor: `${colors.mainLight} transparent`,
  selectors: {
    '&::-webkit-scrollbar': { width: '6px' },
    '&::-webkit-scrollbar-track': { background: 'transparent' },
    '&::-webkit-scrollbar-thumb': {
      background: colors.mainLight,
      borderRadius: '9999px',
    },
  },
});

export const list = style({
  position: 'relative',
  width: '100%',
  listStyle: 'none'
});
