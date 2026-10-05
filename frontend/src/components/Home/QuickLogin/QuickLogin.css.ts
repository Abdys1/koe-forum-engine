import { globalStyle, style } from '@vanilla-extract/css';
import { eyebrow as eyebrowBase, glassPanel, goldLink, mutedLink } from '@/styles/shared.css';
import { alphaColors, colors, fonts, shadows, transition, withAlpha } from '@/styles/tokens';

export const card = style([glassPanel, {
  position: 'relative',
  width: '100%',
  maxWidth: '26rem',
  display: 'flex',
  flexDirection: 'column',
  padding: '1.5rem 2rem 2rem',
  borderColor: alphaColors.primaryBorderMedium,
  boxShadow: `0 0 48px -10px ${alphaColors.primaryAura}, ${shadows.glass}`,
  transition: transition(['border-color', 'box-shadow'], '0.4s'),
  ':hover': {
    borderColor: alphaColors.primaryBorderStrong,
    boxShadow: `0 0 56px -8px ${withAlpha(colors.mainLight, 0.5)}, ${shadows.glass}`,
  },
}]);

export const eyebrow = style([eyebrowBase, {
  fontSize: '0.75rem',
  letterSpacing: '0.2em',
}]);

export const title = style({
  marginTop: '0.25rem',
  marginBottom: '0.5rem',
  fontFamily: fonts.cinzel,
  fontSize: '1.75rem',
  fontWeight: '500',
  letterSpacing: '0.05em',
  color: colors.secondary,
  overflowWrap: 'anywhere',
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
});

globalStyle(`${form} input`, {
  height: '3.25rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  fontSize: '1.05rem',
});

export const forgotLink = style([mutedLink, {
  textAlign: 'center',
  marginBottom: '1.25rem',
  fontFamily: fonts.poppins,
  fontSize: '0.875rem',
}]);

export const errorMsg = style({
  marginTop: '0.5rem',
  padding: '0.5rem 0.75rem',
  borderRadius: '0.375rem',
  background: 'rgba(239,68,68,0.12)',
  border: '1px solid rgba(239,68,68,0.4)',
  fontFamily: fonts.poppins,
  fontSize: '0.875rem',
  color: 'rgb(248,113,113)',
});

export const register = style({
  marginTop: '1.25rem',
  fontFamily: fonts.poppins,
  fontSize: '0.875rem',
  textAlign: 'center',
  color: alphaColors.textSoft,
});

export const registerLink = style([goldLink, {
  fontWeight: '500',
}]);

export const welcomeText = style({
  marginBottom: '1.5rem',
  fontFamily: fonts.poppins,
  color: alphaColors.textBody,
});

export const welcomeActions = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});
