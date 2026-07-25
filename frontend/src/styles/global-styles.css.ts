import { globalStyle } from '@vanilla-extract/css';
import { colors, fonts } from './tokens';

globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

globalStyle('body', {
  fontFamily: fonts.roboto,
});

globalStyle('.menuItem', {
  position: 'relative',
  marginLeft: '1.8em',
  fontSize: '1.1em',
  textTransform: 'uppercase',
  color: colors.white,
  lineHeight: '1em',
  letterSpacing: '2px',
  cursor: 'pointer',
});

globalStyle('.menuItem:hover', {
  color: '#c5bfff',
});

globalStyle('.menuItem a', {
  textDecoration: 'none',
});
