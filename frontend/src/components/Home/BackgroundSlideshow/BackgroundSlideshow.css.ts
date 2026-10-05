import { keyframes, style } from '@vanilla-extract/css';
import { alphaColors, colors, media, transition, withAlpha } from '@/styles/tokens';

const slowZoom = keyframes({
  from: { transform: 'scale(1)' },
  to: { transform: 'scale(1.08)' },
});

export const slideshow = style({
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  zIndex: 0,
});

export const slide = style({
  position: 'absolute',
  inset: 0,
  opacity: 0,
  transition: transition(['opacity'], '1.8s'),
});

export const slideActive = style({
  opacity: 1,
});

export const image = style({
  objectFit: 'cover',
  objectPosition: 'center',
  '@media': {
    [media.motionOk]: {
      animation: `${slowZoom} 20s ease-in-out infinite alternate`,
    },
  },
});

export const veil = style({
  position: 'absolute',
  inset: 0,
  background: [
    `linear-gradient(to right, ${colors.pageDarkBg} 0%, ${withAlpha(colors.pageDarkBg, 0.75)} 35%, ${withAlpha(colors.pageDarkBg, 0.25)} 70%, ${withAlpha(colors.pageDarkBg, 0.55)} 100%)`,
    `linear-gradient(to bottom, ${withAlpha(colors.pageDarkBg, 0.5)} 0%, transparent 25%, transparent 65%, ${colors.pageDarkBg} 100%)`,
    `radial-gradient(ellipse 60% 50% at 15% 50%, ${withAlpha(colors.mainMedium, 0.25)} 0%, transparent 70%)`,
  ].join(', '),
});

export const dots = style({
  position: 'absolute',
  right: '2rem',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  zIndex: 2,
  '@media': {
    [media.tablet]: {
      display: 'none',
    },
  },
});

export const dot = style({
  width: '0.5rem',
  height: '2rem',
  padding: 0,
  border: `1px solid ${alphaColors.primaryBorderStrong}`,
  borderRadius: '999px',
  background: withAlpha(colors.white, 0.15),
  cursor: 'pointer',
  transition: transition(['background', 'height'], '0.4s'),
  ':hover': {
    background: alphaColors.textMuted,
  },
});

export const dotActive = style({
  height: '3rem',
  background: colors.secondary,
  borderColor: colors.secondary,
  ':hover': {
    background: colors.secondary,
  },
});
