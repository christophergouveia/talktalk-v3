import { createNavigation  } from 'next-intl/navigation';
 
export const routing = {
  locales: ['pt-BR', 'es-ES', 'en-US'],
  fallbackLng: {
    "pt": ["pt-BR"],
    "en": ["en-US"],
    "es": ["es-ES"],
    'default': ['pt-BR']
  },
  defaultLocale: 'pt-BR',
  localePrefix: 'always'
} as const;
 
export const { Link, redirect, usePathname, useRouter } = createNavigation ({ locales: routing.locales });