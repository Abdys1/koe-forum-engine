import { style } from '@vanilla-extract/css';
import { alphaColors, colors, fonts, withAlpha } from '@/styles/tokens';

export const list = style({
  marginTop: '1rem',
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
});

export const game = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.2rem',
  padding: '0.75rem 1rem',
  borderRadius: '0.5rem',
  background: alphaColors.primaryTintSoft,
  borderLeft: `2px solid ${withAlpha(colors.secondary, 0.5)}`,
});

export const title = style({
  fontFamily: fonts.cinzel,
  fontSize: '0.95rem',
  fontWeight: '700',
  letterSpacing: '0.03em',
  color: colors.white,
  overflowWrap: 'anywhere',
});

export const meta = style({
  fontFamily: fonts.poppins,
  fontSize: '0.78rem',
  color: alphaColors.textMuted,
});

export const empty = style({
  marginTop: '1rem',
  fontFamily: fonts.poppins,
  fontSize: '0.875rem',
  fontStyle: 'italic',
  color: alphaColors.textMuted,
});
