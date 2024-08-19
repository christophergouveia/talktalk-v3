'use client';

import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import Avatar from 'react-avatar';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, Select, SelectItem, Switch } from '@nextui-org/react';
import { Textarea } from '@nextui-org/react';
import { IoSettingsSharp } from 'react-icons/io5';
import { IoIosSend } from 'react-icons/io';
import { MessageList } from '@/app/components/chats/messageListComponent';
import Message from '@/app/components/chats/messageComponent';
import ChatComponent from '@/app/components/chats/chatComponent';
import { Socket, io } from 'socket.io-client';
import { dadosAvatares, MessageType } from '@/app/interfaces/chat';
import { CountryFlag } from '@/app/components/countryFlags';
import { useCookies } from 'react-cookie';
import linguagens from '@/app/locales/languages.json';
import CopyButton from '@/app/components/functionals/copyButton';
import { cleanMessage } from '@/app/utils/formatters/cleanMessage';
import fetchRoom from '@/app/utils/roomManagement/fetchRoom';
import moment from "moment-timezone";
import fetchRoomUsers from "@/app/utils/roomManagement/fetchRoomUsers";

export default function RoomPage({ params }: { params: { codigo: string } }) {
  const [linguaSelecionada, setLinguaSelecionada] = useState<{
    label: string;
    value: string;
  } | null>({ label: 'Português', value: 'pt_br' });
  const [socketClient, setSocketClient] = useState<Socket | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [usuarios, setUsuarios] = useState<string[]>([]);
  const [mensagem, setMensagem] = useState<string>('');
  const [mensagens, setMensagens] = useState<MessageType[]>([]);
  const [pessoasConectadas, setPessoasConectadas] = useState(0);
  const [hostModal, setHostModal] = useState<boolean>(true);
  const [cookies, setCookie, removeCookie] = useCookies(['talktalk_roomid']);
  const messageListRef = useRef<HTMLDivElement>(null);
  const [shiftPressed, setShiftPressed] = useState<boolean>(false);
  const [host, setHost] = useState<boolean | null>(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => console.log(pessoasConectadas), [pessoasConectadas]);

  useEffect(() => {
    async function fetchSala() {
      const sala = await fetchRoom(params.codigo);
      const salas_usuarios = await fetchRoomUsers(params.codigo);
      if(!salas_usuarios) return null;
      if (sala == null) {
        return setShowErrorModal(true);
      } else {
        // Verifica se o cookie existe e se a sala é a mesma
        const roomId = cookies['talktalk_roomid'];
        if (!roomId || roomId.split('.')[0] !== params.codigo) {
          setShowNameInput(true);
        } else {
          setSocketClient(io(process.env.NEXT_PUBLIC_SOCKET_URL + ':3001'));
        }
      }
    }
    fetchSala();
    return () => {
      socketClient?.off('user-connected');
      socketClient?.off('user-disconnected');
      socketClient?.off('message');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.codigo]);

  useEffect(() => {
    socketClient?.on('user-connected', async() => {
      setPessoasConectadas((prevCount) => prevCount + 1);
    });
    socketClient?.on('user-disconnected', () => {
      setPessoasConectadas((prevCount) => prevCount - 1);
    });
    socketClient?.emit('join-room', params.codigo);
    socketClient?.on('message', async (message) => {
      const clientTz = moment.tz.guess(true);
      const data = moment(message.date);
      data.tz(clientTz);
      setMensagens((mensagens) => [
        ...mensagens,
        {
          message: message.message,
          senderId: message.socketId,
          date: data
        },
      ]);
    });
  }, [socketClient, params.codigo]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 200;
    }
  }, [mensagens, messageListRef]);

  const languageOptions = useMemo(function languageOptions() {
    return linguagens.map((idioma) => (
      <SelectItem key={idioma.value} value={idioma.value} startContent={<CountryFlag flag={idioma.flag} />}>
        {idioma.label}
        <p className="text-tiny text-default-600">{idioma.description}</p>
      </SelectItem>
    ));
  }, []);

  const sendMessage = () => {
    socketClient?.emit('sendMessage', cleanMessage(mensagem), socketClient?.id, params.codigo);
    setMensagem('');
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMensagem(e.target.value);
  };

  const handleTextAreaKeyUp = async (e: KeyboardEvent<HTMLInputElement> | KeyboardEvent) => {
    if (e.key === 'Shift') {
      setShiftPressed(false);
      return;
    }
    if (e.key === 'Enter' && shiftPressed) {
      e.preventDefault();
      setMensagem(mensagem + "\n")
      return;
    } else if (e.key === 'Enter' && !shiftPressed) {
      if(mensagem.trim().length == 0) return;
      sendMessage();
      return;
    }
  };


  const handleTextAreaKeyDown = (e: KeyboardEvent<HTMLInputElement> | KeyboardEvent) => {
    if(e.keyCode == 13) {
      e.preventDefault();
    }
    if (e.key === 'Shift') {
      e.preventDefault();
      setShiftPressed(true);
    }
  };

  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const connectToRoom = () => {
    if (userName.trim() === '') {
      return;
    }
    setSocketClient(io(process.env.NEXT_PUBLIC_SOCKET_URL + ':3001'));
    setShowNameInput(false);
  };

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

  function updateLanguage(value: string) {
    const selectedLanguage = linguagens.find((item) => item.value === value);
    if (selectedLanguage) {
      setLinguaSelecionada({
        label: selectedLanguage.description,
        value: selectedLanguage.value,
      });
    }
  }

  if (typeof window == null) {
    return <></>;
  }

  if (showNameInput) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-bold">Bem-vindo à sala!</h2>
        <p className="mt-2 text-gray-600">
          Para entrar na sala, digite seu nome:
        </p>
        <input
          type="text"
          className="mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Seu nome"
          value={userName}
          onChange={handleNameInputChange}
        />
        <Button className="mt-4" onClick={connectToRoom}>
          Entrar
        </Button>
      </div>
    );
  }

  if (socketClient == null) {
    return <></>;
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
                  {params?.codigo.split('').map((c, index) => {
                    return (
                      <span className="w-12 rounded-lg bg-slate-800 p-2 uppercase" key={index}>
                        {c}
                      </span>
                    );
                  })}
                  <CopyButton copy={params?.codigo} text="Copiar" sucessText="Copiado!" />
                </h3>
                <span className="text-2xl font-semibold">OU</span>
                <div className="flex gap-2">
                  <span className="rounded-md bg-slate-800 p-2 font-semibold text-[#6F90F2]">
                    {process.env.NEXT_PUBLIC_VERCEL_URL}/conversar/{params?.codigo}
                  </span>
                  <CopyButton
                    copy={process.env.NEXT_PUBLIC_VERCEL_URL + '/conversar/' + params?.codigo}
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
      <section className="w-[90%] rounded-md bg-[--chat-bg-geral] shadow dark:shadow-slate-900 lg:w-[60%]">
        <ChatComponent.Header className="flex w-full justify-between bg-[--chat-bg-header]">
          <ChatComponent.Avatars className={'p-2'}>
            <div className="flex items-center gap-2">
              {/*dadosAvatares.map((avatar, index) => (
                <Avatar
                  key={index}
                  name={avatar.apelido}
                  color={avatar.cor.replace(';', '')}
                  round
                  size="2.5rem"
                  className="[text-shadow:_0_1px_1px_rgb(0_0_0_/_100%)]"
                />
              ))*/}
            </div>
          </ChatComponent.Avatars>
          <ChatComponent.Settings className="flex items-center">
            <IoSettingsSharp size={32} style={{ marginRight: '1rem' }} className="text-slate-600 dark:text-slate-300" />
          </ChatComponent.Settings>
        </ChatComponent.Header>
        <ChatComponent.Body>
          <MessageList ref={messageListRef}>
            {mensagens.map((message, index) => {
              return (
                <Message
                  key={index}
                  date={message.date}
                  ownMessage={message.senderId == socketClient?.id}
                  sender={/*dadosAvatares[0].apelido*/ ""}
                >
                  {message.message}
                </Message>
              );
            })}
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
            onChange={(e) => handleTextAreaChange(e)}
            onKeyUp={(e) => handleTextAreaKeyUp(e)}
            onKeyDown={(e: any) => handleTextAreaKeyDown(e)}
            value={mensagem}
            size="sm"
          />
          <Button isIconOnly onClick={() => sendMessage()}>
            <IoIosSend className={'text-2xl'} />
          </Button>
        </ChatComponent.Footer>
      </section>
      <aside className="ml-2 h-full rounded-md bg-[--chat-bg-geral]">
        <h1 className="rounded-md bg-[--chat-bg-header] p-2 text-center">CONFIGURAÇÕES DA SALA</h1>
        <div className="m-2 flex flex-col gap-2">
          <Switch
            classNames={{
              base: 'inline-flex flex-row-reverse gap-2 w-full max-w-md bg-[--chat-bg-buttons] mt-2 hover:bg-content2 items-center cursor-pointer p-4 border-2 border-transparent w-full rounded-md',
              wrapper: '',
            }}
          >
            <div className="flex flex-col gap-1">
              <p className="text-medium">Chat compacto</p>
              <p className="text-tiny text-default-400">Ative o modo compacto do chat. Os espaçamentos são menores.</p>
            </div>
          </Switch>
          <div className="flex w-full flex-col gap-1 rounded-md bg-[--chat-bg-buttons] p-4">
            <div className="flex flex-col gap-1">
              <p className="text-medium">Idioma que a mensagem será traduzida</p>
              <p className="text-tiny text-default-400">
                Selecione para qual idioma deverá ser traduzido as mensagens.
              </p>
            </div>
            <Select
              onSelectionChange={(keys) => {
                if ((keys as Set<string>).size === 1) {
                  const value = Array.from(keys)[0];
                  updateLanguage(value as any);
                }
              }}
              label="Selecione seu idioma"
              renderValue={(value) => {
                return linguaSelecionada?.label;
              }}
              classNames={{
                trigger: 'bg-[--chat-bg-buttons-secondary]',
              }}
              size="sm"
              multiple={false}
            >
              {languageOptions}
            </Select>
          </div>
        </div>
      </aside>
    </div>
  );
}