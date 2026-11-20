import { style } from '@vanilla-extract/css';
import { media } from '@/styles/tokens';

export const header = style({
  position: 'relative',
  zIndex: 20,
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 36rem) minmax(0, 1fr)',
  gridTemplateAreas: '". title ." ". bar preview"',
  alignItems: 'center',
  columnGap: '2rem',
  paddingTop: '1rem',
  marginBottom: '2rem',
  '@media': {
    [media.tablet]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      gridTemplateAreas: '"title" "bar" "preview"',
    },
  },
});

export const title = style({
  gridArea: 'title',
});

export const bar = style({
  gridArea: 'bar',
  display: 'flex',
  justifyContent: 'center',
});

export const preview = style({
  gridArea: 'preview',
  justifySelf: 'end',
  minWidth: 0,
  '@media': {
    [media.tablet]: {
      justifySelf: 'center',
    },
  },
});
