import { style } from '@vanilla-extract/css';
import { fadeDividerTop, glassPanel, glassPanelHover } from '@/styles/shared.css';
import { alphaColors, colors, displayTitle, fonts, shadows, transition, withAlpha } from '@/styles/tokens';

export const content = style({
  position: 'relative',
  marginTop: '0.5rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  zIndex: 10,
});

export const infoPanel = style({
  position: 'relative',
  width: '100%',
  maxWidth: '46rem',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const panel = style([glassPanel, {
  position: 'relative',
  width: '100%',
  padding: '1.5rem 1.75rem',
  marginTop: '0.75rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
}]);

export const nameField = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1.5rem',
});

export const nameLabel = style({
  ...displayTitle,
  marginBottom: '1rem',
  cursor: 'text',
});

const ornament = {
  content: '""',
  position: 'absolute',
  top: '50%',
  width: '0.55rem',
  height: '0.55rem',
  background: colors.secondary,
  boxShadow: `0 0 8px ${alphaColors.secondaryGlow}`,
  pointerEvents: 'none',
} as const;

export const nameFrame = style({
  position: 'relative',
  width: '100%',
  selectors: {
    '&::before': { ...ornament, left: 0, transform: 'translate(-50%, -50%) rotate(45deg)' },
    '&::after': { ...ornament, right: 0, transform: 'translate(50%, -50%) rotate(45deg)' },
  },
});

export const nameInput = style({
  width: '100%',
  minHeight: '5rem',
  padding: '1rem 2.5rem',
  border: `1px solid ${alphaColors.secondaryBorder}`,
  outline: `1px solid ${withAlpha(colors.secondary, 0.2)}`,
  outlineOffset: '-6px',
  borderRadius: '0.25rem',
  background: [
    `radial-gradient(ellipse 60% 80% at 50% 50%, ${withAlpha(colors.secondary, 0.1)} 0%, transparent 70%)`,
    withAlpha(colors.cardBlackBg, 0.55),
  ].join(', '),
  fontFamily: fonts.cinzel,
  fontSize: '1.6rem',
  fontWeight: '700',
  letterSpacing: '0.06em',
  textAlign: 'center',
  color: colors.secondary,
  textShadow: shadows.text,
  caretColor: colors.secondary,
  transition: transition(['border-color', 'outline-color', 'box-shadow']),
  '::placeholder': {
    fontStyle: 'italic',
    fontWeight: '400',
    color: alphaColors.textMuted,
    textShadow: 'none',
  },
  ':focus': {
    borderColor: colors.secondary,
    outlineColor: withAlpha(colors.secondary, 0.45),
    boxShadow: `0 0 18px -4px ${alphaColors.secondaryGlow}`,
  },
});

export const nameInputError = style({
  borderColor: colors.alert,
  ':focus': { borderColor: colors.alert },
});

export const nameError = style({
  marginTop: '0.5rem',
  fontFamily: fonts.roboto,
  fontSize: '0.875rem',
  color: colors.alert,
});

export const rulesRow = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: '0.75rem',
});

export const rulesText = style({
  position: 'relative',
  marginBottom: '0.25rem',
  fontSize: '0.875rem',
  fontFamily: fonts.roboto,
  color: colors.white,
  letterSpacing: '0.025em',
});

export const highlight = style({ color: colors.secondary });
export const highlightBold = style({ color: colors.secondary, fontWeight: '500' });

export const sexRow = style([fadeDividerTop, {
  position: 'relative',
  width: '100%',
  marginTop: '1.5rem',
  paddingTop: '1.25rem',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '1.25rem',
}]);

export const sexLabel = style({
  position: 'relative',
  textAlign: 'start',
  color: colors.secondary,
  fontSize: '0.95rem',
  fontFamily: fonts.poppins,
  fontWeight: '500',
  letterSpacing: '0.05em',
});

export const sexOptions = style({
  display: 'flex',
  gap: '0.75rem',
});

export const sexBtn = style([glassPanel, glassPanelHover, {
  width: '8.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '0.6rem 1rem',
  borderRadius: '0.5rem',
  fontFamily: fonts.poppins,
  fontSize: '0.9rem',
  fontWeight: '500',
  letterSpacing: '0.05em',
  color: alphaColors.textSoft,
  cursor: 'pointer',
  transition: transition(['border-color', 'box-shadow', 'background', 'color'], '0.4s'),
  ':hover': {
    color: colors.white,
  },
}]);

export const sexBtnActive = style({
  borderColor: colors.mainLight,
  background: `linear-gradient(to bottom, ${alphaColors.primaryGlow} 0%, ${alphaColors.cardBlackVeil} 100%)`,
  boxShadow: shadows.glassHover,
  color: colors.white,
  ':hover': {
    borderColor: colors.mainLight,
  },
});

export const sexIcon = style({
  fontSize: '1.2rem',
  color: colors.mainLight,
});
