'use client';

import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from './NextThemesProvider';
import { ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import { ViewTransitions } from 'next-view-transitions';
import 'react-toastify/dist/ReactToastify.css';
import VLibras from 'vlibras-nextjs';
import { SpeechProvider } from './contexts/SpeechContext';
import { TranslationProvider } from './contexts/TranslationContext';
import { ColorBlindProvider } from './contexts/ColorBlindContext';
import { FontSizeProvider } from './contexts/FontSizeContext';
import ColorBlindFilters from './components/global/ColorBlindFilters';

import '../i18n';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ViewTransitions>
      <div>
        <VLibras forceOnload />
      </div>
      <HeroUIProvider>
        <CookiesProvider>
          {' '}
          <ThemeProvider attribute="class" enableSystem themes={['light', 'dark']}>
            {' '}            <ColorBlindProvider>
              <ColorBlindFilters />
              <FontSizeProvider>
                <SpeechProvider>
                  <TranslationProvider>{children}</TranslationProvider>
                </SpeechProvider>
              </FontSizeProvider>
            </ColorBlindProvider>
            <ToastContainer />
          </ThemeProvider>
        </CookiesProvider>
      </HeroUIProvider>
    </ViewTransitions>
  );
}
