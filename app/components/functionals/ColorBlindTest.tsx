'use client';

import { ColorBlindType } from '@/app/contexts/ColorBlindContext';
import { useTranslation } from 'react-i18next';

interface ColorTestProps {
  colorBlindType: ColorBlindType | undefined;
}

const ColorBlindTest = ({ colorBlindType = 'none' }: ColorTestProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium">
        {t('chat.configuracoes.acessibilidade.daltonismo.teste.titulo')}
      </h4>
      
      {/* Color Samples */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <div 
            className="h-16 bg-red-500 rounded-lg shadow-sm border-2 border-transparent transition-all duration-300 hover:border-red-400" 
            title={t('chat.configuracoes.acessibilidade.daltonismo.teste.cores.vermelho')}
          ></div>
          <p className="text-sm text-center font-medium">
            {t('chat.configuracoes.acessibilidade.daltonismo.teste.cores.vermelho')}
          </p>
        </div>
        <div className="space-y-2">
          <div 
            className="h-16 bg-green-500 rounded-lg shadow-sm border-2 border-transparent transition-all duration-300 hover:border-green-400" 
            title={t('chat.configuracoes.acessibilidade.daltonismo.teste.cores.verde')}
          ></div>
          <p className="text-sm text-center font-medium">
            {t('chat.configuracoes.acessibilidade.daltonismo.teste.cores.verde')}
          </p>
        </div>
        <div className="space-y-2">
          <div 
            className="h-16 bg-blue-500 rounded-lg shadow-sm border-2 border-transparent transition-all duration-300 hover:border-blue-400" 
            title={t('chat.configuracoes.acessibilidade.daltonismo.teste.cores.azul')}
          ></div>
          <p className="text-sm text-center font-medium">
            {t('chat.configuracoes.acessibilidade.daltonismo.teste.cores.azul')}
          </p>
        </div>
      </div>

      {/* Ishihara Test */}
      <div className="mt-6">
        <h5 className="text-md font-medium mb-3">
          {t('chat.configuracoes.acessibilidade.daltonismo.teste.ishihara.titulo')}
        </h5>
        <div className="grid grid-cols-3 gap-4">
          <div className="aspect-square bg-[#F4B942] rounded-lg shadow-sm overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-[#D95B44]">
            <div className="h-full flex items-center justify-center">
              <span className="text-4xl font-bold text-[#D95B44]">6</span>
            </div>
          </div>
          <div className="aspect-square bg-[#7AA354] rounded-lg shadow-sm overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-[#C1494D]">
            <div className="h-full flex items-center justify-center">
              <span className="text-4xl font-bold text-[#C1494D]">8</span>
            </div>
          </div>
          <div className="aspect-square bg-[#4B9CD3] rounded-lg shadow-sm overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-[#2B4F9D]">
            <div className="h-full flex items-center justify-center">
              <span className="text-4xl font-bold text-[#2B4F9D]">5</span>
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {t('chat.configuracoes.acessibilidade.daltonismo.teste.ishihara.descricao')}
          {' '}
          {t('chat.configuracoes.acessibilidade.daltonismo.teste.ishihara.numeros')}
        </p>
      </div>

      {/* Active Mode Indicator */}
      {colorBlindType !== 'none' && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center gap-3">
          <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            {t('chat.configuracoes.acessibilidade.daltonismo.teste.modo_ativo', { tipo: colorBlindType })}
          </p>
        </div>
      )}
    </div>
  );
};

export default ColorBlindTest;
