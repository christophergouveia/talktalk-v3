'use client';

import React, { useEffect, useState } from 'react';
import { IoIosMoon } from 'react-icons/io';
import { IoLanguage, IoMenu, IoSunny } from 'react-icons/io5';
import { useTheme } from 'next-themes';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import LogoSite from '@/public/images/icon/logo.png';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { CountryFlag } from '../countryFlags';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/app/i18n/routing';
import { useCookies } from 'react-cookie';

interface NavbarItem {
  name: string;
  href: string;
}

export default function NavBar() {
  const pathname = usePathname();
  const theme = useTheme();
  const locale = useLocale();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  
  useEffect(() => setHasMounted(true), []);
  
  const t = useTranslations('navbar');

  const listaItems: NavbarItem[] = [
    {
      name: t('pagina_inicial'),
      href: '/',
    },
    {
      name: t('sobre_ferramenta'),
      href: '/sobre',
    },
    {
      name: t('conversar'),
      href: '/conversar',
    },
  ];

  function toggleTheme() {
    theme.setTheme(theme.resolvedTheme === 'dark' ? 'light' : 'dark');
  }

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href) || pathname.startsWith(`/${locale}${href}`);
  };


  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md dark:bg-gray-900/80 h-16 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" locale={locale as "pt-BR" | "es-ES" | 'en-US'}>
              <Image src={LogoSite.src} width={48} height={48} alt="Logo" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {listaItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                locale={locale as "pt-BR" | "es-ES" | 'en-US'}
                className={`relative text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors
                  ${
                    isActiveLink(item.href)
                      ? '!text-sky-600 after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-0.5 after:bg-sky-600'
                      : ''
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {hasMounted && (
              <>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  {theme.resolvedTheme === 'dark' ? <IoIosMoon size={20} /> : <IoSunny size={20} />}
                </button>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" />
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <FaGithub size={20} />
                </a>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" />
                <LanguageSwitcher />
              </>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <IoMenu size={20} />
            </button>
          </div>
        </div>

        <div
          className={`md:hidden absolute left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64 border-b border-gray-200 dark:border-gray-800' : 'max-h-0'}`}
        >
          <div className="px-2 py-3 space-y-1">
            {listaItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium
                  ${
                    isActiveLink(item.href)
                      ? 'bg-sky-100 text-sky-600 dark:bg-sky-900'
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
  );
}

function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [cookies, setCookie] = useCookies(['NEXT_LOCALE']);

  const handleLanguageChange = async (newLocale: string) => {
    try {
      // Primeiro, define o cookie
      // setCookie('NEXT_LOCALE', newLocale, { 
      //   path: '/',
      //   sameSite: 'lax',
      //   secure: process.env.NODE_ENV === 'production'
      // });

      // Extrai o caminho sem o locale atual
      const pathParts = pathname.split('/').filter(Boolean);
      const currentLocale = pathParts[0];
      
      // Remove o locale atual se existir
      let newPathname = '';
      if (currentLocale && ['pt-BR', 'es-ES', 'en-US'].includes(currentLocale)) {
        newPathname = '/' + pathParts.slice(1).join('/');
      } else {
        newPathname = pathname;
      }

      // Garante que temos pelo menos '/'
      if (!newPathname || newPathname === '') {
        newPathname = '/';
      }

      // Usa push em vez de replace e aguarda a navegação
      await router.push(newPathname, { locale: newLocale as "pt-BR" | "es-ES" | "en-US" });
      router.refresh();

    } catch (error) {
      console.error('Erro ao mudar idioma:', error);
    }
  };

  const getLanguageName = (localeCode: string) => {
    const languages = {
      'pt-BR': 'Português (BR)',
      'en-US': 'English (US)',
      'es-ES': 'Español (ES)'
    };
    return languages[localeCode as keyof typeof languages] || localeCode;
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="light" 
          startContent={<IoLanguage size={20} />}
          className="min-w-[140px] justify-start"
        >
          <div className="flex items-center gap-2">
            <CountryFlag 
              className="w-8 h-8" 
              flag={locale.split('-')[1]} 
            />
            <span>{getLanguageName(locale)}</span>
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Seleção de Idiomas" 
        className="min-w-[200px]" 
        onAction={(key) => handleLanguageChange(key as string)}
        selectedKeys={new Set([locale])}
      >
        <DropdownItem key="pt-BR" className="flex items-center gap-2">
          <span className="text-sm flex items-center gap-2">
            <CountryFlag className="w-8 h-8" flag="BR" /> 
            {getLanguageName('pt-BR')}
          </span>
        </DropdownItem>
        <DropdownItem key="es-ES" className="flex items-center gap-2">
          <span className="text-sm flex items-center gap-2">
            <CountryFlag className="w-8 h-8" flag="ES" /> 
            {getLanguageName('es-ES')}
          </span>
        </DropdownItem>
        <DropdownItem key="en-US" className="flex items-center gap-2">
          <span className="text-sm flex items-center gap-2">
            <CountryFlag className="w-8 h-8" flag="US" /> 
            {getLanguageName('en-US')}
          </span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
