'use client';

import { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function LanguageDetector() {
  const { i18n } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale as string;
  const isInitialized = useRef(false);

  // Sync locale from URL with i18n
  useEffect(() => {
    if (locale && locale !== i18n.language) {
      console.log('[LanguageDetector] Changing language from URL:', { from: i18n.language, to: locale });
      
      // Change language and wait for it to complete
      i18n.changeLanguage(locale).then(() => {
        console.log('[LanguageDetector] Language changed successfully to:', locale);
        // Save to localStorage for persistence
        localStorage.setItem('i18nextLng', locale);
        
        // Set cookie for server-side detection
        document.cookie = `i18nextLng=${locale}; path=/; max-age=31536000; SameSite=Lax`;
        
        isInitialized.current = true;
      }).catch((error) => {
        console.error('[LanguageDetector] Error changing language:', error);
      });
    } else if (locale && locale === i18n.language && !isInitialized.current) {
      // Already correct language, just mark as initialized
      isInitialized.current = true;
    }
  }, [locale, i18n]);

  // Update URL when language changes programmatically (from Navbar or other components)
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      if (lng !== locale && isInitialized.current) {
        console.log('[LanguageDetector] Language changed programmatically:', { from: locale, to: lng });
        const pathname = window.location.pathname;
        const currentLocale = pathname.split('/')[1];
        
        if (['pt-BR', 'en-US', 'es-ES'].includes(currentLocale)) {
          const newPathname = pathname.replace(`/${currentLocale}`, `/${lng}`);
          console.log('[LanguageDetector] Updating URL:', { from: pathname, to: newPathname });
          router.push(newPathname);
        }
      }
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [locale, i18n, router]);

  return null;
}
