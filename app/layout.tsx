import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tedxvjcet.in"),
  title: "TEDx VJCET - Ideas Worth Spreading",
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
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased font-inter`}
      >
        {children}
      </body>
    </html>
  );
}
