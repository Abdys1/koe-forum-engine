export const colors = {
  mainLight: '#9F96FE',
  mainMedium: '#5C469C',
  mainHover: '#846dc9',
  darkText: '#111',
  darkBg: '#050826',
  blackBg: '#01020f',
  pageDarkBg: '#121315',
  cardBlackBg: '#191a1c',
  cardMediumBg: '#323438',
  darkBtn: '#434343',
  blackBorder: '#161616',
  lightBorder: '#7364f5',
  secondary: '#e7cf93',
  secondaryMedium: '#e6c575',
  secondaryDark: '#ebbe52',
  secondaryLight: '#fae7b9',
  white: '#ffffff',
  online: '#4ade80',
} as const;

export const fonts = {
  roboto: 'var(--font-roboto)',
  poppins: 'var(--font-poppins)',
  caveat: 'var(--font-caveat)',
  sumana: 'var(--font-sumana)',
  mrsSaintDelafield: 'var(--font-mrsSaintDelafield)',
  cinzel: 'var(--font-cinzel)',
  cinzelDecorative: 'var(--font-cinzelDecorative)',
  pirataOne: 'var(--font-pirataOne)',
} as const;

export const withAlpha = (hex: string, alpha: number) => {
  const value = parseInt(hex.slice(1), 16);
  return `rgba(${(value >> 16) & 255},${(value >> 8) & 255},${value & 255},${alpha})`;
};

export const alphaColors = {
  textMuted: withAlpha(colors.white, 0.6),
  textSoft: withAlpha(colors.white, 0.7),
  textBody: withAlpha(colors.white, 0.9),
  primaryTint: withAlpha(colors.mainLight, 0.12),
  primaryBorder: withAlpha(colors.mainLight, 0.18),
  primaryBorderMedium: withAlpha(colors.mainLight, 0.25),
  primaryBorderStrong: withAlpha(colors.mainLight, 0.35),
  primaryGlow: withAlpha(colors.mainMedium, 0.45),
  primaryTintSoft: withAlpha(colors.mainLight, 0.07),
  primaryAura: withAlpha(colors.mainLight, 0.35),
  pageDarkVeil: withAlpha(colors.pageDarkBg, 0.6),
  cardBlackVeil: withAlpha(colors.cardBlackBg, 0.6),
  secondaryGlow: withAlpha(colors.secondary, 0.25),
  secondaryBorder: withAlpha(colors.secondary, 0.45),
  blackVeil: 'rgba(0,0,0,0.3)',
} as const;

const glassShadow = '0 10px 30px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)';

export const shadows = {
  card: '0 4px 6px -1px rgba(0,0,0,0.4)',
  glass: glassShadow,
  glassHover: `0 14px 40px -12px ${alphaColors.primaryGlow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
  featured: `0 0 32px -12px ${alphaColors.primaryAura}, ${glassShadow}`,
  textStrong: '0 4px 12px rgba(0,0,0,0.8)',
  text: '0 2px 6px rgba(0,0,0,0.8)',
} as const;

const glassSurface = `linear-gradient(135deg, ${withAlpha(colors.mainLight, 0.08)} 0%, ${withAlpha(colors.cardBlackBg, 0.55)} 45%, ${withAlpha(colors.cardBlackBg, 0.7)} 100%)`;

export const gradients = {
  glassSurface,
  primaryFadeDown: `linear-gradient(to bottom, ${colors.mainLight} 0%, ${alphaColors.primaryBorderStrong} 40%, transparent 100%)`,
  primaryFadeRight: `linear-gradient(to right, ${alphaColors.primaryBorderStrong} 0%, ${withAlpha(colors.mainLight, 0.05)} 100%)`,
  blackVeilDown: `linear-gradient(to top, transparent, ${alphaColors.blackVeil})`,

  featuredSurface: [
    `radial-gradient(ellipse 80% 60% at 100% 0%, ${alphaColors.primaryTint} 0%, transparent 70%)`,
    `linear-gradient(to bottom, ${alphaColors.primaryTintSoft} 0%, ${withAlpha(colors.mainMedium, 0.1)} 100%)`,
    glassSurface,
  ].join(', '),
} as const;

export const media = {
  tablet: 'screen and (max-width: 1024px)',
  mobile: 'screen and (max-width: 640px)',
  motionOk: '(prefers-reduced-motion: no-preference)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
} as const;

export const transition = (properties: string[], duration = '0.3s') =>
  properties.map(property => `${property} ${duration} ease-in-out`).join(', ');

export const backdropBlur = (amount: string) => ({
  backdropFilter: `blur(${amount})`,
  WebkitBackdropFilter: `blur(${amount})`,
});
