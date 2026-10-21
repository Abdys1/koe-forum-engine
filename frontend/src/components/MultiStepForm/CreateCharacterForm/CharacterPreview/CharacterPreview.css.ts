import { keyframes, style } from '@vanilla-extract/css';
import { fadeDividerTop, featuredPanel, riseIn } from '@/styles/shared.css';
import { alphaColors, characterPortrait, colors, fonts, gradients, media, shadows } from '@/styles/tokens';

const portraitAppear = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const sheet = style([featuredPanel, {
  background: gradients.primaryGoldSurfaceTall,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  padding: '1.25rem',
  overflowX: 'hidden',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: `${alphaColors.primaryBorderStrong} transparent`,
}]);

export const reveal = style({
  '@media': {
    [media.motionOk]: {
      animation: `${riseIn} 0.5s ease-out`,
    },
  },
});

export const identity = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
});

export const portrait = style({
  ...characterPortrait(14),
  position: 'relative',
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.75rem',
  overflow: 'hidden',
  background: alphaColors.primaryTintSoft,
});

export const portraitInner = style({
  position: 'relative',
  width: '100%',
  height: '100%',
});

export const portraitReveal = style({
  '@media': {
    [media.motionOk]: {
      animation: `${portraitAppear} 1.2s ease-in-out`,
    },
  },
});

export const portraitImg = style({
  objectFit: 'cover',
  objectPosition: 'top',
});

export const portraitIcon = style({
  fontSize: '6rem',
  color: alphaColors.primaryBorderStrong,
});

export const name = style({
  textAlign: 'center',
  fontFamily: fonts.cinzel,
  fontSize: '1.35rem',
  fontWeight: '700',
  lineHeight: 1.2,
  letterSpacing: '0.03em',
  color: colors.secondary,
  textShadow: shadows.text,
  overflowWrap: 'anywhere',
});

export const namePlaceholder = style({
  fontStyle: 'italic',
  fontWeight: '400',
  color: alphaColors.textMuted,
});

export const traits = style({
  minWidth: 0,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '0.5rem 2.5rem',
});

export const trait = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.1rem',
});

const smallLabel = {
  fontFamily: fonts.poppins,
  fontSize: '0.7rem',
  fontWeight: '500',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: colors.mainLight,
} as const;

export const traitLabel = style(smallLabel);

export const portraitHint = style([smallLabel, {
  padding: '0 1rem',
  fontSize: '0.65rem',
  letterSpacing: '0.15em',
  textAlign: 'center',
  color: alphaColors.textMuted,
}]);

export const traitValue = style({
  fontFamily: fonts.poppins,
  fontSize: '0.95rem',
  color: colors.white,
});

export const section = style([fadeDividerTop, {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  paddingTop: '1rem',
}]);

export const sectionHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: '0.75rem',
});

export const sectionMeta = style({
  fontFamily: fonts.poppins,
  fontSize: '0.75rem',
  color: alphaColors.textMuted,
});

export const sectionTitle = style({
  fontFamily: fonts.cinzel,
  fontSize: '0.95rem',
  fontWeight: '700',
  letterSpacing: '0.08em',
  color: colors.secondary,
});

export const gearList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const gearRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: '0.75rem',
});

export const gearLabel = style([smallLabel, {
  flexShrink: 0,
  fontSize: '0.65rem',
  letterSpacing: '0.15em',
}]);

export const gearItems = style({
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '0.2rem',
});

export const gearValue = style({
  minWidth: 0,
  fontFamily: fonts.poppins,
  fontSize: '0.85rem',
  textAlign: 'right',
  color: alphaColors.textBody,
});

export const emptyValue = style({
  color: alphaColors.textMuted,
});
