import { globalStyle, style } from '@vanilla-extract/css';
import { alphaColors, backdropBlur, colors, fonts, gradients, shadows, transition, withAlpha } from './tokens';

export const mainBg = style({
  backgroundColor: colors.pageDarkBg,
  backgroundImage: [
    `radial-gradient(ellipse 60% 40% at 10% 35%, ${withAlpha(colors.mainMedium, 0.2)} 0%, transparent 70%)`,
    `radial-gradient(ellipse 50% 35% at 90% 65%, ${withAlpha(colors.mainLight, 0.1)} 0%, transparent 70%)`,
    `radial-gradient(ellipse 60% 40% at 30% 95%, ${withAlpha(colors.mainMedium, 0.12)} 0%, transparent 70%)`,
  ].join(', '),
  backgroundAttachment: 'fixed',
});

export const glassBox = style({
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: colors.cardMediumBg,
      opacity: 0.9,
      borderRadius: '0.25rem',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      boxShadow: '-15px 15px 40px -5px rgba(0, 0, 0, 0.4)',
    },
  },
});

export const gearStepBg = style({
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      right: '5%',
      width: '50%',
      height: '100%',
      backgroundImage: "url('/images/knight-withoutbg.png')",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left bottom',
      backgroundSize: 'contain',
      opacity: 0.4,
    },
  },
});

export const raceStepBg = style({
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: '5%',
      width: '100%',
      height: '100%',
      backgroundImage: 'var(--raceUrl)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left bottom',
      backgroundSize: 'contain',
      opacity: 0.4,
    },
  },
});

export const glassPanel = style({
  background: gradients.glassSurface,
  ...backdropBlur('14px'),
  border: `1px solid ${alphaColors.primaryBorder}`,
  borderRadius: '0.75rem',
  boxShadow: shadows.glass,
});

export const glassPanelHover = style({
  transition: transition(['border-color', 'box-shadow'], '0.4s'),
  ':hover': {
    borderColor: alphaColors.primaryBorderStrong,
    boxShadow: shadows.glassHover,
  },
});

export const glassFrame = style([glassPanel, {
  padding: '0.4rem',
  borderColor: alphaColors.primaryBorderMedium,
}]);

export const featuredPanel = style([glassPanel, {
  borderRadius: '0.2rem',
  borderColor: alphaColors.primaryBorderStrong,
  background: gradients.featuredSurface,
  boxShadow: shadows.featured,
}]);

export const fadeDividerTop = style({
  borderTop: '1px solid',
  borderImage: `${gradients.primaryFadeRight} 1`,
});

export const fadeDividerBottom = style({
  borderBottom: '1px solid',
  borderImage: `${gradients.primaryFadeRight} 1`,
});

export const eyebrow = style({
  fontFamily: fonts.poppins,
  fontSize: '0.8rem',
  fontWeight: '500',
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: colors.mainLight,
});

export const metaText = style({
  flexShrink: 0,
  fontFamily: fonts.poppins,
  fontSize: '0.8rem',
  color: alphaColors.textMuted,
});

export const accentLink = style({
  color: colors.mainLight,
  textDecoration: 'none',
  transition: transition(['color']),
  ':hover': { color: colors.secondary },
});

export const goldLink = style({
  color: colors.secondary,
  textDecoration: 'none',
  transition: transition(['color']),
  ':hover': { color: colors.secondaryLight },
});

export const mutedLink = style({
  color: alphaColors.textSoft,
  textDecoration: 'none',
  transition: transition(['color']),
  ':hover': { color: colors.secondary },
});

export const contentContainer = style({
  width: '100%',
  maxWidth: '80rem',
  margin: '0 auto',
});

export const socialLinkList = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const socialLink = style({
  display: 'flex',
  width: '1.5rem',
  height: '1.5rem',
  color: colors.white,
  opacity: 0.7,
  cursor: 'pointer',
  transition: 'color 0.2s ease, opacity 0.2s ease',
  ':hover': {
    color: colors.secondary,
    opacity: 1,
  },
});

globalStyle(`${socialLink} svg`, {
  width: '100%',
  height: '100%',
});
