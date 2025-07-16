'use client';

import { useState } from 'react';
import { useSpeech } from '@/app/contexts/SpeechContext';
import { useTranslation } from '@/app/contexts/TranslationContext';
import { Volume2 } from 'lucide-react';

export default function SpeechSettings() {
  const { settings, availableVoices, updateSettings, speak } = useSpeech();
  const { settings: translationSettings, updateSettings: updateTranslationSettings } = useTranslation();
  const [testText, setTestText] = useState('Olá! Este é um teste de voz.');

  const handleTestVoice = () => {
    speak(testText);
  };

  return (
    <div className="space-y-6 p-4 bg-white dark:bg-[#212121] rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Configurações de Áudio</h2>
      <div className="inline-flex flex-row-reverse gap-2 w-full bg-[--chat-bg-buttons] hover:bg-content2 items-center cursor-pointer p-4 border-2 border-transparent rounded-md transition-all duration-200">
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer"
            checked={settings.enabled}
            onChange={(e) => updateSettings({ enabled: e.target.checked })}
            aria-label="Ativar ou desativar sintetização de voz"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        <div className="flex flex-col gap-1 w-full">
          <p className="text-medium font-semibold">Ativar sintetização de voz</p>
          <p className="text-tiny text-default-600">
            Ative para que as mensagens possam ser lidas em voz alta.
          </p>
        </div>
      </div>

      {settings.enabled && (
        <div className="space-y-4 mt-4">
          <div>
            <label htmlFor="voice-select" className="block text-sm font-medium mb-2">
              Selecionar Voz
            </label>
            <select
              id="voice-select"
              className="w-full p-2 border rounded-md bg-white dark:bg-zinc-800 dark:border-zinc-700"
              value={settings.voice}
              onChange={(e) => updateSettings({ voice: e.target.value })}
            >
              {availableVoices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {`${voice.name} (${voice.lang})`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="volume-slider" className="block text-sm font-medium mb-2">
              Volume
            </label>
            <div className="flex items-center gap-2">
              <Volume2 size={16} className="text-gray-600 dark:text-gray-300" />
              <input
                type="range"
                id="volume-slider"
                min={0}
                max={100}
                value={settings.volume}
                onChange={(e) => updateSettings({ volume: Number(e.target.value) })}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 dark:bg-zinc-700"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">{settings.volume}%</span>
            </div>
          </div>

          <div>
            <label htmlFor="rate-slider" className="block text-sm font-medium mb-2">
              Velocidade
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">0.5x</span>
              <input
                type="range"
                id="rate-slider"
                min={0.5}
                max={2}
                step={0.1}
                value={settings.rate}
                onChange={(e) => updateSettings({ rate: Number(e.target.value) })}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 dark:bg-zinc-700"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">{settings.rate}x</span>
            </div>
          </div>

          <div>
            <label htmlFor="pitch-slider" className="block text-sm font-medium mb-2">
              Tom
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">Grave</span>
              <input
                type="range"
                id="pitch-slider"
                min={0.5}
                max={2}
                step={0.1}
                value={settings.pitch}
                onChange={(e) => updateSettings({ pitch: Number(e.target.value) })}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 dark:bg-zinc-700"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">Agudo</span>
            </div>
          </div>
          <div className="inline-flex flex-row-reverse gap-2 w-full bg-[--chat-bg-buttons] hover:bg-content2 items-center cursor-pointer p-4 border-2 border-transparent rounded-md transition-all duration-200">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.autoRead}
                onChange={(e) => updateSettings({ autoRead: e.target.checked })}
                aria-label="Ler mensagens automaticamente"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <div className="flex flex-col gap-1 w-full">              
              <p className="text-medium font-semibold">Ler mensagens automaticamente</p>
              <p className="text-tiny text-default-600">
                Quando ativado, as mensagens serão lidas em voz alta automaticamente ao recebê-las.
              </p>
            </div>
          </div>

          <div className="space-y-2 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
            <label htmlFor="test-text" className="block text-sm font-medium">
              Texto de Teste
            </label>
            <textarea
              id="test-text"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              className="w-full p-2 border rounded-md bg-white dark:bg-zinc-900 dark:border-zinc-700"
              rows={2}
            />
            <button
              onClick={handleTestVoice}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Testar Voz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}