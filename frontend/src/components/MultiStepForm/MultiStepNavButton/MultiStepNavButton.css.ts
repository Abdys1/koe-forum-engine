import { style, styleVariants } from '@vanilla-extract/css';

import { alphaColors, backdropBlur, colors, fonts, goldFocusRing, gradients, shadows, transition, withAlpha } from '@/styles/tokens';

export const navButton = style({
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
  padding: 0,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  selectors: {
    '&:disabled': { cursor: 'not-allowed' },
    '&:focus-visible': { outline: 'none' },
  },
});

export const circle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${alphaColors.primaryBorderStrong}`,
  borderRadius: '50%',
  background: gradients.glassSurface,
  ...backdropBlur('8px'),
  boxShadow: shadows.glass,
  color: alphaColors.textSoft,
  transition: transition(['border-color', 'color', 'box-shadow', 'opacity']),
  selectors: {
    [`${navButton}:hover:not(:disabled) &`]: {
      borderColor: colors.secondary,
      color: colors.secondary,
    },
    [`${navButton}:focus-visible &`]: goldFocusRing,
    [`${navButton}:disabled &`]: {
      opacity: 0.35,
    },
  },
});

export const circleVariants = styleVariants({
  prev: {
    width: '3.25rem',
    height: '3.25rem',
    fontSize: '2rem',
  },
  next: {
    width: '3.25rem',
    height: '3.25rem',
    fontSize: '2rem',
    borderColor: alphaColors.secondaryBorder,
    color: colors.secondary,
    boxShadow: `0 0 18px -4px ${alphaColors.secondaryGlow}, ${shadows.glass}`,
    selectors: {
      [`${navButton}:hover:not(:disabled) &`]: {
        boxShadow: `0 0 24px -2px ${withAlpha(colors.secondary, 0.4)}, ${shadows.glass}`,
      },
    },
  },
  summary: {
    width: '2.5rem',
    height: '2.5rem',
    fontSize: '1.25rem',
  },
});

export const label = style({
  fontFamily: fonts.poppins,
  fontSize: '0.65rem',
  fontWeight: '500',
  lineHeight: 1.3,
  letterSpacing: '0.06em',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  color: alphaColors.textMuted,
  transition: transition(['color']),
  selectors: {
    [`${navButton}:hover:not(:disabled) &`]: {
      color: colors.secondary,
    },
  },
});

export const labelNext = style({
  color: colors.secondary,
});
