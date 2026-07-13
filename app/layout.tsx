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

const SEO_TITLE = "CHARMORA — Personalized Charm Jewelry | Wear Your Story";
const SEO_DESCRIPTION =
  "Build a charm combination that is uniquely yours. CHARMORA's customizable ear cuffs and jewelry let you wear the story of your love, dreams, new beginnings and memories — crafted with luxury materials, gift-ready and made to be treasured.";

export const metadata: Metadata = {
  metadataBase: new URL("https://charmora.com"),
  title: {
    default: SEO_TITLE,
    template: "%s | CHARMORA",
  },
  description: SEO_DESCRIPTION,
  keywords: [
    "CHARMORA",
    "personalized jewelry",
    "custom charm jewelry",
    "charm ear cuff",
    "build your own charm",
    "luxury jewelry gift",
  ],
  authors: [{ name: "CHARMORA" }],
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
    siteName: "CHARMORA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CHARMORA — Wear Your Story",
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
  themeColor: "#FFFFFF",
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
