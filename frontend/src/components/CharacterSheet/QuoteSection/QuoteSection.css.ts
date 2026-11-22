import { globalStyle, style } from '@vanilla-extract/css';

import { alphaColors, colors, fonts, gradients, media, shadows, transition, withAlpha } from '@/styles/tokens';

const quoteFontSize = 'clamp(1rem, 1.5vw, 1.2rem)';
const quoteMobileFontSize = '0.95rem';
const quoteLineHeight = 1.6;

export const section = style({
  width: '100%',
  maxWidth: '44rem',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.75rem',
  textAlign: 'center',
});

const headingLine = {
  content: '""',
  flex: '1 1 0',
  height: '1px',
} as const;

export const heading = style({
  width: '100%',
  maxWidth: '30rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.75rem',
  selectors: {
    '&::before': {
      ...headingLine,
      background: gradients.primaryFadeLeft,
    },
    '&::after': {
      ...headingLine,
      background: gradients.primaryFadeRight,
    },
  },
});

export const title = style({
  flexShrink: 0,
  fontFamily: fonts.poppins,
  fontSize: '0.75rem',
  fontWeight: '500',
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: colors.mainLight,
});

export const figure = style({
  position: 'relative',
  margin: 0,
  paddingTop: '1.4rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
});

export const quoteMark = style({
  position: 'absolute',
  top: '-2.6rem',
  left: '50%',
  transform: 'translateX(-50%)',
  fontFamily: fonts.cinzel,
  fontSize: '4rem',
  lineHeight: 1,
  color: withAlpha(colors.secondary, 0.35),
  textShadow: `0 0 18px ${alphaColors.secondaryGlow}`,
  pointerEvents: 'none',
  userSelect: 'none',
});

export const quote = style({
  margin: 0,
  fontFamily: fonts.sumana,
  fontSize: quoteFontSize,
  fontStyle: 'italic',
  lineHeight: quoteLineHeight,
  color: colors.secondaryLight,
  textShadow: shadows.text,
  overflowWrap: 'anywhere',
  '@media': {
    [media.mobile]: {
      fontSize: quoteMobileFontSize,
    },
  },
});

export const source = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.4rem 0.75rem',
  fontFamily: fonts.poppins,
  fontSize: '0.7rem',
  fontWeight: '500',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: alphaColors.textMuted,
  selectors: {
    '&::before': {
      content: '"—"',
      color: colors.secondary,
    },
  },
});

export const empty = style({
  maxWidth: '36rem',
  fontFamily: fonts.poppins,
  fontSize: '0.875rem',
  fontStyle: 'italic',
  lineHeight: 1.7,
  color: alphaColors.textMuted,
});

export const form = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
});

export const field = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const label = style({
  fontFamily: fonts.poppins,
  fontSize: '0.7rem',
  fontWeight: '500',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: colors.mainLight,
});

export const input = style({
  width: '100%',
  padding: '0.6rem 0.9rem',
  border: `1px solid ${alphaColors.primaryBorderMedium}`,
  borderRadius: '0.5rem',
  outline: 'none',
  background: withAlpha(colors.blackBg, 0.35),
  fontFamily: fonts.poppins,
  fontSize: '0.9rem',
  color: colors.white,
  textAlign: 'center',
  transition: transition(['border-color', 'box-shadow']),
  ':focus': {
    borderColor: colors.mainLight,
    boxShadow: `0 0 0 3px ${withAlpha(colors.mainLight, 0.15)}`,
  },
});

export const quoteInput = style({
  minHeight: 'calc(2lh + 1.2rem + 2px)',
  fontFamily: fonts.sumana,
  fontSize: quoteFontSize,
  fontStyle: 'italic',
  lineHeight: quoteLineHeight,
  color: colors.secondaryLight,
  resize: 'none',
  overflowY: 'hidden',
  '@media': {
    [media.mobile]: {
      fontSize: quoteMobileFontSize,
    },
  },
});

export const counter = style({
  alignSelf: 'flex-end',
  fontFamily: fonts.poppins,
  fontSize: '0.75rem',
  color: alphaColors.textMuted,
});

const sourceFieldHeight = '2.75rem';

export const sourceInput = style({
  height: sourceFieldHeight,
  paddingBlock: 0,
});

export const locationSelect = style({});

globalStyle(`${locationSelect} > button`, {
  height: sourceFieldHeight,
});

export const sourceRow = style({
  width: '100%',
  maxWidth: '34rem',
  display: 'flex',
  justifyContent: 'center',
  gap: '0.75rem',
  '@media': {
    [media.mobile]: {
      flexDirection: 'column',
    },
  },
});

export const locationField = style({
  flex: '1 1 auto',
  minWidth: 0,
  textAlign: 'left',
});

export const postNumberField = style({
  flex: '0 0 11rem',
  '@media': {
    [media.mobile]: {
      flexBasis: 'auto',
    },
  },
});

export const actions = style({
  display: 'flex',
  gap: '0.5rem',
});
