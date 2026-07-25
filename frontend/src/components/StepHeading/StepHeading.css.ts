import { style } from '@vanilla-extract/css';
import { colors, fonts } from '@/styles/tokens';

export const heading = style({
  position: 'relative',
  paddingBottom: '0.5rem',
  paddingLeft: '1.25rem',
  paddingRight: '1.25rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  color: colors.secondary,
  fontFamily: fonts.poppins,
  fontSize: '1.5rem',
  fontWeight: '600',
  letterSpacing: '0.1em',
});
