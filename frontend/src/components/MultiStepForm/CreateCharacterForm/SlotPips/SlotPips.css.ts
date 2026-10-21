import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { alphaColors, colors, media, transition, withAlpha } from '@/styles/tokens';

const pulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.35 },
});

export const pips = style({
  display: 'inline-flex',
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const pip = style({
  flexShrink: 0,
  transform: 'rotate(45deg)',
  border: `1px solid ${alphaColors.primaryBorderStrong}`,
  background: alphaColors.primaryTintSoft,
  transition: transition(['background', 'border-color', 'box-shadow']),
});

export const pipSize = styleVariants({
  small: { width: '0.45rem', height: '0.45rem', margin: '0 0.2rem' },
  medium: { width: '0.65rem', height: '0.65rem', margin: '0 0.3rem' },
});

export const filled = style({
  borderColor: colors.mainLight,
  background: colors.mainLight,
  boxShadow: `0 0 8px ${withAlpha(colors.mainLight, 0.7)}`,
});

export const preview = style({
  borderColor: colors.secondary,
  background: withAlpha(colors.secondary, 0.6),
  boxShadow: `0 0 8px ${alphaColors.secondaryGlow}`,
  '@media': {
    [media.motionOk]: {
      animation: `${pulse} 1.2s ease-in-out infinite`,
    },
  },
});
