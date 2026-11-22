import { style, styleVariants } from '@vanilla-extract/css';

import { fadeDividerTop } from '@/styles/shared.css';
import { alphaColors, colors, fonts, withAlpha } from '@/styles/tokens';

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
});

export const rootVariants = styleVariants({
  card: {
    padding: '0.9rem 1rem 1rem',
    border: `1px solid ${withAlpha(colors.mainLight, 0.1)}`,
    borderRadius: '0.5rem',
    background: withAlpha(colors.blackBg, 0.12),
  },
  tinted: {
    padding: '0.9rem 1rem 1rem',
    borderRadius: '0.5rem',
    background: alphaColors.primaryTintSoft,
  },
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
