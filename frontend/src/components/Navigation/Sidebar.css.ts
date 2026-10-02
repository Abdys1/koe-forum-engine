import { keyframes, style } from '@vanilla-extract/css';
import { HEADER_TOTAL_HEIGHT } from '@/components/Navigation/Header.css';
import { alphaColors, colors, fonts, gradients } from '@/styles/tokens';

const COLLAPSED_WIDTH = '4.5rem';
const OPEN_WIDTH = '36rem';
const AVATAR_SIZE = '5.75rem';
const AVATAR_BORDER_WIDTH = '3px';

const surfaceTint = (alpha: number) => `rgba(50,52,56,${alpha})`;
const goldTint = (alpha: number) => `rgba(231,207,147,${alpha})`;
const neutralHighlight = '#5c5e64';
const neutralFadeRight = `linear-gradient(to right, ${neutralHighlight} 0%, ${colors.cardMediumBg} 70%, ${colors.cardMediumBg} 100%)`;

export const slot = style({
  position: 'relative',
  zIndex: 30,
  flexShrink: 0,
  width: COLLAPSED_WIDTH,
});

export const sidebar = style({
  position: 'sticky',
  top: HEADER_TOTAL_HEIGHT,
  display: 'flex',
  flexDirection: 'column',
  width: COLLAPSED_WIDTH,
  height: `calc(100vh - ${HEADER_TOTAL_HEIGHT})`,
  background: colors.cardBlackBg,
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  boxShadow: '4px 0 24px -12px rgba(0,0,0,0.8)',
  cursor: 'pointer',
  transition: 'width 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: '1px',
      height: '100%',
      background: gradients.primaryFadeDown,
      pointerEvents: 'none',
    },
  },
});

export const sidebarOpen = style({
  width: OPEN_WIDTH,
  cursor: 'default',
  boxShadow: '8px 0 32px -12px rgba(0,0,0,0.9)',
});

export const characterBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  paddingTop: '1.75rem',
  paddingBottom: '1.75rem',
  background: `linear-gradient(to bottom, ${surfaceTint(0.75)} 0%, ${surfaceTint(0.35)} 100%)`,
  borderBottom: '1px solid',
  borderImage: `${neutralFadeRight} 1`,
  boxShadow: '0 8px 16px -10px rgba(0,0,0,0.8)',
});

export const characterHeader = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  minHeight: AVATAR_SIZE,
});

export const collapseBtn = style({
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem',
  zIndex: 2,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.6rem',
  height: '1.6rem',
  padding: 0,
  border: 'none',
  borderRadius: '50%',
  background: 'transparent',
  color: alphaColors.textBody,
  cursor: 'pointer',
  transition: 'color 0.3s ease-in-out, background 0.3s ease-in-out',
  ':hover': {
    color: colors.mainLight,
    background: alphaColors.primaryTint,
  },
});

export const collapseIcon = style({
  fontSize: '1.4rem',
});

export const avatarBtn = style({
  position: 'absolute',
  top: 0,
  left: `calc(${COLLAPSED_WIDTH} - ${AVATAR_SIZE} / 2)`,
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  padding: 0,
  border: 'none',
  zIndex: 1,
  borderRadius: '50%',
  background: 'transparent',
  cursor: 'pointer',
  transition: 'box-shadow 0.3s ease-in-out',
  ':hover': {
    boxShadow: `0 0 0 3px ${alphaColors.primaryBorderStrong}`,
  },
  ':disabled': {
    cursor: 'default',
    boxShadow: 'none',
  },
});

export const avatar = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'top',
  borderRadius: '50%',
  border: `${AVATAR_BORDER_WIDTH} solid ${colors.mainLight}`,
  background: colors.cardBlackBg,
  boxShadow: '0 6px 16px -6px rgba(0,0,0,0.8)',
});

export const characterInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  width: '16rem',
  minWidth: 0,
  marginLeft: `calc(${COLLAPSED_WIDTH} + ${AVATAR_SIZE} / 2 + 2.25rem)`,
});

