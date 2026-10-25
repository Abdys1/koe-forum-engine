import { style } from '@vanilla-extract/css';
import { alphaColors, colors, fonts, transition, withAlpha } from '@/styles/tokens';

const textBase = {
  fontFamily: fonts.poppins,
  fontSize: '0.95rem',
  lineHeight: 1.8,
} as const;

export const body = style({
  ...textBase,
  marginTop: '1rem',
  color: alphaColors.textBody,
  overflowWrap: 'anywhere',
});

export const info = style({
  marginTop: '0.6rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontFamily: fonts.poppins,
  fontSize: '0.78rem',
  color: alphaColors.textMuted,
});

export const infoIcon = style({
  fontSize: '0.9rem',
  color: colors.mainLight,
});

export const paragraph = style({
  whiteSpace: 'pre-line',
  selectors: {
    '& + &': {
      marginTop: '1rem',
    },
  },
});

export const empty = style({
  ...textBase,
  marginTop: '1rem',
  fontStyle: 'italic',
  color: alphaColors.textMuted,
});

export const form = style({
  marginTop: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

export const editHint = style({
  padding: '0.85rem 1rem',
  borderLeft: `2px solid ${colors.mainLight}`,
  borderRadius: '0 0.375rem 0.375rem 0',
  background: alphaColors.primaryTintSoft,
  fontFamily: fonts.poppins,
  fontSize: '0.85rem',
  lineHeight: 1.65,
  color: alphaColors.textSoft,
});

export const textarea = style({
  ...textBase,
  width: '100%',
  minHeight: '16rem',
  padding: '0.9rem 1rem',
  border: `1px solid ${alphaColors.primaryBorderMedium}`,
  borderRadius: '0.5rem',
  outline: 'none',
  background: withAlpha(colors.blackBg, 0.35),
  color: colors.white,
  resize: 'vertical',
  transition: transition(['border-color', 'box-shadow']),
  ':focus': {
    borderColor: colors.mainLight,
    boxShadow: `0 0 0 3px ${withAlpha(colors.mainLight, 0.15)}`,
  },
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '0.5rem',
});

export const counter = style({
  marginRight: 'auto',
  fontFamily: fonts.poppins,
  fontSize: '0.8rem',
  color: alphaColors.textMuted,
  transition: transition(['color']),
});

export const counterValid = style({
  color: colors.mainLight,
});
