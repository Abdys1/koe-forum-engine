import { style } from '@vanilla-extract/css';

import { contentContainer } from '@/styles/shared.css';
import { alphaColors, colors, fonts, layout, media, shadows } from '@/styles/tokens';

export const hero = style({
  position: 'relative',
  minHeight: `calc(100vh - ${layout.headerTotalHeight})`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  overflow: 'hidden',
});

export const heroInner = style([contentContainer, {
  position: 'relative',
  zIndex: 1,
  flexGrow: 1,
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
  alignItems: 'center',
  gap: '5rem',
  padding: '4rem 4rem 2rem',
  '@media': {
    [media.tablet]: { gridTemplateColumns: 'minmax(0, 1fr)', gap: '3rem', padding: '4rem 2rem 2rem' },
    [media.mobile]: { padding: '3rem 1rem 2rem' },
  },
}]);

export const heroText = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1.5rem',
});

export const heroTitle = style({
  fontFamily: fonts.cinzelDecorative,
  fontSize: 'clamp(2.5rem, 5.5vw, 4.75rem)',
  fontWeight: '700',
  lineHeight: 1,
  letterSpacing: '0.04em',
  color: colors.secondary,
  textShadow: `${shadows.textStrong}, 0 0 40px ${alphaColors.secondaryGlow}`,
});

export const heroLead = style({
  maxWidth: '34rem',
  fontFamily: fonts.poppins,
  fontSize: '1rem',
  lineHeight: 1.75,
  color: alphaColors.textBody,
  textShadow: shadows.text,
});

export const heroActions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  marginTop: '0.5rem',
});

export const heroLogin = style({
  display: 'flex',
  justifyContent: 'flex-end',
  '@media': {
    [media.tablet]: { justifyContent: 'flex-start' },
  },
});
