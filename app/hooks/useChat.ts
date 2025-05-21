import { Socket } from 'socket.io-client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { MessageType, UserData } from '@/app/types/chat';
import moment from 'moment-timezone';
import { cleanMessage } from '@/app/utils/formatters/cleanMessage';

interface UseChatProps {
  socketClient: Socket | null;
  userData: UserData | null;
  codigo: string;
}


export function useChat({ socketClient, userData, codigo }: UseChatProps) {
  const [mensagens, setMensagens] = useState<MessageType[]>([]);
  const [mensagem, setMensagem] = useState<string>('');
  const [messageLoading, setMessageLoading] = useState(false);
  const [pessoasConectadas, setPessoasConectadas] = useState<number>(0);
  const [usersInRoom, setUsersInRoom] = useState<UserData[]>([]);
  const linguaSelecionadaRef = useRef<string>('');
  const [isTyping, setIsTyping] = useState<{[key: string]: boolean}>({});
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  
  const onLinguaChange = (lingua: string) => {
    linguaSelecionadaRef.current = lingua;
    console.log('Lingua selecionada:', lingua);
    // Força recarregamento das mensagens quando o idioma muda
    if (mensagens.length > 0) {
      loadMessageHistory();
    }
  };

  const handleTyping = useCallback((userToken: string, typing: boolean) => {
    setIsTyping(prev => ({
      ...prev,
      [userToken]: typing
    }));
  }, []);

  const emitTypingStatus = useCallback((typing: boolean) => {
    if (!socketClient || !userData?.userToken) return;

    // Limpa o timeout anterior se existir
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Emite o status atual
    socketClient.emit('typing', {
      typing,
      userToken: userData.userToken,
      room: codigo
    });

    // Se estiver digitando, configura timeout para parar após 5 segundos
    if (typing) {
      typingTimeoutRef.current = setTimeout(() => {
        socketClient.emit('typing', {
          typing: false,
          userToken: userData.userToken,
          room: codigo
        });
      }, 5000);
    }
  }, [socketClient, userData, codigo]);

  const handleMessage = async (message: any) => {
    if (!message || !message.message) {
      console.error('Invalid message received:', message);
      return;
    }
    
    const clientTz = moment.tz.guess(true);
    const messageDate = moment(message.date).tz(clientTz);
    const isOwnMessage = message.userToken === userData?.userToken;

    // Se for mensagem de áudio, adiciona sem tradução
    if (message.type === 'audio') {
      setMensagens((prev) => [
        ...prev,
        {
          isAudio: true,
          message: message.message,
          messageTraduzido: message.message,
          senderId: message.userToken,
          senderApelido: message.apelido,
          senderAvatar: message.avatar,
          senderColor: message.senderColor,
          date: messageDate,
          lingua: message.lingua,
          type: 'audio'
        },
      ]);
      return;
    }

    try {
      // Só tenta traduzir se não for mensagem própria E idioma for diferente
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
            isAudio: message.isAudio,
            message: message.message,
            messageTraduzido: traduzido,
            senderId: message.userToken,
            senderApelido: message.apelido,
            senderAvatar: message.avatar,
            senderColor: message.senderColor,
            date: messageDate,
            lingua: message.lingua,
            type: 'text'
          },
        ]);
      } else {
        setMensagens((prev) => [
          ...prev,
          {
            isAudio: message.isAudio,
            message: message.message,
            messageTraduzido: message.message,
            senderId: message.userToken,
            senderApelido: message.apelido,
            senderAvatar: message.avatar,
            senderColor: message.senderColor,
            date: messageDate,
            lingua: message.lingua,
            type: 'text'
          },
        ]);
      }
    } catch (error) {
      console.error('Erro na tradução:', error);
      // Em caso de erro, adiciona sem tradução
      setMensagens((prev) => [
        ...prev,
        {
          isAudio: message.isAudio,
          message: message.message,
          messageTraduzido: message.message,
          senderId: message.userToken,
          senderApelido: message.apelido,
          senderAvatar: message.avatar,
          senderColor: message.senderColor,
          date: messageDate,
          lingua: message.lingua,
          type: 'text'
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
    if (socketClient && mensagem && mensagem.trim() && userData) {
      const messageContent = cleanMessage(mensagem);
      if (!messageContent) return; // Don't send if message is empty after cleaning
      
      const messageType = messageContent.startsWith('data:audio') ? 'audio' : 'text';
      
      socketClient.emit(
        'sendMessage',
        messageContent,
        userData.userToken,
        userData.color,
        userData.apelido,
        userData.avatar,
        codigo,
        linguaSelecionadaRef.current,
        messageType
      );
      setMensagem('');
      emitTypingStatus(false);
    }
  }, [socketClient, mensagem, codigo, userData, emitTypingStatus]);

  // Função para carregar histórico de mensagens
  const loadMessageHistory = useCallback(async () => {
    try {
      const response = await fetch(`/api/messages/${codigo}`);
      if (!response.ok) throw new Error('Falha ao carregar mensagens');
      
      const messages = await response.json();
      
      // Processa e traduz as mensagens se necessário
      const processedMessages = await Promise.all(messages.map(async (msg: any) => {
        const isOwnMessage = msg.senderId === userData?.userToken;

        // Só traduz se NÃO for mensagem própria E o idioma for diferente
        if (!isOwnMessage && msg.linguaOriginal !== linguaSelecionadaRef.current) {
          try {
            const response = await fetch('/api/translate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                text: msg.message,
                targetLanguage: linguaSelecionadaRef.current,
              }), 
            });

            if (!response.ok) throw new Error('Erro na tradução');
            const { result: traduzido } = await response.json();

            return {
              ...msg,
              messageTraduzido: traduzido
            };
          } catch (error) {
            console.error('Erro ao traduzir mensagem do histórico:', error);
            return msg;
          }
        }
        // Se for mensagem própria OU mesmo idioma, retorna sem traduzir
        return {
          ...msg,
          messageTraduzido: msg.message
        };
      }));

      setMensagens(processedMessages);
    } catch (error) {
      console.error('Erro ao carregar histórico de mensagens:', error);
    }
  }, [codigo,  userData?.userToken]); // Adicionei userData?.userToken nas dependências

  // Carrega mensagens quando o componente monta
  useEffect(() => {
    if (socketClient && userData) {
      loadMessageHistory();
      console.log('loadMessageHistory | userData', userData);
    }
  }, [socketClient, userData, loadMessageHistory]);

  // Remova este useEffect que estava duplicando a chamada
  // useEffect(() => {
  //   if (mensagens.length > 0) {
  //     loadMessageHistory();
  //   }
  // }, [linguaSelecionadaRef.current]);

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
    handleTyping,
    usersInRoom,
    onLinguaChange,
    isTyping,
    emitTypingStatus,
  };
}
