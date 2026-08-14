import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hsini Legal Partners | Elite Corporate Counsel & Representation",
  description: "A premium, high-trust legal counsel and attorney portfolio at low.hsini.dev. Ranging from high-stakes corporate disputes to private wealth, providing elite representation for high-net-worth clients.",
  metadataBase: new URL("https://low.hsini.dev"),
  keywords: [
    "Hsini Legal Partners",
    "Elite Corporate Law",
    "High-Net-Worth Legal Counsel",
    "Intellectual Property Attorney",
    "Premium Representation",
    "Luxury Private Wealth Counsel"
  ],
  authors: [{ name: "Hsini Legal Partners", url: "https://low.hsini.dev" }],
  creator: "Hsini Legal Partners",
  openGraph: {
    title: "Hsini Legal Partners | Elite Corporate Counsel & Representation",
    description: "Immersive Editorial Portfolio and Premium Legal Advocacy. Built with Architectural Restraint, conveying extreme trust and performance.",
    url: "https://low.hsini.dev",
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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-bg-light text-text-main font-sans antialiased selection:bg-secondary/15 selection:text-secondary">
        <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
