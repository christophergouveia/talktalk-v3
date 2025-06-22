'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IoIosMoon } from 'react-icons/io';
import { IoLanguage, IoMenu, IoSunny } from 'react-icons/io5';
import { useTheme } from 'next-themes';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import LogoSite from '/public/images/icon/logo.png';
import { CountryFlag } from '../countryFlags';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { IoSettingsSharp } from "react-icons/io5";

import { motion } from 'framer-motion';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

interface NavbarItem {
  name: string;
  href: string;
}

export default function NavBar() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale as string || 'pt-BR';
  const theme = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<NavbarItem | null>(null);
  const [languageKey, setLanguageKey] = useState(0); // Force re-render key

  useEffect(() => setHasMounted(true), []);

  const { t, ready, i18n } = useTranslation('', { keyPrefix: 'navbar' });
  
  // Force component re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguageKey(prev => prev + 1);
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);
  
  const listaItems = useMemo<NavbarItem[]>(
    () => {
      // Prevent hydration mismatch by using fallback values until translations are ready
      if (!ready || !hasMounted) {
        return [
          {
            name: 'Início',
            href: `/${locale}`,
          },
          {
            name: 'Sobre',
            href: `/${locale}/sobre`,
          },
          {
            name: 'Conversar',
            href: `/${locale}/conversar`,
          },
        ];
      }
      
      return [
        {
          name: t('pagina_inicial'),
          href: `/${locale}`,
        },
        {
          name: t('sobre_ferramenta'),
          href: `/${locale}/sobre`,
        },
        {
          name: t('conversar'),
          href: `/${locale}/conversar`,      },
      ];
    },
    [t, locale, ready, hasMounted, languageKey]
  );

  const toggleTheme = useCallback(() => {
    theme.setTheme(theme.resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [theme]);

  const isActiveLink = useCallback(
    (href: string) => {
      return pathname === href;
    },
    [pathname]
  );

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);
  
  useEffect(() => {
    const currentItem = listaItems.find((item) => isActiveLink(item.href));
    setActiveItem(currentItem || null);
  }, [pathname, isActiveLink, listaItems, locale]);

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md dark:bg-gray-900/80 h-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href={`/${locale}`}>
                <Image src={LogoSite.src} width={48} height={48} alt="Logo" priority className="w-12 h-12" />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8 relative">
              {listaItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}                  className={`relative text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors
                    ${isActiveLink(item.href) ? '!text-primary-600' : ''}`}
                >
                  {item.name}
                  {isActiveLink(item.href) && (                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-[-20px] left-0 right-0 h-0.5 bg-primary-600"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {hasMounted && (
                <>
                  <button
                    onClick={toggleTheme}
                    aria-label={theme.resolvedTheme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
                    className="p-1.5 rounded-full text-gray-600 hover:bg-primary-100 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-primary-900 dark:hover:text-primary-400 transition-colors"
                  >
                    {theme.resolvedTheme === 'dark' ? <IoIosMoon size={18} /> : <IoSunny size={18} />}
                  </button>
                  <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-700" />                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visitar GitHub"
                    className="hidden sm:block p-1.5 rounded-full text-gray-600 hover:bg-primary-100 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-primary-900 dark:hover:text-primary-400 transition-colors"
                  >
                    <FaGithub size={18} />
                  </a>
                  <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-700" />                  <Link
                    href={`/${locale}/configuracoes`}
                    aria-label="Configurações"
                    className="hidden sm:block p-1.5 rounded-full text-gray-600 hover:bg-primary-100 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-primary-900 dark:hover:text-primary-400 transition-colors"
                  >
                    <IoSettingsSharp size={18} />
                  </Link>
                  <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-700" />
                  <LanguageSwitcher />
                  <button
                    onClick={toggleMenu}
                    aria-label="Menu principal"
                    aria-expanded={isMenuOpen}
                    className="md:hidden p-1.5 rounded-lg text-gray-600 hover:bg-primary-100 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-primary-900 dark:hover:text-primary-400 transition-colors"
                  >
                    <IoMenu size={18} />
                  </button>
                </>
              )}
            </div>
          </div>

          <div
            className={`md:hidden fixed left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-[calc(100vh-4rem)] border-b border-gray-200 dark:border-gray-800' : 'max-h-0'}`}
          >
            <div className="px-2 py-3 space-y-1">
              {listaItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}                  className={`block px-3 py-2 rounded-md text-base font-medium
                    ${isActiveLink(item.href)
                      ? 'bg-primary-100 text-primary-600 dark:bg-primary-900'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { i18n } = useTranslation();

  const [isChangingLocale, setIsChangingLocale] = useState(false);
  const locale = params?.locale as string || 'pt-BR';
  const handleLanguageChange = useCallback(
    async (newLocale: string) => {
      if (newLocale === locale) return; // Avoid unnecessary changes
      
      try {
        setIsChangingLocale(true);
        console.log('[LanguageSwitcher] Starting language change:', { from: locale, to: newLocale });
        
        // Get current path without locale
        const pathParts = pathname?.split('/').filter(Boolean) || [];
        const currentLocale = pathParts[0];
        
        let remainingPath = '';
        if (currentLocale && ['pt-BR', 'es-ES', 'en-US'].includes(currentLocale)) {
          remainingPath = '/' + pathParts.slice(1).join('/');
        } else {
          remainingPath = pathname ?? '/';
        }
        
        // Ensure path starts with /
        if (remainingPath === '/') remainingPath = '';
        
        // Set cookies and localStorage for persistence BEFORE changing language
        document.cookie = `i18nextLng=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        localStorage.setItem('i18nextLng', newLocale);
        
        console.log('[LanguageSwitcher] Persistence saved, changing i18n language...');
        
        // Change language in i18next and wait for it to complete
        await i18n.changeLanguage(newLocale);
        
        console.log('[LanguageSwitcher] i18n language changed, navigating...');
        
        // Add a small delay to ensure the language change is processed
        await new Promise(resolve => setTimeout(resolve, 150));
        
        // Navigate to new URL with new locale
        const newUrl = `/${newLocale}${remainingPath}`;
        console.log('[LanguageSwitcher] Navigating to:', newUrl);
        router.push(newUrl);
        
      } catch (error) {
        console.error('[LanguageSwitcher] Erro ao mudar idioma:', error);
      } finally {
        setIsChangingLocale(false);
      }
    },
    [pathname, router, i18n, locale]
  );

  const getLanguageName = useCallback((localeCode: string) => {
    const languages = {
      'pt-BR': 'Português (BR)',
      'en-US': 'English (US)',
      'es-ES': 'Español (ES)',
    };
    return languages[localeCode as keyof typeof languages] || localeCode;
  }, []);

  return (
    <Menu as="div" className="relative">
      <MenuButton
        className="inline-flex items-center gap-2 rounded-lg p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <div className="flex items-center gap-2">
          <IoLanguage size={18} />
          <CountryFlag className="w-6 h-6 sm:w-8 sm:h-8" flag={locale.split('-')[1]} />
          <span className="hidden md:block">{getLanguageName(locale)}</span>
        </div>
      </MenuButton>

      <MenuItems
        className="absolute z-10 right-0 sm:right-auto sm:left-0 mt-2 w-52 origin-top-right rounded-xl bg-white dark:bg-gray-800 p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem disabled={isChangingLocale}>
          {({ active }) => (
            <button
              onClick={() => handleLanguageChange('pt-BR')}
              className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-gray-700 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${active ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : ''}`}
            >
              {isChangingLocale ? (
                <span>Carregando...</span>
              ) : (
                <span className="text-sm flex items-center gap-2">
                  <CountryFlag className="w-8 h-8" flag="BR" />
                  {getLanguageName('pt-BR')}
                </span>
              )}
            </button>
          )}
        </MenuItem>        <MenuItem disabled={isChangingLocale}>
          <button
            onClick={() => handleLanguageChange('es-ES')}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-gray-700 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <span className="text-sm flex items-center gap-2">
              <CountryFlag className="w-8 h-8" flag="ES" />
              {getLanguageName('es-ES')}
            </span>
          </button>
        </MenuItem>        <MenuItem disabled={isChangingLocale}>
          <button
            onClick={() => handleLanguageChange('en-US')}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-gray-700 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <span className="text-sm flex items-center gap-2">
              <CountryFlag className="w-8 h-8" flag="US" />
              {getLanguageName('en-US')}
            </span>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}