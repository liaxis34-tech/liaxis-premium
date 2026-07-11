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

const SEO_TITLE = "LIAXIS — Postür Toparlayıcı Sütyen | Duruşunuzun Zarif Gücü";
const SEO_DESCRIPTION =
  "LIAXIS Postür Toparlayıcı Sütyen ile duruşunuz zarafetle desteklenir. Nefes alabilir premium kumaş, görünmez konfor ve gün boyu omurga desteği. Şimdi keşfedin.";

export const metadata: Metadata = {
  metadataBase: new URL("https://theliaxis.com"),
  title: {
    default: SEO_TITLE,
    template: "%s | LIAXIS",
  },
  description: SEO_DESCRIPTION,
  keywords: [
    "LIAXIS",
    "postür sütyeni",
    "postür toparlayıcı sütyen",
    "duruş düzeltici",
    "premium sütyen",
    "duruş sütyeni",
  ],
  authors: [{ name: "LIAXIS" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: "https://theliaxis.com",
    siteName: "LIAXIS",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LIAXIS — Postür Toparlayıcı Sütyen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: ["/og-image.png"],
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
