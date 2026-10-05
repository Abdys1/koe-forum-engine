import { style } from '@vanilla-extract/css';
import { eyebrow, glassFrame, glassPanelHover } from '@/styles/shared.css';
import { alphaColors, colors, fonts, gradients, media, shadows, transition, withAlpha } from '@/styles/tokens';

export const teasers = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  width: '100%',
  minWidth: 0,
});

export const glow = style({
  position: 'absolute',
  inset: '15% 0 0',
  borderRadius: '50%',
  background: `radial-gradient(ellipse at center, ${withAlpha(colors.mainMedium, 0.4)} 0%, ${withAlpha(colors.mainLight, 0.08)} 45%, transparent 70%)`,
  filter: 'blur(30px)',
  pointerEvents: 'none',
});

export const caption = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  fontFamily: fonts.cinzel,
  fontSize: '1rem',
  letterSpacing: '0.08em',
  color: colors.secondary,
  textShadow: shadows.text,
  selectors: {
    '&::after': {
      content: '""',
      flexGrow: 1,
      height: '1px',
      background: gradients.primaryFadeRight,
    },
  },
});

export const cards = style({
  position: 'relative',
  listStyle: 'none',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  alignItems: 'start',
  gap: '1rem',
  '@media': {
    [media.mobile]: {
      gridTemplateColumns: 'none',
      gridAutoFlow: 'column',
      gridAutoColumns: '70%',
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      paddingBottom: '0.75rem',
    },
  },
});

export const card = style([glassFrame, glassPanelHover, {
  display: 'flex',
  flexDirection: 'column',
  scrollSnapAlign: 'start',
  transition: transition(['transform', 'border-color', 'box-shadow'], '0.4s'),
  ':hover': {
    transform: 'translateY(-0.4rem)',
  },
  selectors: {
    '&:nth-child(2)': { marginTop: '2.5rem' },
  },
  '@media': {
    [media.mobile]: {
      selectors: {
        '&:nth-child(2)': { marginTop: 0 },
      },
    },
    [media.reducedMotion]: {
      ':hover': { transform: 'none' },
    },
  },
}]);

export const imageWrap = style({
  position: 'relative',
  aspectRatio: '3 / 4',
  overflow: 'hidden',
  borderRadius: '0.5rem',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: '55% 0 0',
      background: `linear-gradient(to bottom, transparent 0%, ${withAlpha(colors.cardBlackBg, 0.85)} 100%)`,
      pointerEvents: 'none',
    },
  },
});

export const image = style({
  objectFit: 'cover',
  objectPosition: 'top',
  transition: transition(['transform'], '0.6s'),
  selectors: {
    [`${card}:hover &`]: { transform: 'scale(1.05)' },
  },
  '@media': {
    [media.reducedMotion]: {
      selectors: {
        [`${card}:hover &`]: { transform: 'none' },
      },
    },
  },
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem',
  padding: '0.9rem 0.6rem 0.8rem',
});

export const role = style([eyebrow, {
  fontSize: '0.7rem',
  letterSpacing: '0.2em',
}]);

export const name = style({
  fontFamily: fonts.cinzel,
  fontSize: '1.05rem',
  fontWeight: '700',
  lineHeight: 1.25,
  letterSpacing: '0.03em',
  color: colors.secondary,
  textShadow: shadows.text,
  '@media': {
    [media.tablet]: { fontSize: '1.15rem' },
  },
});

export const quote = style({
  position: 'relative',
  marginTop: '0.4rem',
  paddingTop: '0.6rem',
  borderTop: `1px solid ${alphaColors.primaryBorder}`,
  fontFamily: fonts.poppins,
  fontSize: '0.8rem',
  fontStyle: 'italic',
  lineHeight: 1.55,
  color: alphaColors.textSoft,
  selectors: {
    '&::before': { content: '"„"' },
    '&::after': { content: '"”"' },
  },
});
