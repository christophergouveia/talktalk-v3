import { createNavigation  } from 'next-intl/navigation';
 
export const routing = {
  locales: ['pt-BR', 'es-ES', 'en-US'],
  defaultLocale: 'pt-BR',
  localePrefix: 'always'
} as const;
 
export const { Link, redirect, usePathname, useRouter } = createNavigation ({ locales: routing.locales });