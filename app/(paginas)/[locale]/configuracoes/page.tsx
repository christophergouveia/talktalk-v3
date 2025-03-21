'use client';

import React, { useState, useEffect, useCallback, ChangeEvent, useMemo } from 'react';

import { Image } from '@heroui/react';

import { Save, Volume2, Moon, Sun, Globe, User, Bell, MessageSquare, Mic, Sliders, ChevronRight } from 'lucide-react';

import { motion } from 'framer-motion';

import languagesData from '@/app/locales/languages.json';

import { LanguageSelector } from '@/app/components/functionals/LanguageSelector';
import { colors as colorsData } from '@/app/components/functionals/ColorsSelector';
import ColorSelector from '@/app/components/functionals/ColorsSelector';
import { AvatarSelector } from '@/app/components/functionals/AvatarSelector';
import { RandomNicks } from '@/app/utils/strings/randomNicks';
import AvatarDropdown from '@/app/components/functionals/AvatarDropdown';
const UserSettingsPage = () => {
  const supportedLanguages = {
    'pt-BR': 'Português (Brasil)',
    'en-US': 'Inglês (Estados Unidos)',
    'es-ES': 'Espanhol (Espanha)',
    'fr-FR': 'Francês (França)',
    'de-DE': 'Alemão (Alemanha)',
    'it-IT': 'Italiano (Itália)',
    'ja-JP': 'Japonês (Japão)',
    'zh-CN': 'Chinês (China)',
    'ru-RU': 'Russo (Rússia)',
    'ar-SA': 'Árabe (Arábia Saudita)',
  };

  // Estados para as configurações do usuário
  const [preferredLanguage, setPreferredLanguage] = useState('pt-BR');
  const [userName, setUserName] = useState('');
  const [userApelido, setUserApelido] = useState('');
  const [avatar, setAvatar] = useState('/api/placeholder/100/100');
  const [userColor, setUserColor] = useState('#3b82f6');
  const [volume, setVolume] = useState(75);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [previewVoice, setPreviewVoice] = useState('');
  const [availableVoices, setAvailableVoices] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [quietHoursStart, setQuietHoursStart] = useState('22:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState('07:00');
  const [isColorModalOpenned, setColorModalOpenned] = useState(false);
  const [avatarColor, setAvatarColor] = useState('');
  const [avatarDetails, setAvatarDetails] = useState<{ avatarURL: string; avatarName: string }>({
    avatarURL: '',
    avatarName: '',
  });

  // Add new function to save settings
  const saveUserSettings = useCallback((settings: any) => {
    localStorage.setItem('talktalk_user_settings', JSON.stringify(settings));
  }, []);

  // Add useEffect to load saved settings on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('talktalk_user_settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      if (settings.linguaSelecionada) {
        setLinguaSelecionada(settings.linguaSelecionada);
      }
      if (settings.avatarDetails) {
        setAvatarDetails(settings.avatarDetails);
      }
      if (settings.avatarColor) {
        setAvatarColor(settings.avatarColor);
      }
    }
  }, []);

  // Obter vozes disponíveis no navegador
  useEffect(() => {
    const loadVoices = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices();
        // setAvailableVoices(voices);

        // Escolher voz padrão baseada no idioma preferido
        const defaultVoice = voices.find((voice) => voice.lang && voice.lang.includes(preferredLanguage));
        if (defaultVoice) {
          setPreviewVoice(defaultVoice.name);
        } else if (voices.length) {
          setPreviewVoice(voices[0].name);
        }
      }
    };

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [preferredLanguage]);

  // Função para testar configurações de voz
  const testVoice = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance('Olá! Esta é uma mensagem de teste para as configurações de voz.');

      // Aplicar configurações de voz
      utterance.volume = volume / 100;
      utterance.rate = rate;
      utterance.pitch = pitch;

      // Usar voz selecionada
      // const selectedVoice = availableVoices.find(voice => voice.name === previewVoice);
      // if (selectedVoice) {
      //   utterance.voice = selectedVoice;
      // }

      window.speechSynthesis.speak(utterance);
    }
  };

  // Função para simular salvamento
  const saveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };


  const [linguaSelecionada, setLinguaSelecionada] = useState<{ label: string; value: string; flag: string }>({
    label: 'Português',
    value: 'pt',
    flag: 'PT',
  });

  const handleLanguageChange = (language) => {
    const index = languagesData.findIndex((lang) => lang.value === language);
    console.log(languagesData[index]);
    setLinguaSelecionada({
      label: languagesData[index].label,
      value: languagesData[index].value,
      flag: languagesData[index].flag,
    });
    saveUserSettings({
      linguaSelecionada: {
        label: languagesData[index].label,
        value: languagesData[index].value,
        flag: languagesData[index].flag,
      },
      avatarDetails,
      avatarColor,
    });
  };

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

  const handleSelectColor = useCallback(
    (color: string) => {
      setAvatarColor(color);
      setColorModalOpenned(false);
      saveUserSettings({
        linguaSelecionada,
        avatarDetails,
        avatarColor: color,
      });
    },
    [saveUserSettings, linguaSelecionada, avatarDetails]
  );

  const handleNameInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }, []);

  const handleAvatarSelect = (avatar: string, url: string) => {
    const newAvatarDetails = { avatarURL: url, avatarName: avatar };
    setAvatarDetails(newAvatarDetails);
    saveUserSettings({
      linguaSelecionada,
      avatarDetails: newAvatarDetails,
      avatarColor,
    });
  };

  const AvatarComponent = useMemo(() => {
    console.log("filho da puta")
    // if (avatarDetails.avatarURL.trim() == '') return <span>Carregando...</span>;
    return (
      <div className="flex flex-col items-center gap-3">
        <AvatarDropdown openModal={() => setColorModalOpenned((prev) => !prev)}>
          <Image
            src={avatarDetails.avatarURL}
            width={120}
            height={120}
            className={`rounded-full ${avatarColor} p-2 bg-blue-500 !opacity-100`}
            style={{
              backgroundColor: avatarColor,
            }}
          />
        </AvatarDropdown>
        <AvatarSelector
          onAvatarSelect={handleAvatarSelect}
          color={avatarColor}
          getRandomAvatar={getRandomAvatar}
        />
      </div>
    );
  }, [avatarDetails.avatarURL, avatarColor, handleAvatarSelect, getRandomAvatar]);

  return (
    <div className={`flex flex-col p-4  text-gray-900 dark:text-gray-100 transition-colors duration-200 h-max`}>
      <header className="flex items-center justify-between mb-6">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          onClick={saveSettings}
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Save size={18} />
          )}
          <span>Salvar</span>
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Menu lateral */}
        <nav className="md:w-64 bg-[#FAFAFA] dark:bg-[#18181B]  rounded-lg shadow-sm p-4 h-max">
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <div className="flex items-center gap-3">
                  <User size={18} />
                  <span>Perfil</span>
                </div>
                <ChevronRight size={16} className={activeTab === 'profile' ? 'opacity-100' : 'opacity-0'} />
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('language')}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeTab === 'language' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <div className="flex items-center gap-3">
                  <Globe size={18} />
                  <span>Idiomas</span>
                </div>
                <ChevronRight size={16} className={activeTab === 'language' ? 'opacity-100' : 'opacity-0'} />
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('audio')}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeTab === 'audio' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <div className="flex items-center gap-3">
                  <Volume2 size={18} />
                  <span>Áudio</span>
                </div>
                <ChevronRight size={16} className={activeTab === 'audio' ? 'opacity-100' : 'opacity-0'} />
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeTab === 'appearance' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <div className="flex items-center gap-3">
                  <Sliders size={18} />
                  <span>Aparência</span>
                </div>
                <ChevronRight size={16} className={activeTab === 'appearance' ? 'opacity-100' : 'opacity-0'} />
              </button>
            </li>
          </ul>
        </nav>

        {/* Conteúdo principal */}
        <div className="flex-1 bg-[#FAFAFA] dark:bg-[#18181B] rounded-lg shadow-sm p-6">
          {/* Perfil */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold mb-4">Informações do Perfil</h2>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative flex-shrink-0">
                  {AvatarComponent}
                  <ColorSelector
                    onSelectColor={handleSelectColor}
                    isOpen={isColorModalOpenned}
                    onModalClose={() => setColorModalOpenned(false)}
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <label htmlFor="userName" className="block text-sm font-medium mb-1">
                      Nome completo
                    </label>
                    <input
                      id="userName"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full p-2 border dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="userApelido" className="block text-sm font-medium mb-1">
                      Apelido (exibido nos chats)
                    </label>
                    <input
                      id="userApelido"
                      type="text"
                      value={userApelido}
                      onChange={(e) => setUserApelido(e.target.value)}
                      className="w-full p-2 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                      placeholder="Como deseja ser chamado"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full p-2 border dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                      placeholder="seu.email@exemplo.com"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Idiomas */}
          {activeTab === 'language' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold mb-4">Configurações de Idioma</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="preferredLanguage" className="block text-sm font-medium mb-1">
                    Idioma principal
                  </label>
                  <LanguageSelector
                    selectedLanguage={{
                      label: linguaSelecionada.label,
                      value: linguaSelecionada.value,
                      flag: linguaSelecionada.flag,
                    }}
                    onLanguageChange={handleLanguageChange}
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Este é o idioma em que você deseja receber as traduções
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={18} />
                    <div>
                      <p className="font-medium">Tradução automática</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Traduzir mensagens automaticamente</p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoTranslate}
                      onChange={() => setAutoTranslate(!autoTranslate)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Idiomas que você fala</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {Object.entries(supportedLanguages)
                      .slice(0, 9)
                      .map(([code, name]) => (
                        <div key={code} className="flex items-center">
                          <input
                            id={`lang-${code}`}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor={`lang-${code}`} className="ms-2 text-sm font-medium">
                            {name}
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Áudio */}
          {activeTab === 'audio' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold mb-4">Configurações de Áudio</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="voice" className="block text-sm font-medium mb-1">
                    Voz para leitura
                  </label>
                  <select
                    id="voice"
                    value={previewVoice}
                    onChange={(e) => setPreviewVoice(e.target.value)}
                    className="w-full p-2 border dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                  >
                    {/* {availableVoices.map((voice, index) => (
                      <option key={index} value={voice.name}>
                        {voice.name} ({voice.lang || 'Desconhecido'})
                      </option>
                    ))} */}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="volume" className="text-sm font-medium">
                      Volume
                    </label>
                    <span className="text-sm">{volume}%</span>
                  </div>
                  <input
                    id="volume"
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="rate" className="text-sm font-medium">
                      Velocidade
                    </label>
                    <span className="text-sm">{rate}x</span>
                  </div>
                  <input
                    id="rate"
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="pitch" className="text-sm font-medium">
                      Tom
                    </label>
                    <span className="text-sm">{pitch}</span>
                  </div>
                  <input
                    id="pitch"
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={pitch}
                    onChange={(e) => setPitch(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
                  />
                </div>

                <button
                  onClick={testVoice}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Mic size={18} />
                  <span>Testar configurações de voz</span>
                </button>

                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mic size={18} />
                      <div>
                        <p className="font-medium">Leitura automática</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Ler mensagens automaticamente ao recebê-las
                        </p>
                      </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Aparência */}
          {activeTab === 'appearance' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold mb-4">Aparência</h2>

              <div className="space-y-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                    <div>
                      <p className="font-medium">Modo escuro</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Alterar entre temas claro e escuro</p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare size={20} />
                    <div>
                      <p className="font-medium">Modo compacto</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Exibir mensagens em formato compacto</p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={compactMode}
                      onChange={() => setCompactMode(!compactMode)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tamanho da fonte</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="fontSize"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                      />
                      <span className="ms-2 text-sm">Pequeno</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="fontSize"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                        defaultChecked
                      />
                      <span className="ms-2 text-sm">Médio</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="fontSize"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                      />
                      <span className="ms-2 text-sm">Grande</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
function setAvatarColor(color: string) {
  throw new Error('Function not implemented.');
}
