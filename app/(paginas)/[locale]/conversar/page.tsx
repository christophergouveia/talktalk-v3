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
import { criptografar, criptografarUserData } from '@/app/services/cryptoService';
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
  const [codigoSala, setCodigoSala] = useState('');

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
        const hashed = await criptografar(JSON.stringify(JSON.stringify(payload)));
        // Aqui é somente os dados para a verificação se o usuário está permitido de entrar na sala ou nao
        setCookie('talktalk_roomid', hashed.data, {
          expires: undefined,
          sameSite: 'strict',
          path: '/',
        });

        // Aqui agora, irá ser criptografado os dados do usuário e o token, para saber que ele é o dono da, como apelido e avatar :D
        const userData = {
          apelido: nickname,
          avatar: avatarDetails.avatarURL,
          color: avatarColor,
          token,
          userToken,
        };
        const userDataEncrypted = await criptografarUserData(userData);
        console.log('userDataEncrypted:', userDataEncrypted); // Debug log

        if (!userDataEncrypted?.data) {
          console.error('Falha ao criptografar dados do usuário');
          toast('Ocorreu um erro ao criar a sala.', { type: 'error' });
          return;
        }

        setCookie('talktalk_userdata', userDataEncrypted.data, {
          expires: undefined,
          sameSite: 'strict',
          path: '/',
        });
        await insertUser(sala, userDataEncrypted.data, true);
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
  }, [avatarDetails.avatarURL, avatarColor]);

  const handleEntrarSala = useCallback(() => {
    if (codigoSala.trim()) {
      router.push(`/conversar/${codigoSala.trim()}`);
    }
  }, [codigoSala, router]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-blue-50 dark:from-[#121212] dark:to-[#1a1a1a]">
      <div className="container mx-auto px-4 pt-16">
        {/* Hero Section Atualizada */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            {t('hero.titulo.parte1')}{' '}
            <span className="bg-gradient-to-r from-[#38A3F5] to-[#786FF2] bg-clip-text text-transparent">
              {t('hero.titulo.parte2')}
            </span>{' '}
            <br className="hidden md:block" />
            {t('hero.titulo.parte3')}
          </h1>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Card Criar Sala */}
          <section className="bg-white dark:bg-[#212121] rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">{t('criar_sala.titulo')}</h2>
            <div className="flex flex-col items-center gap-6">
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
                className="w-full max-w-md"
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
                  <span className="text-danger text-sm">* {t(errorInputs.errorApelidoMessage)}</span>
                )}
              </form>
              <Button
                color="primary"
                size="lg"
                className="w-full max-w-md bg-[#38A3F5] font-semibold"
                onClick={handleCriarSala}
                isLoading={isLoading}
              >
                {t('criar_sala.botao_criar')}
              </Button>
            </div>
          </section>

          {/* Card Entrar em Sala */}
          <section className="bg-white dark:bg-[#212121] rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">{t('entrar_sala.titulo')}</h2>
            <div className="flex flex-col items-center gap-6">
              <p className="text-center text-gray-600 dark:text-gray-300">{t('entrar_sala.subtitulo')}</p>
              <div className="w-full max-w-md">
                <Input
                  type="text"
                  label={t('entrar_sala.codigo.label')}
                  size="lg"
                  value={codigoSala}
                  onValueChange={setCodigoSala}
                  placeholder={t('entrar_sala.codigo.placeholder')}
                  classNames={{
                    input: 'text-[1.2rem]',
                  }}
                />
              </div>
              <Button color="secondary" size="lg" className="w-full max-w-md font-semibold" onClick={handleEntrarSala}>
                {t('entrar_sala.botao_entrar')}
              </Button>
            </div>
          </section>
        </div>

        <p className="text-center mt-8 font-bold">
          <span className="text-orange-400">{t('criar_sala.dica.parte1')}</span> {t('criar_sala.dica.parte2')}
        </p>
      </div>
      <CreateRoomModal aberto={isLoading} />
    </div>
  );
}

