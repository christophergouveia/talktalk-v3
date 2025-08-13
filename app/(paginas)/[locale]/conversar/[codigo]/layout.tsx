import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': 0,
      'max-image-preview': 'none',
      'max-snippet': 0,
    },
  },
  title: 'Sala de Conversa - Talk-Talk!',
  description: 'Sala de conversa privada com tradução em tempo real.',
};

export default function ChatRoomLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
