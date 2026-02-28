import "~/styles/globals.css";

import { type Metadata } from "next";
import { Comfortaa, Nunito_Sans } from "next/font/google";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Petite Care — My Baby Routine",
  description:
    "Get a personalized routine plan for your baby. Better sleep, organized feeding, confident parenting.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${comfortaa.variable} ${nunitoSans.variable}`}
    >
      <body className="min-h-screen bg-antique font-sans text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
