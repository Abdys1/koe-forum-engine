import { Caveat, Mrs_Saint_Delafield, Sumana, Poppins, Roboto } from "next/font/google";

export const mrsSaintDelafield = Mrs_Saint_Delafield({ weight: "400", subsets: ['latin'], variable: "--font-mrsSaintDelafield" });
export const sumana = Sumana({ weight: ["400", "700"], subsets: ['latin'], variable: "--font-sumana"});
export const caveat = Caveat({ subsets: ['latin'], variable: "--font-caveat"});
export const poppins = Poppins({weight: ["400", "500", "700"], subsets: ['latin'], variable: "--font-poppins"});
export const roboto = Roboto({weight: ["400", "500", "700"], subsets: ['latin'], variable: "--font-roboto"});