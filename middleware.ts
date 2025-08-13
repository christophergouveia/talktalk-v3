import { NextRequest, NextResponse } from 'next/server';

const locales = ['pt-BR', 'en-US', 'es-ES'] as const;
const defaultLocale = 'pt-BR';

function getLocale(request: NextRequest): string {
  // Check URL for locale parameter
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) {
    return pathname.split('/')[1];
  }

  // Check cookie for saved locale
  const cookieLocale = request.cookies.get('i18nextLng')?.value;
  if (cookieLocale && locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(',')[0].split(';')[0].trim().toLowerCase();

    // Language mapping for generic codes
    const languageMap: Record<string, string> = {
      pt: 'pt-BR',
      'pt-pt': 'pt-BR',
      en: 'en-US',
      'en-gb': 'en-US',
      es: 'es-ES',
      'es-mx': 'es-ES',
    };

    // Try exact match first
    for (const locale of locales) {
      if (locale.toLowerCase() === preferredLocale) {
        return locale;
      }
    }

    // Try mapped language
    const mappedLanguage = languageMap[preferredLocale];
    if (mappedLanguage && locales.includes(mappedLanguage as any)) {
      return mappedLanguage;
    }

    // Try partial match (e.g., 'pt' matches 'pt-BR')
    for (const locale of locales) {
      if (preferredLocale.startsWith(locale.split('-')[0].toLowerCase())) {
        return locale;
      }
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    const newPathname = `/${locale}${pathname}`;

    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc.)
    '/((?!api|_next|_vercel|static|.*\\..*).*)',
  ],
};
