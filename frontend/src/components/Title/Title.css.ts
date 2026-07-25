import { style } from '@vanilla-extract/css';
import { colors, fonts } from '@/styles/tokens';

export const container = style({
  position: 'relative',
  width: '100%',
  height: '9rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

export const logo = style({
  position: 'absolute',
  top: '0.75rem',
  height: '9rem',
  width: 'auto',
  opacity: 0.2,
});

export const subTitle = style({
  color: colors.white,
  fontFamily: fonts.caveat,
  fontSize: '1.5rem',
  letterSpacing: '0.1em',
});

export const mainTitle = style({
  color: colors.mainLight,
  fontFamily: fonts.sumana,
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '0.3em',
});
