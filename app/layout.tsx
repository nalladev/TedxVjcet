import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code, Libre_Franklin } from "next/font/google";
import "./globals.css";
import { METADATA } from "./constants";

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
  metadataBase: new URL(METADATA.website),
  title: "TEDx VJCET",
  description: "TEDx VJCET is an independently organized TED event at Viswajyothi College of Engineering and Technology. Join us for inspiring talks and ideas worth spreading.",
  keywords: ["TEDx", "VJCET", "TED talks", "Viswajyothi College", "Engineering", "Technology", "Ideas worth spreading", "Innovation", "Kerala"],
  authors: [{ name: "TEDx VJCET Team" }],
  openGraph: {
    title: "TEDx VJCET - Ideas Worth Spreading",
    description: "TEDx VJCET is an independently organized TED event at Viswajyothi College of Engineering and Technology. Join us for inspiring talks and ideas worth spreading.",
    url: METADATA.website,
    siteName: "TEDx VJCET",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TEDx VJCET - Ideas Worth Spreading",
    description: "TEDx VJCET is an independently organized TED event at Viswajyothi College of Engineering and Technology.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "TEDx VJCET",
              "startDate": METADATA.date.toISOString(),
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "location": {
                "@type": "Place",
                "name": METADATA.venue,
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": METADATA.street,
                  "addressLocality": "Ernakulam",
                  "postalCode": "686670",
                  "addressRegion": "Kerala",
                  "addressCountry": "IN"
                }
              },
              "description": "TEDx VJCET is an independently organized TED event at Viswajyothi College of Engineering and Technology. Join us for inspiring talks and ideas worth spreading.",
              "organizer": {
                "@type": "Organization",
                "name": "TEDx VJCET",
                "url": METADATA.website,
                "logo": `${METADATA.website}/icon.svg`,
                "sameAs": [
                  METADATA.instagram,
                  METADATA.linkedin,
                ]
              },
              "url": METADATA.website,
            })
          }}
        />
        <meta name="google-site-verification" content="8fOJu7BjZP_ujxAy-HJl1ATfcZb3b-3dQ-ZUWkJI7xs" />
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
