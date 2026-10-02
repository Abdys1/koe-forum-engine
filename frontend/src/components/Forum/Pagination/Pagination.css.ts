import { style } from '@vanilla-extract/css';
import { alphaColors, colors, fonts } from '@/styles/tokens';

export const pagination = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
});

export const pages = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.35rem',
});

export const pageBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '2.25rem',
  height: '2.25rem',
  padding: '0 0.5rem',
  border: `1px solid ${alphaColors.primaryBorderMedium}`,
  borderRadius: '0.25rem',
  background: 'rgba(0,0,0,0.25)',
  fontFamily: fonts.poppins,
  fontSize: '0.9rem',
  fontWeight: '500',
  color: alphaColors.textSoft,
  textDecoration: 'none',
  transition: 'all 0.3s ease-in-out',
  ':hover': {
    borderColor: colors.mainLight,
    color: colors.mainLight,
    background: alphaColors.primaryTint,
  },
});

export const pageBtnActive = style({
  borderColor: colors.secondary,
  background: colors.secondary,
  color: colors.darkText,
  fontWeight: '700',
  ':hover': {
    borderColor: colors.secondary,
    background: colors.secondary,
    color: colors.darkText,
  },
});

export const pageBtnDisabled = style({
  opacity: 0.35,
  ':hover': {
    borderColor: alphaColors.primaryBorderMedium,
    color: alphaColors.textSoft,
    background: 'rgba(0,0,0,0.25)',
  },
});

export const ellipsis = style({
  padding: '0 0.25rem',
  fontFamily: fonts.poppins,
  color: alphaColors.textMuted,
});

export const pageSize = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontFamily: fonts.poppins,
  fontSize: '0.85rem',
  color: alphaColors.textSoft,
});
