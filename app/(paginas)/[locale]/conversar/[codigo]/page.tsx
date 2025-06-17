'use client';

import ChatComponent from '@/app/components/chat/Chat.tsx';
import Message from '@/app/components/chat/Message.tsx';
import MessageList from '@/app/components/chat/MessageList.tsx';
import { CountryFlag } from '@/app/components/countryFlags.tsx';
import CopyButton from '@/app/components/functionals/CopyButton.tsx';
import linguagens from '@/app/locales/languages.json';
import { descriptografarUserData, criptografarUserData, criptografar } from '@/app/services/cryptoService';
import fetchRoom from '@/app/utils/roomManagement/fetchRoom.tsx';
import fetchRoomUsers from '@/app/utils/roomManagement/fetchRoomUsers.tsx';
import { RandomAvatarColor } from '@/app/utils/strings/randomAvatarColor.tsx';
import { RandomNicks } from '@/app/utils/strings/randomNicks.tsx';
import RandomToken from '@/app/utils/strings/randomToken.tsx';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Spinner,
  Switch,
  Textarea,
} from "@heroui/react";
import { useDebounce } from '@uidotdev/usehooks';
import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { IoIosSend } from 'react-icons/io';
import { IoMicOutline } from "react-icons/io5";
import { IoSettingsSharp } from 'react-icons/io5';
import { Socket, io } from 'socket.io-client';
import { useChat } from '@/app/hooks/useChat';
import Image from 'next/image';
import { gerarNomeAnimalAleatorio } from '@/app/utils/generators/randomAnimalName';
import { AvatarSelector } from '@/app/components/functionals/AvatarSelector';
import ColorSelector from '@/app/components/functionals/ColorsSelector';
import { UserData } from '@/app/types/chat';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { cleanMessage } from '../../../../utils/formatters/cleanMessage';
import { toast } from 'react-toastify';

interface RoomPageProps {
  params: Promise<{
    locale: string;
    codigo: string;
  }>;
}

