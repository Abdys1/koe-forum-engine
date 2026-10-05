import { style } from '@vanilla-extract/css';
import { glassPanel } from '@/styles/shared.css';
import { alphaColors, colors, fonts } from '@/styles/tokens';

export const form = style([glassPanel, {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1.5rem 2rem',
}]);

export const title = style({
  fontFamily: fonts.cinzel,
  fontSize: '1.25rem',
  fontWeight: '700',
  letterSpacing: '0.05em',
  color: colors.secondary,
});

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const label = style({
  fontFamily: fonts.poppins,
  fontWeight: '500',
  letterSpacing: '0.1em',
  color: colors.white,
});

const inputBase = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  border: `1px solid ${alphaColors.primaryBorderMedium}`,
  borderRadius: '0.5rem',
  outline: 'none',
  background: 'rgba(0,0,0,0.25)',
  fontFamily: fonts.poppins,
  color: colors.white,
  transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  ':focus': {
    borderColor: colors.mainLight,
    boxShadow: '0 0 0 3px rgba(159,150,254,0.15)',
  },
} as const;

export const input = style(inputBase);

export const textarea = style({
  ...inputBase,
  minHeight: '16rem',
  resize: 'vertical',
  lineHeight: '1.6',
});

export const counter = style({
  alignSelf: 'flex-end',
  fontFamily: fonts.poppins,
  fontSize: '0.8rem',
  color: alphaColors.textMuted,
  transition: 'color 0.3s ease-in-out',
});

export const counterInvalid = style({
  color: 'rgb(239, 68, 68)',
});

export const actions = style({
  display: 'flex',
  justifyContent: 'flex-end',
});
