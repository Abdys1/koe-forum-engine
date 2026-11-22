import { style } from '@vanilla-extract/css';

import { layout, media } from '@/styles/tokens';

export const section = style({
  position: 'relative',
  minHeight: `calc(100vh - ${layout.headerTotalHeight})`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '6rem 4rem',
  '@media': {
    [media.tablet]: { minHeight: 'auto', padding: '5rem 2rem' },
    [media.mobile]: { padding: '4rem 1rem' },
  },
});
