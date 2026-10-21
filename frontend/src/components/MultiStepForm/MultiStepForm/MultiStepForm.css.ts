import { style } from '@vanilla-extract/css';
import { thinScrollbar } from '@/styles/shared.css';

export const step = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  overflow: 'hidden',
});

export const stepHeader = style({
  position: 'relative',
  width: '100%',
  marginBottom: '0.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  zIndex: 10,
});

export const body = style({
  position: 'relative',
  flexGrow: 1,
  minHeight: 0,
  display: 'flex',
  gap: '3rem',
  marginTop: '1.5rem',
  zIndex: 10,
});

export const main = style([thinScrollbar, {
  flexGrow: 1,
  minWidth: 0,
  overflowY: 'auto',
}]);

export const aside = style({
  flexShrink: 0,
  width: '24rem',
  minHeight: 0,
  marginRight: '1rem',
  marginBottom: '1.5rem',
});
