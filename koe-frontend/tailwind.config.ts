import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'mainLight': '#9F96FE',
        'mainMedium': '#5C469C',
        'mainHover': '#846dc9',
        'darkText': '#111',
        'darkBg': '#050826',
        'blackBg': '#01020f',
        'testone': '#2fad7b'
      },
      spacing: {
        '17.5': '4.375rem'
      }
    },
  },
  plugins: [],
};
export default config;
