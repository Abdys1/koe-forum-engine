import type { Metadata } from "next";
import "@/styles/global-styles.css";
import { Provider } from "@/components/Provider/Provider";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { roboto, poppins, sumana, caveat, mrsSaintDelafield, splash, pirataOne, cinzel, cinzelDecorative } from "@/app/fonts";
import 'material-icons/iconfont/material-icons.css';

export const metadata: Metadata = {
  title: "Key of Eternity",
  description: "Fórumos szerepjáték",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable} ${sumana.variable} ${caveat.variable} ${mrsSaintDelafield.variable} ${splash.variable} ${pirataOne.variable} ${cinzel.variable} ${cinzelDecorative.variable}`}>
        <Provider session={session}>{ children }</Provider>
      </body>
    </html>
  );
}
