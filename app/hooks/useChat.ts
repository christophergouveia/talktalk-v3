import { Socket } from 'socket.io-client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { MessageType, UserData } from '/app/types/chat';
import moment from 'moment-timezone';
import { cleanMessage } from '/app/utils/formatters/cleanMessage';

interface UseChatProps {
  socketClient: Socket | null;
  userData: UserData | null;
  codigo: string;
}

export function useChat({ socketClient, userData, codigo }: UseChatProps) {
  const [mensagens, setMensagens] = useState<MessageType[]>([]);
  const [mensagem, setMensagem] = useState<string>('');
  const [messageLoading, setMessageLoading] = useState(false);
  const [pessoasConectadas, setPessoasConectadas] = useState<Number>(0);
  const [isTyping, setIsTyping] = useState<{ [key: string]: boolean }>({});
  const [usersInRoom, setUsersInRoom] = useState<UserData[]>([]);
  const linguaSelecionadaRef = useRef<string>('');
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onLinguaChange = (lingua: string) => {
    linguaSelecionadaRef.current = lingua;
  };

  useEffect(() => {
  }, [linguaSelecionadaRef.current]);

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

  const handleMessage = async (message: any) => {
    const clientTz = moment.tz.guess(true);
    const messageDate = moment(message.date).tz(clientTz);
    try {
      const isOwnMessage = message.userToken === userData?.userToken;
      // Só traduz se não for mensagem própria e se o idioma for diferente
      if (!isOwnMessage && message.lingua !== linguaSelecionadaRef.current) {
        setMessageLoading(true);
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: message.message,
            targetLanguage: linguaSelecionadaRef.current,
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
            senderColor: message.senderColor,
            date: messageDate,
            lingua: message.lingua,
          },
        ]);
      } else {
        // Se for mensagem própria ou mesmo idioma, não traduz
        setMensagens((prev) => [
          ...prev,
          {
            message: message.message,
            messageTraduzido: message.message, // Usa a mensagem original
            senderId: message.userToken,
            senderApelido: message.apelido,
            senderAvatar: message.avatar,
            senderColor: message.senderColor,
            date: messageDate,
            lingua: message.lingua,
          },
        ]);
      }
    } catch (error) {
      console.error('Erro na tradução:', error);
      // Em caso de erro, adiciona a mensagem sem tradução
      setMensagens((prev) => [
        ...prev,
        {
          message: message.message,
          messageTraduzido: message.message,
          senderId: message.userToken,
          senderApelido: message.apelido,
          senderAvatar: message.avatar,
          senderColor: message.senderColor,
          date: messageDate,
          lingua: message.lingua,
        },
      ]);
    } finally {
      setMessageLoading(false);
    }
  };

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

  useEffect(() => {
    if (socketClient) {
      socketClient.on('room-users-update', (users: UserData[]) => {
        setUsersInRoom(users);
        setPessoasConectadas(users.length);
      });

      socketClient.on('redirect-to-home', () => {
        window.location.href = '/';
      });

      return () => {
        socketClient.off('room-users-update');
        socketClient.off('redirect-to-home');
      };
    }
  }, [socketClient]);

  const sendMessage = useCallback(() => {
    if (socketClient && mensagem.trim() && userData) {
      socketClient.emit(
        'sendMessage',
        cleanMessage(mensagem),
        userData.userToken,
        userData.color,
        userData.apelido,
        userData.avatar,
        codigo,
        linguaSelecionadaRef.current
      );
      setMensagem('');
    }
  }, [socketClient, mensagem, codigo, userData]);

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
    usersInRoom,
    onLinguaChange,
  };
}

