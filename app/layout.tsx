import type { Metadata } from "next";
import { Unbounded, Manrope, Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";

const display = Unbounded({ subsets: ["latin", "cyrillic"], weight: ["500", "700", "800"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700", "800"], variable: "--font-body", display: "swap" });
const georgian = Noto_Sans_Georgian({ subsets: ["georgian"], weight: ["400", "600", "800"], variable: "--font-georgian", display: "swap" });

export const metadata: Metadata = {
  title: "ARGO RENT — Car rental in Batumi, delivered to your door",
  description: "Subaru AWD, Ford, Jeep — car rental in Batumi with free delivery to your hotel or the airport, full tank and remote paperwork. Rated 4.9 by 128 guests on Google.",
  openGraph: {
    title: "ARGO RENT — Car rental in Batumi",
    description: "Car rental in Batumi with free delivery, full tank and remote paperwork. Rated 4.9 on Google.",
    url: "https://argorent.vercel.app",
    siteName: "ARGO RENT",
    locale: "en_US",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${georgian.variable}`}>{children}</body>
    </html>
  );
}
