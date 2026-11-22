import { style } from '@vanilla-extract/css';

import { layout } from '@/styles/tokens';

export const container = style({
  width: '100%',
  maxWidth: '96rem',
  margin: '0 auto',
  padding: '2rem 3rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

export const posts = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  scrollMarginTop: `calc(${layout.headerTotalHeight} + 3rem)`,
});
