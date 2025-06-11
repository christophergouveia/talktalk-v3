'use client';

import ColorBlindTest from './ColorBlindTest';

export type ColorBlindType = 'none' | 'protanopia' | 'protanomalia' | 'deuteranopia' | 'deuteranomalia' | 'tritanopia' | 'tritanomalia' | 'acromatopsia';

interface ColorBlindSettingsProps {
  onColorBlindChange: (type: ColorBlindType) => void;
  currentType: ColorBlindType;
}

const ColorBlindSettings = ({ onColorBlindChange, currentType }: ColorBlindSettingsProps) => {
  const ColorBlindFilters = () => (
    <svg style={{ position: 'absolute', height: 0, width: 0 }}>
      <defs>        
        <filter id="protanopia">
          <feColorMatrix
            type="matrix"
            values="0.567, 0.433, 0, 0, 0
                    0.558, 0.442, 0, 0, 0
                    0, 0.242, 0.758, 0, 0
                    0, 0, 0, 1, 0" />
        </filter>
        <filter id="protanomalia">
          <feColorMatrix
            type="matrix"
            values="0.46667 0.53333 0 0 0
                    0.04 0.96 0 0 0
                    0 0.24 0.76 0 0
                    0 0 0 1 0" />
        </filter>
        <filter id="deuteranopia">
          <feColorMatrix
            type="matrix"
            values="0.625, 0.375, 0, 0, 0
                    0.7, 0.3, 0, 0, 0
                    0, 0.3, 0.7, 0, 0
                    0, 0, 0, 1, 0" />
        </filter>
        <filter id="deuteranomalia">
          <feColorMatrix
            type="matrix"
            values="0.57 0.43 0 0 0
                    0.19 0.81 0 0 0
                    0 0.24 0.76 0 0
                    0 0 0 1 0" />
        </filter>
        <filter id="tritanopia">
          <feColorMatrix
            type="matrix"
            values="0.95, 0.05, 0, 0, 0
                    0, 0.433, 0.567, 0, 0
                    0, 0.475, 0.525, 0, 0
                    0, 0, 0, 1, 0" />
        </filter>
        <filter id="tritanomalia">
          <feColorMatrix
            type="matrix"
            values="0.89 0.11 0 0 0
                    0 0.84 0.16 0 0
                    0 0.32 0.68 0 0
                    0 0 0 1 0" />
        </filter>
        <filter id="acromatopsia">
          <feColorMatrix
            type="matrix"
            values="0.299, 0.587, 0.114, 0, 0
                    0.299, 0.587, 0.114, 0, 0
                    0.299, 0.587, 0.114, 0, 0
                    0, 0, 0, 1, 0" />
        </filter>
      </defs>
    </svg>
  );

  const colorBlindOptions = [
    { id: 'none', name: 'Visão Normal', description: 'Sem correção de cores' },
    { id: 'protanopia', name: 'Protanopia', description: 'Ausência total de vermelho' },
    { id: 'protanomalia', name: 'Protanomalia', description: 'Deficiência parcial de vermelho' },
    { id: 'deuteranopia', name: 'Deuteranopia', description: 'Ausência total de verde' },
    { id: 'deuteranomalia', name: 'Deuteranomalia', description: 'Deficiência parcial de verde' },
    { id: 'tritanopia', name: 'Tritanopia', description: 'Ausência total de azul/amarelo' },
    { id: 'tritanomalia', name: 'Tritanomalia', description: 'Deficiência parcial de azul/amarelo' },
    { id: 'acromatopsia', name: 'Acromatopsia', description: 'Ausência total de cores (Preto e branco)' },
  ];

  return (
    <>
      <ColorBlindFilters />
      <div className="p-6 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
        <h3 className="text-lg font-semibold mb-6">Configurações de Acessibilidade Visual</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {colorBlindOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onColorBlindChange(option.id as ColorBlindType)}
                className={`flex flex-col gap-2 p-4 rounded-lg border-2 transition-all text-left ${
                  currentType === option.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400'
                    : 'bg-white dark:bg-gray-800 border-transparent hover:bg-gray-50 dark:hover:bg-gray-750'
                }`}
              >
                <span className="font-medium">{option.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{option.description}</span>
              </button>
            ))}
          </div>

          {/* Color Test Section */}
          <div className="mt-8">
            <ColorBlindTest colorBlindType={currentType} />
          </div>

          {/* Info Section */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Estas configurações ajudam a melhorar a visualização das cores para pessoas com diferentes tipos de daltonismo.
              Selecione a opção que melhor se adapta à sua necessidade.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorBlindSettings;
