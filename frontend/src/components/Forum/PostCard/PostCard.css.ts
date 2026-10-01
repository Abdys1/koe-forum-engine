import { style } from '@vanilla-extract/css';
import { glassPanel } from '@/styles/shared.css';
import { alphaColors, colors, fonts, gradients, shadows } from '@/styles/tokens';

export const card = style([glassPanel, {
  position: 'relative',
  display: 'flex',
  alignItems: 'stretch',
  minHeight: '24rem',
  overflow: 'hidden',
  transition: 'border-color 0.4s ease-in-out, box-shadow 0.4s ease-in-out',
  ':hover': {
    borderColor: alphaColors.primaryBorderStrong,
    boxShadow: shadows.glassHover,
  },
}]);

export const author = style({
  position: 'relative',
  flexShrink: 0,
  width: '15rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '1.25rem 1rem',
  background: 'linear-gradient(to bottom, rgba(92,70,156,0.22) 0%, rgba(92,70,156,0.06) 60%, transparent 100%)',
  textAlign: 'center',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: '1px',
      height: '100%',
      background: gradients.primaryFadeDown,
    },
  },
});

export const avatar = style({
  width: '12rem',
  height: '19.2rem',
  objectFit: 'cover',
  objectPosition: 'top',
  borderRadius: '0.5rem',
  border: '1px solid rgba(159,150,254,0.4)',
  boxShadow: '0 8px 24px -8px rgba(92,70,156,0.6)',
});

export const characterName = style({
  fontFamily: fonts.poppins,
  fontWeight: '700',
  color: colors.secondary,
});

export const postCount = style({
  fontFamily: fonts.poppins,
  fontSize: '0.8rem',
  color: alphaColors.textSoft,
});

export const body = style({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
});

export const postHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
  padding: '0.75rem 1.5rem',
  borderBottom: '1px solid',
  borderImage: `${gradients.primaryFadeRight} 1`,
});

export const postTitle = style({
  fontFamily: fonts.cinzel,
  fontSize: '1.15rem',
  fontWeight: '700',
  color: colors.white,
});

export const date = style({
  display: 'block',
  marginTop: '0.25rem',
  fontFamily: fonts.poppins,
  fontSize: '0.8rem',
  color: alphaColors.textMuted,
});

export const actions = style({
  display: 'flex',
  gap: '0.25rem',
});

export const iconBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.35rem',
  border: 'none',
  borderRadius: '0.25rem',
  background: 'transparent',
  color: alphaColors.textSoft,
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  ':hover': {
    color: colors.mainLight,
    background: alphaColors.primaryTint,
  },
});

export const content = style({
  padding: '1.25rem 1.5rem',
  fontFamily: fonts.roboto,
  lineHeight: '1.7',
  color: alphaColors.textBody,
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
});
