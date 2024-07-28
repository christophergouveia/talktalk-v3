import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import NavBar from './components/ui/navbar';
import Footer from './components/ui/footer';
import CookieConsetimentModal from './components/modalConsetiment';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TalkTalk!: Projeto de tradução em tempo real',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
      <body className={inter.className} style={{ marginBottom: '0.2rem' }}>
        <Providers>
          <CookieConsetimentModal />
          <div className={'flex h-[99dvh] flex-col justify-between'}>
            <NavBar />
            <div style={{ flexGrow: '1' }}>{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
