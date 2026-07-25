import { style } from '@vanilla-extract/css';
import { colors, fonts } from '@/styles/tokens';

// Section 1 – Hero
export const heroSection = style({
  position: 'relative',
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundImage: 'url("/images/koe-bannerbg.png")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

export const heroNav = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingLeft: '6rem',
  paddingRight: '6rem',
  paddingTop: '2.5rem',
});

export const navList = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
});

export const heroContent = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  paddingLeft: '6rem',
  paddingRight: '6rem',
});

export const heroTextBox = style({
  position: 'relative',
  height: '100%',
  maxWidth: '35%',
  width: '35%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
});

export const heroTitleBox = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
});

export const heroSubTitle = style({
  position: 'relative',
  color: colors.white,
  fontSize: '3.5rem',
  marginLeft: '5.5rem',
  fontFamily: fonts.mrsSaintDelafield,
});

export const heroTitle = style({
  position: 'relative',
  color: colors.mainLight,
  fontSize: '8rem',
  lineHeight: '1em',
  fontFamily: fonts.mrsSaintDelafield,
});

export const heroTagline1 = style({
  color: colors.white,
  lineHeight: '1em',
  fontFamily: fonts.sumana,
});

export const heroTagline2 = style({
  color: colors.white,
  fontFamily: fonts.sumana,
});

export const heroCta = style({
  position: 'relative',
  width: '100%',
  marginTop: '1.5rem',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
});

export const ctaItem = style({ marginBottom: '1.5rem' });

// Section 2 – About
export const aboutSection = style({
  position: 'relative',
  width: '100%',
  height: '100vh',
  paddingTop: '2rem',
  paddingBottom: '2rem',
  paddingLeft: '6rem',
  paddingRight: '6rem',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  background: colors.blackBg,
});

export const aboutTitleWrap = style({
  position: 'relative',
  width: '100%',
  marginBottom: '4rem',
});

export const aboutContent = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const aboutText = style({
  position: 'relative',
  maxWidth: '40%',
  height: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
});

export const aboutPara = style({
  position: 'relative',
  marginBottom: '1.5rem',
  paddingLeft: '1rem',
});

export const aboutParaText = style({
  position: 'relative',
  color: colors.white,
  textAlign: 'left',
  lineHeight: '1.75rem',
  letterSpacing: '0.05em',
  fontFamily: fonts.sumana,
});

export const aboutLinks = style({ marginBottom: '1.5rem' });

export const aboutImages = style({
  position: 'relative',
  maxWidth: '40%',
  maxHeight: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
});

export const imgAbsTop = style({
  position: 'absolute',
  top: '-50%',
  left: '-50%',
  zIndex: 10,
});

export const imgRelative = style({ position: 'relative', zIndex: 20 });

export const imgAbsBottom = style({
  position: 'absolute',
  top: '60%',
  left: '-50%',
  zIndex: 30,
});

// Section 3 – World
export const worldSection = style({
  position: 'relative',
  width: '100%',
  height: '100vh',
  paddingTop: '2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundImage: 'url("/images/waterfalls.jpg")',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: colors.blackBg,
      opacity: 0.3,
      zIndex: 10,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '8rem',
      background: `linear-gradient(to top, transparent, ${colors.blackBg})`,
      zIndex: 20,
    },
  },
});

export const worldTitleWrap = style({
  position: 'relative',
  width: '100%',
  marginBottom: '4rem',
  zIndex: 30,
});

export const worldArrows = style({
  position: 'absolute',
  top: '40%',
  left: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: colors.white,
});

export const arrowLeft = style({
  fontSize: '4.5rem',
  opacity: 0.7,
  cursor: 'pointer',
  marginLeft: '2rem',
  zIndex: 50,
  ':hover': { opacity: 1 },
});

export const arrowRight = style({
  fontSize: '4.5rem',
  opacity: 0.7,
  cursor: 'pointer',
  marginRight: '2rem',
  zIndex: 50,
  ':hover': { opacity: 1 },
});

export const worldBottom = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  paddingTop: '2rem',
  paddingBottom: '2rem',
  paddingLeft: '6rem',
  paddingRight: '6rem',
  background: `linear-gradient(to top, ${colors.blackBg}, ${colors.mainLight})`,
});

export const worldThumbnails = style({
  position: 'absolute',
  top: '-8rem',
  paddingRight: '6rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

export const worldThumbBase = style({
  width: '7rem',
  height: '10rem',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '0.25rem',
  marginRight: '1rem',
  border: '1px solid rgba(255,255,255,0.8)',
  cursor: 'pointer',
  zIndex: 50,
  ':hover': { opacity: 0.8 },
});

export const worldThumb1 = style({
  backgroundImage: 'url("/images/world1.jpg")',
});

export const worldThumb2 = style({
  backgroundImage: 'url("/images/world2.jpg")',
  opacity: 0.6,
});

export const worldThumb3 = style({
  backgroundImage: 'url("/images/world3.jpg")',
  opacity: 0.6,
});

export const worldDescTitle = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginBottom: '0.5rem',
  color: colors.white,
  fontSize: '1.125rem',
  fontWeight: 'bold',
  fontFamily: fonts.caveat,
  letterSpacing: '0.025em',
  textTransform: 'uppercase',
});

export const worldDescText = style({
  color: colors.white,
  fontSize: '0.875rem',
});
