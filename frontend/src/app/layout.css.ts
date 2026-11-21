import { style } from '@vanilla-extract/css';

export const body = style({
  display: 'flex',
  alignItems: 'stretch',
});

export const content = style({
  flexGrow: 1,
  minWidth: 0,
});
