import { style } from '@vanilla-extract/css';
import { featuredPanel } from '@/styles/shared.css';
import { alphaColors, colors, fonts, gradients, media, ornatePortrait, shadows, withAlpha } from '@/styles/tokens';

export const sheet = style([featuredPanel, {
  position: 'relative',
  isolation: 'isolate',
  width: '100%',
  maxWidth: '120rem',
  margin: '0 auto',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.5rem',
  padding: '3rem clamp(1.25rem, 3vw, 3.5rem) 3.5rem',
  background: gradients.primaryGoldSurfaceTall,
  '@media': {
    [media.mobile]: {
      gap: '2rem',
      padding: '2rem 1rem 2.5rem',
    },
  },
}]);

export const backdrop = style({
  position: 'absolute',
  inset: '0 0 auto 0',
  height: '36rem',
  zIndex: -1,
  overflow: 'hidden',
  pointerEvents: 'none',
  maskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: `radial-gradient(ellipse 60% 80% at 15% 30%, transparent 0%, ${withAlpha(colors.cardBlackBg, 0.55)} 100%)`,
    },
  },
});

export const backdropImg = style({
  objectFit: 'cover',
  objectPosition: 'center 25%',
  filter: 'blur(40px) saturate(1.2)',
  opacity: 0.35,
  transform: 'scale(1.2)',
});

export const hero = style({
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'start',
  gap: 'clamp(2rem, 4vw, 4rem)',
  '@media': {
    [media.mobile]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      justifyItems: 'center',
    },
  },
});

export const portraitColumn = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.25rem',
});

export const portrait = style({
  ...ornatePortrait(17),
  background: withAlpha(colors.cardBlackBg, 0.55),
});

export const portraitImg = style({
  objectFit: 'cover',
  objectPosition: 'top',
  borderRadius: 'inherit',
});

export const heroMain = style({
  width: '100%',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '2.25rem',
  paddingTop: '0.5rem',
});

export const identity = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.6rem',
  '@media': {
    [media.mobile]: {
      alignItems: 'center',
      textAlign: 'center',
    },
  },
});

export const eyebrowRow = style({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.75rem 1.5rem',
  '@media': {
    [media.mobile]: {
      flexDirection: 'column',
    },
  },
});

export const name = style({
  maxWidth: '100%',
  fontFamily: fonts.cinzel,
  fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
  fontWeight: '700',
  lineHeight: 1.1,
  letterSpacing: '0.03em',
  color: colors.secondary,
  textShadow: shadows.textStrong,
  overflowWrap: 'anywhere',
});

export const traits = style({
  margin: 0,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.5rem 1.25rem',
  '@media': {
    [media.mobile]: {
      justifyContent: 'center',
    },
  },
});

export const trait = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '0.5rem',
  selectors: {
    '& + &::before': {
      content: '""',
      alignSelf: 'center',
      width: '0.4rem',
      height: '0.4rem',
      marginRight: '0.75rem',
      background: colors.secondary,
      boxShadow: `0 0 8px ${alphaColors.secondaryGlow}`,
      transform: 'rotate(45deg)',
    },
  },
});

export const traitValue = style({
  fontFamily: fonts.cinzel,
  fontSize: '1.1rem',
  fontWeight: '700',
  letterSpacing: '0.04em',
  color: colors.white,
});

export const divider = style({
  position: 'relative',
  height: '1px',
  background: `linear-gradient(to right, transparent 0%, ${alphaColors.secondaryBorder} 50%, transparent 100%)`,
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '0.55rem',
      height: '0.55rem',
      background: colors.secondary,
      boxShadow: `0 0 10px ${alphaColors.secondaryGlow}`,
      transform: 'translate(-50%, -50%) rotate(45deg)',
    },
  },
});

export const overview = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(16rem, 20rem) minmax(0, 1fr)',
  alignItems: 'start',
  gap: 'clamp(2rem, 4vw, 4rem)',
  '@media': {
    [media.tablet]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const gear = style({
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
});

export const chronicle = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(18rem, 28rem)',
  alignItems: 'start',
  gap: 'clamp(2rem, 4vw, 4rem)',
  '@media': {
    [media.tablet]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const story = style({
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '2.5rem',
});

export const aside = style({
  minWidth: 0,
});

export const privateRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
  alignItems: 'start',
  gap: 'clamp(2rem, 4vw, 4rem)',
});

export const privateColumn = style({
  minWidth: 0,
});
