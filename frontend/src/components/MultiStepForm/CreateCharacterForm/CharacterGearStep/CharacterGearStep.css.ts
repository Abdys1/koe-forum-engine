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

export const gearRow = style({
  position: 'relative',
  marginTop: '0.5rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

export const selectorPanel = style({
  position: 'relative',
  width: '100%',
  maxWidth: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
});

export const optionBtns = style({
  position: 'relative',
  marginRight: '0.5rem',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
});

export const summaryPanel = style({
  position: 'relative',
  width: '100%',
  maxWidth: '50%',
  marginLeft: '3rem',
  marginRight: '0.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
});

export const glassPanel = style({
  position: 'relative',
  width: '100%',
  maxWidth: '36rem',
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

export const gearSummaryTitle = style({
  position: 'relative',
  width: '100%',
  paddingBottom: '0.5rem',
  color: colors.mainLight,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontFamily: fonts.poppins,
  fontWeight: '600',
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
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
});
