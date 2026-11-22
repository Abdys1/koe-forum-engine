import { style } from '@vanilla-extract/css';

import { alphaColors, backdropBlur, colors, fonts, goldFocusRing, transition, withAlpha } from '@/styles/tokens';

export const followBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  height: '2.25rem',
  padding: '0 1rem 0 0.8rem',
  border: `1px solid ${alphaColors.primaryBorder}`,
  borderRadius: '0.375rem',
  background: withAlpha(colors.cardBlackBg, 0.35),
  ...backdropBlur('8px'),
  fontFamily: fonts.poppins,
  fontSize: '0.8rem',
  fontWeight: '500',
  letterSpacing: '0.03em',
  color: alphaColors.textMuted,
  cursor: 'pointer',
  transition: transition(['color', 'background', 'border-color', 'box-shadow']),
  ':hover': {
    borderColor: alphaColors.primaryBorderStrong,
    background: alphaColors.primaryTint,
    color: colors.mainLight,
  },
  ':focus-visible': goldFocusRing,
});

export const followBtnActive = style({
  borderColor: withAlpha(colors.mainLight, 0.6),
  background: `linear-gradient(135deg, ${withAlpha(colors.mainLight, 0.28)} 0%, ${alphaColors.primaryGlow} 100%)`,
  boxShadow: `0 0 18px -4px ${withAlpha(colors.mainLight, 0.55)}, inset 0 1px 0 rgba(255,255,255,0.1)`,
  color: colors.white,
  ':hover': {
    borderColor: colors.mainLight,
    background: `linear-gradient(135deg, ${withAlpha(colors.mainLight, 0.35)} 0%, ${alphaColors.primaryGlow} 100%)`,
    color: colors.white,
  },
});

export const followIcon = style({
  fontSize: '1.15rem',
  selectors: {
    [`${followBtnActive} &`]: {
      color: colors.mainLight,
      filter: `drop-shadow(0 0 6px ${withAlpha(colors.mainLight, 0.7)})`,
    },
  },
});
