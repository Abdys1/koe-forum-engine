import { style } from '@vanilla-extract/css';
import { HEADER_TOTAL_HEIGHT } from '@/components/Navigation/Header.css';

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
  scrollMarginTop: `calc(${HEADER_TOTAL_HEIGHT} + 3rem)`,
});
