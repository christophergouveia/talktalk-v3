/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { avatar, Button, Input } from '@heroui/react';
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
import { useTranslation } from 'react-i18next';
import LanguageDetector from '../../../components/functionals/LanguageDetector';
import { motion } from 'framer-motion';
import { useFontSize } from '@/app/contexts/FontSizeContext';
import { useParams } from 'next/navigation';

const InputsSchema = yup.object().shape({
  apelido: yup
    .string()
    .trim()
    .min(4, 'conversar.criar_sala.apelido.erro_min')
    .max(32, 'conversar.criar_sala.apelido.erro_max')
    .matches(/^[a-zA-Z0-9\s_-]*$/, 'conversar.criar_sala.apelido.erro_caracteres'),
});

export default function ConversarHome() {
  const params = useParams();
  const locale = (params?.locale as string) || 'pt-BR';
  const { t, i18n } = useTranslation('');
  const { fontSize } = useFontSize();

  const [apelido, setApelido] = useState('');
  const [errorInputs, setErrorInputs] = useState<ErrorInputs>({} as ErrorInputs);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [avatarDetails, setAvatarDetails] = useState<{ avatarURL: string; avatarName: string }>({
    avatarURL: '/images/avatars/panda.png',
    avatarName: 'Panda',
  });
  const [avatarColor, setAvatarColor] = useState('');
  const [isColorModalOpenned, setColorModalOpenned] = useState(false);
  const [cookies, setCookie] = useCookies(['talktalk_roomid', 'talktalk_userdata']);
  const router = useRouter();
  const [codigoSala, setCodigoSala] = useState('');

  const validarApelido = useCallback(async () => {
    try {
      if (apelido.trim().length == 0) return true;
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
      let nickname = apelido.trim();
      if (!nickname) {
        nickname = avatarDetails?.avatarName || 'Panda';
      }

      let token = RandomToken.get();
      let userToken = RandomToken.get();
      const sala = await createRoom({ token: token, hostToken: userToken });
      if (sala != null) {
        const payload = { token, userToken };
        const hashed = await criptografar(JSON.stringify(JSON.stringify(payload)));
        setCookie('talktalk_roomid', hashed.data, {
          expires: undefined,
          sameSite: 'strict',
          path: '/',
        });

        const safeAvatarDetails = avatarDetails || {
          avatarURL: '/images/avatars/panda.png',
          avatarName: 'Panda',
        };

        const userAvatarURL = safeAvatarDetails.avatarURL || '/images/avatars/panda.png';
        const userAvatarName = safeAvatarDetails.avatarName || 'Panda';
        const userColor = avatarColor || '#3b82f6';

        const userData = {
          apelido: nickname,
          avatar: userAvatarURL,
          color: userColor,
          token,
          userToken,
        };
        const userDataEncrypted = await criptografarUserData(userData);

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
        router.push(`/${locale}/conversar/${sala}`);
      } else {
        toast('Ocorreu um erro ao criar a sala.', { type: 'error' });
      }
    } catch (error) {
      toast('Ocorreu um erro ao criar a sala.', { type: 'error' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [apelido, avatarColor, avatarDetails, router, setCookie, validarApelido]);

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
      return '';
    }

    const imageUrl = `/images/avatars/${englishName.toLowerCase()}.png`;
    setAvatarDetails({ avatarURL: imageUrl, avatarName: randomAnimal });
    return randomAnimal;
  }, [setAvatarDetails]);

  useEffect(() => {
    let avatarSet = false;
    let colorSet = false;

    if (localStorage.getItem('talktalk_user_settings')) {
      try {
        const userData = JSON.parse(localStorage.getItem('talktalk_user_settings') || '{}');
        const { avatarDetails: storedAvatarDetails, avatarColor: storedAvatarColor, userApelido } = userData;

        if (storedAvatarDetails && typeof storedAvatarDetails === 'object' && storedAvatarDetails.avatarURL) {
          setAvatarDetails(storedAvatarDetails);
          avatarSet = true;
        }

        if (storedAvatarColor) {
          setAvatarColor(storedAvatarColor);
          colorSet = true;
        }

        if (userApelido) {
          setApelido(userApelido);
        }
      } catch (error) {
        console.error('Error parsing talktalk_user_settings:', error);
      }
    }

    if (!avatarSet) {
      getRandomAvatar();
    }

    if (!colorSet) {
      setAvatarColor(RandomAvatarColor.get().hex);
    }
  }, [getRandomAvatar]);

  const handleSelectColor = useCallback(
    (color: string) => {
      setAvatarColor(color);
      setColorModalOpenned(false);
    },
    [setAvatarColor, avatarColor]
  );

  const AvatarComponent = useMemo(() => {
    const safeAvatarDetails = avatarDetails || {
      avatarURL: '/images/avatars/panda.png',
      avatarName: 'Panda',
    };

    const avatarSrc =
      safeAvatarDetails.avatarURL && safeAvatarDetails.avatarURL.trim()
        ? safeAvatarDetails.avatarURL
        : '/images/avatars/panda.png';

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="group relative">
          <AvatarDropdown openModal={() => setColorModalOpenned((prev) => !prev)}>
            <div className="relative">
              <Image
                src={avatarSrc}
                alt={apelido || safeAvatarDetails.avatarName || 'Animal aleatório :)'}
                width={120}
                height={120}
                className="rounded-full p-3 transition-all duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: avatarColor || '#3b82f6',
                  boxShadow: `0 0 30px ${avatarColor || '#3b82f6'}30`,
                }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          </AvatarDropdown>
        </div>
        <div>
          <AvatarSelector
            onAvatarSelect={(avatar, url) => setAvatarDetails({ avatarURL: url, avatarName: avatar })}
            color={avatarColor || '#3b82f6'}
            getRandomAvatar={getRandomAvatar}
          />
        </div>
      </div>
    );
  }, [avatarDetails, avatarColor, apelido, getRandomAvatar, setColorModalOpenned]);

  const handleEntrarSala = useCallback(() => {
    if (codigoSala.trim()) {
      router.push(`/${locale}/conversar/${codigoSala.trim()}`);
    }
  }, [codigoSala, router, locale]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/40 dark:from-[#0f0f0f] dark:via-[#1a1a2e] dark:to-[#16213e]">
      <LanguageDetector />
      <div className="absolute inset-0 -z-10">
        <div className="from-blue-400/8 to-cyan-400/8 absolute left-20 top-20 h-72 w-72 rounded-full bg-gradient-to-r blur-3xl"></div>
        <div className="from-purple-400/6 to-blue-400/6 absolute bottom-20 right-20 h-96 w-96 rounded-full bg-gradient-to-r blur-3xl"></div>
        <div className="from-cyan-400/6 to-blue-400/6 absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r blur-2xl"></div>
      </div>

      <div className="container relative z-10 mx-auto flex min-h-screen flex-col px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-3 text-center"
        >
          <h1 className="mb-6 text-3xl font-extrabold leading-tight md:text-5xl">
            {t('conversar.hero.titulo.parte1')}{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('conversar.hero.titulo.parte2')}
            </span>{' '}
            <br className="hidden md:block" />
            {t('conversar.hero.titulo.parte3')}
          </h1>
        </motion.div>

        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col rounded-2xl border border-white/20 bg-white/80 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:border-gray-700/30 dark:bg-[#18181B]/80"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-3">
                  <svg
                    className="h-6 w-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {t('conversar.criar_sala.titulo')}
                </h2>
              </div>

              <div className="flex flex-grow flex-col items-center gap-6">
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
                    label={t('conversar.criar_sala.apelido.label')}
                    size="lg"
                    maxLength={32}
                    value={apelido}
                    onValueChange={setApelido}
                    isInvalid={errorInputs.errorApelido}
                    classNames={{
                      input: 'text-[1.2rem]',
                      inputWrapper:
                        'bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors',
                    }}
                  />
                  {errorInputs.errorApelido && (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-danger"
                    >
                      * {t(errorInputs.errorApelidoMessage)}
                    </motion.span>
                  )}
                </form>
                <Button
                  color="primary"
                  size="lg"
                  className="mt-auto w-full max-w-md bg-gradient-to-r from-blue-500 to-blue-600 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl"
                  onClick={handleCriarSala}
                  isLoading={isLoading}
                >
                  {t('conversar.criar_sala.botao_criar')}
                </Button>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col rounded-2xl border border-white/20 bg-white/80 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:border-gray-700/30 dark:bg-[#18181B]/80"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-3">
                  <svg
                    className="h-6 w-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {t('conversar.entrar_sala.titulo')}
                </h2>
              </div>

              <div className="flex flex-grow flex-col items-center justify-between gap-6">
                <div className="rounded-xl border border-purple-200/50 bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 dark:border-purple-700/50">
                  <p className="text-center text-gray-600 dark:text-gray-300" style={{ fontSize: `${fontSize}px` }}>
                    {t('conversar.entrar_sala.subtitulo')}
                  </p>
                </div>

                <div className="flex w-full max-w-md flex-col gap-6">
                  <Input
                    type="text"
                    label={t('conversar.entrar_sala.codigo.label')}
                    size="lg"
                    value={codigoSala}
                    onValueChange={setCodigoSala}
                    placeholder={t('conversar.entrar_sala.codigo.placeholder')}
                    classNames={{
                      input: 'text-[1rem] !placeholder:text-base',
                      inputWrapper:
                        'bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 transition-colors',
                    }}
                  />
                  <Button
                    color="secondary"
                    size="lg"
                    className="mt-auto w-full max-w-md bg-gradient-to-r from-purple-500 to-blue-600 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-blue-700 hover:shadow-xl"
                    onClick={handleEntrarSala}
                  >
                    {t('conversar.entrar_sala.botao_entrar')}
                  </Button>
                </div>
              </div>
            </motion.section>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 w-full max-w-6xl text-center"
          >
            <div className="mx-auto rounded-xl border border-orange-200/50 bg-gradient-to-r from-orange-500/10 to-amber-500/10 p-6 backdrop-blur-md dark:border-orange-700/50">
              <p className="text-lg font-bold" style={{ fontSize: `${fontSize}px` }}>
                <span className="text-orange-500 dark:text-orange-400">{t('conversar.criar_sala.dica.parte1')}</span>{' '}
                <span className="text-gray-700 dark:text-gray-300">{t('conversar.criar_sala.dica.parte2')}</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <CreateRoomModal aberto={isLoading} />
    </div>
  );
}
