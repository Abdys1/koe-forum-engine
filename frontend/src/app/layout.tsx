import type { Metadata } from "next";
import "@/styles/global-styles.css";
import { Provider } from "@/components/Provider/Provider";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import Footer from "@/components/Main/Footer";
import Header from "@/components/Navigation/Header";
import Sidebar from "@/components/Navigation/Sidebar";
import { socialLinks } from "@/lib/socialLinks";
import * as styles from "./layout.css";
import { roboto, poppins, sumana, caveat, mrsSaintDelafield, splash, pirataOne, cinzel, cinzelDecorative } from "@/app/fonts";
import 'material-icons/iconfont/material-icons.css';

export const metadata: Metadata = {
  title: "Gloamfall",
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
        <Provider session={session}>
          <Header />
          <div className={styles.body}>
            <Sidebar />
            <div className={styles.content}>{ children }</div>
          </div>
          <Footer socialLinks={socialLinks} />
        </Provider>
      </body>
    </html>
  );
}
