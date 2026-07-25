import { style } from '@vanilla-extract/css';
import { colors, fonts } from '@/styles/tokens';

export const item = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

export const circle = style({
  position: 'relative',
  fontSize: '1.125rem',
  width: '2rem',
  height: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  borderRadius: '50%',
  fontFamily: fonts.roboto,
  zIndex: 10,
});

export const circleDone = style({
  color: colors.white,
  background: colors.mainHover,
});

export const circleActive = style({
  background: colors.mainHover,
  color: colors.cardBlackBg,
});

export const circleUnfinished = style({
  background: colors.cardMediumBg,
  color: colors.white,
});

export const label = style({
  position: 'absolute',
  top: '2.5rem',
  fontSize: '0.75rem',
  fontFamily: fonts.poppins,
  letterSpacing: '0.1em',
});

export const labelDone = style({ color: colors.white });
export const labelActive = style({ color: colors.mainHover });
export const labelUnfinished = style({ color: colors.white });
