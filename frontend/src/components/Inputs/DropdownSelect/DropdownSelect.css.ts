import { style } from '@vanilla-extract/css';
import { alphaColors, colors, fonts } from '@/styles/tokens';

const radius = '0.75rem';

export const container = style({
  position: 'relative',
});

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  width: '100%',
  minWidth: '5.5rem',
  justifyContent: 'space-between',
  padding: '0.35rem 0.75rem 0.35rem 0.9rem',
  border: `1px solid ${alphaColors.primaryBorderMedium}`,
  borderRadius: radius,
  outline: 'none',
  background: colors.cardBlackBg,
  fontFamily: fonts.poppins,
  fontSize: '0.9rem',
  color: colors.white,
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  ':hover': {
    borderColor: colors.mainLight,
  },
  ':focus-visible': {
    borderColor: colors.mainLight,
    boxShadow: '0 0 0 3px rgba(159,150,254,0.15)',
  },
});

export const buttonLabel = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const buttonOpen = style({
  borderColor: colors.mainLight,
  boxShadow: '0 0 0 3px rgba(159,150,254,0.15)',
});

export const arrow = style({
  fontSize: '1.25rem',
  color: alphaColors.textSoft,
  flexShrink: 0,
  transition: 'transform 0.3s ease-in-out',
});

export const arrowOpen = style({
  transform: 'rotate(180deg)',
});

export const listbox = style({
  position: 'absolute',
  top: 'calc(100% + 0.35rem)',
  left: 0,
  right: 0,
  zIndex: 20,
  padding: '0.3rem',
  listStyle: 'none',
  border: `1px solid ${colors.mainLight}`,
  borderRadius: radius,
  outline: 'none',
  background: colors.cardBlackBg,
  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.8)',
});

export const option = style({
  padding: '0.35rem 0.6rem',
  borderRadius: '0.5rem',
  fontFamily: fonts.poppins,
  fontSize: '0.9rem',
  color: alphaColors.textSoft,
  cursor: 'pointer',
  transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out',
});

export const optionActive = style({
  background: alphaColors.primaryTint,
  color: colors.mainLight,
});

export const optionSelected = style({
  fontWeight: '700',
  color: colors.secondary,
});

export const buttonLarge = style({
  padding: '0.6rem 0.75rem 0.6rem 1rem',
  borderRadius: '0.2rem',
  fontSize: '1rem',
  fontWeight: '500',
});

export const arrowLarge = style({
  fontSize: '1.5rem',
});

export const listboxLarge = style({
  borderRadius: '0.2rem',
});

export const optionLarge = style({
  padding: '0.55rem 0.75rem',
  borderRadius: '0.15rem',
  fontSize: '1rem',
});
