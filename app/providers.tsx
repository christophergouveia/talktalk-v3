'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from './NextThemesProvider';
import { ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import { ViewTransitions } from 'next-view-transitions';
import 'react-toastify/dist/ReactToastify.css';

import "../i18n"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ViewTransitions>
      <NextUIProvider>
        <CookiesProvider>
          <ThemeProvider attribute="class" enableSystem themes={['light', 'dark']}>
            {children}
            <ToastContainer />
          </ThemeProvider>
        </CookiesProvider>
      </NextUIProvider>
    </ViewTransitions>
  );
}