export default function RoomPage({ params }: RoomPageProps) {  const [linguaSelecionada, setLinguaSelecionada] = useState<{ label: string; value: string; flag: string }>({
    label: 'Português',
    value: 'pt-BR',
    flag: 'BR',
  });  const [socketClient, setSocketClient] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Sala indisponível ou erro desconhecido');
  const [hostModal, setHostModal] = useState<boolean>(false);
  const [cookies, setCookies] = useCookies(['talktalk_roomid', 'talktalk_userdata']);
  const messageListRef = useRef<HTMLDivElement>(null);
  const [shiftPressed, setShiftPressed] = useState<boolean>(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [userName, setUserName] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<{
    apelido: string;
    avatar: string;
    color: string;
    token: string;
    userToken: string;
  }>();
  const [isHost, setIsHost] = useState<boolean>(false);
  const [usersRoomData, setUsersRoomData] = useState<{ [key: string]: UserData }>({});
  const [isOpen, setIsOpen] = useState(false);
  const languagesFilterRef = useRef<HTMLInputElement>(null);
  const [languagesFilter, setLanguagesFilter] = useState<string>('');
  const languagesFilterDebounced = useDebounce(languagesFilter, 500);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);
  const [showUserAlreadyInRoom, setShowUserAlreadyInRoom] = useState(false);
  const [apelido, setApelido] = useState('');
  const [avatarDetails, setAvatarDetails] = useState<{ avatarURL: string; avatarName: string }>({
    avatarURL: '',
    avatarName: '',
  });
  const [avatarColor, setAvatarColor] = useState('');
  const [isColorModalOpenned, setColorModalOpenned] = useState(false);
  const [chatCompacto, setChatCompacto] = useState(false);
  const [salaData, setSalaData] = useState<any>(null);
  const [usersTyping, setUsersTyping] = useState<{ userToken: string; typing: boolean }[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const router = useRouter();

  const codigo = React.use(params).codigo.toLowerCase();

  const {
    mensagens,
    mensagem,
    setMensagem,
    messageLoading,
    setPessoasConectadas,
    handleMessage,
    sendMessage,
    onLinguaChange,
    handleTyping,
    isTyping,
    emitTypingStatus
  } = useChat({
    socketClient,
    userData: userData || null,
    codigo: codigo,
  });

  useEffect(() => {
    console.log(mensagens)
  }, [mensagens])
 
  useEffect(() => {
    if (isOpen && languagesFilterRef.current) {
      languagesFilterRef.current?.focus();
    }
    setSelectedIndex(undefined);
  }, [isOpen]);

  useEffect(() => {
    if (!apelido) {
      setApelido(gerarNomeAnimalAleatorio());
    }
  }, [apelido]);

  // Load language settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('talktalk_user_settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        if (settings.linguaSelecionada) {
          setLinguaSelecionada(settings.linguaSelecionada);
          onLinguaChange(settings.linguaSelecionada.value);
        }
      } catch (error) {
        console.error('Erro ao carregar configurações de idioma:', error);
      }    } else {
      // Initialize with default language if no settings exist
      onLinguaChange('pt-BR');
    }
  }, [onLinguaChange]);
  const connectToRoom = useCallback(
    async (bypass: boolean) => {
      try {
        // Evita criar socket duplicado
        if (socketClient) {
          console.log('[DEBUG] Socket já existe, reutilizando conexão');
          return;
        }        if (bypass) {
          console.log('[DEBUG] Bypass ativado, conectando diretamente ao socket');
          const socketUrl = `http://${process.env.NEXT_PUBLIC_SOCKET_URL}:${process.env.NEXT_PUBLIC_SOCKET_PORT}`;
          console.log('[DEBUG] URL do Socket:', socketUrl);
          console.log('[DEBUG] Env vars:', {
            SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
            SOCKET_PORT: process.env.NEXT_PUBLIC_SOCKET_PORT
          });
          
          setConnectionStatus('connecting');
          
          const socket = io(socketUrl, {
            withCredentials: true,
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            forceNew: true,
            autoConnect: false,
          });

          socket.once('connect', () => {
            console.log('[DEBUG] Socket conectado com sucesso:', socket.id);
            setConnectionStatus('connected');
            setShowNameInput(false);
          });          socket.on('connect_error', (error) => {
            console.error('[DEBUG] Erro de conexão do socket:', error);
            console.error('[DEBUG] Socket URL tentada:', socketUrl);
            setConnectionStatus('error');
            
            // Tentar fallback para polling apenas
            const currentTransports = socket.io.opts.transports;
            if (currentTransports && Array.isArray(currentTransports) && currentTransports.some(t => t === 'websocket')) {
              console.log('[DEBUG] Tentando fallback para polling...');
              socket.io.opts.transports = ['polling'];
              setConnectionStatus('connecting');
              socket.connect();
            } else {
              // Se já tentamos polling e falhou, mostrar erro
              setErrorMessage('Não foi possível conectar ao servidor de chat. Verifique se o servidor está funcionando.');
              setShowErrorModal(true);
            }
          });

          socket.on('error', (error) => {
            console.error('[DEBUG] Erro do socket:', error);
            console.error('[DEBUG] Detalhes do erro:', {
              message: error.message,
              type: error.type,
              description: error.description
            });
            setConnectionStatus('error');
          });

          socket.on('disconnect', (reason) => {
            console.log('[DEBUG] Socket desconectado:', reason);
            setConnectionStatus('disconnected');
          });

          console.log('[DEBUG] Iniciando conexão do socket...');
          socket.connect();
          setSocketClient(socket);
          return;
        }

        console.log('[DEBUG] Gerando novo usuário');
        const sala = await fetchRoom(codigo);

        if (!sala) {
          setShowErrorModal(true);
          return;
        }

        // Use saved settings or fallback to default values
        const nickname = userName.trim() || avatarDetails.avatarName;
        const payload = {
          apelido: nickname,
          avatar: avatarDetails.avatarURL || '/images/avatars/default.png',
          color: avatarColor || '#3b82f6',
          token: sala.token,
          userToken: RandomToken.get(),
        };

        const payloadEncrypted = await criptografarUserData(payload);

        // Salva cookies e dados do usuário
        setCookies('talktalk_userdata', payloadEncrypted.data, {
          expires: undefined,
          sameSite: 'strict',
          path: '/',
        });

        const roomPayload = { token: sala.token, hostToken: sala.hostToken };
        const roomPayloadEncrypted = await criptografar(JSON.stringify(roomPayload));

        // Salva cookies e dados do usuário
        setCookies('talktalk_roomid', roomPayloadEncrypted.data, {
          expires: undefined,
          sameSite: 'strict',
          path: '/',
        });        // Define os dados do usuário antes de criar o socket
        setUserData(payload);
        
        // Cria e configura o socket apenas uma vez
        const socketUrl = `http://${process.env.NEXT_PUBLIC_SOCKET_URL}:${process.env.NEXT_PUBLIC_SOCKET_PORT}`;
        console.log('[DEBUG] Criando socket normal para:', socketUrl);
        console.log('[DEBUG] Env vars:', {
          SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
          SOCKET_PORT: process.env.NEXT_PUBLIC_SOCKET_PORT
        });
        
        const socket = io(socketUrl, {
          withCredentials: true,
          transports: ['websocket', 'polling'],
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          timeout: 20000,
          forceNew: true,
          autoConnect: false,
        });        // Configura os eventos antes de conectar
        socket.once('connect', () => {
          console.log('[DEBUG] Socket conectado com sucesso:', socket.id);
          const userDataString = JSON.stringify(payload);
          console.log('[DEBUG] Emitindo join-room para:', codigo);
          socket.emit('join-room', codigo, userDataString);
          setShowNameInput(false);
        });

        socket.on('connect_error', (error) => {
          console.error('[DEBUG] Erro de conexão do socket:', error);
          setErrorMessage('Erro de conexão com o servidor. Verifique sua internet.');
          setShowErrorModal(true);
        });

        socket.on('error', (error) => {
          console.error('[DEBUG] Erro do socket:', error);
          if (error.includes('cheia')) {
            setErrorMessage('Sala está cheia! Máximo de 3 usuários permitidos.');
          } else if (error.includes('não encontrada')) {
            setErrorMessage('Sala não encontrada!');
          } else {
            setErrorMessage('Erro ao conectar na sala: ' + error);
          }
          setShowErrorModal(true);
        });

        socket.on('disconnect', (reason) => {
          console.log('[DEBUG] Socket desconectado:', reason);
        });

        console.log('[DEBUG] Iniciando conexão do socket...');
        // Conecta o socket
        socket.connect();
        setSocketClient(socket);
      } catch (error) {
        console.error('[DEBUG] Erro em connectToRoom:', error);
      }
    },
    [userName, avatarDetails, avatarColor, codigo, setCookies, socketClient]
  );

  // useEffect(() => {
  //   const savedSettings = localStorage.getItem('talktalk_user_settings');
  //   if (savedSettings) {
  //     const settings = JSON.parse(savedSettings);
  //     if (settings.linguaSelecionada) {
  //       setLinguaSelecionada(settings.linguaSelecionada);
  //       onLinguaChange(settings.linguaSelecionada.value);
  //     }
  //     if (settings.avatarDetails) {
  //       setAvatarDetails(settings.avatarDetails);
  //     }
  //     if (settings.avatarColor) {
  //       setAvatarColor(settings.avatarColor);
  //     }
  //   }
  // }, [ onLinguaChange]);
  const fetchSala = useCallback(async () => {
    try {
      const sala = await fetchRoom(codigo);
      const salas_usuarios = await fetchRoomUsers(codigo);

      if (!salas_usuarios || sala == null) {
        setShowErrorModal(true);
        return;
      }

      setSalaData(sala);

      const userData = cookies.talktalk_userdata;
      const roomToken = cookies.talktalk_roomid;

      // Se não há dados de usuário, mostra o input apenas uma vez
      if (userData == undefined || roomToken == undefined) {
        if (!showNameInput) {
          setShowNameInput(true);
        }
        return;
      }

      try {
        const userDataDecrypt = await descriptografarUserData(userData as string);

        const isValidRoom = sala.token == userDataDecrypt.data.token;

        if (!userDataDecrypt || !userDataDecrypt.data.apelido || !userDataDecrypt.data.userToken || !isValidRoom) {
          // Limpa cookies inválidos e mostra input
          document.cookie = 'talktalk_userdata=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'talktalk_roomid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          if (!showNameInput) {
            setShowNameInput(true);
          }
          return;
        }

        setUserData(userDataDecrypt.data);

        if (userDataDecrypt.data.userToken === sala.hostToken) {
          setIsHost(true);
          setHostModal(true);
          setUsersRoomData((prev) => {
            return {
              [userDataDecrypt.data.userToken]: {
                ...userDataDecrypt.data,
                host: true,
                isTyping: false,
                lastActivity: new Date().toISOString(),
              },
            };
          });
        }

        setShowNameInput(false);
        connectToRoom(true);
      } catch (error) {
        console.error('Erro ao descriptografar dados do usuário:', error);
        // Limpa cookies inválidos e mostra input
        document.cookie = 'talktalk_userdata=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'talktalk_roomid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        if (!showNameInput) {
          setShowNameInput(true);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar sala:', error);
      setShowErrorModal(true);
    }
  }, [codigo, connectToRoom, cookies.talktalk_userdata, cookies.talktalk_roomid, showNameInput]);
  const fetchSalaRef = useRef(false);
  const isInitializing = useRef(false);

  useEffect(() => {
    if (!fetchSalaRef.current && !isInitializing.current) {
      isInitializing.current = true;
      fetchSalaRef.current = true;
      fetchSala().finally(() => {
        isInitializing.current = false;
      });
    }

    return () => {
      if (socketClient) {
        socketClient.disconnect();
        socketClient.off('user-connected');
        socketClient.off('user-disconnected');
        socketClient.off('message');
      }
    };
  }, [fetchSala, socketClient]);

  useEffect(() => {
    if (!socketClient) return;

    const handleConnect = () => {
      console.log('Conectado ao servidor');
      if (userData) {
        const userDataString = JSON.stringify(userData);
        socketClient.emit('join-room', codigo, userDataString);
      }
    };    const handleUsersUpdate = async (users: any[]) => {
      console.log('[DEBUG] Users Update Received: ', users);
      const usersMap: { [key: string]: UserData } = {};

      for (const user of users) {
        try {
          if (user.userData) {
            let userDataDecrypted;
            if (typeof user.userData === 'string') {
              userDataDecrypted = await descriptografarUserData(user.userData);
            } else {
              userDataDecrypted = { data: user.userData };
            }
            
            if (userDataDecrypted?.data) {
              const isUserHost = userDataDecrypted.data.userToken === salaData?.hostToken;
              usersMap[userDataDecrypted.data.userToken] = {
                ...userDataDecrypted.data,
                host: isUserHost,
                isTyping: false,
                lastActivity: new Date().toISOString(),
              };
              console.log('[DEBUG] Usuário adicionado:', userDataDecrypted.data.apelido, userDataDecrypted.data.userToken);
            }
          }
        } catch (error) {
          console.error('Erro ao processar dados do usuário:', error);
        }
      }

      console.log('[DEBUG] Total de usuários processados:', Object.keys(usersMap).length);
      setUsersRoomData(usersMap);
      setPessoasConectadas(users.length);
    };

    const handleUsersTyping = async (data: { userToken: string; typing: boolean }) => {
      if (userData?.userToken === data.userToken) return;
      console.log('[DEBUG] Users Typing Received: ', data);
      setUsersTyping((prev) => {
        const existingIndex = prev.findIndex(user => user.userToken === data.userToken);
        if (existingIndex >= 0) {
          const newArray = [...prev];
          newArray[existingIndex] = data;
          return newArray;
        }
        return [...prev, data];
      });
      handleTyping(data.userToken, data.typing);
    };

    const handleUserDisconnected = async (disconnectedUserData: string) => {
      try {
        const decryptedUser = await descriptografarUserData(disconnectedUserData);
        if (decryptedUser?.data.userToken) {
          setUsersRoomData((prev) => {
            const newData = { ...prev };
            delete newData[decryptedUser.data.userToken];
            return newData;
          });
          setPessoasConectadas((prev) => prev - 1);
        }
      } catch (error) {
        console.error('Erro ao processar desconexão do usuário:', error);
      }
    };

    socketClient.on('connect', handleConnect);
    socketClient.on('users-update', handleUsersUpdate);
    socketClient.on('user-disconnected', handleUserDisconnected);
    socketClient.on('message', handleMessage);
    socketClient.on('users-typing', handleUsersTyping);    return () => {
      socketClient.off('connect', handleConnect);
      socketClient.off('users-update', handleUsersUpdate);
      socketClient.off('user-disconnected', handleUserDisconnected);
      socketClient.off('message', handleMessage);
      socketClient.off('users-typing', handleUsersTyping);
    };
  }, [socketClient, userData, salaData?.hostToken, codigo, handleMessage, handleTyping, setPessoasConectadas]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 200;
    }
  }, [mensagens]);

  const handleTextAreaChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const cleanedMessage = cleanMessage(e.target.value);
    if (cleanedMessage !== undefined) {
      setMensagem(cleanedMessage);
      emitTypingStatus(true);
    }
  }, [emitTypingStatus, setMensagem]);

  const handleTextAreaKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement> | KeyboardEvent) => {
      if (e.key === 'Shift') {
        setShiftPressed(false);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (shiftPressed) {
          setMensagem((prev) => prev + '\n');
        } else if (mensagem && mensagem.trim()) {
          sendMessage();
        }
      }

      if (userData?.userToken) {
        socketClient?.emit('typing', true, codigo);
      }
    },
    [shiftPressed, mensagem, sendMessage, userData, socketClient, codigo, setMensagem]
  );

  const handleTextAreaKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement> | KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    } else if (e.key === 'Shift') {
      setShiftPressed(true);
    }
  }, []);

  const handleNameInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }, []);

  const recAudio = async () => {
    try {
      if (isRecording) {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64Audio = reader.result as string;
          
          if (socketClient && userData) {
            const audioMessage = {
              type: 'audio',
              message: base64Audio,
              userToken: userData.userToken,
              senderColor: userData.color,
              apelido: userData.apelido,
              avatar: userData.avatar,
              room: codigo,
              lingua: linguaSelecionada,
              date: new Date().toISOString()
            };
            
            socketClient.emit('sendMessage', audioMessage.message, audioMessage.userToken, audioMessage.senderColor, audioMessage.apelido, audioMessage.avatar, audioMessage.room, audioMessage.lingua, audioMessage.type);
            toast.success('Áudio enviado com sucesso!');
          }
        };

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.info('Gravando áudio... Clique novamente para parar.');

      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
          toast.info('Gravação finalizada automaticamente (limite de 1 minuto).');
        }
      }, 60000);

    } catch (error) {
      console.error('Error recording audio:', error);
      toast.error('Erro ao gravar áudio. Verifique as permissões do microfone.');
      setIsRecording(false);
    }
  };

  

  

  

  const filteredLanguages =
    languagesFilterDebounced.length > 0
      ? linguagens.filter((idioma) =>
        idioma.label
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(
            languagesFilterDebounced
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()
          )
      )
      : linguagens;

  const getRandomAvatar = useCallback(() => {
    const randomAnimal = RandomNicks.get();
    const englishName = RandomNicks.getEnglish(randomAnimal);

    if (!englishName) {
      console.error(`Apelido "${randomAnimal}" não encontrado.`);
      return ''; // Retorna uma string vazia como valor padrão
    }

    const imageUrl = `/images/avatars/${englishName.toLowerCase()}.png`;
    setAvatarDetails({ avatarURL: imageUrl, avatarName: randomAnimal });
    return randomAnimal;
  }, [setAvatarDetails]);

  useEffect(() => {
    getRandomAvatar();
    setAvatarColor(RandomAvatarColor.get().hex);
  }, [getRandomAvatar]);

  const handleSelectColor = useCallback(
    (color: string) => {
      setAvatarColor(color);
      setColorModalOpenned(false);
    },
    [setAvatarColor]
  );

  useEffect(() => {
    if (!socketClient) return;

    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;

    const handleDisconnect = (reason: string) => {
      console.log('Desconectado:', reason);

      // Se for desconexão por timeout, tenta reconectar
      if (reason === 'io server disconnect' || reason === 'transport close' || reason === 'ping timeout') {
        if (reconnectAttempts < maxReconnectAttempts) {
          console.log(`Tentativa de reconexão ${reconnectAttempts + 1} de ${maxReconnectAttempts}`);
          setTimeout(
            () => {
              socketClient.connect();
              reconnectAttempts++;
            },
            1000 * Math.min(reconnectAttempts + 1, 5)
          ); // Backoff exponencial (backoff é pra dar delay entre as tentativas gustavin)
        } else {
          console.log('Número máximo de tentativas de reconexão atingido');
        }
      }
    };

    const handleReconnect = (attempt: number) => {
      console.log('Reconectado após tentativa:', attempt);
      reconnectAttempts = 0; // Reseta contador após reconexão bem sucedida
      socketClient.emit('join-room', codigo);
    };

    const handleConnect = () => {
      console.log('Conectado ao servidor');
      reconnectAttempts = 0;
    };

    socketClient.on('connect', handleConnect);
    socketClient.on('disconnect', handleDisconnect);
    socketClient.on('reconnect', handleReconnect);
    socketClient.on('reconnect_error', (error) => {
      console.error('Erro na reconexão:', error);
    });

    return () => {
      socketClient.off('connect', handleConnect);
      socketClient.off('disconnect', handleDisconnect);
      socketClient.off('reconnect', handleReconnect);
      socketClient.off('reconnect_error');
    };
  }, [socketClient, codigo]);

  useEffect(() => {
    return () => {
      if (socketClient) {
        socketClient.disconnect();
      }
    };
  }, [socketClient]);

  const handleLanguageChange = (language: string) => {
    const index = linguagens.findIndex((lang) => lang.value === language);
    if (index !== -1) {
      setLinguaSelecionada(linguagens[index]);
      onLinguaChange(language);
      // Save settings while keeping other settings intact
      const settings = {
        linguaSelecionada: linguagens[index],
        avatarDetails,
        avatarColor,
      };
      localStorage.setItem('talktalk_user_settings', JSON.stringify(settings));
    }
  };
  if (showErrorModal) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-bold">
          {errorMessage.includes('cheia') ? 'Sala Cheia!' : 'Erro na Sala'}
        </h2>
        <p className="mt-2 text-gray-600">
          {errorMessage}
        </p>
        <Button className="mt-4" onClick={() => router.push('/conversar')}>
          Voltar para a página de sala
        </Button>
      </div>
    );
  }

  if (showUserAlreadyInRoom) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-bold">Você já está nesta sala em outro dispositivo!</h2>
        <p className="mt-2 text-gray-600">Para entrar na sala, você deve sair de outros dispositivos.</p>
      </div>
    );
  }

  if (typeof window == null) {
    return null;
  }  if (showNameInput) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/40 dark:from-[#0f0f0f] dark:via-[#1a1a2e] dark:to-[#16213e] relative overflow-hidden flex items-center justify-center">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/6 to-blue-400/6 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/6 to-blue-400/6 rounded-full blur-2xl"></div>
        </div><motion.div 
          className="w-fit max-w-md mx-auto p-8 rounded-3xl flex flex-col items-center justify-center gap-8 text-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/30 dark:border-gray-700/40 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent rounded-full"></div>          <motion.h2 
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent relative z-10"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          >
            Bem-vindo à sala!
          </motion.h2>

          <motion.div 
            className="relative group"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 120 }}
          >
            <div className="absolute inset-0 rounded-full animate-pulse" style={{ backgroundColor: `${avatarColor}15` }}></div>
            <Image
              src={avatarDetails.avatarURL || '/images/avatars/default.png'}
              alt="Avatar Preview"
              width={140}
              height={140}
              className="rounded-full border-4 p-4 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-10"
              style={{ 
                borderColor: avatarColor, 
                backgroundColor: `${avatarColor}20`,
                boxShadow: `0 10px 40px ${avatarColor}40, 0 0 0 1px ${avatarColor}20`,
              }}
            />

            <motion.button
              onClick={() => setColorModalOpenned(true)}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col items-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>                <span className="text-xs mt-1">Mudar cor</span>
              </div>
            </motion.button>
          </motion.div>

          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-4 h-4 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: avatarColor }} />
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Cor selecionada</span>
          </motion.div>          <motion.p 
            className="text-gray-600 dark:text-gray-300 font-medium text-lg relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Para entrar na sala, digite um apelido (opcional):
          </motion.p>
          
          <motion.div 
            className="w-full relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            <input
              type="text"
              className="w-full px-6 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/40 dark:border-gray-600/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/90 dark:focus:bg-gray-800/90 transition-all duration-500 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-lg shadow-lg hover:shadow-xl"
              placeholder="Seu nome"
              value={userName}
              onChange={handleNameInputChange}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring" }}
            className="w-full"
          >
            <AvatarSelector
              onAvatarSelect={(avatar, url) => setAvatarDetails({ avatarURL: url, avatarName: avatar })}
              color={avatarColor}
              getRandomAvatar={getRandomAvatar}
            />
          </motion.div>
          
          <ColorSelector
            onSelectColor={handleSelectColor}
            isOpen={isColorModalOpenned}
            onModalClose={() => setColorModalOpenned(false)}
          />
            <motion.div 
            className="text-sm text-gray-500 dark:text-gray-400 space-y-2 bg-blue-50/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-blue-200/30 dark:border-gray-700/30 relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, type: "spring" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span>Não se preocupe caso não insira um apelido.</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
              <span>Será utilizado o nome do avatar selecionado!</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 120 }}
            className="w-full"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => connectToRoom(false)}
                className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 hover:from-blue-600 hover:via-purple-700 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 backdrop-blur-sm relative overflow-hidden group"
                size="lg"
              >
                <span className="relative z-10 text-lg">Entrar na Sala</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }
  if (socketClient == null) {
    return null;
  }
    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/40 dark:from-[#0f0f0f] dark:via-[#1a1a2e] dark:to-[#16213e] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/6 to-blue-400/6 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/6 to-blue-400/6 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 p-4 h-screen flex flex-col lg:flex-row gap-4">
        <Modal
          isOpen={hostModal}
          backdrop="opaque"
          size="2xl"
          isDismissable
          onKeyUp={(e) => e.key === 'Escape' && setHostModal(false)}
          onClose={() => setHostModal(false)}
          classNames={{
            footer: 'justify-center',
            backdrop: 'bg-[#6F90F2]/30 backdrop-blur-sm',
          }}
        >        <ModalContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 dark:border-gray-700/30">
          <>
            <ModalBody>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-6"
              >
                <div className="relative">
                  <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    VOCÊ É O ANFITRIÃO DA SALA!
                  </h1>
                  <div className="absolute -top-2 -right-2 text-2xl animate-bounce">👑</div>
                </div>
                <h2 className="text-xl text-gray-700 dark:text-gray-300">
                  Copie o link a seguir ou compartilhe o código para a pessoa entrar em seu bate-papo.
                </h2>
                <div className="flex flex-col items-center justify-center gap-6 p-4">
                  <div className="relative group">
                    <h3 className="flex items-center justify-center gap-2 rounded-xl text-center text-3xl font-bold">
                      {codigo.split('').map((c, index) => (
                        <motion.span 
                          key={index}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="w-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 uppercase shadow-lg"
                        >
                          {c}
                        </motion.span>
                      ))}
                      <CopyButton copy={codigo} text="Copiar" sucessText="Copiado!" />
                    </h3>
                  </div>
                  <motion.span 
                    className="text-2xl font-semibold text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    OU
                  </motion.span>
                  <motion.div 
                    className="flex gap-2 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <span className="rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 p-3 font-semibold text-blue-600 dark:text-blue-400">
                      {process.env.NEXT_PUBLIC_VERCEL_URL}/conversar/{codigo}
                    </span>
                    <CopyButton
                      copy={process.env.NEXT_PUBLIC_VERCEL_URL + '/conversar/' + codigo}
                      text="Copiar"
                      sucessText="Copiado!"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </ModalBody>
            <ModalFooter>
              <Button 
                className="!w-[75%] bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                onPress={() => setHostModal(false)}
              >
                Fechar
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden flex flex-col"
        >
          <ChatComponent.Header className="flex w-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-b border-white/20 dark:border-gray-700/30">
            <ChatComponent.Settings className="flex justify-between w-full items-center gap-2 p-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  onClick={() => setHostModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  COMPARTILHAR
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <IoSettingsSharp
                  size={32}
                  className="text-slate-600 dark:text-slate-300 cursor-pointer lg:hidden hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform"
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                />
              </motion.div>
            </ChatComponent.Settings>
          </ChatComponent.Header>          <ChatComponent.Body className="flex-1 overflow-hidden bg-gradient-to-b from-white/30 to-gray-50/30 dark:from-gray-900/30 dark:to-gray-800/30">
            <MessageList
              ref={messageListRef}
              className={`messageList h-full overflow-y-auto p-6 space-y-4 ${chatCompacto ? 'chat-compact' : ''}`}
            >{mensagens.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Message
                  date={message.date}
                  lingua={message.lingua}
                  ownMessage={message.senderId == userData?.userToken}
                  originalMessage={message.message}
                  senderApelido={message.senderApelido}
                  senderAvatar={message.senderAvatar}
                  senderColor={message.senderColor}
                  compact={chatCompacto}
                  isAudio={message.isAudio}
                >
                  {message.isAudio ? (
                    <audio controls
                    controlsList="nodownload"
                    className="w-full rounded-lg"
                    >
                      <source src={message.message} type="audio/webm" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    message.messageTraduzido
                  )}
                </Message>
              </motion.div>
            ))}
            {messageLoading && (
              <motion.div 
                className="flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Spinner color="primary" size="lg" />
              </motion.div>
            )}
            <AnimatePresence>
              {usersTyping.map(({ userToken, typing }) =>
                typing && userToken !== userData?.userToken && usersRoomData[userToken] && (
                  <motion.div
                    key={userToken}
                    className="flex items-center justify-center gap-3 text-gray-500 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-3 mx-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={usersRoomData[userToken].avatar}
                      alt={usersRoomData[userToken].apelido}
                      width={30}
                      height={30}
                      className="rounded-full border-2"
                      style={{ borderColor: usersRoomData[userToken].color }}
                    />
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-sm font-medium"
                      style={{ color: usersRoomData[userToken].color }}
                    >
                      {usersRoomData[userToken].apelido} está digitando...
                    </motion.span>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </MessageList>
        </ChatComponent.Body>        <ChatComponent.Footer className="flex items-center gap-3 border-t border-white/20 dark:border-gray-700/30 p-6 bg-gradient-to-r from-white/60 to-gray-50/60 dark:from-gray-900/60 dark:to-gray-800/60 backdrop-blur-sm">
          <div className="flex-1">
            <Textarea
              label=""
              placeholder="Digite uma mensagem..."
              minRows={1}
              maxRows={4}
              classNames={{
                input: 'textarea-message p-4 text-base',
                inputWrapper: 'bg-white/95 dark:bg-gray-700/95 backdrop-blur-sm border border-gray-200/60 dark:border-gray-600/60 hover:border-blue-500/60 dark:hover:border-blue-400/60 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl',
              }}
              onChange={handleTextAreaChange}
              onKeyUp={handleTextAreaKeyUp}
              onKeyDown={handleTextAreaKeyDown}
              value={mensagem}
              size="lg"
            />
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              isIconOnly 
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl w-14 h-14"
              size="lg"
            >
              <IoIosSend className={'text-2xl'} />
            </Button>
          </motion.div>          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              isIconOnly 
              onClick={recAudio}
              color={isRecording ? "danger" : "primary"}              className={`${isRecording 
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
              } text-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl w-14 h-14`}
              size="lg"
            >
              <IoMicOutline className={`text-2xl ${isRecording ? 'animate-pulse' : ''}`} />
            </Button>
          </motion.div>
        </ChatComponent.Footer>
      </motion.section>      {isSettingsOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`
          lg:relative lg:w-[400px] lg:flex lg:flex-col lg:h-full
          ${isSettingsOpen 
            ? 'fixed inset-4 md:inset-6 lg:inset-auto z-50 lg:z-0 flex flex-col' 
            : 'hidden lg:flex'
          }
          bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 
          overflow-hidden shadow-2xl transition-all duration-300 ease-in-out 
          lg:bg-white/80 lg:dark:bg-gray-900/80 lg:backdrop-blur-md lg:shadow-2xl
          max-h-screen lg:max-h-none
        `}
      >
        <div className="h-full flex flex-col">
          <div className="flex-none">            <motion.h1 
              className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border-b border-white/20 dark:border-gray-700/30 p-3 md:p-4 font-bold flex items-center justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-xs md:text-sm lg:text-base">
                CONFIGURAÇÕES DA SALA
              </span>
              <motion.button
                className="lg:hidden p-1.5 md:p-2 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-full transition-colors duration-300"
                onClick={() => setIsSettingsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6 text-gray-600 dark:text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.h1>
          </div>

          <div className="flex-1 overflow-y-auto">            <section className="p-3 md:p-4 space-y-3 md:space-y-4">              <motion.div 
                className="space-y-3 md:space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {/* Connection Status */}
                <div className="w-full">
                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl p-3 md:p-4 shadow-md">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' :
                        connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
                        connectionStatus === 'error' ? 'bg-red-500' : 'bg-gray-400'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200">
                          Status da Conexão
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {connectionStatus === 'connected' && 'Conectado ao servidor'}
                          {connectionStatus === 'connecting' && 'Conectando...'}
                          {connectionStatus === 'error' && 'Erro na conexão'}
                          {connectionStatus === 'disconnected' && 'Desconectado'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Compacto Switch */}
                <div className="w-full">
                  <Switch
                    isSelected={chatCompacto}
                    onValueChange={setChatCompacto}                    classNames={{
                      base: 'inline-flex flex-row-reverse gap-2 md:gap-3 !w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 items-center cursor-pointer p-3 md:p-4 border border-white/30 dark:border-gray-700/30 rounded-xl transition-all duration-200 shadow-md',
                      wrapper: 'flex-none',
                      endContent: 'flex-1 min-w-0',
                      label: 'w-full',
                    }}
                  >
                    <div className="flex flex-col gap-1 min-w-0">
                      <p className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">Chat compacto</p>
                      <p className="text-xs md:text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        Ative o modo compacto do chat. Os espaçamentos são menores.
                      </p>
                    </div>
                  </Switch>
                </div>

                {/* Seletor de Língua */}                <motion.div 
                  className="w-full rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 p-3 md:p-4 shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex flex-col gap-2 md:gap-3">
                    <div className="flex flex-col gap-1">
                      <p className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200">Língua de tradução</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Selecione para qual língua as mensagens serão traduzidas
                      </p>
                    </div>
                    
                    <div className="relative">                      <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative z-10 w-full rounded-lg bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-white/40 dark:border-gray-600/40 px-2 md:px-3 py-2 md:py-2.5 text-left hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-sm flex gap-1 md:gap-2 items-center shadow-sm"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <CountryFlag flag={linguaSelecionada?.flag} />
                        <span className="text-gray-800 dark:text-gray-200 truncate flex-1 text-xs md:text-sm">
                          {linguaSelecionada?.label}
                        </span>
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.button>
                        <motion.div
                        className={`absolute z-30 w-full mt-1 rounded-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-white/40 dark:border-gray-700/40 shadow-2xl ${
                          isOpen ? 'block' : 'hidden'
                        }`}
                        style={{ zIndex: 100 }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isOpen && (
                          <div onClick={(e) => e.stopPropagation()}>                      <Input
                        type="text"
                        className="p-2 md:p-4"
                        placeholder="Pesquise uma língua..."
                        onChange={(e) => setLanguagesFilter(e.target.value)}
                        ref={languagesFilterRef}
                        size="sm"
                        classNames={{
                          inputWrapper: 'bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border-0 rounded-t-xl',
                          input: 'text-xs md:text-sm',
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowDown') {
                            const nextIndex = ((selectedIndex ?? 0) + 1) % filteredLanguages.length;
                            setSelectedIndex(nextIndex);
                            const list = document.querySelector('.custom-scrollbars');
                            const item = list?.children[nextIndex] as HTMLElement;
                            if (item) {
                              item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }
                          } else if (e.key === 'ArrowUp') {
                            const prevIndex =
                              ((selectedIndex ?? 0) - 1 + filteredLanguages.length) % filteredLanguages.length;
                            setSelectedIndex(prevIndex);
                            const list = document.querySelector('.custom-scrollbars');
                            const item = list?.children[prevIndex] as HTMLElement;
                            if (item) {
                              item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }
                          } else if (e.key === 'Enter' && selectedIndex !== undefined) {
                            handleLanguageChange(filteredLanguages[selectedIndex].value);
                            setIsOpen(false);
                            setLanguagesFilter("");
                          }
                        }}
                      />                      <ul className="py-1 h-[15rem] md:h-[17rem] overflow-y-scroll custom-scrollbars text-small">
                        {filteredLanguages.map((idioma, index) => (
                          <motion.li
                            key={idioma.value}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <button
                              onClick={() => {
                                handleLanguageChange(idioma.value);
                                setIsOpen(false);
                                setLanguagesFilter("");
                              }}
                              className={`block w-full px-4 py-3 hover:bg-blue-500/10 dark:hover:bg-blue-400/10 text-left transition-colors duration-200 ${index === selectedIndex ? 'bg-blue-500/20 dark:bg-blue-400/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                                }`}
                            >
                              <div className="flex items-center flex-wrap gap-1">
                                <CountryFlag flag={idioma.flag} />
                                <span className="ml-2 font-medium text-sm md:text-base">{idioma.label}</span>
                                <p className="ml-2 text-tiny text-gray-500 dark:text-gray-400 hidden md:block">{idioma.description}</p>
                              </div>
                            </button>
                          </motion.li>
                        ))}                      </ul>
                    </div>
                  )}
                </motion.div>                {isOpen && <div className="fixed inset-0" onClick={() => setIsOpen(false)} style={{ zIndex: 99 }} />}
                  </div>
              </div>
            </motion.div>
              </motion.div>
            </section>
          </div>
          
          <motion.div 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm m-2 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}          ><h2 className="text-sm md:text-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-t-xl p-3 md:p-4 font-semibold flex items-center gap-2 border-b border-white/20 dark:border-gray-700/30">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-gray-800 dark:text-gray-200">Usuários Online</span>
          </h2><div className="flex flex-col gap-2 md:gap-3 p-3 md:p-4 max-h-60 md:max-h-80 overflow-y-auto">
            {Object.entries(usersRoomData).length > 0 ? (
              Object.values(usersRoomData).map((user, index) => (
                <motion.div
                  key={user.userToken}
                  className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl hover:bg-white/60 dark:hover:bg-gray-700/60 backdrop-blur-sm transition-all duration-200 border border-transparent hover:border-white/30 dark:hover:border-gray-600/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative flex-shrink-0">
                    <Image
                      src={user.avatar}
                      alt={user.apelido}
                      width={50}
                      height={50}
                      className={`md:w-[60px] md:h-[60px] rounded-full border-2 p-1 md:p-2 bg-white dark:bg-transparent shadow-lg`}
                      style={{ borderColor: user.color, backgroundColor: user.color }}
                    />
                    {user.host && (
                      <div className="absolute -top-1 -right-1 text-lg md:text-xl">👑</div>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm md:text-medium font-medium flex items-center gap-1 text-gray-800 dark:text-gray-200 truncate" style={{ color: user.color }}>
                      {user.apelido}
                    </span>
                    <span className="text-xs md:text-tiny text-gray-600 dark:text-gray-400">
                      {user.host ? 'Anfitrião' : 'Convidado'}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="text-center p-4 text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Nenhum usuário conectado
              </motion.div>            )}          </div>
        </motion.div>
        </div>
      </motion.aside>
      </div>
    </div>
  );
}

