import { style } from '@vanilla-extract/css';
import { colors, fonts, shadows } from '@/styles/tokens';

export const heading = style({
  position: 'relative',
  width: '100%',
  marginBottom: '0.5rem',
  color: colors.secondary,
  fontFamily: fonts.cinzelDecorative,
  fontWeight: '700',
  textAlign: 'center',
  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
  letterSpacing: '0.06em',
  textShadow: shadows.text,
});
