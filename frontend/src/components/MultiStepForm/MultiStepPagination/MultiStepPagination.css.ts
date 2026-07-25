import { style } from '@vanilla-extract/css';

export const pagination = style({
  position: 'relative',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 10,
});

export const left = style({ position: 'relative' });
export const right = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});
