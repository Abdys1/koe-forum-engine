import { style, styleVariants } from '@vanilla-extract/css';
import { alphaColors, backdropBlur, colors, fonts, transition, withAlpha } from '@/styles/tokens';

export const base = style({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid transparent',
  borderRadius: '0.375rem',
  fontFamily: fonts.poppins,
  fontWeight: '700',
  textTransform: 'uppercase',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: transition(['background', 'color', 'border-color', 'box-shadow']),
  ':disabled': {
    opacity: 0.6,
    cursor: 'default',
  },
});

export const sizes = styleVariants({
  medium: {
    height: '3rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    letterSpacing: '0.1em',
  },
  large: {
    height: '3.25rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    letterSpacing: '0.12em',
  },
});

export const variants = styleVariants({
  primary: {
    background: colors.mainMedium,
    color: colors.white,
    boxShadow: `0 10px 30px -10px ${alphaColors.primaryGlow}`,
    selectors: {
      '&:hover:not(:disabled)': {
        background: colors.mainHover,
        boxShadow: `0 14px 40px -10px ${alphaColors.primaryGlow}`,
      },
    },
  },
  gold: {
    background: colors.secondary,
    color: colors.darkText,
    boxShadow: `0 10px 30px -12px ${alphaColors.secondaryBorder}`,
    selectors: {
      '&:hover:not(:disabled)': {
        background: colors.secondaryLight,
        boxShadow: `0 14px 40px -12px ${withAlpha(colors.secondary, 0.6)}`,
      },
    },
  },
  ghost: {
    borderColor: alphaColors.textMuted,
    background: withAlpha(colors.pageDarkBg, 0.3),
    ...backdropBlur('6px'),
    color: colors.white,
    selectors: {
      '&:hover:not(:disabled)': {
        borderColor: colors.secondary,
        color: colors.secondary,
      },
    },
  },
  outline: {
    borderColor: alphaColors.primaryBorderStrong,
    background: 'transparent',
    color: colors.white,
    selectors: {
      '&:hover:not(:disabled)': {
        borderColor: colors.secondary,
        color: colors.secondary,
      },
    },
  },
});
