import { poppins } from "@/app/fonts";
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
        'testone': '#2fad7b',
        'brownMainLight': '#fff99b',
        'brownMainMedium': '#be8957',
        'brownMainHover': '#ffdc7f',
        'brownBlackBg': '#1b1c21',
        'brownCardBlackBg': '#191a1c',
        'brownDarkBtn': '#434343',
        'blackBorder': '#161616',
        'brownDarkBrown': '#2b2926'
      },
      spacing: {
        '17.5': '4.375rem'
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        poppins: ["var(--font-poppins)"],
        caveat: ["var(--font-caveat)"],
        sumana: ["var(--font-sumana)"],
        mrsSaintDelafield: ["var(--font-mrsSaintDelafield)"]
      }
    },
  },
  plugins: [],
};
export default config;
