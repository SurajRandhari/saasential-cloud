import { Nova_Square, Oxanium } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from "@/components/ui/sonner"

const novaSquare = Nova_Square({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-nova-square",
  display: "swap",
  preload: true,
});

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-oxanium",
  display: "swap",
  preload: true,
});

// Keep your existing viewport and metadata exports
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0096ff' }
  ],
  colorScheme: 'light dark'
};

export const metadata = {
  metadataBase: new URL('https://saasentialcloud.com'),
  title: {
    default: "Saasential - Where Business Meets Innovation",
    template: "%s | Saasential"
  },
  description: "Transform your business with Saasential's comprehensive solutions. From software development to strategic consulting, we guide you from concept to continuous growth.",
  keywords: "business innovation, software development, digital transformation, strategic consulting, technology solutions, business growth",
  authors: [{ name: "Saasential Team" }],
  creator: "Saasential",
  publisher: "Saasential",
  openGraph: {
    title: "Saasential - Where Business Meets Innovation",
    description: "Transform your business with comprehensive solutions from software to strategy. Guiding you from concept to continuous growth.",
    url: "https://saasentialcloud.com",
    siteName: "Saasential",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Saasential - Business Innovation Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saasential - Where Business Meets Innovation",
    description: "Transform your business with comprehensive solutions from software to strategy.",
    images: ["/og-image.jpg"],
    creator: "@saasential",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  alternates: {
    canonical: "/",
  },
  category: "technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Performance optimizations */}
      
      </head>
      
      <body
        className={`${oxanium.variable} ${novaSquare.variable} font-oxanium antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Toaster position="top-right" />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}


