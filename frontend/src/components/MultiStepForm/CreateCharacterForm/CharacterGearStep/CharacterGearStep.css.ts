import { keyframes, style } from '@vanilla-extract/css';
import { fadeDividerBottom } from '@/styles/shared.css';
import { alphaColors, colors, fonts, media, shadows } from '@/styles/tokens';

const slideIn = keyframes({
  from: { opacity: 0, transform: 'translateX(-0.75rem)' },
  to: { opacity: 1, transform: 'translateX(0)' },
});

export const layout = style({
  width: '100%',
  marginTop: '0.75rem',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1.5rem',
  '@media': {
    [media.tablet]: {
      flexDirection: 'column',
    },
  },
});

export const catalog = style({
  flexGrow: 1,
  minWidth: 0,
  paddingRight: '1.25rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  '@media': {
    [media.tablet]: {
      width: '100%',
    },
    [media.motionOk]: {
      animation: `${slideIn} 0.4s ease-out`,
    },
  },
});

export const catalogHeader = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.5rem 0.75rem',
  marginBottom: '-0.5rem',
});

export const catalogIcon = style({
  fontSize: '2rem',
  color: colors.secondary,
  filter: `drop-shadow(${shadows.text})`,
});

export const catalogTitle = style({
  fontFamily: fonts.cinzel,
  fontSize: '1.75rem',
  fontWeight: '700',
  lineHeight: 1.1,
  letterSpacing: '0.04em',
  color: colors.secondary,
  textShadow: shadows.text,
});

export const catalogMeta = style({
  marginLeft: 'auto',
  fontFamily: fonts.poppins,
  fontSize: '0.75rem',
  fontWeight: '500',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: alphaColors.textMuted,
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

export const sectionHeader = style([fadeDividerBottom, {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.5rem 0.75rem',
  paddingBottom: '0.5rem',
}]);

export const sectionTitle = style({
  marginRight: 'auto',
  fontFamily: fonts.cinzel,
  fontSize: '1.05rem',
  fontWeight: '700',
  letterSpacing: '0.06em',
  color: colors.secondary,
});

const pill = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.3rem',
  padding: '0.2rem 0.6rem',
  borderRadius: '999px',
  fontFamily: fonts.poppins,
  fontSize: '0.65rem',
  fontWeight: '500',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
} as const;

export const badge = style({
  ...pill,
  border: `1px solid ${alphaColors.primaryBorderMedium}`,
  background: alphaColors.primaryTintSoft,
  color: colors.mainLight,
});

export const poolMeta = style({
  ...pill,
  border: `1px solid ${alphaColors.secondaryBorder}`,
  color: colors.secondary,
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(9.5rem, 1fr))',
  gap: '0.75rem',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});
