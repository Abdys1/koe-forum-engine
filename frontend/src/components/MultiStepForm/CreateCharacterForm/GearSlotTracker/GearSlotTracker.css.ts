import { keyframes, style } from '@vanilla-extract/css';
import { fadeDividerBottom, glassPanel, riseIn } from '@/styles/shared.css';
import { alphaColors, colors, fonts, goldFocusRing, media, shadows, transition, withAlpha } from '@/styles/tokens';

const ghostPulse = keyframes({
  '0%, 100%': { borderColor: colors.secondary, boxShadow: `0 0 14px -4px ${alphaColors.secondaryGlow}` },
  '50%': { borderColor: alphaColors.secondaryBorder, boxShadow: 'none' },
});

const TRACKER_MAX_WIDTH = '23rem';
const TAB_MIN_WIDTH = '9.5rem';
const TAB_MAX_WIDTH = '10.25rem';

const slotCell = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0 0.7rem',
  borderRadius: '0.4rem',
  fontFamily: fonts.poppins,
} as const;

export const tracker = style([glassPanel, {
  position: 'sticky',
  top: 0,
  flex: `0 1 ${TRACKER_MAX_WIDTH}`,
  minWidth: 0,
  maxWidth: TRACKER_MAX_WIDTH,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  padding: '1rem',
  '@media': {
    [media.tablet]: {
      position: 'relative',
      flexBasis: 'auto',
      width: '100%',
      maxWidth: 'none',
    },
  },
}]);

export const tabs = style([fadeDividerBottom, {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  paddingBottom: '1.25rem',
}]);

export const tab = style({
  flex: `1 1 ${TAB_MIN_WIDTH}`,
  maxWidth: TAB_MAX_WIDTH,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.45rem',
  padding: '0.7rem 0.75rem 0.8rem',
  border: `1px solid ${alphaColors.primaryBorder}`,
  borderRadius: '0.5rem',
  background: withAlpha(colors.blackBg, 0.55),
  textAlign: 'left',
  color: alphaColors.textMuted,
  cursor: 'pointer',
  transition: transition(['border-color', 'background', 'box-shadow', 'color'], '0.3s'),
  ':hover': {
    borderColor: alphaColors.primaryBorderStrong,
    background: withAlpha(colors.blackBg, 0.35),
    color: colors.white,
  },
  ':focus-visible': goldFocusRing,
});

export const tabActive = style({
  borderColor: colors.secondary,
  background: `linear-gradient(to bottom, ${withAlpha(colors.secondary, 0.16)} 0%, ${alphaColors.cardBlackVeil} 100%)`,
  boxShadow: `0 0 18px -6px ${alphaColors.secondaryGlow}, inset 0 1px 0 ${withAlpha(colors.secondaryLight, 0.15)}`,
  color: colors.white,
  cursor: 'default',
  ':hover': {
    borderColor: colors.secondary,
    background: `linear-gradient(to bottom, ${withAlpha(colors.secondary, 0.16)} 0%, ${alphaColors.cardBlackVeil} 100%)`,
  },
});

export const tabLabel = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontFamily: fonts.cinzel,
  fontSize: '0.9rem',
  fontWeight: '700',
  letterSpacing: '0.06em',
  color: alphaColors.textSoft,
  selectors: {
    [`${tabActive} &`]: {
      color: colors.secondary,
    },
  },
});

export const tabIcon = style({
  fontSize: '1.15rem',
  color: alphaColors.textMuted,
  selectors: {
    [`${tabActive} &`]: {
      color: colors.secondary,
    },
  },
});

export const tabCount = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const freeNumber = style({
  fontFamily: fonts.cinzel,
  fontSize: '2rem',
  fontWeight: '700',
  lineHeight: 1,
  color: alphaColors.textSoft,
  transition: transition(['color']),
  selectors: {
    [`${tabActive} &`]: {
      color: colors.white,
      textShadow: shadows.text,
    },
  },
});

export const freeNumberPreview = style({
  selectors: {
    [`${tabActive} &`]: {
      color: colors.secondary,
    },
  },
});

export const countMeta = style({
  fontFamily: fonts.poppins,
  fontSize: '0.65rem',
  fontWeight: '500',
  lineHeight: 1.35,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: alphaColors.textMuted,
});

export const racks = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const rackGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const rackHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: '0.75rem',
});

export const rackLabel = style({
  fontFamily: fonts.poppins,
  fontSize: '0.7rem',
  fontWeight: '500',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: colors.mainLight,
});

export const rackCount = style({
  fontFamily: fonts.poppins,
  fontSize: '0.75rem',
  color: alphaColors.textMuted,
});

export const rack = style({
  display: 'grid',
  gridAutoRows: '2.4rem',
  gap: '0.35rem',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const rackItem = style({
  minWidth: 0,
  '@media': {
    [media.motionOk]: {
      animation: `${riseIn} 0.35s ease-out`,
    },
  },
});

export const occupant = style({
  ...slotCell,
  border: `1px solid ${colors.mainLight}`,
  background: `linear-gradient(to right, ${alphaColors.primaryGlow} 0%, ${alphaColors.cardBlackVeil} 100%)`,
  boxShadow: `0 0 14px -6px ${alphaColors.primaryAura}`,
  fontSize: '0.85rem',
  textAlign: 'left',
  color: colors.white,
  cursor: 'pointer',
  transition: transition(['border-color', 'background', 'box-shadow']),
  ':hover': {
    borderColor: colors.secondary,
  },
  ':focus-visible': goldFocusRing,
});

export const occupantReplaced = style({
  borderColor: colors.secondary,
  background: withAlpha(colors.secondary, 0.1),
});

export const occupantName = style({
  flexGrow: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  selectors: {
    [`${occupantReplaced} &`]: {
      color: alphaColors.textMuted,
      textDecoration: 'line-through',
    },
  },
});

export const replaceHint = style({
  flexShrink: 0,
  maxWidth: '55%',
  minWidth: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  fontSize: '0.75rem',
  color: colors.secondary,
});

export const replaceIcon = style({
  flexShrink: 0,
  fontSize: '1.15rem',
});

export const replaceName = style({
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const occupantIcon = style({
  flexShrink: 0,
  fontSize: '1rem',
  color: alphaColors.textMuted,
  transition: transition(['color']),
  selectors: {
    [`${occupant}:hover &, ${occupant}:focus-visible &`]: {
      color: colors.secondary,
    },
  },
});

export const ghost = style({
  ...slotCell,
  border: `1px dashed ${colors.secondary}`,
  background: withAlpha(colors.secondary, 0.08),
  fontSize: '0.85rem',
  color: colors.secondaryLight,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  '@media': {
    [media.motionOk]: {
      animation: `${ghostPulse} 1.2s ease-in-out infinite`,
    },
  },
});

export const emptyCell = style({
  ...slotCell,
  border: `1px dashed ${alphaColors.primaryBorderMedium}`,
  background: alphaColors.blackVeil,
  fontSize: '0.65rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: alphaColors.textMuted,
  selectors: {
    '&::before': {
      content: '""',
      width: '0.45rem',
      height: '0.45rem',
      transform: 'rotate(45deg)',
      border: `1px solid ${alphaColors.primaryBorderStrong}`,
    },
  },
});

export const blockedMsg = style({
  fontFamily: fonts.poppins,
  fontSize: '0.8rem',
  color: colors.alert,
});