export const characterName = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontFamily: fonts.cinzel,
  fontSize: '1.6rem',
  fontWeight: '700',
  lineHeight: '1.25',
  letterSpacing: '0.04em',
  color: colors.secondary,
  textDecoration: 'none',
  textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 14px rgba(231,207,147,0.35)',
  transition: 'color 0.3s ease-in-out',
  ':hover': {
    color: colors.secondaryLight,
  },
});

const characterBtnBase = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.4rem',
  padding: '0.55rem 1rem',
  borderRadius: '0.2rem',
  fontFamily: fonts.poppins,
  fontSize: '0.9rem',
  fontWeight: '700',
  letterSpacing: '0.05em',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  transition: 'all 0.4s ease-in-out',
} as const;

export const myCharactersBtn = style({
  ...characterBtnBase,
  padding: '0.45rem 1rem',
  border: `1px solid ${colors.darkBtn}`,
  background: 'rgba(0,0,0,0.3)',
  fontWeight: '500',
  color: alphaColors.textBody,
  ':hover': {
    borderColor: colors.secondary,
    background: goldTint(0.08),
    color: colors.secondaryLight,
  },
});

export const characterSwitch = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem',
  padding: '0 1rem',
});

export const characterSwitchLabel = style({
  fontFamily: fonts.poppins,
  fontSize: '0.8rem',
  letterSpacing: '0.05em',
  color: alphaColors.textSoft,
});

export const menu = style({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem 0.85rem',
  overflowX: 'hidden',
  overflowY: 'auto',
});

export const menuItem = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
  padding: '0.7rem 0.65rem',
  border: 'none',
  borderBottom: '1px solid',
  borderImage: `linear-gradient(to right, ${colors.cardMediumBg} 0%, transparent 100%) 1`,
  borderRadius: '0.15rem',
  background: 'transparent',
  fontFamily: fonts.cinzel,
  fontSize: '0.95rem',
  fontWeight: '700',
  letterSpacing: '0.06em',
  color: alphaColors.textBody,
  textAlign: 'left',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  transition: 'color 0.3s ease-in-out, background 0.3s ease-in-out',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '15%',
      left: 0,
      width: '3px',
      height: '70%',
      background: `linear-gradient(to bottom, ${colors.secondaryLight}, ${colors.secondaryDark})`,
      boxShadow: '0 0 8px rgba(231,207,147,0.7)',
      transform: 'scaleY(0)',
      transition: 'transform 0.3s ease-in-out',
    },
    '&:hover, &[aria-current="page"]': {
      color: colors.secondaryLight,
      background: `linear-gradient(to right, ${surfaceTint(0.9)} 0%, ${surfaceTint(0.2)} 70%, transparent 100%)`,
    },
    '&:hover::before, &[aria-current="page"]::before': {
      transform: 'scaleY(1)',
    },
  },
});

export const menuIcon = style({
  flexShrink: 0,
  fontSize: '1.5rem',
  color: colors.secondary,
  filter: `drop-shadow(0 0 4px ${goldTint(0.3)})`,
  transition: 'color 0.3s ease-in-out, filter 0.3s ease-in-out, transform 0.3s ease-in-out',
  selectors: {
    [`${menuItem}:hover &, ${menuItem}[aria-current="page"] &`]: {
      color: colors.secondaryLight,
      filter: `drop-shadow(0 0 7px ${goldTint(0.7)})`,
      transform: 'scale(1.1)',
    },
  },
});

export const logout = style({
  marginTop: '1.5rem',
});

export const tileMenu = style({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  padding: '1.5rem 1.25rem 1rem',
  overflowX: 'hidden',
  overflowY: 'auto',
});

export const tileGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '0.75rem',
  width: `calc(${OPEN_WIDTH} - 2.5rem)`,
});

