import { style } from '@vanilla-extract/css';
import { alphaColors, colors, fonts, ornatePortrait, shadows, transition, withAlpha } from '@/styles/tokens';

const frameHighlight = {
  outlineColor: colors.secondary,
  boxShadow: `0 0 24px -2px ${alphaColors.secondaryGlow}`,
} as const;

export const frame = style({
  ...ornatePortrait(14),
  padding: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: [
    `radial-gradient(ellipse 70% 50% at 50% 40%, ${withAlpha(colors.secondary, 0.1)} 0%, transparent 70%)`,
    withAlpha(colors.cardBlackBg, 0.55),
  ].join(', '),
  cursor: 'pointer',
  transition: transition(['border-color', 'outline-color', 'box-shadow']),
  ':hover': {
    ...frameHighlight,
    borderColor: withAlpha(colors.secondary, 0.6),
  },
  ':focus-visible': frameHighlight,
});

export const placeholder = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
});

export const actionIcon = style({
  fontSize: '2.75rem',
  color: colors.secondary,
  filter: `drop-shadow(${shadows.text})`,
});

export const actionText = style({
  fontFamily: fonts.poppins,
  fontSize: '0.8rem',
  fontWeight: '500',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: colors.secondary,
});

export const image = style({
  objectFit: 'cover',
  objectPosition: 'top',
  borderRadius: 'inherit',
});

export const overlay = style([placeholder, {
  position: 'absolute',
  inset: 0,
  justifyContent: 'center',
  borderRadius: 'inherit',
  background: withAlpha(colors.cardBlackBg, 0.65),
  opacity: 0,
  transition: transition(['opacity']),
  selectors: {
    [`${frame}:hover &, ${frame}:focus-visible &`]: { opacity: 1 },
  },
}]);
