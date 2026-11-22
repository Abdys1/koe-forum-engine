import { style } from '@vanilla-extract/css';

import { HEADER_TOTAL_HEIGHT } from '@/components/Navigation/Header.css';
import { authCard, mainBg } from '@/styles/shared.css';
import { alphaColors, colors, fonts, media, shadows, withAlpha } from '@/styles/tokens';

export const page = style([mainBg, {
  position: 'relative',
  width: '100%',
  minHeight: `calc(100vh - ${HEADER_TOTAL_HEIGHT})`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  padding: '4rem 2rem',
  '@media': {
    [media.mobile]: { padding: '3rem 1rem' },
  },
}]);

export const centerVeil = style({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  background: `radial-gradient(ellipse 45% 60% at 50% 50%, ${withAlpha(colors.pageDarkBg, 0.7)} 0%, transparent 100%)`,
  pointerEvents: 'none',
});

export const content = style({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  maxWidth: '26rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  textAlign: 'center',
});

export const siteName = style({
  fontFamily: fonts.cinzelDecorative,
  fontSize: 'clamp(2.25rem, 4vw, 3rem)',
  fontWeight: '700',
  lineHeight: 1,
  letterSpacing: '0.04em',
  color: colors.secondary,
  textShadow: `${shadows.textStrong}, 0 0 40px ${alphaColors.secondaryGlow}`,
});

export const title = style({
  fontFamily: fonts.cinzel,
  fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)',
  fontWeight: '600',
  letterSpacing: '0.12em',
  color: colors.mainLight,
  textShadow: `${shadows.text}, 0 0 24px ${alphaColors.primaryGlow}`,
});

export const lead = style({
  marginBottom: '1rem',
  fontFamily: fonts.poppins,
  lineHeight: 1.75,
  color: alphaColors.textBody,
  textShadow: shadows.text,
});

export const card = style([authCard, {
  padding: '2rem',
  textAlign: 'left',
}]);
