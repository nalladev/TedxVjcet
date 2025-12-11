import type { Metadata } from "next";
import { Inter, Fira_Code, Libre_Franklin } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tedxvjcet.in"),
  title: "TEDx VJCET",
  description: "TEDx VJCET is an independently organized TED event at Viswajyothi College of Engineering and Technology. Join us for inspiring talks and ideas worth spreading.",
  keywords: ["TEDx", "VJCET", "TED talks", "Viswajyothi College", "Engineering", "Technology", "Ideas worth spreading", "Innovation", "Kerala"],
  authors: [{ name: "TEDx VJCET Team" }],
  openGraph: {
    title: "TEDx VJCET - Ideas Worth Spreading",
    description: "TEDx VJCET is an independently organized TED event at Viswajyothi College of Engineering and Technology. Join us for inspiring talks and ideas worth spreading.",
    url: "https://www.tedxvjcet.in",
    siteName: "TEDx VJCET",
    images: [
      {
        url: "/tedx/logo-black.png",
        width: 1200,
        height: 630,
        alt: "TEDx VJCET Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TEDx VJCET - Ideas Worth Spreading",
    description: "TEDx VJCET is an independently organized TED event at Viswajyothi College of Engineering and Technology.",
    images: ["/tedx/logo-black.png"],
  },
  icons: {
    icon: "/tedx/logo-black.png",
    apple: "/tedx/logo-black.png",
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
        {/* Preconnect to external origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body
        className={`${inter.variable} ${firaCode.variable} ${libreFranklin.variable} antialiased`}
      >
        {/* Skip Navigation Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#e62b1e] focus:text-white focus:px-4 focus:py-2 focus:rounded focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
