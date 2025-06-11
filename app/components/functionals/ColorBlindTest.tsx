'use client';

interface ColorTestProps {
  colorBlindType: string;
}

const ColorBlindTest = ({ colorBlindType }: ColorTestProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium">Teste de Visualização</h4>
      
      {/* Color Samples */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <div className="h-16 bg-red-500 rounded-lg shadow-sm border-2 border-transparent transition-all duration-300 hover:border-red-400" title="Vermelho"></div>
          <p className="text-sm text-center font-medium">Vermelho</p>
        </div>
        <div className="space-y-2">
          <div className="h-16 bg-green-500 rounded-lg shadow-sm border-2 border-transparent transition-all duration-300 hover:border-green-400" title="Verde"></div>
          <p className="text-sm text-center font-medium">Verde</p>
        </div>
        <div className="space-y-2">
          <div className="h-16 bg-blue-500 rounded-lg shadow-sm border-2 border-transparent transition-all duration-300 hover:border-blue-400" title="Azul"></div>
          <p className="text-sm text-center font-medium">Azul</p>
        </div>
      </div>

      {/* Ishihara Test */}
      <div className="mt-6">
        <h5 className="text-md font-medium mb-3">Teste de Ishihara Simplificado</h5>
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
          Se você consegue ver claramente os números acima, as configurações estão ajudando na sua percepção das cores.
          Os números devem ser visíveis como "6", "8" e "5".
        </p>
      </div>

      {/* Active Mode Indicator */}
      {colorBlindType !== 'none' && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center gap-3">
          <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Modo <span className="font-semibold">{colorBlindType}</span> ativo
          </p>
        </div>
      )}
    </div>
  );
};

export default ColorBlindTest;
