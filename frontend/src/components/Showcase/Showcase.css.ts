import { style } from '@vanilla-extract/css';
import { alphaColors, backdropBlur, colors, fonts, shadows, transition, withAlpha } from '@/styles/tokens';

export const showcase = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  width: '100%',
});

export const tabs = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '0.75rem',
});

export const tab = style({
  padding: '0.5rem 1.4rem',
  border: `1px solid ${alphaColors.primaryBorderMedium}`,
  borderRadius: '999px',
  background: withAlpha(colors.cardBlackBg, 0.5),
  ...backdropBlur('6px'),
  fontFamily: fonts.poppins,
  fontSize: '0.9rem',
  fontWeight: '500',
  letterSpacing: '0.05em',
  color: alphaColors.textSoft,
  cursor: 'pointer',
  transition: transition(['background', 'border-color', 'color']),
  ':hover': {
    borderColor: alphaColors.primaryBorderStrong,
    color: colors.white,
  },
});

export const tabActive = style({
  borderColor: colors.mainLight,
  background: colors.mainMedium,
  color: colors.white,
  ':hover': {
    borderColor: colors.mainLight,
  },
});

export const imageWrap = style({
  position: 'relative',
  aspectRatio: '16 / 9',
  overflow: 'hidden',
  borderRadius: '0.5rem',
});

export const image = style({
  objectFit: 'cover',
  opacity: 0,
  transition: transition(['opacity'], '0.6s'),
});

export const imageActive = style({
  opacity: 1,
});

export const title = style({
  marginTop: '1.25rem',
  fontFamily: fonts.cinzel,
  fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
  fontWeight: '500',
  letterSpacing: '0.04em',
  textAlign: 'center',
  color: colors.secondary,
  textShadow: shadows.text,
});

export const description = style({
  marginTop: '0.5rem',
  fontFamily: fonts.poppins,
  fontSize: '0.95rem',
  lineHeight: 1.7,
  textAlign: 'center',
  color: alphaColors.textBody,
});
