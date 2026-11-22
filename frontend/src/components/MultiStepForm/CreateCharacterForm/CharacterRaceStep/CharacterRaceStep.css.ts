import { keyframes, style } from '@vanilla-extract/css';

import { glassPanel } from '@/styles/shared.css';
import { alphaColors, colors, displayTitle, fonts, media } from '@/styles/tokens';

const appear = keyframes({
  from: { opacity: 0, transform: 'translateY(0.5rem)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const content = style({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
});

export const stage = style({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'flex-end',
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
