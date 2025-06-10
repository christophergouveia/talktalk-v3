'use client';

interface ColorTestProps {
  colorBlindType: string;
}

const ColorBlindTest = ({ colorBlindType }: ColorTestProps) => {
  return (
    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
      <h4 className="text-sm font-medium mb-3">Teste de Cores</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Use estas amostras para verificar se a configuração atual melhora sua visualização das cores:
      </p>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <div className="h-20 bg-red-500 rounded-lg" title="Vermelho"></div>
          <p className="text-xs text-center">Vermelho</p>
        </div>
        <div className="space-y-2">
          <div className="h-20 bg-green-500 rounded-lg" title="Verde"></div>
          <p className="text-xs text-center">Verde</p>
        </div>
        <div className="space-y-2">
          <div className="h-20 bg-blue-500 rounded-lg" title="Azul"></div>
          <p className="text-xs text-center">Azul</p>
        </div>
      </div>

      <div className="mt-6">
        <h5 className="text-sm font-medium mb-2">Teste de Ishihara Simplificado</h5>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-square bg-[#F4B942] rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-[#D95B44]">6</span>
            </div>
          </div>
          <div className="relative aspect-square bg-[#7AA354] rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-[#C1494D]">8</span>
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Se você consegue ver claramente os números acima, as configurações estão ajudando na sua percepção das cores.
        </p>
      </div>

      {colorBlindType !== 'none' && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Modo {colorBlindType} ativo. Ajuste as configurações conforme necessário para melhor visualização.
          </p>
        </div>
      )}
    </div>
  );
};

export default ColorBlindTest;
