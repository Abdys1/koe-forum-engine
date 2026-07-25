import { style } from '@vanilla-extract/css';
import { colors } from '@/styles/tokens';

export const step = style({
  position: 'relative',
  width: '100%',
  height: 'calc(100vh - 4rem)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column',
  margin: '2rem',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  background: colors.cardBlackBg,
  borderRadius: '0.25rem',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.4)',
  overflow: 'hidden',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: "url('/images/wave.svg')",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left bottom',
      backgroundSize: 'contain',
      zIndex: 0,
    },
  },
});

export const stepHeader = style({
  position: 'relative',
  width: '100%',
  marginBottom: '0.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  zIndex: 10,
});
