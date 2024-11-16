import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../../globals.css';
import Providers from '../../providers';
import NavBar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CookieConsetimentModal from '../../components/modal/ModalConsetiment';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '../../i18n/routing';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Talk-Talk!: Projeto de tradução em tempo real',
  description: 'Ferramenta de tradução via bate-papo em tempo real',
  authors: [
    {
      name: 'Kaike da Silva Sathler',
      url: 'http://lattes.cnpq.br/2952383935652833',
    },
    {
      name: 'Christopher Rodrigues Gouveia',
      url: 'http://lattes.cnpq.br/3214554816480546',
    },
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await (await params).locale || routing.defaultLocale;

  if (!routing.locales.includes(locale as any)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <body className={inter.className} style={{ marginBottom: '0.2rem' }}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>
            <CookieConsetimentModal />
            <div className="flex h-[99dvh] flex-col justify-between">
              <NavBar />
              {children}
              <Footer />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
