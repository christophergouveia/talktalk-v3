import { RandomNicks, randomNicks } from '@/app/utils/strings/randomNicks';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Tooltip } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface AvatarSelectorProps {
  onAvatarSelect: (name: string, imageUrl: string) => void;
  getRandomAvatar: () => string;
  color: string;
}

export const AvatarSelector: React.FC<AvatarSelectorProps> = ({ onAvatarSelect, getRandomAvatar, color }) => {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarColor, setAvatarColor] = useState(color ?? '');

  const handleAnimalSelect = (animal: string) => {
    setSelectedAnimal(animal);
    const animalNameEnglish = RandomNicks.getEnglish(animal);
    const imageUrl = `/images/avatars/${animalNameEnglish.toLowerCase()}.png`;
    onAvatarSelect(animal, imageUrl);
    setIsModalOpen(false);
  };

  const handleRandomAvatar = () => {
    const randomAnimal = getRandomAvatar();
    setSelectedAnimal(randomAnimal);
  };

  useEffect(() => {
    setAvatarColor(color);
  }, [color])

  const t = useTranslation('', { keyPrefix: 'conversar.botoes_avatar' }).t;

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2">
        <Button onPress={() => setIsModalOpen(true)}>{t('escolher_avatar')}</Button>
        <Tooltip closeDelay={0} content="Seleciona automaticamente um avatar da lista de icones.">
          <Button onPress={() => handleRandomAvatar()}>{t('escolher_avatar_aleatorio')}</Button>
        </Tooltip>
      </div>
      <Modal size="4xl" className="h-1/2" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{t('escolha_seu_avatar')}</ModalHeader>
          <ModalBody className="overflow-y-scroll custom-scrollbars">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.keys(randomNicks).map((animal) => (
                <button
                key={animal}
                onClick={() => handleAnimalSelect(animal)}
                style={{ borderColor: selectedAnimal === animal ? avatarColor : undefined }}
                className={`border rounded-lg p-2 relative ${
                  selectedAnimal === animal
                    ? 'border-2 hover:bg-slate-200 transition-background dark:hover:bg-slate-600 border-b-8'
                    : 'border-slate-600 dark:hover:bg-slate-600 dark:hover:border-slate-600 hover:bg-slate-200 transition-background'
                }`}
              >
                  {selectedAnimal === animal && (
                    <span
                    style={{ backgroundColor: selectedAnimal === animal ? avatarColor : undefined }}
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-bold`}
                    >
                      {t('selecionado')}
                    </span>
                  )}
                  <Image
                    src={`/images/avatars/${RandomNicks.getEnglish(
                      animal
                    ).toLowerCase()}.png`}
                    alt={animal}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto p-2"
                    style={{ backgroundColor: avatarColor ?? undefined}}
                  />
                  <p className="text-center mt-2">{animal}</p>
                </button>
              ))}
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
