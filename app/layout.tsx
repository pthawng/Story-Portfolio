import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Story Portfolio — An Interactive Experience",
  description:
    "A scene-driven, non-linear portfolio exploring how I think, build, and create. Not a resume — a story.",
  keywords: ["portfolio", "interactive", "story", "frontend engineer", "developer"],
  authors: [{ name: "Portfolio Author" }],
  openGraph: {
    title: "Story Portfolio — An Interactive Experience",
    description: "Not a resume. A story.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070711",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body 
        className="h-full antialiased overflow-hidden bg-[#070711]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
