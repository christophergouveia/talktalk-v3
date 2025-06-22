'use client';

import ColorBlindTest from './ColorBlindTest';
import { useColorBlind, ColorBlindType } from '@/app/contexts/ColorBlindContext';
import { useTranslation } from 'react-i18next';

interface ColorBlindSettingsProps {
  onColorBlindChange?: (type: ColorBlindType) => void;
  currentType?: ColorBlindType;
}

const ColorBlindSettings = ({ onColorBlindChange, currentType: propCurrentType }: ColorBlindSettingsProps) => {
  const { t } = useTranslation();
  // Use the global ColorBlind context
  const { colorBlindType, setColorBlindType } = useColorBlind();
  
  // Use context value but allow prop override
  const activeType = propCurrentType || colorBlindType;
  
  const colorBlindOptions = [
    { 
      id: 'none', 
      name: t('chat.configuracoes.acessibilidade.daltonismo.opcoes.none.nome'), 
      description: t('chat.configuracoes.acessibilidade.daltonismo.opcoes.none.descricao') 
    },
    { 
      id: 'protanopia', 
      name: t('chat.configuracoes.acessibilidade.daltonismo.opcoes.protanopia.nome'), 
      description: t('chat.configuracoes.acessibilidade.daltonismo.opcoes.protanopia.descricao') 
    },
    { 
      id: 'protanomalia', 
      name: t('chat.configuracoes.acessibilidade.daltonismo.opcoes.protanomalia.nome'), 
      description: t('chat.configuracoes.acessibilidade.daltonismo.opcoes.protanomalia.descricao') 
    },
    { 
      id: 'deuteranopia', 
      name: t('chat.configuracoes.acessibilidade.daltonismo.opcoes.deuteranopia.nome'), 
      description: t('chat.configuracoes.acessibilidade.daltonismo.opcoes.deuteranopia.descricao') 
    },
    { 
      id: 'deuteranomalia', 
      name: t('chat.configuracoes.acessibilidade.daltonismo.opcoes.deuteranomalia.nome'), 
      description: t('chat.configuracoes.acessibilidade.daltonismo.opcoes.deuteranomalia.descricao') 
    },
    { 
      id: 'tritanopia', 
      name: t('chat.configuracoes.acessibilidade.daltonismo.opcoes.tritanopia.nome'), 
      description: t('chat.configuracoes.acessibilidade.daltonismo.opcoes.tritanopia.descricao') 
    },
    { 
      id: 'tritanomalia', 
      name: t('chat.configuracoes.acessibilidade.daltonismo.opcoes.tritanomalia.nome'), 
      description: t('chat.configuracoes.acessibilidade.daltonismo.opcoes.tritanomalia.descricao') 
    },
    { 
      id: 'acromatopsia', 
      name: t('chat.configuracoes.acessibilidade.daltonismo.opcoes.acromatopsia.nome'), 
      description: t('chat.configuracoes.acessibilidade.daltonismo.opcoes.acromatopsia.descricao') 
    },
  ];

  return (
    <>
      <div className="p-6 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
        <h3 className="text-lg font-semibold mb-6">
          {t('chat.configuracoes.acessibilidade.daltonismo.titulo')}
        </h3>
        
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
                }}                className={`flex flex-col gap-2 p-4 rounded-lg border-2 transition-all text-left ${
                  activeType === option.id
                    ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500 dark:border-primary-500'
                    : 'bg-white dark:bg-gray-800 border-transparent hover:bg-gray-50 dark:hover:bg-gray-750'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option.name}</span>                  {activeType === option.id && (                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary-500 text-white text-xs">
                      ✓
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{option.description}</span>
              </button>
            ))}
          </div>

          {/* Color Test Section */}
          <div className="mt-8">
            <ColorBlindTest colorBlindType={activeType} />
          </div>

          {/* Info Section */}          <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: '#BFCCF2', color: '#786FF2' }}>
            <p className="text-sm">
              {t('chat.configuracoes.acessibilidade.daltonismo.info')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorBlindSettings;
