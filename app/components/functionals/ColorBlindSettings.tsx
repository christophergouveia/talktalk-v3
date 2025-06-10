'use client';

import { useCallback, useEffect, useState } from 'react';
import ColorBlindTest from './ColorBlindTest';

export type ColorBlindType = 'none' | 'protanomalia' | 'deuteranomalia' | 'tritanomalia';

interface ColorBlindSettingsProps {
  onColorBlindChange: (type: ColorBlindType) => void;
  currentType: ColorBlindType;
}

const ColorBlindSettings = ({ onColorBlindChange, currentType }: ColorBlindSettingsProps) => {
  const ColorBlindFilters = () => (
    <svg style={{ position: 'absolute', height: 0, width: 0 }}>
      <defs>        <filter id="protanomalia">
          <feColorMatrix
            type="matrix"
            values="0.46667 0.53333 0 0 0
                    0.04 0.96 0 0 0
                    0 0.24 0.76 0 0
                    0 0 0 1 0" />
        </filter>
        <filter id="deuteranomalia">
          <feColorMatrix
            type="matrix"
            values="0.57 0.43 0 0 0
                    0.19 0.81 0 0 0
                    0 0.24 0.76 0 0
                    0 0 0 1 0" />
        </filter>
        <filter id="tritanomalia">
          <feColorMatrix
            type="matrix"
            values="0.89 0.11 0 0 0
                    0 0.84 0.16 0 0
                    0 0.32 0.68 0 0
                    0 0 0 1 0" />
        </filter>
      </defs>
    </svg>
  );

  return (
    <>
      <ColorBlindFilters />
      <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Modo Daltonismo</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="none"
              name="colorBlind"
              value="none"
              checked={currentType === 'none'}
              onChange={(e) => onColorBlindChange(e.target.value as ColorBlindType)}
              className="w-4 h-4 accent-blue-500"
            />
            <label htmlFor="none">Sem correção de cores</label>
          </div>
          
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="protanomalia"
              name="colorBlind"
              value="protanomalia"
              checked={currentType === 'protanomalia'}
              onChange={(e) => onColorBlindChange(e.target.value as ColorBlindType)}
              className="w-4 h-4 accent-blue-500"
            />
            <label htmlFor="protanomalia">Protanomalia (Dificuldade com vermelho)</label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="deuteranomalia"
              name="colorBlind"
              value="deuteranomalia"
              checked={currentType === 'deuteranomalia'}
              onChange={(e) => onColorBlindChange(e.target.value as ColorBlindType)}
              className="w-4 h-4 accent-blue-500"
            />
            <label htmlFor="deuteranomalia">Deuteranomalia (Dificuldade com verde)</label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="tritanomalia"
              name="colorBlind"
              value="tritanomalia"
              checked={currentType === 'tritanomalia'}
              onChange={(e) => onColorBlindChange(e.target.value as ColorBlindType)}
              className="w-4 h-4 accent-blue-500"
            />
            <label htmlFor="tritanomalia">Tritanomalia (Dificuldade com azul)</label>
          </div>      </div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Estas configurações ajudam a melhorar a visualização das cores para pessoas com diferentes tipos de daltonismo.
        </p>

        <ColorBlindTest colorBlindType={currentType} />
      </div>
    </>
  );
};

export default ColorBlindSettings;
