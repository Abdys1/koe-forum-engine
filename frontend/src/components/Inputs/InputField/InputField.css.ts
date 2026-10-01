import { style } from '@vanilla-extract/css';
import { colors, fonts } from '@/styles/tokens';

export const wrapper = style({
  position: 'relative',
  marginTop: '1rem',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: fonts.poppins,
});

export const wrapperDefault = style({ color: colors.secondary });
export const wrapperError = style({ color: 'rgb(239, 68, 68)' });

export const label = style({
  position: 'relative',
  marginBottom: '0.75rem',
  cursor: 'text',
  letterSpacing: '0.1em',
  fontFamily: fonts.poppins,
  fontWeight: '500',
  color: colors.white,
});

export const input = style({
  marginBottom: '1.5rem',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderRadius: '0.375rem',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
  paddingTop: '0.375rem',
  paddingBottom: '0.375rem',
  outline: 'none',
  background: 'rgba(25,26,28,0.1)',
  fontFamily: fonts.poppins,
  letterSpacing: '0.1em',
  color: colors.white,
  width: '100%',
});

export const inputDefault = style({
  borderColor: 'rgba(255,255,255,0.2)',
  ':focus': { borderColor: colors.secondary },
});

export const inputError = style({
  borderColor: 'rgb(239, 68, 68)',
  ':focus': { borderColor: 'rgb(239, 68, 68)' },
});

export const errorMsg = style({
  position: 'absolute',
  left: 0,
  bottom: 3,
  fontSize: '0.875rem',
  fontFamily: fonts.roboto,
});
