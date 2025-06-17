import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

// Define supported languages
const supportedLanguages = ['pt-BR', 'en-US', 'es-ES'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(resourcesToBackend((language, namespace, callback) => {
    // Normalize language code
    let mappedLanguage = language;
    
    // Map common language variations
    if (language === 'pt' || language === 'pt-PT') {
      mappedLanguage = 'pt-BR';
    } else if (language === 'en' || language === 'en-GB') {
      mappedLanguage = 'en-US';
    } else if (language === 'es' || language === 'es-MX') {
      mappedLanguage = 'es-ES';
    } else if (!supportedLanguages.includes(language)) {
      mappedLanguage = 'pt-BR'; // Default fallback
    }
    
    import(`./app/locales/${mappedLanguage}/${namespace}.json`)
      .then((resources) => {
        callback(null, resources)
      })
      .catch((error) => {
        console.log(`Error loading translation for ${mappedLanguage}/${namespace}:`, error)
        // Fallback to pt-BR if the requested language fails
        if (mappedLanguage !== 'pt-BR') {
          import(`./app/locales/pt-BR/${namespace}.json`)
            .then((resources) => {
              callback(null, resources)
            })
            .catch((fallbackError) => {
              console.log('Fallback to pt-BR also failed:', fallbackError)
              callback(fallbackError, null)
            })
        } else {
          callback(error, null)
        }
      })
  }))  .init({
    lng: 'pt-BR', // Set default language
    fallbackLng: 'pt-BR',
    supportedLngs: supportedLanguages,
    nonExplicitSupportedLngs: false,
    debug: process.env.NODE_ENV === 'development', // Enable debug in development
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
    },
    react: {
      useSuspense: false, // Prevent hydration issues
      bindI18n: 'languageChanged loaded', // Bind to both events
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '', // Return empty string for empty trans
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
    }
  });

export default i18n;
