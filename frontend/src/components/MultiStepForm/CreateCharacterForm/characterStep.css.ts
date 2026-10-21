import { style } from '@vanilla-extract/css';
import { alphaColors, fonts } from '@/styles/tokens';

export const stepContent = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.5rem',
  zIndex: 10,
});

export const stepIntro = style({
  maxWidth: '40rem',
  marginBottom: '1rem',
  fontFamily: fonts.poppins,
  fontSize: '0.9rem',
  lineHeight: 1.6,
  color: alphaColors.textBody,
});
