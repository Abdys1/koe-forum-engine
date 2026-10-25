import { style } from '@vanilla-extract/css';
import { roundIconButton } from '@/styles/shared.css';
import { alphaColors } from '@/styles/tokens';

export const editBtn = style([roundIconButton, {
  flexShrink: 0,
  width: '2rem',
  height: '2rem',
  borderColor: alphaColors.primaryBorder,
  color: alphaColors.textMuted,
}]);

export const editIcon = style({
  fontSize: '1rem',
});
