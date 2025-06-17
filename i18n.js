import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(resourcesToBackend((language, namespace, callback) => {
    // Map 'pt' to 'pt-BR' to avoid missing translation files
    const mappedLanguage = language === 'pt' ? 'pt-BR' : language;
    
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
  }))
  .init({
    nonExplicitSupportedLngs: true,
    fallbackLng: 'pt-BR',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    // Add language detection configuration
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    }
  });

export default i18n;
