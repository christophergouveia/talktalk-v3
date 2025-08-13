'use client';

import { usePathname, useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article' | 'app';
  noIndex?: boolean;
  canonical?: string;
  structuredData?: any;
}

const BASE_URL = 'https://talktalkchat.com.br';

export default function SEOHead({
  title,
  description,
  keywords = [],
  image = '/images/talktalk-og-image.jpg',
  type = 'website',
  noIndex = false,
  canonical,
  structuredData,
}: SEOProps) {
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'pt-BR';
  const { t } = useTranslation();

  const defaultTitles = {
    'pt-BR': 'Talk-Talk! - Tradução em Tempo Real | Converse em Qualquer Idioma',
    'en-US': 'Talk-Talk! - Real-Time Translation | Chat in Any Language',
    'es-ES': 'Talk-Talk! - Traducción en Tiempo Real | Conversa en Cualquier Idioma',
  };

  const defaultDescriptions = {
    'pt-BR':
      'Talk-Talk! é uma ferramenta de tradução via bate-papo em tempo real. Quebre barreiras linguísticas e comunique-se facilmente com pessoas de todo o mundo.',
    'en-US':
      'Talk-Talk! is a real-time chat translation tool. Break language barriers and communicate easily with people from around the world.',
    'es-ES':
      'Talk-Talk! es una herramienta de traducción de chat en tiempo real. Rompe las barreras del idioma y comunícate fácilmente con personas de todo el mundo.',
  };

  const finalTitle = title || defaultTitles[locale] || defaultTitles['pt-BR'];
  const finalDescription = description || defaultDescriptions[locale] || defaultDescriptions['pt-BR'];
  const finalCanonical = canonical || `${BASE_URL}${pathname}`;
  const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  const defaultKeywords = {
    'pt-BR': [
      'tradução em tempo real',
      'chat multilíngue',
      'comunicação global',
      'quebra barreiras linguísticas',
      'tradutor automático',
      'bate-papo internacional',
      'ferramenta de tradução',
      'talk-talk',
    ],
    'en-US': [
      'real-time translation',
      'multilingual chat',
      'global communication',
      'language barriers',
      'automatic translator',
      'international chat',
      'translation tool',
      'talk-talk',
    ],
    'es-ES': [
      'traducción en tiempo real',
      'chat multilingüe',
      'comunicación global',
      'barreras idiomáticas',
      'traductor automático',
      'chat internacional',
      'herramienta de traducción',
      'talk-talk',
    ],
  };

  const finalKeywords = [...keywords, ...(defaultKeywords[locale] || defaultKeywords['pt-BR'])].join(', ');

  const alternates = [
    { locale: 'pt-BR', url: `${BASE_URL}/pt-BR${pathname.replace(/^\/[^\/]+/, '')}` },
    { locale: 'en-US', url: `${BASE_URL}/en-US${pathname.replace(/^\/[^\/]+/, '')}` },
    { locale: 'es-ES', url: `${BASE_URL}/es-ES${pathname.replace(/^\/[^\/]+/, '')}` },
  ];

  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Talk-Talk!',
    applicationCategory: 'CommunicationApplication',
    operatingSystem: 'Web Browser',
    description: finalDescription,
    url: BASE_URL,
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
    },
    featureList: [
      'Real-time translation',
      'Multiple languages support',
      'No registration required',
      'Free to use',
      'Secure communication',
    ],
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0.0',
    releaseNotes: 'Initial release with real-time translation capabilities',
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Head>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="language" content={locale} />
      <meta name="author" content="Kaike da Silva Sathler, Christopher Rodrigues Gouveia, Gustavo Gomes Preti" />

      <link rel="canonical" href={finalCanonical} />

      {alternates.map((alt) => (
        <link key={alt.locale} rel="alternate" hrefLang={alt.locale} href={alt.url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/pt-BR${pathname.replace(/^\/[^\/]+/, '')}`} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content="Talk-Talk! - Tradução em Tempo Real" />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:locale" content={locale.replace('-', '_')} />
      <meta property="og:site_name" content="Talk-Talk!" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content="Talk-Talk! - Tradução em Tempo Real" />

      <meta name="application-name" content="Talk-Talk!" />
      <meta name="apple-mobile-web-app-title" content="Talk-Talk!" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#2563eb" />

      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData),
        }}
      />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    </Head>
  );
}
