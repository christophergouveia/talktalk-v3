import { Socket } from 'socket.io-client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { MessageType, UserData } from '@/app/types/chat';
import moment from 'moment-timezone';
import { cleanMessage } from '@/app/utils/formatters/cleanMessage';

interface UseChatProps {
  socketClient: Socket | null;
  userData: UserData | null;
  codigo: string;
  linguaSelecionada: {
    value: string;
  };
}

export function useChat({ socketClient, userData, codigo, linguaSelecionada }: UseChatProps) {
  const [mensagens, setMensagens] = useState<MessageType[]>([]);
  const [mensagem, setMensagem] = useState<string>('');
  const [messageLoading, setMessageLoading] = useState(false);
  const [pessoasConectadas, setPessoasConectadas] = useState<Number>(0);
  const [isTyping, setIsTyping] = useState<{ [key: string]: boolean }>({});

  // Adiciona timeout para digitação
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTyping = (typing: boolean, userToken: string) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    setIsTyping((prev) => ({
      ...prev,
      [userToken]: typing,
    }));

    if (typing) {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping((prev) => {
          if (prev[userToken]) {
            return {
              ...prev,
              [userToken]: false,
            };
          }
          return prev;
        });
      }, 4000);
    }
  };

  const handleMessage = useCallback(
    async (message: any) => {
      try {
        setMessageLoading(true);
        const clientTz = moment.tz.guess(true);
        const data = moment(message.date).tz(clientTz);

        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: message.message,
            targetLanguage: linguaSelecionada.value,
          }),
        });

        if (!response.ok) throw new Error('Erro na tradução');

        const { result: traduzido } = await response.json();

        setMensagens((prev) => [
          ...prev,
          {
            message: message.message,
            messageTraduzido: traduzido,
            senderId: message.userToken,
            senderApelido: message.apelido,
            senderAvatar: message.avatar,
            date: data,
            senderColor: message.senderColor,
          },
        ]);
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setMessageLoading(false);
      }
    },
    [linguaSelecionada]
  );

  useEffect(() => {
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;

    if (socketClient) {
      socketClient.on('disconnect', () => {
        const tryReconnect = () => {
          if (reconnectAttempts < maxReconnectAttempts) {
            socketClient.connect();
            reconnectAttempts++;
          } else {
            socketClient.disconnect();
          }
        };

        setTimeout(tryReconnect, 1000 * Math.min(reconnectAttempts + 1, 5));
      });

      socketClient.on('connect', () => {
        reconnectAttempts = 0;
      });
    }
  }, [socketClient]);

  const sendMessage = useCallback(() => {
    if (socketClient && mensagem.trim() && userData) {
      socketClient.emit('sendMessage', cleanMessage(mensagem), userData.userToken, userData.apelido, userData.avatar, codigo, linguaSelecionada.value, userData.color);
      setMensagem('');
    }
  }, [socketClient, mensagem, codigo, linguaSelecionada, userData]);

  return {
    mensagens,
    setMensagens,
    mensagem,
    setMensagem,
    messageLoading,
    pessoasConectadas,
    setPessoasConectadas,
    handleMessage,
    sendMessage,
    isTyping,
    handleTyping,
  };
}
