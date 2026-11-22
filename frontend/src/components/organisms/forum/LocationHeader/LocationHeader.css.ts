import { style } from '@vanilla-extract/css';

import { alphaColors, colors, fonts, shadows, withAlpha } from '@/styles/tokens';

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
      background: `linear-gradient(to bottom, ${withAlpha(colors.pageDarkBg, 0.4)} 0%, ${alphaColors.pageDarkVeil} 60%, ${colors.pageDarkBg} 100%)`,
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
  color: withAlpha(colors.white, 0.85),
  textShadow: shadows.text,
});
