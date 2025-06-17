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
  const locale = params?.locale as string || 'pt-BR';
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
      // Set default nickname if none is provided
      let nickname = apelido.trim();
      if (!nickname) {
        // Safely access avatarDetails with fallback
        nickname = avatarDetails?.avatarName || 'Panda';
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

        // Ensure safe access to avatarDetails with default fallbacks
        const safeAvatarDetails = avatarDetails || {
          avatarURL: '/images/avatars/panda.png',
          avatarName: 'Panda',
        };
        
        // Safely get avatar details with fallbacks
        const userAvatarURL = safeAvatarDetails.avatarURL || '/images/avatars/panda.png';
        const userAvatarName = safeAvatarDetails.avatarName || 'Panda';
        const userColor = avatarColor || '#3b82f6'; // Default blue color

        // Aqui agora, irá ser criptografado os dados do usuário e o token, para saber que ele é o dono da, como apelido e avatar :D
        const userData = {
          apelido: nickname,
          avatar: userAvatarURL,
          color: userColor,
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
      return ''; // Retorna uma string vazia como valor padrão
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
        
        // Only update if the stored values are valid
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
        // Don't set avatarSet or colorSet to true if there was an error
      }
    }
    
    // If no valid avatar was found in local storage, get a random one
    if (!avatarSet) {
      getRandomAvatar();
    }
    
    // If no valid color was found in local storage, get a random one
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
    // Safely handle the case when avatarDetails is undefined
    const safeAvatarDetails = avatarDetails || {
      avatarURL: '/images/avatars/panda.png',
      avatarName: 'Panda',
    };
    
    // Use panda as default avatar if none is set
    const avatarSrc = safeAvatarDetails.avatarURL && safeAvatarDetails.avatarURL.trim() 
      ? safeAvatarDetails.avatarURL 
      : '/images/avatars/panda.png';
      
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative group">
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
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </AvatarDropdown>
        </div>
        <div className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-xl p-3 border border-gray-200 dark:border-gray-600">
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
    <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/40 dark:from-[#0f0f0f] dark:via-[#1a1a2e] dark:to-[#16213e] relative overflow-hidden">
      <LanguageDetector />
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/6 to-blue-400/6 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/6 to-blue-400/6 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col container mx-auto px-4 py-8">
        {/* Hero Section Imersiva */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            {t('conversar.hero.titulo.parte1')}{' '}
            <span 
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {t('conversar.hero.titulo.parte2')}
            </span>{' '}
            <br className="hidden md:block" />
            {t('conversar.hero.titulo.parte3')}
          </h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 dark:bg-[#18181B]/80 backdrop-blur-md rounded-xl p-4 max-w-2xl mx-auto"
          >
            <p className="text-lg text-gray-600 dark:text-gray-300" style={{ fontSize: `${fontSize}px` }}>
              {t('conversar.hero.subtitulo')}
            </p>
          </motion.div>
        </motion.div>

        {/* Cards Container com Glassmorphism */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
            {/* Card Criar Sala - Melhorado */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 dark:bg-[#18181B]/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{t('conversar.criar_sala.titulo')}</h2>
            </div>
            
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
                  label={t('conversar.criar_sala.apelido.label')}
                  size="lg"
                  maxLength={32}
                  value={apelido}
                  onValueChange={setApelido}
                  isInvalid={errorInputs.errorApelido}
                  classNames={{
                    input: 'text-[1.2rem]',
                    inputWrapper: 'bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors',
                  }}
                />
                {errorInputs.errorApelido && (
                  <motion.span 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-danger text-sm"
                  >
                    * {t(errorInputs.errorApelidoMessage)}
                  </motion.span>
                )}
              </form>
              <Button
                color="primary"
                size="lg"
                className="w-full max-w-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={handleCriarSala}
                isLoading={isLoading}
              >
                {t('conversar.criar_sala.botao_criar')}
              </Button>
            </div>
          </motion.section>

          {/* Card Entrar em Sala - Melhorado */}
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/80 dark:bg-[#18181B]/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{t('conversar.entrar_sala.titulo')}</h2>
            </div>
            
            <div className="flex flex-col items-center gap-6">
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-4 border border-purple-200/50 dark:border-purple-700/50">
                <p className="text-center text-gray-600 dark:text-gray-300" style={{ fontSize: `${fontSize}px` }}>{t('conversar.entrar_sala.subtitulo')}</p>
              </div>
              
              <div className="w-full max-w-md">
                <Input
                  type="text"
                  label={t('conversar.entrar_sala.codigo.label')}
                  size="lg"
                  value={codigoSala}
                  onValueChange={setCodigoSala}
                  placeholder={t('conversar.entrar_sala.codigo.placeholder')}
                  classNames={{
                    input: 'text-[1.2rem]',
                    inputWrapper: 'bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 transition-colors',
                  }}
                />
              </div>
              <Button 
                color="secondary" 
                size="lg" 
                className="w-full max-w-md bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                onClick={handleEntrarSala}
              >
                {t('conversar.entrar_sala.botao_entrar')}
              </Button>
            </div>
          </motion.section>
        </div>

        {/* Dica Final com Design Aprimorado */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-center w-full max-w-6xl"
        >
          <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-md rounded-xl p-6 mx-auto border border-orange-200/50 dark:border-orange-700/50">
            <p className="font-bold text-lg" style={{ fontSize: `${fontSize}px` }}>
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
