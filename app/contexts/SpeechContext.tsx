'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SpeechSettings {
  volume: number;
  pitch: number;
  rate: number;
  voice: string;
  autoRead: boolean;
  enabled: boolean;
}

interface SpeechContextType {
  settings: SpeechSettings;
  availableVoices: SpeechSynthesisVoice[];
  updateSettings: (newSettings: Partial<SpeechSettings>) => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
}

const defaultSettings: SpeechSettings = {
  volume: 75,
  pitch: 1,
  rate: 1,
  voice: '',
  autoRead: false, // Leitura automática desligada por padrão
  enabled: true, // Componente de fala ligado por padrão para permitir uso manual
};

const SpeechContext = createContext<SpeechContextType | null>(null);

export function useSpeech() {
  const context = useContext(SpeechContext);
  if (!context) {
    throw new Error('useSpeech must be used within a SpeechProvider');
  }
  return context;
}

export function SpeechProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SpeechSettings>(defaultSettings);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Define updateSettings
  const updateSettings = (newSettings: Partial<SpeechSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Load initial settings from localStorage (only once)
  useEffect(() => {
    const savedSettings = localStorage.getItem('talktalk_speech_settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
      } catch (error) {
        console.error('Error parsing speech settings:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Initialize speech synthesis and load voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      
      // Set default voice if none selected and settings are initialized
      if (isInitialized && !settings.voice && voices.length > 0) {
        const defaultVoice = voices.find(voice => voice.default) || voices[0];
        setSettings(prev => ({ ...prev, voice: defaultVoice.name }));
      }
    };

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    // Cleanup
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [isInitialized, settings.voice]);

  // Save settings to localStorage when they change (but not on initial load)
  useEffect(() => {
    if (!isInitialized) return;
    
    // Quando as configurações mudam, marcar todas as mensagens como não sendo mais novas
    // para evitar releituras indesejadas
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        document.querySelectorAll('[id^="mic-"]').forEach((micComponent) => {
          if ((micComponent as any).__micData) {
            (micComponent as any).__micData.isNewMessage = false;
          }
        });
      }, 0);
    }
    
    // Salvar as configurações no localStorage
    localStorage.setItem('talktalk_speech_settings', JSON.stringify(settings));
  }, [settings, isInitialized]);
  const speak = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply settings
    utterance.volume = settings.volume / 100;
    utterance.pitch = settings.pitch;
    utterance.rate = settings.rate;    // Set voice
    const voice = availableVoices.find(v => v.name === settings.voice);
    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <SpeechContext.Provider value={{ settings, availableVoices, updateSettings, speak, stopSpeaking }}>
      {children}
    </SpeechContext.Provider>
  );
}
