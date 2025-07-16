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
      
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">          <div 
            className="h-16 rounded-lg shadow-sm border-2 border-transparent" 
            style={{ backgroundColor: '#DC2626' }}
            title={t('chat.configuracoes.acessibilidade.daltonismo.teste.cores.vermelho')}
          ></div>
          <p className="text-sm text-center font-medium">
            {t('chat.configuracoes.acessibilidade.daltonismo.teste.cores.vermelho')}
          </p>
        </div>
        <div className="space-y-2">          <div 
            className="h-16 rounded-lg shadow-sm border-2 border-transparent" 
            style={{ backgroundColor: '#16A34A' }}
            title={t('chat.configuracoes.acessibilidade.daltonismo.teste.cores.verde')}
          ></div>
          <p className="text-sm text-center font-medium">
            {t('chat.configuracoes.acessibilidade.daltonismo.teste.cores.verde')}
          </p>
        </div>
        <div className="space-y-2">          <div 
            className="h-16 rounded-lg shadow-sm border-2 border-transparent" 
            style={{ backgroundColor: '#2563EB' }}
            title={t('chat.configuracoes.acessibilidade.daltonismo.teste.cores.azul')}
          ></div>
          <p className="text-sm text-center font-medium">
            {t('chat.configuracoes.acessibilidade.daltonismo.teste.cores.azul')}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <h5 className="text-md font-medium mb-3">
          {t('chat.configuracoes.acessibilidade.daltonismo.teste.ishihara.titulo')}
        </h5>
        <div className="grid grid-cols-3 gap-4">
          <div className="aspect-square rounded-lg shadow-sm overflow-hidden border-2 border-transparent bg-red-100">
            <div className="h-full flex items-center justify-center">
              <span className="text-4xl font-bold text-red-600">6</span>
            </div>
          </div>
          <div className="aspect-square rounded-lg shadow-sm overflow-hidden border-2 border-transparent bg-green-100">
            <div className="h-full flex items-center justify-center">
              <span className="text-4xl font-bold text-green-600">8</span>
            </div>
          </div>
          <div className="aspect-square rounded-lg shadow-sm overflow-hidden border-2 border-transparent bg-blue-100">
            <div className="h-full flex items-center justify-center">
              <span className="text-4xl font-bold text-blue-600">5</span>
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {t('chat.configuracoes.acessibilidade.daltonismo.teste.ishihara.descricao')}
          {' '}
          {t('chat.configuracoes.acessibilidade.daltonismo.teste.ishihara.numeros')}
        </p>
      </div>
      {colorBlindType !== 'none' && (
        <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/30 rounded-lg flex items-center gap-3">
          <div className="h-2 w-2 bg-primary-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-primary-600 dark:text-primary-400">
            {t('chat.configuracoes.acessibilidade.daltonismo.teste.modo_ativo', { tipo: colorBlindType })}
          </p>
        </div>
      )}
    </div>
  );
};

export default ColorBlindTest;