const tileAppear = keyframes({
  from: { opacity: 0, transform: 'scale(0.96)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

const tileGlow = (alpha: number) => `radial-gradient(circle at 50% 38%, rgba(255,255,255,${alpha}) 0%, transparent 45%)`;

export const tile = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.6rem',
  aspectRatio: '1',
  padding: '0.75rem 0.5rem',
  overflow: 'hidden',
  border: `1px solid ${colors.darkBtn}`,
  borderRadius: '0.2rem',
  outline: `1px solid ${colors.cardMediumBg}`,
  outlineOffset: '2px',
  background: [
    tileGlow(0.05),
    `linear-gradient(to bottom, ${surfaceTint(0.6)} 0%, rgba(0,0,0,0.3) 100%)`,
  ].join(', '),
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 6px 14px -8px rgba(0,0,0,0.8)',
  color: alphaColors.textBody,
  textDecoration: 'none',
  animation: `${tileAppear} 0.35s ease-out both`,
  transition: 'border-color 0.3s ease-in-out, outline-color 0.3s ease-in-out, color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '0.35rem',
      left: '0.35rem',
      width: '0.9rem',
      height: '0.9rem',
      borderTop: `2px solid ${neutralHighlight}`,
      borderLeft: `2px solid ${neutralHighlight}`,
      opacity: 0.9,
      transition: 'all 0.3s ease-in-out',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '15%',
      width: '70%',
      height: '3px',
      background: `linear-gradient(to right, ${colors.secondaryDark}, ${colors.secondaryLight}, ${colors.secondaryDark})`,
      boxShadow: '0 0 8px rgba(231,207,147,0.7)',
      transform: 'scaleX(0)',
      transition: 'transform 0.3s ease-in-out',
    },
    '&:hover, &[aria-current="page"]': {
      borderColor: goldTint(0.45),
      outlineColor: goldTint(0.2),
      background: [
        tileGlow(0.1),
        `linear-gradient(to bottom, ${surfaceTint(1)} 0%, ${surfaceTint(0.35)} 100%)`,
      ].join(', '),
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 22px -10px rgba(0,0,0,0.9)',
      color: colors.secondaryLight,
    },
    '&:hover::before, &[aria-current="page"]::before': {
      width: '1.3rem',
      height: '1.3rem',
      borderColor: colors.secondary,
      opacity: 1,
    },
    '&:hover::after, &[aria-current="page"]::after': {
      transform: 'scaleX(1)',
    },
  },
});

export const tileIcon = style({
  fontSize: '2.25rem',
  color: colors.secondary,
  filter: `drop-shadow(0 0 6px ${goldTint(0.3)})`,
  transition: 'color 0.3s ease-in-out, filter 0.3s ease-in-out, transform 0.3s ease-in-out',
  selectors: {
    [`${tile}:hover &, ${tile}[aria-current="page"] &`]: {
      color: colors.secondaryLight,
      filter: `drop-shadow(0 0 9px ${goldTint(0.7)})`,
      transform: 'scale(1.1) translateY(-2px)',
    },
  },
});

export const tileLabel = style({
  fontFamily: fonts.cinzel,
  fontSize: '0.8rem',
  fontWeight: '700',
  lineHeight: '1.25',
  letterSpacing: '0.04em',
  textAlign: 'center',
});

export const logoutBtn = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  marginTop: 'auto',
  marginLeft: '-1.25rem',
  marginRight: '-1.25rem',
  marginBottom: '-1rem',
  padding: '0.9rem 1.25rem',
  border: 'none',
  borderTop: '1px solid',
  borderImage: `${neutralFadeRight} 1`,
  background: `linear-gradient(to top, ${surfaceTint(0.75)} 0%, ${surfaceTint(0.35)} 100%)`,
  fontFamily: fonts.cinzel,
  fontSize: '0.9rem',
  fontWeight: '700',
  letterSpacing: '0.06em',
  color: alphaColors.textBody,
  cursor: 'pointer',
  animation: `${tileAppear} 0.35s ease-out 0.4s both`,
  transition: 'all 0.3s ease-in-out',
  ':hover': {
    background: `linear-gradient(to top, ${surfaceTint(1)} 0%, ${surfaceTint(0.5)} 100%)`,
    color: colors.secondaryLight,
  },
});

export const logoutIcon = style({
  fontSize: '1.2rem',
});
