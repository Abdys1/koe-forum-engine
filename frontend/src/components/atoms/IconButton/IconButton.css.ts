import { style } from '@vanilla-extract/css';

import { roundIconButton } from '@/styles/shared.css';
import { alphaColors, colors, withAlpha } from '@/styles/tokens';

export const button = style([roundIconButton, {
  flexShrink: 0,
  width: '2rem',
  height: '2rem',
  borderColor: alphaColors.primaryBorder,
  color: alphaColors.textMuted,
}]);

export const invalid = style({
  selectors: {
    [`${button}&, ${button}&:hover`]: {
      borderColor: colors.alert,
      background: withAlpha(colors.alert, 0.12),
      color: colors.alert,
    },
  },
});

export const icon = style({
  fontSize: '1rem',
});
