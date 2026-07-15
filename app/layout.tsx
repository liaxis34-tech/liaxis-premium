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

const SEO_TITLE = "Charmora — Gold & Silver Ear Cuffs | Wear Your Story";
const SEO_DESCRIPTION =
  "Charmora is a collection of gold and silver ear cuffs worn without a piercing — including the Signature Ear Cuff, customizable with charms for love, dreams, memories, and new beginnings.";

export const metadata: Metadata = {
  metadataBase: new URL("https://charmora.com"),
  title: {
    default: SEO_TITLE,
    template: "%s | Charmora",
  },
  description: SEO_DESCRIPTION,
  keywords: [
    "Charmora",
    "ear cuff",
    "gold ear cuff",
    "silver ear cuff",
    "charm ear cuff",
    "interchangeable charms",
    "no piercing ear cuff",
    "ear cuff collection",
  ],
  authors: [{ name: "Charmora" }],
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
    url: "https://charmora.com",
    siteName: "Charmora",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Charmora — Gold & Silver Ear Cuffs",
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
  themeColor: "#121110",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
