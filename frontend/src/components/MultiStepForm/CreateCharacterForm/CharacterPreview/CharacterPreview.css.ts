import { keyframes, style } from '@vanilla-extract/css';
import { glassFrame, riseIn } from '@/styles/shared.css';
import { alphaColors, characterPortrait, colors, fonts, media, shadows } from '@/styles/tokens';

const portraitAppear = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const strip = style([glassFrame, {
  minWidth: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '0.85rem',
  paddingRight: '1.25rem',
  borderRadius: '0.2rem',
}]);

export const reveal = style({
  '@media': {
    [media.motionOk]: {
      animation: `${riseIn} 0.5s ease-out`,
    },
  },
});

export const portrait = style({
  ...characterPortrait(2.25),
  position: 'relative',
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
  fontSize: '1.5rem',
  color: alphaColors.primaryBorderStrong,
});

export const identity = style({
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.15rem',
});

export const name = style({
  maxWidth: '14rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontFamily: fonts.cinzel,
  fontSize: '1rem',
  fontWeight: '700',
  lineHeight: 1.2,
  letterSpacing: '0.03em',
  color: colors.secondary,
  textShadow: shadows.text,
});

export const namePlaceholder = style({
  fontStyle: 'italic',
  fontWeight: '400',
  color: alphaColors.textMuted,
});

export const traits = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '0.4rem',
  fontFamily: fonts.poppins,
  fontSize: '0.8rem',
  color: alphaColors.textBody,
  whiteSpace: 'nowrap',
});

export const separator = style({
  color: colors.mainLight,
});
