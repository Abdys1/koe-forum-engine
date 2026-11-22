import { createVar, style } from '@vanilla-extract/css';

import { alphaColors, backdropBlur, colors, transition, withAlpha } from '@/styles/tokens';

export const filmstrip = style({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

const fadeStart = createVar();
const fadeEnd = createVar();
const FADE_SIZE = '1.5rem';

export const track = style({
  vars: {
    [fadeStart]: '0px',
    [fadeEnd]: '0px',
  },
  flexGrow: 1,
  minWidth: 0,
  listStyle: 'none',
  display: 'flex',
  gap: '0.75rem',
  padding: `0.75rem ${FADE_SIZE}`,
  scrollPaddingInline: FADE_SIZE,
  overflowX: 'auto',
  scrollSnapType: 'x proximity',
  scrollbarWidth: 'none',
  maskImage: `linear-gradient(to right, transparent 0, black ${fadeStart}, black calc(100% - ${fadeEnd}), transparent 100%)`,
  cursor: 'grab',
  userSelect: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
});

export const trackFadeStart = style({
  vars: { [fadeStart]: FADE_SIZE },
});

export const trackFadeEnd = style({
  vars: { [fadeEnd]: FADE_SIZE },
});

export const trackDragging = style({
  cursor: 'grabbing',
  scrollSnapType: 'none',
});

export const scrollBtn = style({
  flexShrink: 0,
  width: '2.5rem',
  height: '2.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${alphaColors.primaryBorderMedium}`,
  borderRadius: '50%',
  background: withAlpha(colors.cardBlackBg, 0.5),
  ...backdropBlur('6px'),
  color: colors.white,
  fontSize: '1.75rem',
  cursor: 'pointer',
  transition: transition(['border-color', 'color', 'opacity']),
  selectors: {
    '&:hover:not(:disabled)': {
      borderColor: colors.secondary,
      color: colors.secondary,
    },
    '&:disabled': {
      opacity: 0.3,
      cursor: 'default',
    },
  },
});

export const scrollIcon = style({
  fontSize: 'inherit',
});
