import { style } from '@vanilla-extract/css';
import { alphaColors, colors, gradients, shadows } from './tokens';

export const glassBox = style({
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: colors.cardMediumBg,
      opacity: 0.9,
      borderRadius: '0.25rem',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      boxShadow: '-15px 15px 40px -5px rgba(0, 0, 0, 0.4)',
    },
  },
});

export const gearStepBg = style({
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      right: '5%',
      width: '50%',
      height: '100%',
      backgroundImage: "url('/images/knight-withoutbg.png')",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left bottom',
      backgroundSize: 'contain',
      opacity: 0.4,
    },
  },
});

export const raceStepBg = style({
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: '5%',
      width: '100%',
      height: '100%',
      backgroundImage: 'var(--raceUrl)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left bottom',
      backgroundSize: 'contain',
      opacity: 0.4,
    },
  },
});

export const glassPanel = style({
  background: gradients.glassSurface,
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: `1px solid ${alphaColors.primaryBorder}`,
  borderRadius: '0.75rem',
  boxShadow: shadows.glass,
});
