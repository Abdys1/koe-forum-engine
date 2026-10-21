import { globalStyle, style } from '@vanilla-extract/css';
import { fadeDividerBottom, fadeDividerTop, featuredPanel, glassPanel } from '@/styles/shared.css';
import { alphaColors, colors, fonts, goldFocusRing, gradients, media, shadows, transition, withAlpha } from '@/styles/tokens';

const roundIconButton = style({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${alphaColors.primaryBorderStrong}`,
  borderRadius: '50%',
  background: alphaColors.primaryTintSoft,
  color: alphaColors.textSoft,
  cursor: 'pointer',
  transition: transition(['border-color', 'background', 'color']),
  ':hover': {
    borderColor: colors.secondary,
    background: withAlpha(colors.secondary, 0.1),
    color: colors.secondary,
  },
  ':focus-visible': goldFocusRing,
});

export const sheetRow = style({
  width: '100%',
  marginTop: '0.75rem',
  paddingInline: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '4rem',
  '@media': {
    [media.tablet]: {
      paddingInline: '1rem',
      flexWrap: 'wrap',
      gap: '2.5rem',
    },
    [media.mobile]: {
      paddingInline: 0,
      gap: '2rem',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
});

export const infoPanel = style([glassPanel, {
  flex: '0 0 19rem',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  padding: '1.25rem',
  '@media': {
    [media.tablet]: {
      flexBasis: '100%',
    },
  },
}]);

export const infoStatus = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
});

export const infoHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.85rem',
});

export const infoTitle = style({
  fontFamily: fonts.poppins,
  fontSize: '0.85rem',
  fontWeight: '500',
  lineHeight: 1.5,
  color: colors.white,
});

export const infoIcon = style({
  flexShrink: 0,
  width: '2.25rem',
  height: '2.25rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${alphaColors.secondaryBorder}`,
  borderRadius: '50%',
  background: withAlpha(colors.secondary, 0.1),
  fontSize: '1.2rem',
  color: colors.secondary,
  filter: `drop-shadow(0 0 6px ${withAlpha(colors.secondary, 0.3)})`,
});

export const infoText = style({
  fontFamily: fonts.poppins,
  fontSize: '0.78rem',
  lineHeight: 1.55,
  color: alphaColors.textSoft,
});

export const helpSection = style([fadeDividerTop, {
  paddingTop: '1.25rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.75rem',
}]);

export const helpTitle = style({
  fontFamily: fonts.cinzel,
  fontSize: '1rem',
  fontWeight: '700',
  letterSpacing: '0.05em',
  color: colors.secondary,
  textShadow: shadows.text,
});

export const helpBtn = style({
  width: '100%',
});

export const contactLinks = style({
  alignSelf: 'center',
  display: 'flex',
  gap: '0.75rem',
});

export const contactLink = style([roundIconButton, {
  width: '2.5rem',
  height: '2.5rem',
  textDecoration: 'none',
}]);

globalStyle(`${contactLink} svg`, {
  width: '1.15rem',
  height: '1.15rem',
});

export const contactIcon = style({
  fontSize: '1.2rem',
});

export const sheet = style([featuredPanel, {
  flex: '1 1 0',
  minWidth: 0,
  maxWidth: '64rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  padding: '1.5rem 2rem',
  background: gradients.primaryGoldSurfaceTall,
  '@media': {
    [media.mobile]: {
      flex: 'none',
      width: '100%',
    },
  },
}]);

export const identity = style([fadeDividerBottom, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.6rem',
  paddingBottom: '1.25rem',
}]);

export const nameRow = style({
  maxWidth: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const name = style({
  minWidth: 0,
  fontFamily: fonts.cinzel,
  fontSize: '1.75rem',
  fontWeight: '700',
  lineHeight: 1.2,
  letterSpacing: '0.03em',
  color: colors.secondary,
  textShadow: shadows.text,
  overflowWrap: 'anywhere',
});

export const editBtn = style([roundIconButton, {
  flexShrink: 0,
  width: '2rem',
  height: '2rem',
  borderColor: alphaColors.primaryBorder,
  color: alphaColors.textMuted,
}]);

export const editIcon = style({
  fontSize: '1rem',
});

export const seals = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
});

