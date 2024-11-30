'use client';

import ChatComponent from '@/app/components/chat/Chat.tsx';
import Message from '@/app/components/chat/Message.tsx';
import MessageList from '@/app/components/chat/MessageList.tsx';
import { CountryFlag } from '@/app/components/countryFlags.tsx';
import CopyButton from '@/app/components/functionals/CopyButton.tsx';
import linguagens from '@/app/locales/languages.json';
import { descriptografarUserData, criptografarUserData, criptografar } from '@/app/utils/crypto/main.ts';
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
} from '@nextui-org/react';
import { useDebounce } from '@uidotdev/usehooks';
import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { IoIosSend } from 'react-icons/io';
import { IoSettingsSharp } from 'react-icons/io5';
import { Socket, io } from 'socket.io-client';
import { useChat } from '@/app/hooks/useChat';
import Image from 'next/image';
import { getUsersRoomData } from '@/app/utils/roomManagement/getUsersRoomData';
import { gerarNomeAnimalAleatorio } from '@/app/utils/generators/randomAnimalName';

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
  const [usersRoomData, setUsersRoomData] = useState<{
    [key: string]: {
      apelido: string;
      avatar: string;
      color: string;
      token: string;
      userToken: string;
      host: boolean;
      isTyping?: boolean;
    };
  }>({});
  const [isOpen, setIsOpen] = useState(false);
  const languagesFilterRef = useRef<HTMLInputElement>(null);
  const [languagesFilter, setLanguagesFilter] = useState<string>('');
  const languagesFilterDebounced = useDebounce(languagesFilter, 500);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);
  const [showUserAlreadyInRoom, setShowUserAlreadyInRoom] = useState(false);
  const [apelido, setApelido] = useState('');

  const codigo = React.use(params).codigo;

  const {
    mensagens,
    mensagem,
    setMensagem,
    messageLoading,
    setPessoasConectadas,
    handleMessage,
    sendMessage,
    onLinguaChange,
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

      const userData = cookies.talktalk_userdata;
      const roomToken = cookies.talktalk_roomid;

      if (!userData || !roomToken) {
        setShowNameInput(true);
        return;
      }

      try {
        const userDataDecrypt = await descriptografarUserData(userData as string);

        const isValidRoom = sala.token == userDataDecrypt.token;

        if (!userDataDecrypt || !userDataDecrypt.apelido || !userDataDecrypt.userToken || !isValidRoom) {
          setShowNameInput(true);
          return;
        }

        setUserData(userDataDecrypt);

        if (userDataDecrypt.userToken === sala.hostToken) {
          setIsHost(true);
          setHostModal(true);
          setUsersRoomData((prev) => {
            return {
              [userDataDecrypt.userToken]: {
                ...userDataDecrypt,
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

  const handleUserDisconnected = (userToken: string) => {
    setUsersRoomData((prev) => {
      const newData = { ...prev };
      delete newData[userToken];
      return newData;
    });
    setPessoasConectadas((prev) => Number(prev) - 1);
  };

  const handleUserConnected = async (userCookie: any) => {
    try {
      // Verifica se o userCookie é um objeto ou string criptografada
      if (!userCookie || typeof userCookie !== 'string') {
        console.error('Dados do usuário inválidos');
        return;
      }

      let userDetails;
      try {
        userDetails = await descriptografarUserData(userCookie);
      } catch (error) {
        console.error('Erro ao descriptografar dados do usuário:', error);
        return;
      }

      if (!userDetails || !userDetails.userToken) {
        console.error('Dados do usuário inválidos após descriptografia');
        return;
      }

      // Verifica se o usuário já existe antes de atualizar o estado
      const userExists = usersRoomData[userDetails.userToken];
      if (userExists) {
        console.log('Usuário já existe na sala:', userDetails.userToken);
        return;
      }

      const newUserData = {
        ...userDetails,
        isTyping: false,
        lastActivity: new Date().toISOString(),
      };

      const roomHost = (await getUsersRoomData(codigo)).find((user: any) => user.host);

      const hostUserData = roomHost?.userData;
      if (hostUserData) {
        const roomHostUser = await descriptografarUserData(hostUserData);

        setUsersRoomData((prev) => ({
          ...prev,
          [roomHostUser.userToken]: {
            ...roomHostUser,
            host: true,
            isTyping: false,
            lastActivity: new Date().toISOString(),
          },
          [userDetails.userToken]: {
            ...newUserData,
            isTyping: false,
            lastActivity: new Date().toISOString(),
          },
        }));
      }

      setPessoasConectadas((prev) => Number(prev) + 1);
    } catch (error) {
      console.error('Erro ao processar dados do usuário:', error);
    }
  };

  useEffect(() => {
    if (!socketClient) return;

    const handleConnect = () => {
      console.log('Conectado ao servidor');
      if (userData) {
        socketClient.emit('join-room', codigo);
      }
    };

    socketClient.on('connect', handleConnect);
    socketClient.on('user-connected', handleUserConnected);
    socketClient.on('user-disconnected', handleUserDisconnected);
    socketClient.on('message', handleMessage);
    socketClient.on('room-update', (users) => {
      setUsersRoomData((prev) => {
        return users;
      });
    });
  }, [socketClient, codigo]);
  useEffect(() => {
    if (socketClient) {
      socketClient.emit('join-room', codigo);
    }
  }, [socketClient, codigo]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 200;
    }
  }, [mensagens]);

  const handleTextAreaChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMensagem(e.target.value);
  }, []);

  const handleTextAreaKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement> | KeyboardEvent) => {
      if (e.key === 'Shift') {
        setShiftPressed(false);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (shiftPressed) {
          setMensagem((prev) => prev + '\n');
        } else if (mensagem.trim()) {
          sendMessage();
        }
      }

      if (userData?.userToken) {
        socketClient?.emit('typing', true, userData.userToken, codigo);
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

  const connectToRoom = useCallback(
    async (bypass: boolean) => {
      try {
        console.log('[DEBUG] Iniciando connectToRoom com bypass:', bypass);

        // Obtém o nickname
        let nickname = userName;
        if (!nickname) {
          nickname = RandomNicks.get();
          console.log('[DEBUG] Nickname gerado:', nickname);
        }

        // Busca dados da sala
        const sala = await fetchRoom(codigo);
        console.log('[DEBUG] Dados da sala:', sala);

        if (!sala) {
          console.log('[DEBUG] Sala não encontrada');
          setShowErrorModal(true);
          return;
        }

        // Verifica se pode prosseguir
        if (userName.trim() || bypass) {
          console.log('[DEBUG] Prosseguindo com a conexão');

          if (!bypass) {
            console.log('[DEBUG] Gerando novo usuário');
            const englishName = RandomNicks.getEnglish(RandomNicks.get());
            const payload = {
              apelido: nickname,
              avatar: `/images/avatars/${englishName.toLowerCase()}.png`,
              color: RandomAvatarColor.get().hex,
              token: sala.token,
              userToken: RandomToken.get(),
            };
            console.log('[DEBUG] Payload gerado:', payload);

            const payloadEncrypted = await criptografarUserData(payload);
            console.log('[DEBUG] Payload criptografado:', payloadEncrypted);

            const roomPayload = { token: sala.token, hostToken: sala.hostToken };
            const roomPayloadEncrypted = await criptografar(JSON.stringify(roomPayload));
            console.log('[DEBUG] Room payload criptografado:', roomPayloadEncrypted);

            // Salva cookies
            setCookies('talktalk_userdata', payloadEncrypted.dadoCriptografado, {
              expires: undefined,
              sameSite: 'strict',
              path: '/',
            });
            setCookies('talktalk_roomid', roomPayloadEncrypted, {
              expires: undefined,
              sameSite: 'strict',
              path: '/',
            });

            window.location.reload();
          }

          setShowNameInput(false);

          const socket = io(`http://${process.env.NEXT_PUBLIC_SOCKET_URL}:3001`, {
            transports: ['websocket', 'polling'],
            withCredentials: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
          });

          // Emite o evento join-room diretamente com o socket criado
          socket.emit('join-room', codigo);

          // Configura listeners do socket
          socket.on('connect_error', (error) => {
            console.error('[DEBUG] Erro na conexão do socket:', error);
          });

          // Só então atualiza o estado
          setSocketClient(socket);
        }
      } catch (error) {
        console.error('[DEBUG] Erro em connectToRoom:', error);
      }
    },
    [userName]
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

  if (showErrorModal) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-bold">Sala Cheia ou indisponível</h2>
        <p className="mt-2 text-gray-600">
          Desculpe, mas ocorreu algum erro ao entrar na sala. Por favor, tente novamente mais tarde.
        </p>
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
        <p className="mt-2 text-gray-400">Para entrar na sala, digite um apelido (opcional):</p>
        <input
          type="text"
          className="mt-2 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
          placeholder="Seu nome"
          value={userName}
          onChange={handleNameInputChange}
        />
        <div className="*:block">
          <span>Não se preocupe caso não insira um apelido. Será gerado um apelido aleatório para você!</span>
          <span>Além disto, será também gerado um avatar aleatório independentemente do apelido que inserir.</span>
        </div>
        <Button onClick={() => connectToRoom(false)}>Entrar</Button>
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
        hideCloseButton
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
      <section className="w-[90%] rounded-md bg-[var(--chat-bg-geral)] shadow dark:shadow-slate-900 lg:w-[60%]">
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
              className="text-slate-600 dark:text-slate-300 cursor-pointer"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            />
          </ChatComponent.Settings>
        </ChatComponent.Header>
        <ChatComponent.Body>
          <MessageList ref={messageListRef}>
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
              >
                {message.messageTraduzido || message.message}
              </Message>
            ))}
            {messageLoading && (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            )}
            {/* {Object.entries(isTyping).map(
              ([user, typing]) =>
                typing &&
                user !== userData?.userToken && (
                  <div key={user} className="flex items-center justify-center">
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-xl font-semibold"
                    >
                      {usersRoomData[user].apelido} está digitando...
                    </motion.span>
                  </div>
                )
            )} */}
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
        </ChatComponent.Footer>
      </section>
      <aside
        className={`ml-2 lg:h-full rounded-md bg-[var(--chat-bg-geral)] absolute lg:relative h-full flex flex-col lg:flex ${
          isSettingsOpen ? 'flex' : 'hidden'
        }`}
      >
        <h1 className="rounded-md bg-[var(--chat-bg-header)] p-2 text-center font-bold">CONFIGURAÇÕES DA SALA</h1>
        <section className="flex-1">
          <div className="m-2 flex flex-col gap-4">
            <Switch
              classNames={{
                base: 'inline-flex flex-row-reverse gap-2 w-full max-w-md bg-[--chat-bg-buttons] hover:bg-content2 items-center cursor-pointer p-4 border-2 border-transparent rounded-md transition-all duration-200',
                wrapper: '',
              }}
            >
              <div className="flex flex-col gap-1">
                <p className="text-medium font-semibold">Chat compacto</p>
                <p className="text-tiny text-default-600">
                  Ative o modo compacto do chat. Os espaçamentos são menores.
                </p>
              </div>
            </Switch>
            <div className="flex w-full flex-col gap-2 rounded-md bg-[--chat-bg-buttons] p-4">
              <div className="flex flex-col gap-1">
                <p className="text-medium font-semibold">Idioma de tradução</p>
                <p className="text-tiny text-default-600">Selecione para qual idioma as mensagens serão traduzidas</p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="relative z-10 w-full rounded-md bg-[--chat-bg-buttons-secondary] px-4 py-3 pr-8 text-left hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm flex gap-2 items-center"
                >
                  <CountryFlag flag={linguaSelecionada?.flag} />
                  {linguaSelecionada?.label}
                </button>
                <div
                  className={`absolute z-20 w-full rounded-md bg-white dark:bg-[var(--chat-bg-buttons)] shadow-lg ${
                    isOpen ? 'block' : 'hidden'
                  }`}
                  style={{ zIndex: 100 }}
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
                          }
                        }}
                      />
                      <ul className="py-1 h-[17rem] overflow-y-scroll custom-scrollbars text-small text-gray-700">
                        {filteredLanguages.map((idioma, index) => (
                          <li key={idioma.value}>
                            <button
                              onClick={() => {
                                updateLanguage(idioma.value);
                                setIsOpen(false);
                              }}
                              className={`block w-full px-4 py-2 hover:bg-gray-600 ${
                                index === selectedIndex ? 'bg-zinc-600 text-white' : ''
                              }`}
                            >
                              <div className="flex items-center">
                                <CountryFlag flag={idioma.flag} />
                                <span className="ml-2 text-default-800">{idioma.label}</span>
                                <p className="ml-2 text-tiny text-default-600">{idioma.description}</p>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
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
              Object.values(usersRoomData).map((user) => (
                <div
                  key={user.userToken}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors duration-200"
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
                </div>
              ))
            ) : (
              <div className="text-center p-4 text-gray-500 dark:text-gray-400">Nenhum usuário conectado</div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

