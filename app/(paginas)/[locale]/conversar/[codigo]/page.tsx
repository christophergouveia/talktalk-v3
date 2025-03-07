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

export default function RoomPage({ params }: RoomPageProps) {
  const [linguaSelecionada, setLinguaSelecionada] = useState<{ label: string; value: string; flag: string }>({
    label: 'Português',
    value: 'pt',
    flag: 'PT',
  });

  const [socketClient, setSocketClient] = useState<Socket | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
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
    if (isOpen && languagesFilterRef.current) {
      languagesFilterRef.current?.focus();
    }
    setSelectedIndex(undefined);
  }, [isOpen]);

  useEffect(() => {
    if (!apelido) {
      setApelido(gerarNomeAnimalAleatorio());
    }
  }, []);

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

      if (userData == undefined || roomToken == undefined) {
        setShowNameInput(true);
        return;
      }

      try {
        const userDataDecrypt = await descriptografarUserData(userData as string);

        const isValidRoom = sala.token == userDataDecrypt.data.token;

        if (!userDataDecrypt || !userDataDecrypt.data.apelido || !userDataDecrypt.data.userToken || !isValidRoom) {
          setShowNameInput(true);
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
        setShowNameInput(true);
      }
    } catch (error) {
      console.error('Erro ao buscar sala:', error);
      setShowErrorModal(true);
    }
  }, [codigo]);



  useEffect(() => {
    fetchSala();

    return () => {
      if (socketClient) {
        socketClient.disconnect();
        socketClient.off('user-connected');
        socketClient.off('user-disconnected');
        socketClient.off('message');
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!socketClient) return;

    const handleConnect = () => {
      console.log('Conectado ao servidor');
      if (userData) {
        const userDataString = JSON.stringify(userData);
        socketClient.emit('join-room', codigo, userDataString);
      }
    };

    const handleUsersUpdate = async (users: any[]) => {
      console.log('[DEBUG] Users Update Received: ', users);
      const usersMap: { [key: string]: UserData } = {};

      for (const user of users) {
        try {
          if (user.userData) {
            if (typeof user.userData == 'string') {
              const userDataDecrypted = await descriptografarUserData(user.userData);
              const isUserHost = userDataDecrypted.data.userToken === salaData?.hostToken;
              usersMap[userDataDecrypted.data.userToken] = {
                ...userDataDecrypted.data,
                host: isUserHost,
                isTyping: false,
                lastActivity: new Date().toISOString(),
              };
            } else {
              const isUserHost = user.userData.userToken === salaData?.hostToken;
              usersMap[user.userData.userToken] = {
                ...user.userData,
                host: isUserHost,
                isTyping: false,
                lastActivity: new Date().toISOString(),
              };
            }
          }
        } catch (error) {
          console.error('Erro ao processar dados do usuário:', error);
        }
      }

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
    socketClient.on('users-typing', handleUsersTyping);

    return () => {
      socketClient.off('connect', handleConnect);
      socketClient.off('users-update', handleUsersUpdate);
      socketClient.off('user-disconnected', handleUserDisconnected);
      socketClient.off('message', handleMessage);
      socketClient.off('users-typing', handleUsersTyping);
    };
  }, [socketClient, codigo, userData, salaData]);

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
  }, [emitTypingStatus]);

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
    [shiftPressed, mensagem, sendMessage, userData, socketClient, codigo, linguaSelecionada.value]
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
              lingua: linguaSelecionada.value,
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

  const connectToRoom = useCallback(
    async (bypass: boolean) => {
      try {
        if (bypass) {
          console.log('[DEBUG] Bypass ativado, conectando diretamente ao socket');
          const socket = io(`http://${process.env.NEXT_PUBLIC_SOCKET_URL}:3001`, {
            withCredentials: true,
            transports: ['websocket'],
            reconnection: false,
            forceNew: true,
            autoConnect: false,
          });

          socket.once('connect', () => {
            console.log('[DEBUG] Socket conectado:', socket.id);
            setShowNameInput(false);
          });

          socket.on('error', (error) => {
            console.error('[DEBUG] Erro do socket:', error);
          });

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

        const nickname = userName.trim() || avatarDetails.avatarName;
        const payload = {
          apelido: nickname,
          avatar: avatarDetails.avatarURL,
          color: avatarColor,
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
        });

        // Define os dados do usuário antes de criar o socket
        setUserData(payload);

        // Cria e configura o socket apenas uma vez
        const socket = io(`http://${process.env.NEXT_PUBLIC_SOCKET_URL}:3001`, {
          withCredentials: true,
          transports: ['websocket'],
          reconnection: false,
          forceNew: true,
          autoConnect: false,
        });

        // Configura os eventos antes de conectar
        socket.once('connect', () => {
          console.log('[DEBUG] Socket conectado:', socket.id);
          const userDataString = JSON.stringify(payload);
          socket.emit('join-room', codigo, userDataString);
          setShowNameInput(false);
        });

        socket.on('error', (error) => {
          console.error('[DEBUG] Erro do socket:', error);
        });

        // Conecta o socket
        socket.connect();
        setSocketClient(socket);
      } catch (error) {
        console.error('[DEBUG] Erro em connectToRoom:', error);
      }
    },
    [userName, avatarDetails, avatarColor, codigo, userData]
  );

  const updateLanguage = useCallback((value: string) => {
    const selectedLanguage = linguagens.find((item) => item.value === value);
    if (selectedLanguage) {
      setLinguaSelecionada({
        flag: selectedLanguage.flag,
        label: selectedLanguage.description,
        value: selectedLanguage.value,
      });
    }
    onLinguaChange(value);
  }, []);

  useEffect(() => {
    onLinguaChange(linguaSelecionada.value);
  }, []);

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
  }, []);

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

  const renderMessage = (message: any) => {
    if (message.type === 'audio') {
      return (
        <audio 
          controls 
          src={message.message}
          className="max-w-[300px] rounded-lg"
        />
      );
    }
    return message.messageTraduzido || message.message;
  };

  if (showErrorModal) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-bold">Sala Cheia ou indisponível</h2>
        <p className="mt-2 text-gray-600">
          Desculpe, mas ocorreu algum erro ao entrar na sala. Por favor, tente novamente mais tarde.
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
  }

  if (showNameInput) {
    return (
      <div className="flex w-fit mx-auto p-6 rounded-md flex-col items-center justify-center gap-4 text-center bg-[#232124]">
        <h2 className="text-2xl font-bold">Bem-vindo à sala!</h2>

        <div className="relative group">
          <Image
            src={avatarDetails.avatarURL || '/images/avatars/default.png'}
            alt="Avatar Preview"
            width={100}
            height={100}
            className="rounded-full border-4 p-2"
            style={{ borderColor: avatarColor, backgroundColor: avatarColor }}
          />

          <button
            onClick={() => setColorModalOpenned(true)}
            className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
              </svg>
              <span className="text-xs mt-1">Mudar cor</span>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: avatarColor }} />
          <span className="text-sm text-gray-400">Cor selecionada</span>
        </div>

        <p className="mt-2 text-gray-400">Para entrar na sala, digite um apelido (opcional):</p>
        <input
          type="text"
          className="mt-2 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
          placeholder="Seu nome"
          value={userName}
          onChange={handleNameInputChange}
        />
        <AvatarSelector
          onAvatarSelect={(avatar, url) => setAvatarDetails({ avatarURL: url, avatarName: avatar })}
          color={avatarColor}
          getRandomAvatar={getRandomAvatar}
        />
        <ColorSelector
          onSelectColor={handleSelectColor}
          isOpen={isColorModalOpenned}
          onModalClose={() => setColorModalOpenned(false)}
        />
        <div className="*:block text-sm text-gray-400">
          <span>Não se preocupe caso não insira um apelido.</span>
          <span>Será utilizado o nome do avatar selecionado!</span>
        </div>

        <Button
          onClick={() => connectToRoom(false)}
          className="w-full bg-gradient-to-r from-[#38A3F5] to-[#6F90F2] hover:opacity-90 transition-opacity text-white font-semibold"
          size="lg"
        >
          Entrar na Sala
        </Button>
      </div>
    );
  }

  if (socketClient == null) {
    return null;
  }

  return (
    <div className="mt-6 flex h-full items-center justify-center">
      <Modal
        isOpen={hostModal}
        backdrop="opaque"
        size="2xl"
        isDismissable
        onKeyUp={(e) => e.key === 'Escape' && setHostModal(false)}
        onClose={() => setHostModal(false)}
        classNames={{
          footer: 'justify-center',
          backdrop: 'bg-[#6F90F2]/30',
        }}
      >
        <ModalContent>
          <>
            <ModalBody>
              <h1 className="text-center text-3xl font-extrabold">VOCÊ É O ANFITRIÃO DA SALA!</h1>
              <h2 className="text-center text-xl">
                Copie o link a seguir ou compartilhe o código para a pessoa entrar em seu bate-papo.
              </h2>
              <div className="flex flex-col items-center justify-center gap-3 p-2">
                <h3 className="flex items-center justify-center gap-2 rounded-md text-center text-3xl font-bold text-[#6F90F2]">
                  {codigo.split('').map((c, index) => (
                    <span className="w-12 rounded-lg bg-slate-800 p-2 uppercase" key={index}>
                      {c}
                    </span>
                  ))}
                  <CopyButton copy={codigo} text="Copiar" sucessText="Copiado!" />
                </h3>
                <span className="text-2xl font-semibold">OU</span>
                <div className="flex gap-2">
                  <span className="rounded-md bg-slate-800 p-2 font-semibold text-[#6F90F2]">
                    {process.env.NEXT_PUBLIC_VERCEL_URL}/conversar/{codigo}
                  </span>
                  <CopyButton
                    copy={process.env.NEXT_PUBLIC_VERCEL_URL + '/conversar/' + codigo}
                    text="Copiar"
                    sucessText="Copiado!"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button className="!w-[75%]" color="danger" onPress={() => setHostModal(false)}>
                Fechar
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
      <section className="w-[90%] lg:w-[55%] rounded-md bg-[var(--chat-bg-geral)] shadow dark:shadow-slate-900">
        <ChatComponent.Header className="flex w-full bg-[var(--chat-bg-header)]">
          <ChatComponent.Settings className="flex justify-between w-full items-center gap-2 p-4">
            <Button
              onClick={() => setHostModal(true)}
              className="bg-gradient-to-r from-[#38A3F5] to-[#6F90F2] dark:from-[#2563eb] dark:to-[#4f46e5] text-white dark:text-slate-100 font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              COMPARTILHAR
            </Button>
            <IoSettingsSharp
              size={32}
              style={{ marginRight: '1rem' }}
              className="text-slate-600 dark:text-slate-300 cursor-pointer lg:hidden"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            />
          </ChatComponent.Settings>
        </ChatComponent.Header>
        <ChatComponent.Body className="h-[calc(100vh-20rem)] select-none overflow-hidden bg-[var(--chat-bg-geral)]">
          <MessageList
            ref={messageListRef}
            className={`messageList h-full overflow-y-auto p-4 ${chatCompacto ? 'chat-compact' : ''}`}
          >
            {mensagens.map((message, index) => (
              <Message
                key={index}
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
                {renderMessage(message)}
              </Message>
            ))}
            {messageLoading && (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            )}
            <AnimatePresence>
              {usersTyping.map(({ userToken, typing }) =>
                typing && userToken !== userData?.userToken && usersRoomData[userToken] && (
                  <motion.div
                    key={userToken}
                    className="flex items-center justify-center gap-2 text-gray-500"
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
                      className="rounded-full"
                    />
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-sm"
                      style={{ color: usersRoomData[userToken].color }}
                    >
                      {usersRoomData[userToken].apelido} está digitando...
                    </motion.span>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </MessageList>
        </ChatComponent.Body>
        <ChatComponent.Footer className="flex items-center gap-3 border-t-2 border-t-slate-400 p-3">
          <Textarea
            label=""
            placeholder="Digite uma mensagem..."
            minRows={1}
            maxRows={3}
            classNames={{
              input: 'textarea-message p-2',
            }}
            onChange={handleTextAreaChange}
            onKeyUp={handleTextAreaKeyUp}
            onKeyDown={handleTextAreaKeyDown}
            value={mensagem}
            size="sm"
          />
          <Button isIconOnly onClick={sendMessage}>
            <IoIosSend className={'text-2xl'} />
          </Button>
          <Button 
            isIconOnly 
            onClick={recAudio}
            color={isRecording ? "danger" : "primary"}
          >
            <IoMicOutline className={`text-2xl ${isRecording ? 'animate-pulse' : ''}`} />
          </Button>
        </ChatComponent.Footer>
      </section>

      {isSettingsOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <aside
        className={`
          lg:relative lg:w-[400px] lg:ml-4 lg:flex lg:flex-col lg:h-full lg:shadow-none
          fixed w-[calc(100%-2rem)] h-[calc(95%-2rem)] top-8 bg-[var(--chat-bg-geral)] overflow-y-auto shadow-xl p-4
          ${isSettingsOpen
            ? 'left-[50%] translate-x-[-50%] z-50 rounded-md lg:left-0 lg:translate-x-0 lg:z-0'
            : 'left-[150%] lg:left-0'
          }
          transition-[left] duration-300 ease-in-out lg:transition-none
        `}
      >
        <div className="sticky top-0 z-10">
          <h1 className="rounded-md bg-[var(--chat-bg-header)] p-4 text-center font-bold flex items-center justify-between">
            <span>CONFIGURAÇÕES DA SALA</span>
            <motion.button
              className="lg:hidden p-2 hover:bg-[var(--chat-bg-buttons)] rounded-full"
              onClick={() => setIsSettingsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </h1>
        </div>

        <section className="flex-1 p-4">
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <Switch
                isSelected={chatCompacto}
                onValueChange={setChatCompacto}
                classNames={{
                  base: 'inline-flex flex-row-reverse gap-2 !w-full bg-[--chat-bg-buttons] hover:bg-content2 items-center cursor-pointer p-4 border-2 border-transparent rounded-md transition-all duration-200',
                  wrapper: '',
                  endContent: 'w-full',
                  label: 'w-full',
                }}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-medium font-semibold">Chat compacto</p>
                  <p className="text-tiny text-default-600">
                    Ative o modo compacto do chat. Os espaçamentos são menores.
                  </p>
                </div>
              </Switch>
            </div>
            <div className="flex w-full flex-col gap-2 rounded-md bg-[--chat-bg-buttons] p-4">
              <div className="flex flex-col gap-1">
                <p className="text-medium font-semibold">Língua de tradução</p>
                <p className="text-tiny text-default-600">Selecione para qual língua as mensagens serão traduzidas</p>
              </div>
              <div className="relative">
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  className="relative z-10 w-full rounded-md bg-[--chat-bg-buttons-secondary] px-4 py-3 pr-8 text-left hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm flex gap-2 items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CountryFlag flag={linguaSelecionada?.flag} />
                  {linguaSelecionada?.label}
                </motion.button>
                <motion.div
                  className={`absolute z-20 w-full rounded-md bg-white dark:bg-[var(--chat-bg-buttons)] shadow-lg ${isOpen ? 'block' : 'hidden'
                    }`}
                  style={{ zIndex: 100 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen && (
                    <div onClick={(e) => e.stopPropagation()}>
                      <Input
                        type="text"
                        className="p-4"
                        placeholder="Pesquise uma língua..."
                        onChange={(e) => setLanguagesFilter(e.target.value)}
                        ref={languagesFilterRef}
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
                            updateLanguage(filteredLanguages[selectedIndex].value);
                            setIsOpen(false);
                            setLanguagesFilter("");
                          }
                        }}
                      />
                      <ul className="py-1 h-[17rem] overflow-y-scroll custom-scrollbars text-small text-gray-700">
                        {filteredLanguages.map((idioma, index) => (
                          <motion.li
                            key={idioma.value}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <button
                              onClick={() => {
                                updateLanguage(idioma.value);
                                setIsOpen(false);
                                setLanguagesFilter("");
                              }}
                              className={`block w-full px-4 py-2 hover:bg-gray-600 ${index === selectedIndex ? 'bg-zinc-600 text-white' : ''
                                }`}
                            >
                              <div className="flex items-center">
                                <CountryFlag flag={idioma.flag} />
                                <span className="ml-2 text-default-800">{idioma.label}</span>
                                <p className="ml-2 text-tiny text-default-600">{idioma.description}</p>
                              </div>
                            </button>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
                {isOpen && <div className="fixed inset-0" onClick={() => setIsOpen(false)} style={{ zIndex: 99 }} />}
              </div>
            </div>
          </div>
        </section>
        <div className="bg-white dark:bg-zinc-900 m-2 rounded-md shadow-sm border border-gray-200 dark:border-zinc-800">
          <h2 className="text-medium bg-gray-50 dark:bg-zinc-800 rounded-t-md p-3 font-semibold flex items-center gap-2 border-b border-gray-200 dark:border-zinc-700">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Usuários Online
          </h2>
          <div className="flex flex-col gap-3 p-3">
            {Object.entries(usersRoomData).length > 0 ? (
              Object.values(usersRoomData).map((user, index) => (
                <motion.div
                  key={user.userToken}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Image
                    src={user.avatar}
                    alt={user.apelido}
                    width={60}
                    height={60}
                    className={`rounded-full border-2 p-2 bg-white dark:bg-transparent`}
                    style={{ borderColor: user.color, backgroundColor: user.color }}
                  />
                  <div className="flex flex-col">
                    <span className="text-medium font-medium flex items-center gap-1" style={{ color: user.color }}>
                      {user.apelido} {user.host && <span>👑</span>}
                    </span>
                    <span className="text-tiny text-gray-600 dark:text-gray-400">
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
              </motion.div>
            )}
            
          </div>
        </div>
      </aside>
    </div>
  );
}

