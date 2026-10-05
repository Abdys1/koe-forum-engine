import { keyframes, style } from '@vanilla-extract/css';
import { HEADER_TOTAL_HEIGHT } from '@/components/Navigation/Header.css';
import { accentLink, contentContainer, fadeDividerBottom, fadeDividerTop, featuredPanel, glassPanel, glassPanelHover, goldLink, mainBg, metaText } from '@/styles/shared.css';
import { alphaColors, backdropBlur, colors, fonts, gradients, media, shadows, transition, withAlpha } from '@/styles/tokens';

const pulse = keyframes({
  '0%': { boxShadow: `0 0 0 0 ${withAlpha(colors.online, 0.6)}` },
  '70%': { boxShadow: `0 0 0 0.5rem ${withAlpha(colors.online, 0)}` },
  '100%': { boxShadow: `0 0 0 0 ${withAlpha(colors.online, 0)}` },
});

export const page = style([mainBg, {
  width: '100%',
}]);

export const section = style({
  position: 'relative',
  minHeight: `calc(100vh - ${HEADER_TOTAL_HEIGHT})`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '6rem 4rem',
  '@media': {
    [media.tablet]: { minHeight: 'auto', padding: '5rem 2rem' },
    [media.mobile]: { padding: '4rem 1rem' },
  },
});

export const split = style([contentContainer, {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
  gap: '5rem',
  '@media': {
    [media.tablet]: { gridTemplateColumns: 'minmax(0, 1fr)', gap: '3rem' },
  },
}]);

export const splitReverse = style({});

export const sectionText = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1.25rem',
  selectors: {
    [`${splitReverse} > &`]: { order: 2 },
  },
  '@media': {
    [media.tablet]: {
      selectors: {
        [`${splitReverse} > &`]: { order: 0 },
      },
    },
  },
});

export const sectionLead = style({
  maxWidth: '36rem',
  fontFamily: fonts.poppins,
  fontSize: '1.05rem',
  lineHeight: 1.75,
  color: alphaColors.textBody,
});

export const hero = style({
  position: 'relative',
  minHeight: `calc(100vh - ${HEADER_TOTAL_HEIGHT})`,
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

export const worldSplit = style({
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.3fr)',
  alignItems: 'start',
  '@media': {
    [media.tablet]: { gridTemplateColumns: 'minmax(0, 1fr)' },
  },
});

export const characterSection = style({
  background: `linear-gradient(to bottom, transparent 0%, ${alphaColors.cardBlackVeil} 20%, ${alphaColors.cardBlackVeil} 80%, transparent 100%)`,
});

export const journey = style([featuredPanel, {
  position: 'relative',
  width: '100%',
  maxWidth: '36rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  padding: '1.75rem 2rem',
  overflow: 'hidden',
  '@media': {
    [media.mobile]: { padding: '1.5rem 1.25rem' },
  },
}]);

export const journeyIntro = style({
  fontFamily: fonts.poppins,
  fontSize: '1rem',
  lineHeight: 1.6,
  color: alphaColors.textBody,
});

export const journeySteps = style({
  position: 'relative',
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.1rem',
  selectors: {
    // Függőleges vezetővonal a sorszámok mögött
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '1rem',
      bottom: '1rem',
      left: 'calc(1.25rem - 0.5px)',
      width: '1px',
      background: gradients.primaryFadeDown,
    },
  },
});

export const journeyStep = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem',
});

export const journeyMarker = style({
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '50%',
  border: `1px solid ${alphaColors.primaryBorderStrong}`,
  background: colors.cardBlackBg,
  boxShadow: `0 0 16px -4px ${alphaColors.primaryGlow}`,
  fontFamily: fonts.cinzel,
  fontSize: '0.9rem',
  fontWeight: '700',
  color: colors.secondary,
  transition: transition(['border-color', 'box-shadow']),
  selectors: {
    [`${journeyStep}:hover &`]: {
      borderColor: colors.secondary,
      boxShadow: `0 0 18px -4px ${withAlpha(colors.secondary, 0.5)}`,
    },
  },
});

export const journeyText = style({
  fontFamily: fonts.cinzel,
  fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
  letterSpacing: '0.02em',
  color: colors.white,
});

export const journeyOutro = style([fadeDividerTop, {
  paddingTop: '1.25rem',
  fontFamily: fonts.cinzel,
  fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
  fontStyle: 'italic',
  color: colors.secondary,
  textShadow: `0 0 20px ${alphaColors.secondaryGlow}`,
}]);

export const journeyHint = style({
  marginTop: '0.25rem',
  fontFamily: fonts.poppins,
  fontSize: '0.95rem',
  fontStyle: 'italic',
  color: alphaColors.textSoft,
});

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
  background: `linear-gradient(120deg, ${withAlpha(colors.mainMedium, 0.35)} 0%, ${withAlpha(colors.cardBlackBg, 0.7)} 60%, ${withAlpha(colors.secondary, 0.1)} 100%)`,
  boxShadow: shadows.glass,
}]);

export const joinText = style({
  fontFamily: fonts.cinzel,
  fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
  color: colors.white,
});
