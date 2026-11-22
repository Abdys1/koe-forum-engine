import "@/styles/global-styles.css";
import 'material-icons/iconfont/material-icons.css';

import type { Metadata } from "next";

import { caveat, cinzel, cinzelDecorative,mrsSaintDelafield, pirataOne, poppins, roboto, splash, sumana } from "@/app/fonts";
import Footer from "@/components/Main/Footer";
import Header from "@/components/Navigation/Header";
import SidebarPanel from "@/components/Navigation/SidebarPanel";
import { Provider } from "@/components/Provider/Provider";
import { getOwnCharacters } from "@/features/character/queries/getOwnCharacters";
import { auth } from "@/lib/auth/auth";
import { socialLinks } from "@/lib/socialLinks";

import * as styles from "./layout.css";

export const metadata: Metadata = {
  title: "Gloamfall",
  description: "Fórumos szerepjáték",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [session, characters] = await Promise.all([auth(), getOwnCharacters()]);
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable} ${sumana.variable} ${caveat.variable} ${mrsSaintDelafield.variable} ${splash.variable} ${pirataOne.variable} ${cinzel.variable} ${cinzelDecorative.variable}`}>
        <Provider session={session}>
          <Header />
          <div className={styles.body}>
            <SidebarPanel characters={characters} />
            <div className={styles.content}>{ children }</div>
          </div>
          <Footer socialLinks={socialLinks} />
        </Provider>
      </body>
    </html>
  );
}
