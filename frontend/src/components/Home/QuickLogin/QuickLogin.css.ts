import { style } from '@vanilla-extract/css';

import { authCard, eyebrow as eyebrowBase } from '@/styles/shared.css';
import { alphaColors, colors, fonts } from '@/styles/tokens';

export const card = style([authCard, {
  padding: '1.5rem 2rem 2rem',
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
