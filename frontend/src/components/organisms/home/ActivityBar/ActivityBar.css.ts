import { keyframes, style } from '@vanilla-extract/css';

import { fadeDividerBottom, glassPanel } from '@/styles/shared.css';
import { alphaColors, colors, fonts, media, withAlpha } from '@/styles/tokens';

const pulse = keyframes({
  '0%': { boxShadow: `0 0 0 0 ${withAlpha(colors.online, 0.6)}` },
  '70%': { boxShadow: `0 0 0 0.5rem ${withAlpha(colors.online, 0)}` },
  '100%': { boxShadow: `0 0 0 0 ${withAlpha(colors.online, 0)}` },
});

export const activityBar = style([glassPanel, {
  position: 'relative',
  zIndex: 1,
  width: 'calc(100% - 8rem)',
  maxWidth: '56rem',
  margin: '0 auto 2.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  padding: '1rem 1.5rem',
  '@media': {
    [media.tablet]: { width: 'calc(100% - 4rem)' },
    [media.mobile]: { width: 'calc(100% - 2rem)', padding: '1.25rem 1rem' },
  },
}]);

export const activityHeader = style([fadeDividerBottom, {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.75rem 2rem',
  paddingBottom: '0.75rem',
}]);

export const liveBadge = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  fontFamily: fonts.cinzel,
  fontSize: '1rem',
  fontWeight: '500',
  letterSpacing: '0.06em',
  color: colors.secondary,
});

export const liveDot = style({
  flexShrink: 0,
  width: '0.65rem',
  height: '0.65rem',
  borderRadius: '50%',
  background: colors.online,
  '@media': {
    [media.motionOk]: {
      animation: `${pulse} 2s ease-out infinite`,
    },
  },
});

export const stats = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem 2.5rem',
});

export const stat = style({
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'center',
  textAlign: 'center',
});

export const statValue = style({
  fontFamily: fonts.cinzel,
  fontSize: '1.5rem',
  fontWeight: '700',
  lineHeight: 1.1,
  color: colors.secondary,
});

export const statLabel = style({
  fontFamily: fonts.poppins,
  fontSize: '0.75rem',
  color: alphaColors.textSoft,
});

export const recentPosts = style({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.125rem',
});

export const recentPost = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.5rem',
  selectors: {
    '&:nth-child(even)': {
      background: alphaColors.primaryTintSoft,
    },
  },
});

export const recentBody = style({
  flexGrow: 1,
  minWidth: 0,
});

export const recentMeta = style({
  fontFamily: fonts.poppins,
  fontSize: '0.875rem',
  color: alphaColors.textSoft,
});

export const recentName = style({
  fontWeight: '500',
  color: colors.white,
});
