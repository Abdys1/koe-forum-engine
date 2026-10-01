import { Caveat, Mrs_Saint_Delafield, Sumana, Poppins, Roboto, Splash, Pirata_One, Cinzel, Cinzel_Decorative } from "next/font/google";

export const mrsSaintDelafield = Mrs_Saint_Delafield({ weight: "400", subsets: ['latin'], variable: "--font-mrsSaintDelafield" });
export const sumana = Sumana({ weight: ["400", "700"], subsets: ['latin'], variable: "--font-sumana"});
export const caveat = Caveat({ subsets: ['latin'], variable: "--font-caveat"});
export const poppins = Poppins({weight: ["400", "500", "700"], subsets: ['latin'], variable: "--font-poppins"});
export const roboto = Roboto({weight: ["400", "500", "700"], subsets: ['latin'], variable: "--font-roboto"});
export const splash = Splash({weight: ["400"], subsets: ['latin'], variable: "--font-splash"});
export const pirataOne = Pirata_One({weight: ["400"], subsets: ['latin', 'latin-ext'], variable: "--font-pirataOne"});
export const cinzel = Cinzel({ subsets: ['latin'], variable: "--font-cinzel" });
export const cinzelDecorative = Cinzel_Decorative({weight: ["400", "700"], subsets: ['latin'], variable: "--font-cinzelDecorative"});