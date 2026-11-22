import { style } from '@vanilla-extract/css';

import { media } from '@/styles/tokens';

export const worldSplit = style({
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.3fr)',
  alignItems: 'start',
  '@media': {
    [media.tablet]: { gridTemplateColumns: 'minmax(0, 1fr)' },
  },
});