export const seal = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.35rem 0.75rem',
  border: `1px solid ${alphaColors.primaryBorderStrong}`,
  borderRadius: '999px',
  background: alphaColors.primaryTintSoft,
  fontFamily: fonts.poppins,
  fontSize: '0.85rem',
  fontWeight: '500',
  color: colors.white,
  cursor: 'pointer',
  transition: transition(['border-color', 'background']),
  ':hover': {
    borderColor: colors.secondary,
    background: withAlpha(colors.secondary, 0.1),
  },
  ':focus-visible': goldFocusRing,
});

export const sealLabel = style({
  fontSize: '0.65rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: colors.mainLight,
});

export const sealIcon = style({
  fontSize: '0.9rem',
  color: alphaColors.textMuted,
  transition: transition(['color']),
  selectors: {
    [`${seal}:hover &, ${seal}:focus-visible &`]: { color: colors.secondary },
  },
});

export const gear = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.9rem',
});

export const sectionHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.75rem',
});

export const sectionTitle = style({
  fontFamily: fonts.cinzel,
  fontSize: '1.05rem',
  fontWeight: '700',
  letterSpacing: '0.08em',
  color: colors.secondary,
});

export const gearRoots = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
  gap: '1rem',
});

export const rootCard = style({
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  padding: '0.9rem 1rem 1rem',
  border: `1px solid ${withAlpha(colors.mainLight, 0.1)}`,
  borderRadius: '0.5rem',
  background: withAlpha(colors.blackBg, 0.12),
});

export const rootHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.75rem',
});

export const rootLabel = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontFamily: fonts.cinzel,
  fontSize: '0.9rem',
  fontWeight: '700',
  letterSpacing: '0.06em',
  color: colors.white,
});

export const rootIcon = style({
  fontSize: '1.1rem',
  color: colors.secondary,
});

export const rootCount = style({
  flexShrink: 0,
  fontFamily: fonts.poppins,
  fontSize: '0.75rem',
  color: alphaColors.textMuted,
});

export const gearList = style([fadeDividerTop, {
  margin: 0,
  paddingTop: '0.6rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
}]);

export const gearRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: '0.75rem',
});

export const gearType = style({
  flexShrink: 0,
  fontFamily: fonts.poppins,
  fontSize: '0.65rem',
  fontWeight: '500',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: colors.mainLight,
});

export const gearItems = style({
  minWidth: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '0.2rem',
});

export const gearName = style({
  minWidth: 0,
  fontFamily: fonts.poppins,
  fontSize: '0.875rem',
  textAlign: 'right',
  color: colors.white,
  overflowWrap: 'anywhere',
});

export const gearEmpty = style({
  fontFamily: fonts.poppins,
  fontSize: '0.875rem',
  color: alphaColors.textMuted,
});

export const emptyGear = style([fadeDividerTop, {
  paddingTop: '0.6rem',
  fontFamily: fonts.poppins,
  fontSize: '0.8rem',
  fontStyle: 'italic',
  color: alphaColors.textMuted,
}]);

const closingLine = {
  content: '""',
  flexShrink: 0,
  width: '5rem',
  height: '1px',
} as const;

export const closing = style({
  alignSelf: 'center',
  maxWidth: '100%',
  marginTop: '1.5rem',
  paddingInline: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  textAlign: 'center',
  fontFamily: fonts.cinzel,
  fontSize: '1rem',
  lineHeight: 1.7,
  letterSpacing: '0.03em',
  color: alphaColors.textSoft,
  textShadow: shadows.text,
  selectors: {
    '&::before': {
      ...closingLine,
      background: gradients.primaryFadeLeft,
    },
    '&::after': {
      ...closingLine,
      background: gradients.primaryFadeRight,
    },
  },
});
