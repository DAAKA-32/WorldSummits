import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://worldsummits.com'),
  title: {
    default: 'WorldSummits - Explore the Highest Peaks on Earth',
    template: '%s | WorldSummits'
  },
  description: 'Discover, explore and conquer the world\'s highest peaks. Complete mountain data, expedition planning, real-time weather, and interactive 3D views for climbers and adventurers.',
  keywords: [
    'mountain climbing',
    'highest peaks',
    'mountaineering',
    'expedition planning',
    'Mount Everest',
    'K2',
    '8000m peaks',
    'alpine climbing',
    'mountain weather',
    'summit expedition',
    'mountain comparator',
    'climbing guide',
    'world summits',
    'mountain data'
  ],
  authors: [{ name: 'WorldSummits Team' }],
  creator: 'WorldSummits',
  publisher: 'WorldSummits',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_FR', 'es_ES', 'de_DE', 'pt_PT'],
    url: 'https://worldsummits.com',
    siteName: 'WorldSummits',
    title: 'WorldSummits - Explore the Highest Peaks on Earth',
    description: 'Discover, explore and conquer the world\'s highest peaks. Complete mountain data, expedition planning, and real-time weather.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WorldSummits - Mountain Explorer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WorldSummits - Explore the Highest Peaks on Earth',
    description: 'Discover, explore and conquer the world\'s highest peaks. Complete mountain data and expedition planning.',
    images: ['/og-image.jpg'],
    creator: '@worldsummits',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://worldsummits.com',
    languages: {
      'en': 'https://worldsummits.com/en',
      'fr': 'https://worldsummits.com/fr',
      'es': 'https://worldsummits.com/es',
      'de': 'https://worldsummits.com/de',
      'pt': 'https://worldsummits.com/pt',
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WorldSummits',
    description: 'Discover, explore and conquer the world\'s highest peaks',
    url: 'https://worldsummits.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://worldsummits.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'WorldSummits',
      url: 'https://worldsummits.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://worldsummits.com/logo.png'
      }
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
