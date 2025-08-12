import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CookieConsetimentModal from './components/modal/ModalConsetiment';
import { FontSizeProvider } from './contexts/FontSizeContext';

const inter = Inter({ subsets: ['latin'] });

const BASE_URL = 'https://talktalkchat.com.br';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Talk-Talk! - Tradução em Tempo Real | Converse em Qualquer Idioma',
    template: '%s | Talk-Talk!',
  },
  description:
    'Talk-Talk! é uma ferramenta de tradução via bate-papo em tempo real. Quebre barreiras linguísticas e comunique-se facilmente com pessoas de todo o mundo.',
  keywords: [
    'tradução em tempo real',
    'chat multilíngue',
    'comunicação global',
    'quebra de barreiras linguísticas',
    'tradutor automático',
    'bate-papo internacional',
    'ferramenta de tradução',
    'talk-talk',
    'comunicação multilíngue',
    'tradução instantânea',
    'chat internacional',
    'conversa tempo real',
  ],
  authors: [
    { name: 'Kaike da Silva Sathler', url: 'http://lattes.cnpq.br/2952383935652833' },
    { name: 'Christopher Rodrigues Gouveia', url: 'http://lattes.cnpq.br/3214554816480546' },
    { name: 'Gustavo Gomes Preti' },
  ],
  creator: 'Talk-Talk! Team',
  publisher: 'Talk-Talk!',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'Communication',
  classification: 'Translation Tool',

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
    locale: 'pt_BR',
    alternateLocale: ['en_US', 'es_ES'],
    siteName: 'Talk-Talk!',
    title: 'Talk-Talk! - Tradução em Tempo Real | Converse em Qualquer Idioma',
    description:
      'Talk-Talk! é uma ferramenta de tradução via bate-papo em tempo real. Quebre barreiras linguísticas e comunique-se facilmente com pessoas de todo o mundo.',
    url: BASE_URL,
    images: [
      {
        url: '/images/talktalk-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Talk-Talk! - Tradução em Tempo Real Preview',
        type: 'image/jpeg',
      },
      {
        url: '/images/talktalk-logo.png',
        width: 800,
        height: 400,
        alt: 'Talk-Talk! Logo',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@talktalk',
    creator: '@talktalk',
    title: 'Talk-Talk! - Tradução em Tempo Real',
    description: 'Ferramenta de tradução via bate-papo em tempo real para comunicação global',
    images: {
      url: '/images/talktalk-twitter-image.jpg',
      alt: 'Talk-Talk! - Tradução em Tempo Real',
    },
  },

  applicationName: 'Talk-Talk!',
  referrer: 'origin-when-cross-origin',

  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      'pt-BR': `${BASE_URL}/pt-BR`,
      'en-US': `${BASE_URL}/en-US`,
      'es-ES': `${BASE_URL}/es-ES`,
    },
  },

  appLinks: {
    web: {
      url: BASE_URL,
      should_fallback: true,
    },
  },

  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Talk-Talk!',
    'application-name': 'Talk-Talk!',
    'msapplication-TileColor': '#2563eb',
    'msapplication-config': '/favicon/browserconfig.xml',
    'theme-color': '#2563eb',
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#2563eb" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Talk-Talk!',
              alternateName: 'TalkTalk',
              description: 'Ferramenta de tradução via bate-papo em tempo real para comunicação global',
              url: BASE_URL,
              applicationCategory: 'CommunicationApplication',
              operatingSystem: 'Web Browser',
              browserRequirements: 'Requires JavaScript. Requires HTML5.',
              softwareVersion: '1.0.0',
              dateCreated: '2024',
              author: [
                {
                  '@type': 'Person',
                  name: 'Kaike da Silva Sathler',
                  url: 'http://lattes.cnpq.br/2952383935652833',
                },
                {
                  '@type': 'Person',
                  name: 'Christopher Rodrigues Gouveia',
                  url: 'http://lattes.cnpq.br/3214554816480546',
                },
                {
                  '@type': 'Person',
                  name: 'Gustavo Gomes Preti',
                },
              ],
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'BRL',
                availability: 'https://schema.org/InStock',
              },
              featureList: [
                'Tradução em tempo real',
                'Suporte a múltiplos idiomas',
                'Não requer cadastro',
                'Gratuito para usar',
                'Comunicação segura',
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                bestRating: '5',
                ratingCount: '150',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <FontSizeProvider>
          <Providers>
            <CookieConsetimentModal />
            <div className="flex flex-col min-h-screen">
              <header>
                <NavBar />
              </header>
              <main className="flex-1">{children}</main>
              <Footer className="mt-auto" />
            </div>
          </Providers>
        </FontSizeProvider>
      </body>
    </html>
  );
}
