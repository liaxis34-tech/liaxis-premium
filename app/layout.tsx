import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sansFont = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theliaxis.com"),
  title: "LIAXIS — Postür Toparlayıcı Sütyen",
  description:
    "LIAXIS Postür Toparlayıcı Sütyen ile duruşunuz zarafetle desteklenir. Premium, nefes alabilir kumaş ve görünmez konfor. Hemen keşfedin.",
  keywords: [
    "LIAXIS",
    "postür sütyeni",
    "postür toparlayıcı sütyen",
    "duruş düzeltici",
    "premium sütyen",
  ],
  openGraph: {
    title: "LIAXIS — Postür Toparlayıcı Sütyen",
    description:
      "Duruşunuzun zarif gücü. Premium postür toparlayıcı sütyen koleksiyonu.",
    locale: "tr_TR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1A1712",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${displayFont.variable} ${sansFont.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
