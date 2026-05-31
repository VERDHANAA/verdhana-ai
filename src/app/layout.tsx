import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Verdhana AI — 12 AI Marketing Specialists",
  description: "Platform AI marketing terlengkap dengan 12 spesialis AI siap membantu bisnis Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full flex flex-col font-[var(--font-space-grotesk)] bg-[#FFFAF3] text-black antialiased">
        {children}
      </body>
    </html>
  );
}
