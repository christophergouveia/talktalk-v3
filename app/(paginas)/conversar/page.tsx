/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { SetStateAction, useEffect, useState, useCallback, useMemo } from 'react';
import Avatar from 'react-avatar';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import ColorPicker from '@/app/components/ui/colorPicker';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { CreateRoomModal } from '@/app/components/modalConsetiment';
import { FaUserCircle } from 'react-icons/fa';
import { ErrorInputs } from '@/app/interfaces/input';
import { useCookies } from 'react-cookie';
import createRoom from '@/app/utils/roomManagement/createRoom';
import { insertUser } from '@/app/utils/roomManagement/user/insertUser';
import Criptografia from '@/app/crypto/main';
import React from 'react';
import { randomNicks, RandomNicks } from '@/app/utils/strings/randomNicks';
import RandomToken from '@/app/utils/strings/randomToken';
import Image from 'next/image';

const InputsSchema = yup.object().shape({
  apelido: yup
    .string()
    .min(4, 'É necessário que o apelido contenha no mínimo 4 caracteres.')
    .max(32, 'É necessário que o apelido contenha no máximo 32 caracteres.'),
});

export default function ConversarHome() {
  const [apelido, setApelido] = useState('');
  const [errorInputs, setErrorInputs] = useState<ErrorInputs>({} as ErrorInputs);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [cookies, setCookie] = useCookies(['talktalk_roomid', 'talktalk_userdata']);
  const router = useRouter();

  useEffect(() => {
    const generateAvatarUrl = async () => {
      let endpoint = 'https://anonymous-animals.azurewebsites.net';

      if (apelido.trim().length === 0) {
        const randomNick = RandomNicks.get();
        const animalName = RandomNicks.getEnglish(randomNick);
        endpoint += `/animal/${animalName.toLowerCase()}`;
      } else {
        endpoint += `/avatar/${apelido.trim()}`;
      }

      setAvatarUrl(endpoint);
    };

    generateAvatarUrl();
  }, [apelido]);

  const validarApelido = useCallback(async () => {
    try {
      if (apelido.trim().length == 0) return true; //Retorna true porque o apelido é opcional :)
      await InputsSchema.pick(['apelido']).validate({ apelido });
      setErrorInputs((prevState) => ({
        ...prevState,
        errorApelido: false,
        errorApelidoMessage: '',
      }));
      return true;
    } catch (error) {
      setErrorInputs((prevState) => ({
        ...prevState,
        errorApelido: true,
        errorApelidoMessage: (error as Error).message,
      }));
      return false;
    }
  }, [apelido]);

  const handleCriarSala = useCallback(async () => {
    if (!(await validarApelido())) return null;

    setLoading(true);
    try {
      var token = RandomToken.get();
      const sala = await createRoom({ token: token });
      if (sala != null) {
        const payload = { sala };
        console.log(payload);
        const secretBase64 = process.env.NEXT_PUBLIC_JWT_SECRET;
        if (secretBase64) {
          const cripto = new Criptografia();
          const hashed = await cripto.criptografar(JSON.stringify(payload));
          // Aqui é somente os dados paraa verificação se o usuário está permitido de entrar na sala ou nao
          setCookie('talktalk_roomid', hashed, {
            expires: new Date(Date.now() + 86400000),
            sameSite: 'strict',
            path: '/',
          });
          // Aqui agora, irá ser criptografado os dados do usuário, como apelido e avatar :D
          const userData = {
            apelido: apelido,
          };
          setCookie('talktalk_userdata', hashed, {
            expires: new Date(Date.now() + 86400000),
            sameSite: 'strict',
            path: '/',
          });
          await insertUser(sala, hashed, true);
        }
        router.push(`/conversar/${sala}`);
      } else {
        toast('Ocorreu um erro ao criar a sala.', { type: 'error' });
      }
    } catch (error) {
      toast('Ocorreu um erro ao criar a sala.', { type: 'error' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [apelido, setCookie, router, validarApelido]);

  useEffect(() => {
    if (errorInputs.errorApelido) {
      validarApelido();
    }
  }, [apelido, errorInputs.errorApelido, validarApelido]);

  const avatarComponent = useMemo(
    () => (
      <div className="flex flex-col items-center gap-3">
        <Image src={avatarUrl} alt={apelido || "Animal aleatório :)"} width={80} height={80} className="rounded-full bg-blue-500 p-2" />
        <AvatarSelector onAvatarSelect={(avatar, url) => setAvatarUrl(url)} />
      </div>
    ),
    [apelido, avatarUrl]
  );

  return (
    <>
      <div className="mt-12">
        <div className="mx-auto w-full text-center text-xl font-bold lg:w-[60%] lg:text-3xl">
          <h1 className="!mb-4">
            Uma{' '}
            <span className="bg-gradient-to-r from-[#38A3F5] to-[#786FF2] bg-clip-text font-extrabold text-transparent">
              poderosa
            </span>{' '}
            ferramenta de tradução em tempo real. Sem necessidade de trocar de abas.
          </h1>
        </div>
        <section className="m-auto w-[calc(100%-2rem)] rounded-lg p-4 py-12 shadow-lg dark:bg-[#212121] dark:shadow-none lg:w-[60%]">
          <h1 className="m-2 text-center text-4xl font-bold">Crie uma sala</h1>
          <p className="m-2 text-xl text-center text-gray-600 dark:text-white">
            Deseja entrar em uma sala já existente? Copie o link que o anfitrião da sala lhe enviou e acesse-o.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 p-4">
            {avatarComponent}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCriarSala();
              }}
              className="flex items-center justify-center gap-2 w-fit"
            >
              <Input
                type="name"
                label="Apelido (opcional)"
                size="lg"
                maxLength={32}
                value={apelido}
                onValueChange={setApelido}
                isInvalid={errorInputs.errorApelido}
                classNames={{
                  input: 'text-[1.2rem]',
                }}
              />
              {errorInputs.errorApelido && <span className="text-danger">* {errorInputs.errorApelidoMessage}</span>}
            </form>
            <Button
              color="primary"
              className="bg-[#38A3F5] font-semibold"
              onClick={handleCriarSala}
              isLoading={isLoading}
            >
              CRIAR UMA SALA
            </Button>
          </div>
        </section>
      </div>
      <CreateRoomModal aberto={isLoading} />
    </>
  );
}

interface AvatarSelectorProps {
  onAvatarSelect: (name: string, imageUrl: string) => void;
}
const AvatarSelector: React.FC<AvatarSelectorProps> = ({ onAvatarSelect }) => {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAnimalSelect = (animal: string) => {
    setSelectedAnimal(animal);
    const animalNameEnglish = RandomNicks.getEnglish(animal);
    const imageUrl = `https://anonymous-animals.azurewebsites.net/animal/${animalNameEnglish.toLowerCase()}`;
    onAvatarSelect(animal, imageUrl);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onPress={() => setIsModalOpen(true)}>Escolher Avatar</Button>
      <Modal size="4xl" className="h-1/2" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Escolha seu Avatar</ModalHeader>
          <ModalBody className="overflow-y-scroll custom-scrollbars">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.keys(randomNicks).map((animal) => (
                <button
                  key={animal}
                  onClick={() => handleAnimalSelect(animal)}
                  className={`border rounded-lg p-2 relative ${
                    selectedAnimal === animal
                      ? 'border-blue-500 hover:bg-slate-600 border-b-8'
                      : 'border-slate-600 hover:bg-slate-600 hover:border-slate-600 transition-background'
                  }`}
                >
                  {selectedAnimal === animal && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                      SELECIONADO
                    </span>
                  )}
                  <Image
                    src={`https://anonymous-animals.azurewebsites.net/animal/${RandomNicks.getEnglish(
                      animal
                    ).toLowerCase()}`}
                    alt={animal}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto bg-[var(--cor-azul)] p-2"
                  />
                  <p className="text-center mt-2">{animal}</p>
                </button>
              ))}
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
