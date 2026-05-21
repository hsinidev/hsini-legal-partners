import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hsini Legal Partners | Elite Corporate Counsel & Representation",
  description: "A premium, high-trust legal counsel and attorney portfolio at legal.hsini.dev. Ranging from high-stakes corporate disputes to private wealth, providing elite representation for high-net-worth clients.",
  metadataBase: new URL("https://legal.hsini.dev"),
  keywords: [
    "Hsini Legal Partners",
    "Elite Corporate Law",
    "High-Net-Worth Legal Counsel",
    "Intellectual Property Attorney",
    "Premium Representation",
    "Luxury Private Wealth Counsel"
  ],
  authors: [{ name: "Hsini Legal Partners", url: "https://legal.hsini.dev" }],
  creator: "Hsini Legal Partners",
  openGraph: {
    title: "Hsini Legal Partners | Elite Corporate Counsel & Representation",
    description: "Immersive Editorial Portfolio and Premium Legal Advocacy. Built with Architectural Restraint, conveying extreme trust and performance.",
    url: "https://legal.hsini.dev",
    siteName: "Hsini Legal Partners",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hsini Legal Partners | Elite Corporate Counsel",
    description: "Premium representation for elite legal advocate requirements.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-bg-light text-text-main font-sans antialiased selection:bg-secondary/15 selection:text-secondary">
        <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
