import { style } from '@vanilla-extract/css';

import { accentLink, contentContainer, fadeDividerBottom, featuredPanel, glassPanel, glassPanelHover, goldLink, metaText } from '@/styles/shared.css';
import { alphaColors, backdropBlur, colors, fonts, gradients, media, shadows, withAlpha } from '@/styles/tokens';

export const liveSection = style({
  gap: '3rem',
});

export const liveHeader = style([contentContainer, {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}]);

export const liveGrid = style([contentContainer, {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
  alignItems: 'start',
  gap: '2rem',
  '@media': {
    [media.tablet]: { gridTemplateColumns: 'minmax(0, 1fr)' },
  },
}]);

export const activityList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const activityCard = style([glassPanel, glassPanelHover, {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1.25rem',
  padding: '1.25rem 1.5rem',
}]);

export const activityAvatar = style({
  flexShrink: 0,
  width: '4rem',
  height: '4rem',
  objectFit: 'cover',
  objectPosition: 'top',
  borderRadius: '0.5rem',
  border: `1px solid ${withAlpha(colors.mainLight, 0.4)}`,
  background: colors.cardBlackBg,
});

export const activityBody = style({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  minWidth: 0,
});

export const activityMeta = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1rem',
});

export const activityName = style({
  fontFamily: fonts.poppins,
  fontWeight: '700',
  color: colors.secondary,
});

export const activityLocation = style([accentLink, {
  fontFamily: fonts.poppins,
  fontSize: '0.8rem',
  letterSpacing: '0.05em',
}]);

export const activityExcerpt = style({
  marginTop: '0.25rem',
  fontFamily: fonts.poppins,
  fontSize: '0.9rem',
  fontStyle: 'italic',
  lineHeight: 1.6,
  color: alphaColors.textBody,
});

export const liveSide = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const goldTint = (alpha: number) => withAlpha(colors.secondary, alpha);

export const newestCharacter = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  margin: '3px',
  padding: '1.1rem 1.25rem',
  border: `1px solid ${alphaColors.secondaryBorder}`,
  borderRadius: '0.2rem',
  outline: `1px solid ${goldTint(0.2)}`,
  outlineOffset: '3px',
  background: [
    `radial-gradient(ellipse 80% 120% at 0% 0%, ${goldTint(0.12)} 0%, transparent 60%)`,
    `linear-gradient(to bottom, ${withAlpha(colors.cardMediumBg, 0.75)} 0%, ${withAlpha(colors.cardBlackBg, 0.85)} 100%)`,
  ].join(', '),
  ...backdropBlur('14px'),
  boxShadow: `0 0 32px -10px ${goldTint(0.35)}, ${shadows.glass}`,
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '0.35rem',
      left: '0.35rem',
      width: '0.9rem',
      height: '0.9rem',
      borderTop: `2px solid ${colors.secondary}`,
      borderLeft: `2px solid ${colors.secondary}`,
      opacity: 0.8,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '0.35rem',
      right: '0.35rem',
      width: '0.9rem',
      height: '0.9rem',
      borderBottom: `2px solid ${colors.secondary}`,
      borderRight: `2px solid ${colors.secondary}`,
      opacity: 0.8,
    },
  },
});

export const newestCharacterIcon = style({
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '2.75rem',
  height: '2.75rem',
  borderRadius: '50%',
  background: goldTint(0.1),
  border: `1px solid ${alphaColors.secondaryBorder}`,
  color: colors.secondary,
  fontSize: '1.4rem',
  filter: `drop-shadow(0 0 6px ${goldTint(0.3)})`,
});

export const newestCharacterLabel = style({
  display: 'block',
  marginBottom: '0.15rem',
  fontFamily: fonts.poppins,
  fontSize: '0.75rem',
  fontWeight: '500',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: alphaColors.textSoft,
});

export const newestCharacterName = style([goldLink, {
  fontFamily: fonts.cinzel,
  fontSize: '1.3rem',
  fontWeight: '700',
  letterSpacing: '0.03em',
  textShadow: shadows.text,
}]);

export const newsPanel = style([featuredPanel, {
  padding: '1.5rem',
}]);

export const newsTitle = style([fadeDividerBottom, {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  paddingBottom: '0.75rem',
  marginBottom: '0.5rem',
  fontFamily: fonts.cinzel,
  fontSize: '1.25rem',
  fontWeight: '500',
  color: colors.secondary,
}]);

export const newsIcon = style({
  color: colors.mainLight,
});

export const newsList = style({
  listStyle: 'none',
});

export const newsItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  padding: '0.75rem 0',
  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${alphaColors.primaryBorder}`,
    },
  },
});

export const newsDate = style([metaText, {
  fontSize: '0.75rem',
}]);

export const newsText = style({
  fontFamily: fonts.poppins,
  fontSize: '0.95rem',
  color: colors.white,
});

export const joinBand = style([contentContainer, {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1.5rem',
  padding: '2rem 2.5rem',
  borderRadius: '0.75rem',
  border: `1px solid ${alphaColors.primaryBorderMedium}`,
  background: gradients.primaryGoldSurface,
  boxShadow: shadows.glass,
}]);

export const joinText = style({
  fontFamily: fonts.cinzel,
  fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
  color: colors.white,
});
