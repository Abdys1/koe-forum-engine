import { keyframes, style } from '@vanilla-extract/css';
import { glassPanel, glassPanelHover } from '@/styles/shared.css';
import { alphaColors, colors, fonts, goldFocusRing, media, shadows, transition } from '@/styles/tokens';

const pop = keyframes({
  from: { transform: 'scale(1.4)', opacity: 0 },
  to: { transform: 'scale(1)', opacity: 1 },
});

export const card = style([glassPanel, glassPanelHover, {
  position: 'relative',
  minHeight: '4.5rem',
  borderRadius: '0.5rem',
  transition: transition(['border-color', 'box-shadow', 'background', 'opacity'], '0.4s'),
}]);

export const cardSelected = style({
  borderColor: colors.mainLight,
  background: `linear-gradient(to bottom, ${alphaColors.primaryGlow} 0%, ${alphaColors.cardBlackVeil} 100%)`,
  boxShadow: shadows.glassHover,
  ':hover': {
    borderColor: colors.mainLight,
  },
});

export const cardBlocked = style({
  opacity: 0.45,
  ':hover': {
    borderColor: alphaColors.primaryBorder,
    boxShadow: shadows.glass,
  },
});

export const selectBtn = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '0.4rem',
  padding: '0.75rem 2.5rem 0.75rem 0.9rem',
  border: 'none',
  borderRadius: 'inherit',
  background: 'none',
  textAlign: 'left',
  color: colors.white,
  cursor: 'pointer',
  ':focus-visible': goldFocusRing,
  selectors: {
    [`${cardBlocked} &`]: {
      cursor: 'not-allowed',
    },
  },
});

export const name = style({
  fontFamily: fonts.poppins,
  fontSize: '0.9rem',
  fontWeight: '500',
  lineHeight: 1.3,
});

export const hint = style({
  fontFamily: fonts.poppins,
  fontSize: '0.65rem',
  fontWeight: '500',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: colors.secondary,
  opacity: 0,
  transition: transition(['opacity']),
  selectors: {
    [`${selectBtn}:hover &, ${selectBtn}:focus-visible &`]: {
      opacity: 1,
    },
  },
});

export const hintBlocked = style({
  color: alphaColors.textSoft,
  opacity: 1,
});

export const countBadge = style({
  position: 'absolute',
  top: '0.55rem',
  right: '0.7rem',
  fontFamily: fonts.cinzel,
  fontSize: '0.95rem',
  fontWeight: '700',
  color: colors.secondary,
  textShadow: shadows.text,
  '@media': {
    [media.motionOk]: {
      animation: `${pop} 0.3s ease-out`,
    },
  },
});

export const removeBtn = style({
  position: 'absolute',
  right: '0.45rem',
  bottom: '0.45rem',
  width: '1.6rem',
  height: '1.6rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${alphaColors.primaryBorderStrong}`,
  borderRadius: '50%',
  background: alphaColors.cardBlackVeil,
  color: alphaColors.textSoft,
  cursor: 'pointer',
  transition: transition(['border-color', 'color']),
  ':hover': {
    borderColor: colors.secondary,
    color: colors.secondary,
  },
  ':focus-visible': goldFocusRing,
});

export const removeIcon = style({
  fontSize: '1rem',
});
