'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FontSizeContextType {
  fontSize: number;
  setFontSize: (size: number) => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSizeState] = useState<number>(16);

  const setFontSize = (size: number) => {
    const clampedSize = Math.min(Math.max(size, 8), 24); // Limita entre 8 e 24px
    setFontSizeState(clampedSize);
    document.documentElement.style.fontSize = `${clampedSize}px`;
    localStorage.setItem('talktalk_font_size', clampedSize.toString());
  };

  useEffect(() => {
    // Carregar tamanho da fonte salvo
    const savedSize = localStorage.getItem('talktalk_font_size');
    if (savedSize) {
      const size = Number(savedSize);
      if (size >= 8 && size <= 24) {
        setFontSize(size);
      }
    }
  }, []);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
}
