import { globalStyle, style } from '@vanilla-extract/css';
import { goldLink, mutedLink } from '@/styles/shared.css';
import { alphaColors, colors, fonts, withAlpha } from '@/styles/tokens';

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
  background: withAlpha(colors.alert, 0.12),
  border: `1px solid ${withAlpha(colors.alert, 0.4)}`,
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
