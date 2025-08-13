'use client';

import { usePathname, useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  type?: 'website' | 'article' | 'app';
  noIndex?: boolean;
  structuredData?: any;
}

const BASE_URL = 'https://talktalk.com.br';

export function useSEO(): SEOConfig {
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'pt-BR';
  const { t, ready } = useTranslation();

  return useMemo(() => {
    if (!ready) {
      return {
        title: 'Talk-Talk!',
        description: '',
        keywords: [],
        type: 'website' as const,
        noIndex: false,
      };
    }

    // Extract the page path without locale
    const pathWithoutLocale = pathname.replace(/^\/[^\/]+/, '') || '/';

    // SEO configurations per page
    const seoConfigs: Record<string, Partial<SEOConfig>> = {
      '/': {
        title: t('seo.home.title', 'Talk-Talk! - Tradução em Tempo Real | Converse em Qualquer Idioma'),
        description: t(
          'seo.home.description',
          'Talk-Talk! é uma ferramenta de tradução via bate-papo em tempo real. Quebre barreiras linguísticas e comunique-se facilmente com pessoas de todo o mundo.'
        ),
        keywords: [
          'tradução em tempo real',
          'chat multilíngue',
          'comunicação global',
          'quebra barreiras linguísticas',
          'tradutor automático',
          'bate-papo internacional',
        ],
        type: 'website',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Talk-Talk!',
          applicationCategory: 'CommunicationApplication',
          operatingSystem: 'Web Browser',
          description: t('seo.home.description'),
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
        },
      },

      '/sobre': {
        title: t('seo.about.title', 'Sobre o Talk-Talk! - Ferramenta de Tradução em Tempo Real'),
        description: t(
          'seo.about.description',
          'Conheça o Talk-Talk!, a inovadora ferramenta de tradução em tempo real que conecta pessoas ao redor do mundo, quebrando barreiras linguísticas.'
        ),
        keywords: [
          'sobre talk-talk',
          'tradução automática',
          'ferramenta comunicação',
          'quebra barreiras idioma',
          'tecnologia tradução',
        ],
        type: 'article',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: t('seo.about.title'),
          description: t('seo.about.description'),
          url: `${BASE_URL}/${locale}/sobre`,
          mainEntity: {
            '@type': 'WebApplication',
            name: 'Talk-Talk!',
          },
        },
      },

      '/conversar': {
        title: t('seo.chat.title', 'Conversar - Talk-Talk! | Tradução em Tempo Real'),
        description: t(
          'seo.chat.description',
          'Inicie uma conversa com tradução em tempo real. Conecte-se com pessoas de qualquer lugar do mundo usando o Talk-Talk!'
        ),
        keywords: [
          'conversar online',
          'chat tradução',
          'bate-papo internacional',
          'comunicação tempo real',
          'chat multilíngue',
        ],
        type: 'app',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: t('seo.chat.title'),
          description: t('seo.chat.description'),
          url: `${BASE_URL}/${locale}/conversar`,
          isPartOf: {
            '@type': 'WebApplication',
            name: 'Talk-Talk!',
          },
        },
      },

      '/configuracoes': {
        title: t('seo.settings.title', 'Configurações - Talk-Talk!'),
        description: t(
          'seo.settings.description',
          'Personalize sua experiência no Talk-Talk!. Configure idiomas, temas e preferências de tradução.'
        ),
        keywords: ['configurações talk-talk', 'preferências tradução', 'personalizar chat', 'configurar idioma'],
        type: 'app',
        noIndex: false,
      },

      '/termos': {
        title: t('seo.terms.title', 'Termos de Uso - Talk-Talk!'),
        description: t(
          'seo.terms.description',
          'Leia os termos de uso e políticas de privacidade do Talk-Talk!. Entenda como protegemos sua privacidade.'
        ),
        keywords: ['termos de uso', 'política privacidade', 'talk-talk termos', 'condições uso'],
        type: 'article',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'TermsOfService',
          name: t('seo.terms.title'),
          description: t('seo.terms.description'),
          url: `${BASE_URL}/${locale}/termos`,
        },
      },
    };

    const isChatRoom = pathWithoutLocale.startsWith('/conversar/') && pathWithoutLocale !== '/conversar';

    if (isChatRoom) {
      return {
        title: t('seo.chatroom.title', 'Sala de Conversa - Talk-Talk!'),
        description: t('seo.chatroom.description', 'Sala de conversa privada com tradução em tempo real.'),
        keywords: [],
        type: 'app',
        noIndex: true,
      };
    }

    // Get configuration for current page or use default
    const config = seoConfigs[pathWithoutLocale] || seoConfigs['/'];

    const localeKeywords = {
      'pt-BR': ['talk-talk', 'tradução tempo real', 'chat português', 'brasil comunicação'],
      'en-US': ['talk-talk', 'real-time translation', 'english chat', 'global communication'],
      'es-ES': ['talk-talk', 'traducción tiempo real', 'chat español', 'comunicación global'],
    };

    return {
      title: config.title || 'Talk-Talk!',
      description: config.description || '',
      keywords: [...(config.keywords || []), ...(localeKeywords[locale] || localeKeywords['pt-BR'])],
      image: config.image,
      type: config.type || 'website',
      noIndex: config.noIndex || false,
      structuredData: config.structuredData,
    };
  }, [pathname, locale, t, ready]);
}

