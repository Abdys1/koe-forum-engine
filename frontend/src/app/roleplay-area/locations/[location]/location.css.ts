import { style } from '@vanilla-extract/css';
import { mainBg } from '@/styles/shared.css';
import { alphaColors, colors, fonts, shadows } from '@/styles/tokens';

export const page = style([mainBg, {
  width: '100%',
  minHeight: '100vh',
}]);

export const hero = style({
  position: 'relative',
  height: '18rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '2rem 3rem',
  backgroundImage: "url('/images/inn.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(to bottom, rgba(18,19,21,0.4) 0%, ${alphaColors.pageDarkVeil} 60%, ${colors.pageDarkBg} 100%)`,
    },
  },
});

export const heroContent = style({
  position: 'relative',
  width: '100%',
  maxWidth: '90rem',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1rem',
  textAlign: 'left',
});

export const locationName = style({
  fontFamily: fonts.cinzel,
  fontSize: '2.75rem',
  fontWeight: '500',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: colors.secondary,
  textShadow: shadows.textStrong,
});

export const description = style({
  maxWidth: '40rem',
  fontFamily: fonts.poppins,
  color: 'rgba(255,255,255,0.85)',
  textShadow: shadows.text,
});

export const stream = style({
  position: 'relative',
  paddingBottom: '4rem',
  background: `linear-gradient(to bottom, ${colors.pageDarkBg} 0, ${alphaColors.pageDarkVeil} 8rem, transparent 18rem, transparent calc(100% - 18rem), ${alphaColors.pageDarkVeil} calc(100% - 8rem), ${colors.pageDarkBg} 100%)`,
});

export const notFound = style({
  padding: '4rem 2rem',
  fontFamily: fonts.cinzel,
  textAlign: 'center',
  color: colors.white,
});
