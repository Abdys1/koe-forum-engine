import { style } from '@vanilla-extract/css';
import { glassPanel, glassPanelHover } from '@/styles/shared.css';
import { alphaColors, colors, fonts, media, shadows, transition } from '@/styles/tokens';

export const item = style({
  flexShrink: 0,
  scrollSnapAlign: 'start',
});

export const btn = style([glassPanel, glassPanelHover, {
  width: '9rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  padding: '0.3rem 0.3rem 0.5rem',
  borderRadius: '0.5rem',
  cursor: 'inherit',
  transition: transition(['border-color', 'box-shadow', 'background', 'transform'], '0.4s'),
  ':hover': {
    transform: 'translateY(-0.2rem)',
  },
  '@media': {
    [media.reducedMotion]: {
      ':hover': { transform: 'none' },
    },
  },
}]);

export const btnActive = style({
  borderColor: colors.mainLight,
  background: `linear-gradient(to bottom, ${alphaColors.primaryGlow} 0%, ${alphaColors.cardBlackVeil} 100%)`,
  boxShadow: shadows.glassHover,
  ':hover': {
    borderColor: colors.mainLight,
  },
});

export const btnImgWrap = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 10',
  overflow: 'hidden',
  borderRadius: '0.35rem',
});

export const btnImg = style({
  objectFit: 'contain',
  objectPosition: 'center bottom',
  pointerEvents: 'none',
});

export const btnLabel = style({
  fontFamily: fonts.poppins,
  fontSize: '0.75rem',
  fontWeight: '500',
  letterSpacing: '0.05em',
  textAlign: 'center',
  color: alphaColors.textSoft,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  selectors: {
    [`${btnActive} &`]: { color: colors.secondary },
  },
});
