import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://verdhanaai.com"),
  title: {
    default: "Verdhana AI — 12 AI specialists for marketers",
    template: "%s · Verdhana AI",
  },
  description:
    "AI marketing copy that doesn't sound like AI. Facebook ads, TikTok scripts, email campaigns, landing pages, and 8 more — built for marketers who want copy that converts.",
  keywords: [
    "AI copywriter",
    "AI marketing tool",
    "Facebook ads writer",
    "TikTok script generator",
    "email marketing AI",
    "landing page copywriter",
    "AI copywriting",
    "marketing automation",
  ],
  authors: [{ name: "Verdhana AI" }],
  creator: "Verdhana AI",
  publisher: "Verdhana AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://verdhanaai.com",
    siteName: "Verdhana AI",
    title: "Verdhana AI — 12 AI specialists for marketers",
    description:
      "AI marketing copy that doesn't sound like AI. Built for marketers who want copy that converts.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verdhana AI — 12 AI specialists for marketers",
    description: "AI marketing copy that doesn't sound like AI.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#7c3aed",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
