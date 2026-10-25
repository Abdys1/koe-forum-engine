import { style } from '@vanilla-extract/css';
import { colors, fonts, gradients, shadows } from '@/styles/tokens';

export const heading = style({
  minHeight: '2rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  selectors: {
    '&::after': {
      content: '""',
      order: 1,
      flex: '1 1 auto',
      height: '1px',
      background: gradients.primaryFadeRight,
    },
  },
});

export const headingTitle = style({
  flexShrink: 0,
  fontFamily: fonts.cinzel,
  fontSize: '1.2rem',
  fontWeight: '700',
  letterSpacing: '0.1em',
  color: colors.secondary,
  textShadow: shadows.text,
});

export const headingAction = style({
  order: 2,
});