// Hook para páginas específicas
export function usePageSEO(pageType: 'home' | 'about' | 'chat' | 'settings' | 'terms' | 'chatroom'): SEOConfig {
  const params = useParams();
  const locale = (params?.locale as string) || 'pt-BR';
  const { t, ready } = useTranslation();

  return useMemo(() => {
    if (!ready) {
      return {
        title: 'Talk-Talk!',
        description: '',
        keywords: [],
        type: 'website' as const,
        noIndex: false,
      };
    }

    const configs: Record<string, SEOConfig> = {
      home: {
        title: t('seo.home.title', 'Talk-Talk! - Tradução em Tempo Real | Converse em Qualquer Idioma'),
        description: t(
          'seo.home.description',
          'Talk-Talk! é uma ferramenta de tradução via bate-papo em tempo real. Quebre barreiras linguísticas e comunique-se facilmente com pessoas de todo o mundo.'
        ),
        keywords: ['tradução tempo real', 'chat multilíngue', 'comunicação global'],
        type: 'website' as const,
        noIndex: false,
      },
      about: {
        title: t('seo.about.title', 'Sobre o Talk-Talk! - Ferramenta de Tradução em Tempo Real'),
        description: t(
          'seo.about.description',
          'Conheça o Talk-Talk!, a inovadora ferramenta de tradução em tempo real que conecta pessoas ao redor do mundo.'
        ),
        keywords: ['sobre talk-talk', 'tradução automática', 'ferramenta comunicação'],
        type: 'article' as const,
        noIndex: false,
      },
      chat: {
        title: t('seo.chat.title', 'Conversar - Talk-Talk! | Tradução em Tempo Real'),
        description: t(
          'seo.chat.description',
          'Inicie uma conversa com tradução em tempo real. Conecte-se com pessoas de qualquer lugar do mundo.'
        ),
        keywords: ['conversar online', 'chat tradução', 'bate-papo internacional'],
        type: 'app' as const,
        noIndex: false,
      },
      settings: {
        title: t('seo.settings.title', 'Configurações - Talk-Talk!'),
        description: t(
          'seo.settings.description',
          'Personalize sua experiência no Talk-Talk!. Configure idiomas, temas e preferências.'
        ),
        keywords: ['configurações', 'preferências tradução', 'personalizar'],
        type: 'app' as const,
        noIndex: false,
      },
      terms: {
        title: t('seo.terms.title', 'Termos de Uso - Talk-Talk!'),
        description: t('seo.terms.description', 'Leia os termos de uso e políticas de privacidade do Talk-Talk!.'),
        keywords: ['termos uso', 'política privacidade', 'condições'],
        type: 'article' as const,
        noIndex: false,
      },
      chatroom: {
        title: t('seo.chatroom.title', 'Sala de Conversa - Talk-Talk!'),
        description: t('seo.chatroom.description', 'Sala de conversa privada com tradução em tempo real.'),
        keywords: [],
        type: 'app' as const,
        noIndex: true,
      },
    };

    return configs[pageType] || configs.home;
  }, [pageType, t, ready]);
}
