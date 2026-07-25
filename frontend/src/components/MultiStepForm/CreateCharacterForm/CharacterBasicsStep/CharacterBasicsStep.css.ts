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
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  zIndex: 10,
});

export const infoPanel = style({
  position: 'relative',
  width: '100%',
  maxWidth: '70%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
  marginRight: '3.5rem',
});

export const glassPanel = style({
  position: 'relative',
  width: '100%',
  padding: '1rem',
  margin: '1rem',
  marginTop: '0.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
  zIndex: 10,
  borderLeft: `8px solid ${colors.mainLight}`,
  borderRadius: '0.25rem',
});

export const nameRow = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

export const rulesRow = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexDirection: 'column',
});

export const rulesText = style({
  position: 'relative',
  marginBottom: '0.25rem',
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

export const sexRow = style({
  position: 'relative',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

export const sexLabel = style({
  position: 'relative',
  marginRight: '1rem',
  textAlign: 'start',
  color: colors.mainLight,
  fontSize: '0.875rem',
  fontFamily: fonts.poppins,
  fontWeight: '500',
  letterSpacing: '0.025em',
});
