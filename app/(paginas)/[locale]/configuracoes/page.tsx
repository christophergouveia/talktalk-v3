"use client"
import React, { useState, useEffect } from 'react';
import {
  Save,
  Volume2,
  Moon,
  Sun,
  Globe,
  User,
  Bell,
  MessageSquare,
  Mic,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const UserSettingsPage = () => {
  // Suporte a idiomas simulado (em vez de importar de @/app/api/translate/languages)
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
    'ar-SA': 'Árabe (Arábia Saudita)'
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
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [previewVoice, setPreviewVoice] = useState('');
  const [availableVoices, setAvailableVoices] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [notificationVolume, setNotificationVolume] = useState(70);
  const [notificationTone, setNotificationTone] = useState('default');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [quietHours, setQuietHours] = useState(false);
  const [quietHoursStart, setQuietHoursStart] = useState('22:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState('07:00');

  // Obter vozes disponíveis no navegador
  useEffect(() => {
    const loadVoices = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices();
        // setAvailableVoices(voices);

        // Escolher voz padrão baseada no idioma preferido
        const defaultVoice = voices.find(voice => voice.lang && voice.lang.includes(preferredLanguage));
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

      const utterance = new SpeechSynthesisUtterance("Olá! Esta é uma mensagem de teste para as configurações de voz.");

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

  // Cores disponíveis para seleção
  const colorOptions = [
    '#3b82f6', // blue
    '#ef4444', // red
    '#10b981', // green
    '#f59e0b', // amber
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#6366f1', // indigo
    '#14b8a6', // teal
  ];

  // Tons de notificação disponíveis
  const notificationTones = [
    { id: 'default', name: 'Padrão' },
    { id: 'chime', name: 'Campainha' },
    { id: 'bell', name: 'Sino' },
    { id: 'alert', name: 'Alerta' },
    { id: 'gentle', name: 'Suave' }
  ];

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
            <li>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeTab === 'notifications' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <div className="flex items-center gap-3">
                  <Bell size={18} />
                  <span>Notificações</span>
                </div>
                <ChevronRight size={16} className={activeTab === 'notifications' ? 'opacity-100' : 'opacity-0'} />
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
                <div className="flex-shrink-0 flex flex-col items-center gap-4">
                  <div className="relative">
                    {/* Usando imagem de placeholder em vez do componente Next/Image */}
                    <div
                      className="w-24 h-24 rounded-full border-4 p-1 bg-gray-200 flex items-center justify-center overflow-hidden"
                      style={{ borderColor: userColor }}
                    >
                      <img
                        src="/api/placeholder/100/100"
                        alt="Avatar do usuário"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                      <User size={14} />
                    </button>
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium mb-1">Cor do perfil</label>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {colorOptions.map(color => (
                        <button
                          key={color}
                          onClick={() => setUserColor(color)}
                          className={`w-8 h-8 rounded-full transition-transform ${userColor === color ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : 'hover:scale-105'}`}
                          style={{ backgroundColor: color }}
                          aria-label={`Cor ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <label htmlFor="userName" className="block text-sm font-medium mb-1">Nome completo</label>
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
                    <label htmlFor="userApelido" className="block text-sm font-medium mb-1">Apelido (exibido nos chats)</label>
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
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
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
                  <label htmlFor="preferredLanguage" className="block text-sm font-medium mb-1">Idioma principal</label>
                  <select
                    id="preferredLanguage"
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="w-full p-2 border dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                  >
                    {Object.entries(supportedLanguages).map(([code, name]) => (
                      <option key={code} value={code}>{name}</option>
                    ))}
                  </select>
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
                    {Object.entries(supportedLanguages).slice(0, 9).map(([code, name]) => (
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
                  <label htmlFor="voice" className="block text-sm font-medium mb-1">Voz para leitura</label>
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
                    <label htmlFor="volume" className="text-sm font-medium">Volume</label>
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
                    <label htmlFor="rate" className="text-sm font-medium">Velocidade</label>
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
                    <label htmlFor="pitch" className="text-sm font-medium">Tom</label>
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
                        <p className="text-sm text-gray-500 dark:text-gray-400">Ler mensagens automaticamente ao recebê-las</p>
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
                      <input type="radio" name="fontSize" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                      <span className="ms-2 text-sm">Pequeno</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="fontSize" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" defaultChecked />
                      <span className="ms-2 text-sm">Médio</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="fontSize" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                      <span className="ms-2 text-sm">Grande</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notificações */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold mb-4">Notificações</h2>

              <div className="space-y-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell size={20} />
                    <div>
                      <p className="font-medium">Notificações</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receber alertas de novas mensagens</p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationsEnabled}
                      onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                {notificationsEnabled && (
                  <>
                    <div>
                      <p className="font-medium mb-2">Tipo de notificação</p>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" defaultChecked />
                          <span className="ms-2 text-sm">Notificações no navegador</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                          />
                          <span className="ms-2 text-sm">Notificações por email</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="notificationVolume" className="text-sm font-medium">Volume da notificação</label>
                        <span className="text-sm">{notificationVolume}%</span>
                      </div>
                      <input
                        id="notificationVolume"
                        type="range"
                        min="0"
                        max="100"
                        value={notificationVolume}
                        onChange={(e) => setNotificationVolume(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="notificationTone" className="block text-sm font-medium mb-1">Tom de notificação</label>
                      <select
                        id="notificationTone"
                        value={notificationTone}
                        onChange={(e) => setNotificationTone(e.target.value)}
                        className="w-full p-2 border dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                      >
                        {notificationTones.map(tone => (
                          <option key={tone.id} value={tone.id}>{tone.name}</option>
                        ))}
                      </select>
                      <button className="mt-2 text-sm text-blue-500 hover:text-blue-600">
                        Testar som
                      </button>
                    </div>

                    <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-medium">Modo silencioso</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Desativar notificações durante certos horários</p>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={quietHours}
                          onChange={() => setQuietHours(!quietHours)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-500"></div>
                      </label>
                    </div>

                    {quietHours && (
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label htmlFor="quietHoursStart" className="block text-sm font-medium mb-1">Início</label>
                          <input
                            id="quietHoursStart"
                            type="time"
                            value={quietHoursStart}
                            onChange={(e) => setQuietHoursStart(e.target.value)}
                            className="w-full p-2 border dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                          />
                        </div>
                        <div className="flex-1">
                          <label htmlFor="quietHoursEnd" className="block text-sm font-medium mb-1">Fim</label>
                          <input
                            id="quietHoursEnd"
                            type="time"
                            value={quietHoursEnd}
                            onChange={(e) => setQuietHoursEnd(e.target.value)}
                            className="w-full p-2 border dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

    </div>
  );
};

export default UserSettingsPage;