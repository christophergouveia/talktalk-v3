import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, Tooltip } from "@heroui/react";

export const colors = [
  { name: 'Tangerina', hex: '#FFDDC1' },
  { name: 'Coral', hex: '#FFABAB' },
  { name: 'Pêssego', hex: '#FFC3A0' },
  { name: 'Rosa', hex: '#FF677D' },
  { name: 'Cinza Rosa', hex: '#D4A5A5' },
  { name: 'Violeta', hex: '#392F5A' },
  { name: 'Laranja', hex: '#F8B400' },
  { name: 'Fuchsia', hex: '#FF61A6' },
  { name: 'Roxo', hex: '#6A0572' },
  { name: 'Lavanda', hex: '#D5AAFF' },
  { name: 'Verde Claro', hex: '#B9FBC0' },
  { name: 'Ciano', hex: '#A0E7E5' },
  { name: 'Marrom', hex: '#786C3B' },
  { name: 'Verde Menta', hex: '#B9EBC1' },
  { name: 'Creme', hex: '#F9D5BB' },
  { name: 'Rosa Pastel', hex: '#F1C0E8' },
  { name: 'Laranja Pastel', hex: '#F3C6A8' },
  { name: 'Cor de Rosa', hex: '#FF9A8B' },
  { name: 'Amarelo Claro', hex: '#FFE156' },
  { name: 'Azul Claro', hex: '#C0E0DE' },
];

interface ColorSelectorI {
  onSelectColor: (color: string) => void;
  onModalClose: () => void;
  isOpen: boolean;
}

const ColorSelector: React.FC<ColorSelectorI> = ({ onSelectColor, onModalClose, isOpen }) => {
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
              Selecione uma Cor
            </ModalHeader>
            <ModalBody>
              <div 
                className="inline-grid grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-4 p-4"
                role="listbox"
                aria-label="Lista de cores disponíveis"
              >
                {colors.map((color) => (
                  <div 
                    key={color.hex} 
                    className="flex flex-col justify-normal gap-2 items-center"
                  >
                    <Tooltip content={color.name}>
                      <div
                        role="option"
                        tabIndex={0}
                        className="w-16 h-16 rounded-full mx-auto cursor-pointer focus:ring-2 focus:ring-primary focus:outline-none"
                        style={{ backgroundColor: color.hex }}
                        onClick={() => handleColorSelect(color.hex)}
                        onKeyDown={(e) => handleKeyPress(e, color.hex)}
                        aria-label={`Cor ${color.name}`}
                        aria-selected="false"
                      />
                    </Tooltip>
                    <span className="block lg:hidden text-center">{color.name}</span>
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
