import { style } from '@vanilla-extract/css';
import { mainBg } from '@/styles/shared.css';
import { colors, fonts, media } from '@/styles/tokens';

export const page = style([mainBg, {
  width: '100%',
  minHeight: '100vh',
  padding: '1.5rem 1.5rem 3rem',
  '@media': {
    [media.mobile]: {
      padding: '1rem 1rem 2rem',
    },
  },
}]);

export const notFound = style({
  padding: '4rem 2rem',
  fontFamily: fonts.cinzel,
  textAlign: 'center',
  color: colors.white,
});
