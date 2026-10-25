import { style } from '@vanilla-extract/css';
import { alphaColors, colors, fonts } from '@/styles/tokens';

export const panel = style({
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1.25rem',
});

export const stats = style({
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
});

export const stat = style({
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.3rem',
});

export const inlineStat = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  gap: '0.5rem',
});

export const statLabel = style({
  fontFamily: fonts.poppins,
  fontSize: '0.7rem',
  fontWeight: '500',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: colors.mainLight,
});

export const statValue = style({
  fontFamily: fonts.cinzel,
  fontSize: '1.15rem',
  fontWeight: '700',
  letterSpacing: '0.03em',
  color: colors.white,
});

export const statMeta = style({
  fontFamily: fonts.poppins,
  fontSize: '0.78rem',
  color: alphaColors.textMuted,
});

export const statEmpty = style({
  fontFamily: fonts.poppins,
  fontSize: '0.9rem',
  fontStyle: 'italic',
  color: alphaColors.textMuted,
});
