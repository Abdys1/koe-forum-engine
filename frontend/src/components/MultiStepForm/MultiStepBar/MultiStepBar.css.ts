import { style } from '@vanilla-extract/css';
import { colors } from '@/styles/tokens';

export const bar = style({
  position: 'relative',
  width: '100%',
  maxWidth: '36rem',
  marginBottom: '1.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      width: '100%',
      height: '4px',
      transform: 'translateY(-50%)',
      background: colors.cardMediumBg,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: 0,
      width: 'var(--progressLine)',
      height: '4px',
      transform: 'translateY(-50%)',
      background: colors.mainHover,
    },
  },
});
