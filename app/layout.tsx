import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verdhana AI — 12 AI Specialists for Marketers",
  description:
    "Generate high-converting ads, headlines, and copy in seconds. 12 specialized AI agents working for you 24/7.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
