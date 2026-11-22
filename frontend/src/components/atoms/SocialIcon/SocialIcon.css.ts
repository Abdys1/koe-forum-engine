import { globalStyle, style } from '@vanilla-extract/css';

export const icon = style({
  display: 'inline-flex',
  width: '1.5rem',
  height: '1.5rem',
});

globalStyle(`${icon} svg`, {
  width: '100%',
  height: '100%',
});
