import { NextRequest, NextResponse } from "next/server";
import { routing } from "./app/i18n/routing";

const locales = routing.locales;

function getLocale(request: NextRequest) {
  // Primeiro tenta obter do cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  // Se não houver cookie, tenta obter do Accept-Language
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')[0]
      .split('-')
      .join('-')
      .toLowerCase();

    // Tenta encontrar uma correspondência exata
    for (const locale of locales) {
      if (locale.toLowerCase() === preferredLocale) {
        return locale;
      }
    }

    // Tenta encontrar uma correspondência parcial
    for (const locale of locales) {
      if (preferredLocale.startsWith(locale.split('-')[0].toLowerCase())) {
        return locale;
      }
    }
  }

  return routing.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  
  // Ignorar arquivos estáticos e API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return;
  }

  // Verificar se o pathname já tem um locale válido
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirecionar se não houver locale
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}${search}`, request.url);
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Ignorar arquivos estáticos e API routes
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};