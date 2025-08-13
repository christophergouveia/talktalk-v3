import { MetadataRoute } from 'next';

const BASE_URL = 'https://talktalkchat.com.br';
const locales = ['pt-BR', 'en-US', 'es-ES'] as const;
const defaultLocale = 'pt-BR';

const pages = ['', 'sobre', 'termos', 'configuracoes', 'conversar'];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  sitemap.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
    alternates: {
      languages: {
        'pt-BR': `${BASE_URL}/pt-BR`,
        'en-US': `${BASE_URL}/en-US`,
        'es-ES': `${BASE_URL}/es-ES`,
      },
    },
  });

  pages.forEach((page) => {
    locales.forEach((locale) => {
      const url = page ? `${BASE_URL}/${locale}/${page}` : `${BASE_URL}/${locale}`;

      let priority = 0.8;
      let changeFrequency: 'daily' | 'weekly' | 'monthly' = 'weekly';

      if (page === '') {
        priority = 1.0;
        changeFrequency = 'daily';
      } else if (page === 'sobre') {
        priority = 0.9;
        changeFrequency = 'monthly';
      } else if (page === 'conversar') {
        priority = 0.9;
        changeFrequency = 'daily';
      } else if (page === 'configuracoes') {
        priority = 0.7;
        changeFrequency = 'monthly';
      } else if (page === 'termos') {
        priority = 0.6;
        changeFrequency = 'monthly';
      }

      const alternates: Record<string, string> = {};
      locales.forEach((altLocale) => {
        const altUrl = page ? `${BASE_URL}/${altLocale}/${page}` : `${BASE_URL}/${altLocale}`;
        alternates[altLocale] = altUrl;
      });

      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return sitemap;
}
