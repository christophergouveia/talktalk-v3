export const BASE_URL = 'https://talktalkchat.com.br';
export const SITE_NAME = 'Talk-Talk!';

export const locales = ['pt-BR', 'en-US', 'es-ES'] as const;
export type Locale = (typeof locales)[number];

export const defaultSEO = {
  titles: {
    'pt-BR': 'Talk-Talk! - Tradução em Tempo Real | Converse em Qualquer Idioma',
    'en-US': 'Talk-Talk! - Real-Time Translation | Chat in Any Language',
    'es-ES': 'Talk-Talk! - Traducción en Tiempo Real | Conversa en Cualquier Idioma',
  },
  descriptions: {
    'pt-BR':
      'Talk-Talk! é uma ferramenta de tradução via bate-papo em tempo real. Quebre barreiras linguísticas e comunique-se facilmente com pessoas de todo o mundo.',
    'en-US':
      'Talk-Talk! is a real-time chat translation tool. Break language barriers and communicate easily with people from around the world.',
    'es-ES':
      'Talk-Talk! es una herramienta de traducción de chat en tiempo real. Rompe las barreras del idioma y comunícate fácilmente con personas de todo el mundo.',
  },
  keywords: {
    'pt-BR': [
      'tradução em tempo real',
      'chat multilíngue',
      'comunicação global',
      'quebra barreiras linguísticas',
      'tradutor automático',
      'bate-papo internacional',
      'ferramenta de tradução',
      'talk-talk',
      'comunicação multilíngue',
      'tradução instantânea',
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
      'multilingual communication',
      'instant translation',
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
      'comunicación multilingüe',
      'traducción instantánea',
    ],
  },
};

export const pageSEO = {
  home: {
    'pt-BR': {
      title: 'Talk-Talk! - Tradução em Tempo Real | Página Inicial',
      description:
        'Página inicial do Talk-Talk! - A melhor ferramenta de tradução em tempo real para quebrar barreiras linguísticas e conectar pessoas.',
      keywords: ['página inicial', 'talk-talk início', 'ferramenta tradução'],
    },
    'en-US': {
      title: 'Talk-Talk! - Real-Time Translation | Home',
      description:
        'Talk-Talk! Home - The best real-time translation tool to break language barriers and connect people worldwide.',
      keywords: ['homepage', 'talk-talk home', 'translation tool'],
    },
    'es-ES': {
      title: 'Talk-Talk! - Traducción en Tiempo Real | Inicio',
      description:
        'Página de inicio de Talk-Talk! - La mejor herramienta de traducción en tiempo real para romper barreras idiomáticas.',
      keywords: ['página inicio', 'talk-talk inicio', 'herramienta traducción'],
    },
  },
  about: {
    'pt-BR': {
      title: 'Sobre o Talk-Talk! - Ferramenta de Tradução Inovadora',
      description:
        'Conheça a história e missão do Talk-Talk!. Descubra como nossa ferramenta revoluciona a comunicação global com tradução em tempo real.',
      keywords: ['sobre talk-talk', 'história', 'missão', 'equipe', 'inovação'],
    },
    'en-US': {
      title: 'About Talk-Talk! - Innovative Translation Tool',
      description:
        'Learn about Talk-Talk! history and mission. Discover how our tool revolutionizes global communication with real-time translation.',
      keywords: ['about talk-talk', 'history', 'mission', 'team', 'innovation'],
    },
    'es-ES': {
      title: 'Acerca de Talk-Talk! - Herramienta de Traducción Innovadora',
      description:
        'Conoce la historia y misión de Talk-Talk!. Descubre cómo nuestra herramienta revoluciona la comunicación global.',
      keywords: ['acerca talk-talk', 'historia', 'misión', 'equipo', 'innovación'],
    },
  },
  chat: {
    'pt-BR': {
      title: 'Conversar - Talk-Talk! | Iniciar Conversa com Tradução',
      description:
        'Comece a conversar agora com tradução em tempo real. Crie ou entre em salas de chat e conecte-se com pessoas do mundo todo.',
      keywords: ['conversar', 'chat', 'sala conversa', 'criar sala', 'entrar sala'],
    },
    'en-US': {
      title: 'Chat - Talk-Talk! | Start Translation Chat',
      description:
        'Start chatting now with real-time translation. Create or join chat rooms and connect with people worldwide.',
      keywords: ['chat', 'conversation', 'chat room', 'create room', 'join room'],
    },
    'es-ES': {
      title: 'Conversar - Talk-Talk! | Iniciar Chat con Traducción',
      description:
        'Comienza a conversar ahora con traducción en tiempo real. Crea o únete a salas de chat y conéctate con personas de todo el mundo.',
      keywords: ['conversar', 'chat', 'sala chat', 'crear sala', 'unirse sala'],
    },
  },
  settings: {
    'pt-BR': {
      title: 'Configurações - Talk-Talk! | Personalizar Experiência',
      description:
        'Personalize sua experiência no Talk-Talk!. Configure idiomas, temas, preferências de tradução e muito mais.',
      keywords: ['configurações', 'preferências', 'idiomas', 'temas', 'personalização'],
    },
    'en-US': {
      title: 'Settings - Talk-Talk! | Customize Experience',
      description:
        'Customize your Talk-Talk! experience. Configure languages, themes, translation preferences and more.',
      keywords: ['settings', 'preferences', 'languages', 'themes', 'customization'],
    },
    'es-ES': {
      title: 'Configuración - Talk-Talk! | Personalizar Experiencia',
      description:
        'Personaliza tu experiencia en Talk-Talk!. Configura idiomas, temas, preferencias de traducción y más.',
      keywords: ['configuración', 'preferencias', 'idiomas', 'temas', 'personalización'],
    },
  },
  terms: {
    'pt-BR': {
      title: 'Termos de Uso - Talk-Talk! | Políticas e Privacidade',
      description:
        'Leia nossos termos de uso, política de privacidade e condições de serviço do Talk-Talk!. Transparência e segurança em primeiro lugar.',
      keywords: ['termos uso', 'política privacidade', 'condições serviço', 'legal'],
    },
    'en-US': {
      title: 'Terms of Use - Talk-Talk! | Policies and Privacy',
      description:
        'Read our terms of use, privacy policy and service conditions for Talk-Talk!. Transparency and security first.',
      keywords: ['terms of use', 'privacy policy', 'service conditions', 'legal'],
    },
    'es-ES': {
      title: 'Términos de Uso - Talk-Talk! | Políticas y Privacidad',
      description:
        'Lee nuestros términos de uso, política de privacidad y condiciones de servicio de Talk-Talk!. Transparencia y seguridad primero.',
      keywords: ['términos uso', 'política privacidad', 'condiciones servicio', 'legal'],
    },
  },
};

