import { style } from '@vanilla-extract/css';
import { colors, fonts } from '@/styles/tokens';

export const btn = style({
  position: 'relative',
  width: '9rem',
  paddingTop: '0.25rem',
  paddingBottom: '0.25rem',
  marginLeft: '0.5rem',
  marginRight: '0.5rem',
  borderStyle: 'solid',
  borderWidth: '2px',
  borderRadius: '0.25rem',
  letterSpacing: '0.05em',
  fontFamily: fonts.poppins,
  fontWeight: '500',
  transition: 'all 0.5s ease-in-out',
  cursor: 'pointer',
});

export const btnEnabled = style({
  display: 'inline-block',
  borderColor: colors.white,
  background: colors.white,
  color: colors.darkText,
  ':hover': {
    color: colors.mainMedium,
    letterSpacing: '0.1em',
  },
});

export const btnDisabled = style({
  display: 'inline-block',
  borderColor: colors.white,
  background: 'rgba(0,0,0,0.3)',
  color: colors.white,
  cursor: 'default',
});
