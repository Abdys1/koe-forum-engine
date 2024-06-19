import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components/Provider";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { roboto, poppins, sumana, caveat, mrsSaintDelafield } from "@/app/fonts";

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
      <body className={`${roboto.variable} ${poppins.variable} ${sumana.variable} ${caveat.variable} ${mrsSaintDelafield.variable}`}>
        <Provider session={session}>{ children }</Provider>
      </body>
    </html>
  );
}
