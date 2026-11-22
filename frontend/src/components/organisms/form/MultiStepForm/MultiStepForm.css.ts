import { style } from '@vanilla-extract/css';

import { layout, media } from '@/styles/tokens';

const RAIL_WIDTH = '6rem';

export const step = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  overflowX: 'clip',
  '@media': {
    [media.tablet]: {
      flexWrap: 'wrap',
    },
  },
});

export const rail = style({
  position: 'relative',
  zIndex: 20,
  flexShrink: 0,
  width: RAIL_WIDTH,
  paddingInline: '0.5rem',
  '@media': {
    [media.tablet]: {
      flex: '1 1 50%',
      width: 'auto',
      display: 'flex',
      paddingInline: '2rem',
      paddingBottom: '1.5rem',
    },
  },
});

export const railPrev = style({
  '@media': {
    [media.tablet]: {
      justifyContent: 'flex-start',
    },
  },
});

export const railNext = style({
  '@media': {
    [media.tablet]: {
      justifyContent: 'flex-end',
    },
  },
});

export const railInner = style({
  position: 'sticky',
  top: `calc(50vh + ${layout.headerTotalHeight} / 2)`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transform: 'translateY(-50%)',
  '@media': {
    [media.tablet]: {
      position: 'static',
      transform: 'none',
      flexDirection: 'row-reverse',
      alignItems: 'flex-start',
      gap: '1.5rem',
    },
  },
});

export const railExtra = style({
  position: 'absolute',
  top: 'calc(100% + 1.5rem)',
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  '@media': {
    [media.tablet]: {
      position: 'static',
    },
  },
});

export const content = style({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '1rem',
  '@media': {
    [media.tablet]: {
      order: -1,
      flexBasis: '100%',
      paddingInline: '2rem',
    },
  },
});

export const stepHeader = style({
  position: 'relative',
  zIndex: 20,
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '1rem',
  marginBottom: '2rem',
});

export const main = style({
  position: 'relative',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  zIndex: 10,
});
