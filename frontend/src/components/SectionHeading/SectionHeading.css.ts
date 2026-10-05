import { style } from '@vanilla-extract/css';
import { colors, fonts, shadows } from '@/styles/tokens';

export const title = style({
  fontFamily: fonts.cinzel,
  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
  fontWeight: '500',
  lineHeight: 1.15,
  letterSpacing: '0.04em',
  color: colors.secondary,
  textShadow: shadows.text,
});
