import { style } from '@vanilla-extract/css';

import { alphaColors, fonts } from '@/styles/tokens';

export const sectionLead = style({
  maxWidth: '36rem',
  fontFamily: fonts.poppins,
  fontSize: '1.05rem',
  lineHeight: 1.75,
  color: alphaColors.textBody,
});
