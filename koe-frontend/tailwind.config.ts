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
        'cardBlackBg': '#191a1c',
        'cardMediumBg': '#323438',
        'darkBtn': '#434343',
        'blackBorder': '#161616',
        'lightBorder': '#7364f5'
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
