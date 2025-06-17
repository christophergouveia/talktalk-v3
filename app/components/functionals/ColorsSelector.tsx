import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, Tooltip } from "@heroui/react";
import { useTranslation } from 'react-i18next';

export const colors = [
  { name: 'tangerina', hex: '#FFDDC1' },
  { name: 'coral', hex: '#FFABAB' },
  { name: 'pessego', hex: '#FFC3A0' },
  { name: 'rosa', hex: '#FF677D' },
  { name: 'cinza_rosa', hex: '#D4A5A5' },
  { name: 'violeta', hex: '#392F5A' },
  { name: 'laranja', hex: '#F8B400' },
  { name: 'fuchsia', hex: '#FF61A6' },
  { name: 'roxo', hex: '#6A0572' },
  { name: 'lavanda', hex: '#D5AAFF' },
  { name: 'verde_claro', hex: '#B9FBC0' },
  { name: 'ciano', hex: '#A0E7E5' },
  { name: 'marrom', hex: '#786C3B' },
  { name: 'verde_menta', hex: '#B9EBC1' },
  { name: 'creme', hex: '#F9D5BB' },
  { name: 'rosa_pastel', hex: '#F1C0E8' },
  { name: 'laranja_pastel', hex: '#F3C6A8' },
  { name: 'cor_de_rosa', hex: '#FF9A8B' },
  { name: 'amarelo_claro', hex: '#FFE156' },
  { name: 'azul_claro', hex: '#C0E0DE' },
];

interface ColorSelectorI {
  onSelectColor: (color: string) => void;
  onModalClose: () => void;
  isOpen: boolean;
}

const ColorSelector: React.FC<ColorSelectorI> = ({ onSelectColor, onModalClose, isOpen }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const onClose = () => {
    setIsModalOpen(false);
    onModalClose();
  };

  const handleColorSelect = (color: string) => {
    onSelectColor(color);
    onClose();
  };

  const handleKeyPress = (event: React.KeyboardEvent, color: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleColorSelect(color);
    }
  };

  useEffect(() => setIsModalOpen(isOpen), [isOpen]);

  return (
    <div className="flex flex-col items-center">
      <Modal 
        isOpen={isModalOpen} 
        onClose={onClose} 
        onOpenChange={setIsModalOpen} 
        placement="center"
        aria-labelledby="color-selector-title"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1" id="color-selector-title">
              {t('chat.configuracoes.acessibilidade.cores.titulo')}
            </ModalHeader>
            <ModalBody>
              <div 
                className="inline-grid grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-4 p-4"
                role="listbox"
                aria-label={t('chat.configuracoes.acessibilidade.cores.lista_aria')}
              >
                {colors.map((color) => (
                  <div 
                    key={color.hex} 
                    className="flex flex-col justify-normal gap-2 items-center"
                  >
                    <Tooltip content={t(`chat.configuracoes.acessibilidade.cores.nomes.${color.name}`)}>
                      <div
                        role="option"
                        tabIndex={0}
                        className="w-16 h-16 rounded-full mx-auto cursor-pointer focus:ring-2 focus:ring-primary focus:outline-none"
                        style={{ backgroundColor: color.hex }}
                        onClick={() => handleColorSelect(color.hex)}
                        onKeyDown={(e) => handleKeyPress(e, color.hex)}
                        aria-label={t('chat.configuracoes.acessibilidade.cores.cor_aria', { 
                          nome: t(`chat.configuracoes.acessibilidade.cores.nomes.${color.name}`) 
                        })}
                        aria-selected="false"
                      />
                    </Tooltip>
                    <span className="block lg:hidden text-center">
                      {t(`chat.configuracoes.acessibilidade.cores.nomes.${color.name}`)}
                    </span>
                  </div>
                ))}
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ColorSelector;
