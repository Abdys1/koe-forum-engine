import { style } from '@vanilla-extract/css';

import { fadeDividerTop, featuredPanel } from '@/styles/shared.css';
import { alphaColors, colors, fonts, gradients, media, transition, withAlpha } from '@/styles/tokens';

export const characterSection = style({
  background: `linear-gradient(to bottom, transparent 0%, ${alphaColors.cardBlackVeil} 20%, ${alphaColors.cardBlackVeil} 80%, transparent 100%)`,
});

export const journey = style([featuredPanel, {
  position: 'relative',
  width: '100%',
  maxWidth: '36rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  padding: '1.75rem 2rem',
  overflow: 'hidden',
  '@media': {
    [media.mobile]: { padding: '1.5rem 1.25rem' },
  },
}]);

export const journeyIntro = style({
  fontFamily: fonts.poppins,
  fontSize: '1rem',
  lineHeight: 1.6,
  color: alphaColors.textBody,
});

export const journeySteps = style({
  position: 'relative',
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.1rem',
  selectors: {
    // Függőleges vezetővonal a sorszámok mögött
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '1rem',
      bottom: '1rem',
      left: 'calc(1.25rem - 0.5px)',
      width: '1px',
      background: gradients.primaryFadeDown,
    },
  },
});

export const journeyStep = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem',
});

export const journeyMarker = style({
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '50%',
  border: `1px solid ${alphaColors.primaryBorderStrong}`,
  background: colors.cardBlackBg,
  boxShadow: `0 0 16px -4px ${alphaColors.primaryGlow}`,
  fontFamily: fonts.cinzel,
  fontSize: '0.9rem',
  fontWeight: '700',
  color: colors.secondary,
  transition: transition(['border-color', 'box-shadow']),
  selectors: {
    [`${journeyStep}:hover &`]: {
      borderColor: colors.secondary,
      boxShadow: `0 0 18px -4px ${withAlpha(colors.secondary, 0.5)}`,
    },
  },
});

export const journeyText = style({
  fontFamily: fonts.cinzel,
  fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
  letterSpacing: '0.02em',
  color: colors.white,
});

export const journeyOutro = style([fadeDividerTop, {
  paddingTop: '1.25rem',
  fontFamily: fonts.cinzel,
  fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
  fontStyle: 'italic',
  color: colors.secondary,
  textShadow: `0 0 20px ${alphaColors.secondaryGlow}`,
}]);

export const journeyHint = style({
  marginTop: '0.25rem',
  fontFamily: fonts.poppins,
  fontSize: '0.95rem',
  fontStyle: 'italic',
  color: alphaColors.textSoft,
});
