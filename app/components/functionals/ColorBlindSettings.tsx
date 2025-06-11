'use client';

import ColorBlindTest from './ColorBlindTest';
import { useColorBlind, ColorBlindType } from '@/app/contexts/ColorBlindContext';

interface ColorBlindSettingsProps {
  onColorBlindChange?: (type: ColorBlindType) => void;
  currentType?: ColorBlindType;
}

const ColorBlindSettings = ({ onColorBlindChange, currentType: propCurrentType }: ColorBlindSettingsProps) => {
  // Use the global ColorBlind context
  const { colorBlindType, setColorBlindType } = useColorBlind();
  
  // Use context value but allow prop override
  const activeType = propCurrentType || colorBlindType;
  
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
      <div className="p-6 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
        <h3 className="text-lg font-semibold mb-6">Configurações de Acessibilidade Visual</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {colorBlindOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  // Update global context
                  setColorBlindType(option.id as ColorBlindType);
                  // Call the prop callback if provided
                  if (onColorBlindChange) {
                    onColorBlindChange(option.id as ColorBlindType);
                  }
                }}
                className={`flex flex-col gap-2 p-4 rounded-lg border-2 transition-all text-left ${
                  activeType === option.id
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
            <ColorBlindTest colorBlindType={activeType} />
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
