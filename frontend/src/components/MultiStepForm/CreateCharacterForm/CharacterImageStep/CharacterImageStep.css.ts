import { style } from '@vanilla-extract/css';
import { fadeDividerTop, glassPanel } from '@/styles/shared.css';
import { colors, fonts, media, shadows, withAlpha } from '@/styles/tokens';

export const uploadRow = style({
  position: 'relative',
  width: '100%',
  marginTop: '0.75rem',
  paddingInline: '3rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '4.5rem',
  '@media': {
    [media.tablet]: {
      paddingInline: '1rem',
      gap: '2.5rem',
    },
    [media.mobile]: {
      paddingInline: 0,
      gap: '2rem',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
});

export const portraitColumn = style({
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.25rem',
});

export const hiddenInput = style({ display: 'none' });

export const panel = style([glassPanel, {
  position: 'relative',
  flex: '1 1 0',
  maxWidth: '38rem',
  padding: '1.5rem 1.75rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1rem',
  '@media': {
    [media.mobile]: {
      flex: 'none',
      width: '100%',
    },
  },
}]);

export const helpTitle = style({
  fontFamily: fonts.cinzel,
  fontSize: '1.15rem',
  fontWeight: '700',
  letterSpacing: '0.06em',
  color: colors.secondary,
  textShadow: shadows.text,
});

export const helpList = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

const listItem = {
  position: 'relative',
  paddingLeft: '1.25rem',
  fontFamily: fonts.roboto,
  fontSize: '0.875rem',
  lineHeight: 1.5,
  letterSpacing: '0.025em',
} as const;

const listMarker = {
  content: '""',
  position: 'absolute',
  left: '0.15rem',
  top: '0.5em',
  width: '0.4rem',
  height: '0.4rem',
  transform: 'rotate(45deg)',
} as const;

export const ruleItem = style({
  ...listItem,
  fontWeight: '500',
  color: colors.white,
  selectors: {
    '&::before': { ...listMarker, background: colors.mainLight },
  },
});

export const helpItem = style({
  ...listItem,
  color: colors.white,
  selectors: {
    '&::before': { ...listMarker, background: withAlpha(colors.white, 0.3) },
  },
});

export const rulesBlock = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
});

export const helpBlock = style([fadeDividerTop, {
  width: '100%',
  paddingTop: '1rem',
}]);

export const rulesTitle = style({
  fontFamily: fonts.poppins,
  fontSize: '0.95rem',
  fontWeight: '500',
  letterSpacing: '0.05em',
  color: colors.secondary,
});

export const highlight = style({ color: colors.secondary });
