import { NextRequest, NextResponse } from "next/server";
import { i18n } from './next-i18next.config'
const locales = i18n.locales;

function getLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')[0]
      .split('-')
      .join('-')
      .toLowerCase();

    for (const locale of locales) {
      if (locale.toLowerCase() === preferredLocale) {
        return locale;
      }
    }

    for (const locale of locales) {
      if (preferredLocale.startsWith(locale.split('-')[0].toLowerCase())) {
        return locale;
      }
    }
  }

  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}${search}`, request.url);

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|static|.*\\..*).*)',
  ],
}; 