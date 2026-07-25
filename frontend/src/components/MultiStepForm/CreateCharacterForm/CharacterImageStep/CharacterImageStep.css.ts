import { style } from '@vanilla-extract/css';
import { colors, fonts } from '@/styles/tokens';

export const container = style({
  position: 'relative',
  width: '100%',
  height: 'calc(100vh - 4rem)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column',
  margin: '2rem',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  overflow: 'hidden',
});

export const content = style({
  position: 'relative',
  marginTop: '0.5rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
  zIndex: 10,
});

export const uploadRow = style({
  position: 'relative',
  width: '100%',
  marginTop: '0.5rem',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'flex-start',
});

export const imageLabel = style({
  position: 'relative',
  width: '185px',
  height: '308px',
  marginRight: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '0.125rem',
  background: 'rgba(235,190,82,0.1)',
  border: `2px solid ${colors.secondaryLight}`,
  outline: `1px solid ${colors.secondaryLight}`,
  outlineOffset: '2px',
  cursor: 'pointer',
});

export const placeholder = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  paddingBottom: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

export const placeholderIcon = style({
  position: 'relative',
  width: '100%',
  marginBottom: '0.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '3.75rem',
  fontFamily: fonts.poppins,
  fontWeight: '500',
  color: colors.secondaryLight,
});

export const placeholderText = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: fonts.poppins,
  fontWeight: '500',
  color: colors.secondaryLight,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
});

export const previewImg = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const previewOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  paddingBottom: '0.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(0,0,0,0.5)',
  color: colors.secondaryLight,
  fontWeight: '500',
  fontFamily: fonts.poppins,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  opacity: 0,
  transition: 'all 0.3s ease-out',
  ':hover': { opacity: 1 },
});

export const hiddenInput = style({ display: 'none' });

export const glassPanel = style({
  position: 'relative',
  width: '100%',
  maxWidth: '42rem',
  padding: '1rem',
  marginBottom: '0.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
  zIndex: 10,
  borderLeft: `8px solid ${colors.mainLight}`,
  borderRadius: '0.25rem',
});

export const helpTitle = style({
  position: 'relative',
  width: '100%',
  paddingBottom: '0.5rem',
  color: colors.mainLight,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontFamily: fonts.poppins,
  fontWeight: '600',
});

export const helpText = style({
  position: 'relative',
  marginBottom: '0.5rem',
  fontSize: '0.875rem',
  fontFamily: fonts.roboto,
  color: colors.white,
  letterSpacing: '0.025em',
});

export const highlight = style({ color: colors.mainHover });
export const highlightBold = style({ color: colors.mainHover, fontWeight: '500' });

export const moreLink = style({
  position: 'relative',
  padding: '0.25rem',
  marginBottom: '0.25rem',
  letterSpacing: '0.1em',
  fontFamily: fonts.poppins,
  fontWeight: '500',
  fontSize: '0.875rem',
  color: colors.secondaryMedium,
  textDecoration: 'none',
  transition: 'all 0.3s ease-in-out',
  ':hover': { color: colors.secondaryDark },
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 0,
      height: '0.125rem',
      background: colors.secondaryDark,
      transition: 'all 0.3s ease-in-out',
    },
    '&:hover::before': { width: '100%' },
  },
});
