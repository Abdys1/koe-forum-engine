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

export const summaryRow = style({
  position: 'relative',
  width: '100%',
  marginTop: '0.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'row-reverse',
});

export const characterImg = style({
  position: 'relative',
  width: '185px',
  height: '308px',
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '0.125rem',
  background: 'rgba(255,255,255,0.02)',
  border: `2px solid ${colors.mainLight}`,
  outline: `1px solid ${colors.mainLight}`,
  outlineOffset: '2px',
  cursor: 'pointer',
});

export const characterImgEl = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 40,
});

export const glassPanel = style({
  position: 'relative',
  marginRight: '4rem',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '42rem',
  padding: '1rem',
  marginBottom: '0.5rem',
  zIndex: 10,
  borderLeft: `8px solid ${colors.mainLight}`,
  borderRadius: '0.25rem',
});

export const charInfo = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
});

export const charName = style({
  position: 'relative',
  marginBottom: '0.5rem',
  color: colors.mainLight,
  fontSize: '1.125rem',
  letterSpacing: '0.025em',
  fontFamily: fonts.poppins,
  fontWeight: '600',
});

export const charMeta = style({
  position: 'relative',
  minWidth: 'fit-content',
  marginBottom: '1rem',
  color: colors.white,
  fontSize: '0.875rem',
  fontFamily: fonts.poppins,
  fontWeight: '500',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
});

export const gearColumns = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginRight: '0.5rem',
});

export const gearColumn = style({
  position: 'relative',
  width: '100%',
  maxWidth: '50%',
  display: 'flex',
  flexDirection: 'column',
});