export const structuredData = {
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    alternateName: 'TalkTalk',
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
      'Real-time translation',
      'Multiple languages support',
      'No registration required',
      'Free to use',
      'Secure communication',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      ratingCount: '150',
    },
  },

  faqPage: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'O Talk-Talk! é gratuito?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim! O Talk-Talk! é completamente gratuito para usar. Não cobramos nenhuma taxa pelos nossos serviços de tradução em tempo real.',
        },
      },
      {
        '@type': 'Question',
        name: 'Preciso criar uma conta para usar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Não! Uma das principais vantagens do Talk-Talk! é que você não precisa se cadastrar. Basta acessar, criar ou entrar em uma sala e começar a conversar.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quantos idiomas são suportados?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O Talk-Talk! suporta mais de 100 idiomas diferentes, incluindo os principais idiomas falados mundialmente como português, inglês, espanhol, francês, alemão, chinês, japonês e muitos outros.',
        },
      },
      {
        '@type': 'Question',
        name: 'As conversas são seguras?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim! Todas as conversas no Talk-Talk! são criptografadas e não são armazenadas permanentemente. Valorizamos sua privacidade e segurança.',
        },
      },
    ],
  },
};

export function generateHrefLangs(pathname: string): Record<string, string> {
  const hreflangs: Record<string, string> = {};

  locales.forEach((locale) => {
    const cleanPath = pathname.replace(/^\/[^\/]+/, '') || '';
    hreflangs[locale] = `${BASE_URL}/${locale}${cleanPath}`;
  });

  hreflangs['x-default'] = `${BASE_URL}/pt-BR${pathname.replace(/^\/[^\/]+/, '') || ''}`;

  return hreflangs;
}

export function generateCanonicalUrl(pathname: string, locale: string): string {
  return `${BASE_URL}${pathname}`;
}

export function isBlockedFromSEO(pathname: string): boolean {
  return pathname.match(/\/conversar\/[^\/]+$/) !== null;
}

export function getSEOConfig(page: keyof typeof pageSEO, locale: Locale) {
  return (
    pageSEO[page]?.[locale] || {
      title: defaultSEO.titles[locale] || defaultSEO.titles['pt-BR'],
      description: defaultSEO.descriptions[locale] || defaultSEO.descriptions['pt-BR'],
      keywords: defaultSEO.keywords[locale] || defaultSEO.keywords['pt-BR'],
    }
  );
}
