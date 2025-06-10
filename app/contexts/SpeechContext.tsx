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
  autoRead: false,
  enabled: true,
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

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('talktalk_speech_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Initialize speech synthesis and load voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
        // Set default voice if none selected
      if (!settings.voice && voices.length > 0) {
        const defaultVoice = voices.find(voice => voice.default) || voices[0];
        updateSettings({ voice: defaultVoice.name });
      }
    };

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('talktalk_speech_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<SpeechSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

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
