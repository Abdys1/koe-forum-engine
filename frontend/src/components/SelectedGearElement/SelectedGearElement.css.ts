import { style } from '@vanilla-extract/css';
import { colors, fonts } from '@/styles/tokens';

export const container = style({
  position: 'relative',
  width: '100%',
  marginBottom: '0.5rem',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
});

export const optionTitle = style({
  position: 'relative',
  width: '100%',
  color: colors.mainHover,
  fontFamily: fonts.poppins,
  fontWeight: '500',
  letterSpacing: '0.05em',
  fontSize: '0.875rem',
  textTransform: 'uppercase',
});

export const valueRow = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

export const gearTitle = style({
  position: 'relative',
  fontSize: '0.875rem',
  fontFamily: fonts.poppins,
  color: colors.white,
  letterSpacing: '0.1em',
});

export const clearBtn = style({
  position: 'relative',
  width: '1rem',
  height: '1rem',
  marginLeft: '0.5rem',
  padding: 0,
  justifyContent: 'center',
  alignItems: 'center',
  background: colors.secondary,
  borderRadius: '50%',
  fontFamily: fonts.poppins,
  fontSize: '0.75rem',
  fontWeight: '500',
  border: 'none',
  cursor: 'pointer',
  ':hover': {
    background: colors.secondaryMedium,
  },
});

export const clearBtnVisible = style({ display: 'flex' });
export const clearBtnHidden = style({ display: 'none' });
