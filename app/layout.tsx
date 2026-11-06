import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import TawkChat from "./components/TawkChat";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://airport.safarisoul.africa"),
  title: "Kenya & Uganda Airport Transfers | SafariSoul",
  description:
    "Book airport transfers from JKIA in Nairobi and Entebbe with SafariSoul. Choose your vehicle, calculate Kenya fares, or request a custom quote for Uganda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${manrope.className} bg-background text-on-surface antialiased selection:bg-[#e5a910] selection:text-black`}
      >
        {children}
        <TawkChat />
      </body>
    </html>
  );
}



