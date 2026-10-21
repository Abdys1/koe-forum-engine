import { createVar, keyframes, style } from '@vanilla-extract/css';
import { glassPanel } from '@/styles/shared.css';
import { alphaColors, backdropBlur, colors, displayTitle, fonts, media, transition, withAlpha } from '@/styles/tokens';

const appear = keyframes({
  from: { opacity: 0, transform: 'translateY(0.5rem)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const content = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
});

export const stage = style({
  flexGrow: 1,
  minHeight: 0,
  display: 'flex',
  justifyContent: 'flex-end',
  overflowY: 'auto',
});

export const detail = style({
  width: '100%',
  maxWidth: '46rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const infoPanel = style([glassPanel, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.75rem',
  marginTop: '0.75rem',
  padding: '1.5rem 1.75rem',
  '@media': {
    [media.motionOk]: {
      animation: `${appear} 0.5s ease-out`,
    },
  },
}]);

export const raceTitle = style(displayTitle);

export const teaser = style({
  paddingLeft: '1rem',
  borderLeft: `2px solid ${colors.mainLight}`,
  fontFamily: fonts.poppins,
  fontSize: '1rem',
  fontStyle: 'italic',
  lineHeight: 1.6,
  color: colors.secondaryLight,
  selectors: {
    '&::before': { content: '"„"' },
    '&::after': { content: '"”"' },
  },
});

export const raceDesc = style({
  fontFamily: fonts.poppins,
  fontSize: '0.9rem',
  lineHeight: 1.7,
  color: alphaColors.textBody,
});

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
