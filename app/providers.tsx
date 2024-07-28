'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <CookiesProvider>
        <ThemeProvider attribute="class" enableSystem themes={['light', 'dark']}>
          {children}
          <ToastContainer />
        </ThemeProvider>
      </CookiesProvider>
    </NextUIProvider>
  );
}
