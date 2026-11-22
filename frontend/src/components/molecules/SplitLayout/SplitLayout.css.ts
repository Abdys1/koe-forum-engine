import { style } from '@vanilla-extract/css';

import { contentContainer } from '@/styles/shared.css';
import { media } from '@/styles/tokens';

export const split = style([contentContainer, {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
  gap: '5rem',
  '@media': {
    [media.tablet]: { gridTemplateColumns: 'minmax(0, 1fr)', gap: '3rem' },
  },
}]);

export const splitReverse = style({});

export const sectionText = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1.25rem',
  selectors: {
    [`${splitReverse} > &`]: { order: 2 },
  },
  '@media': {
    [media.tablet]: {
      selectors: {
        [`${splitReverse} > &`]: { order: 0 },
      },
    },
  },
});
