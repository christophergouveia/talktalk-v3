/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Button, Input } from '@nextui-org/react';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { CreateRoomModal } from '@/app/components/modal/ModalConsetiment';
import { ErrorInputs } from '@/app/utils/interfaces/input';
import { useCookies } from 'react-cookie';
import createRoom from '@/app/utils/roomManagement/createRoom';
import { insertUser } from '@/app/utils/roomManagement/user/insertUser';
import { criptografar, criptografarUserData } from '@/app/utils/crypto/main.ts';
import { RandomNicks } from '@/app/utils/strings/randomNicks';
import RandomToken from '@/app/utils/strings/randomToken';
import Image from 'next/image';
import { AvatarSelector } from '@/app/components/functionals/AvatarSelector';
import ColorSelector from '@/app/components/functionals/ColorsSelector';
import AvatarDropdown from '@/app/components/functionals/AvatarDropdown';
import { RandomAvatarColor } from '@/app/utils/strings/randomAvatarColor';
import { useTranslations } from 'next-intl';

const InputsSchema = yup.object().shape({
  apelido: yup
    .string()
    .trim()
    .min(4, 'criar_sala.apelido.erro_min')
    .max(32, 'criar_sala.apelido.erro_max')
    .matches(/^[a-zA-Z0-9\s_-]*$/, 'criar_sala.apelido.erro_caracteres'),
});

export default function ConversarHome() {
  const t = useTranslations('conversar');
  const [apelido, setApelido] = useState('');
  const [errorInputs, setErrorInputs] = useState<ErrorInputs>({} as ErrorInputs);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [avatarDetails, setAvatarDetails] = useState<{ avatarURL: string; avatarName: string }>({
    avatarURL: '',
    avatarName: '',
  });
  const [avatarColor, setAvatarColor] = useState('');
  const [isColorModalOpenned, setColorModalOpenned] = useState(false);
  const [cookies, setCookie] = useCookies(['talktalk_roomid', 'talktalk_userdata']);
  const router = useRouter();

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
      let nickname = apelido;
      if (!apelido.trim()) {
        nickname = avatarDetails.avatarName;
      }
      // São dois tokens, um para os usuários que não são anfitrião, e um para identificar o anfitrião da sala
      // Depois acho uma maneira melhor de fazer isso...
      // TODO : Retirar o hostToken e utilizar o userToken como token do anfitrião
      let token = RandomToken.get();
      let userToken = RandomToken.get();
      const sala = await createRoom({ token: token, hostToken: userToken });
      if (sala != null) {
        const payload = { token, userToken };
        const secretBase64 = process.env.NEXT_PUBLIC_JWT_SECRET;
        if (secretBase64) {
          const hashed = await criptografar(JSON.stringify(payload));
          // Aqui é somente os dados para a verificação se o usuário está permitido de entrar na sala ou nao
          setCookie('talktalk_roomid', hashed, {
            expires: undefined,
            sameSite: 'strict',
            path: '/',
            secure: true,
          });
          // Aqui agora, irá ser criptografado os dados do usuário e o token, para saber que ele é o dono da, como apelido e avatar :D
          const userData = {
            apelido: nickname,
            avatar: avatarDetails.avatarURL,
            color: avatarColor,
            token,
            userToken,
          };
          const userDataEncrypted = (await criptografarUserData(userData)).dadoCriptografado;
          setCookie('talktalk_userdata', userDataEncrypted, {
            expires: undefined,
            sameSite: 'strict',
            path: '/',
            secure: true,
          });
          await insertUser(sala, userDataEncrypted, true);
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
  }, [apelido, avatarColor, avatarDetails]);

  useEffect(() => {
    if (errorInputs.errorApelido) {
      validarApelido();
    }
  }, [apelido, errorInputs.errorApelido, validarApelido]);

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
    [setAvatarColor, avatarColor]
  );

  const AvatarComponent = useMemo(() => {
    if (avatarDetails.avatarURL.trim() == '') return <span>Carregando...</span>;
    return (
      <div className="flex flex-col items-center gap-3">
        <AvatarDropdown openModal={() => setColorModalOpenned((prev) => !prev)}>
          <Image
            src={avatarDetails.avatarURL}
            alt={apelido || 'Animal aleatório :)'}
            width={120}
            height={120}
            className={`rounded-full ${avatarColor} p-2 bg-blue-500`}
            style={{
              backgroundColor: avatarColor,
            }}
          />
        </AvatarDropdown>
        <AvatarSelector
          onAvatarSelect={(avatar, url) => setAvatarDetails({ avatarURL: url, avatarName: avatar })}
          color={avatarColor}
          getRandomAvatar={getRandomAvatar}
        />
      </div>
    );
  }, [apelido, avatarDetails.avatarURL, avatarColor]);

  return (
    <>
      <div className="mt-12">
        <div className="mx-auto w-full text-center text-xl font-bold lg:w-[60%] lg:text-3xl">
          <h1 className="!mb-4">
            {t('hero.titulo.parte1')}{' '}
            <span className="bg-gradient-to-r from-[#38A3F5] to-[#786FF2] bg-clip-text font-extrabold text-transparent">
              {t('hero.titulo.parte2')}
            </span>{' '}
            {t('hero.titulo.parte3')}
          </h1>
        </div>
        <section className="m-auto w-[calc(100%-2rem)] rounded-lg p-4 py-12 shadow-lg dark:bg-[#212121] dark:shadow-none lg:w-[60%]">
          <h1 className="m-2 text-center text-4xl font-bold">{t('criar_sala.titulo')}</h1>
          <p className="m-2 text-xl text-center text-gray-600 dark:text-white">
            {t('criar_sala.subtitulo')}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 p-4">
            {AvatarComponent}
            <ColorSelector
              onSelectColor={handleSelectColor}
              isOpen={isColorModalOpenned}
              onModalClose={() => setColorModalOpenned(false)}
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCriarSala();
              }}
              className="flex flex-col items-center justify-center gap-2 w-fit"
            >
              <Input
                type="name"
                label={t('criar_sala.apelido.label')}
                size="lg"
                maxLength={32}
                value={apelido}
                onValueChange={setApelido}
                isInvalid={errorInputs.errorApelido}
                classNames={{
                  input: 'text-[1.2rem]',
                }}
              />
              {errorInputs.errorApelido && (
                <span className="text-danger">* {t(errorInputs.errorApelidoMessage)}</span>
              )}
            </form>
            <Button
              color="primary"
              className="bg-[#38A3F5] font-semibold"
              onClick={handleCriarSala}
              isLoading={isLoading}
            >
              {t('criar_sala.botao_criar')}
            </Button>
            <span className="font-bold text-center">
              <span className="text-orange-400">{t('criar_sala.dica.parte1')}</span>{' '}
              {t('criar_sala.dica.parte2')}
            </span>
          </div>
        </section>
      </div>
      <CreateRoomModal aberto={isLoading} />
    </>
  );
}
