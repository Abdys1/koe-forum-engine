import { style } from '@vanilla-extract/css';
import { alphaColors, colors, withAlpha } from '@/styles/tokens';

export const pagination = style({
  position: 'relative',
  paddingTop: '1rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 10,
});

export const left = style({ position: 'relative' });
export const right = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '0.75rem',
});

export const createBtn = style({
  boxShadow: `0 0 18px -2px ${alphaColors.secondaryGlow}, 0 10px 30px -12px ${alphaColors.secondaryBorder}`,
  selectors: {
    '&:hover:not(:disabled)': {
      boxShadow: `0 0 26px 0 ${withAlpha(colors.secondary, 0.4)}, 0 14px 40px -12px ${withAlpha(colors.secondary, 0.6)}`,
    },
  },
});
