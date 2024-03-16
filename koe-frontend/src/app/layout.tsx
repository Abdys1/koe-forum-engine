import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Key of Eternity",
  description: "Fórumos szerepjáték",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{ children }</body>
    </html>
  );
}
