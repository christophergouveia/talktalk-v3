'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSize = 'small' | 'medium' | 'large';

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>('medium');

  useEffect(() => {
    // Load saved font size on mount
    const savedSize = localStorage.getItem('talktalk_font_size');
    if (savedSize && ['small', 'medium', 'large'].includes(savedSize)) {
      setFontSize(savedSize as FontSize);
      document.documentElement.classList.add(`font-size-${savedSize}`);
    }
  }, []);

  const handleSetFontSize = (size: FontSize) => {
    // Remove previous font size class
    document.documentElement.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
    // Add new font size class
    document.documentElement.classList.add(`font-size-${size}`);
    
    setFontSize(size);
    localStorage.setItem('talktalk_font_size', size);
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize: handleSetFontSize }}>
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
