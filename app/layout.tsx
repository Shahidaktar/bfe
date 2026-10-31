import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beyond Forever Earth - Luxury Travel Planners",
  description:
    "Bespoke luxury journeys, designed around you. Private luxury travel planned by dedicated travel specialists.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-800 font-sans selection:bg-[#c59b67]/25 selection:text-[#081726]">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
