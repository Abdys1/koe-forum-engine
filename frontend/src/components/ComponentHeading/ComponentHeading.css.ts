import { style } from '@vanilla-extract/css';
import { colors, fonts } from '@/styles/tokens';

export const heading = style({
  position: 'relative',
  width: '100%',
  marginBottom: '0.5rem',
  color: colors.secondaryLight,
  fontFamily: fonts.poppins,
  fontWeight: '500',
  textAlign: 'start',
  fontSize: '1.25rem',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
});
