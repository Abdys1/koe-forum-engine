import { style } from '@vanilla-extract/css';

import { layout } from '@/styles/tokens';

const STEP_BG_HEIGHT = `calc(100vh - ${layout.headerTotalHeight})`;

export const gearStepBg = style({
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      right: '5%',
      width: '50%',
      height: STEP_BG_HEIGHT,
      backgroundImage: "url('/images/knight-withoutbg.png')",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left bottom',
      backgroundSize: 'contain',
      opacity: 0.4,
    },
  },
});

export const raceStepBg = style({
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: '5%',
      width: '100%',
      height: STEP_BG_HEIGHT,
      backgroundImage: 'var(--raceUrl)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left bottom',
      backgroundSize: 'contain',
      opacity: 0.4,
    },
  },
});
