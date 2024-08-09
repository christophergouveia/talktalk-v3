'use client';

import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { useCookies } from 'react-cookie';
import { Bounce } from 'react-awesome-reveal';

interface CreateRoomModalProps {
  aberto: boolean;
}

export default function CookieConsentModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [cookieConsetiment, setCookieConsetiment] = useCookies(['cookieAceito']);

  useEffect(() => {
    if (!cookieConsetiment.cookieAceito) {
      onOpen();
    }
  }, [onOpen, cookieConsetiment]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        scrollBehavior={'inside'}
        placement={'top'}
        isDismissable={false}
        backdrop={'blur'}
        hideCloseButton
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Talk-Talk! - Consentimento de Cookies e Responsabilidade
              </ModalHeader>
              <ModalBody>
                <p>Obrigado por usar o Talk-Talk!, um website de chat de tradução em tempo real.</p>
                <p>O Talk-Talk! usa cookies para:</p>
                <ul>
                  <li>Lembrar suas preferências: idioma padrão, configurações de interface, etc.</li>
                  <li>Melhorar o desempenho: analisar o uso do aplicativo e otimizar a experiência do usuário.</li>
                  <li>Personalizar sua experiência: oferecer conteúdo e anúncios relevantes.</li>
                </ul>
                <p>
                  O Talk-Talk! oferece um espaço para conversas em tempo real traduzidas automaticamente. Ao usar o
                  aplicativo, você concorda em:
                </p>
                <ul>
                  <li>
                    Ser responsável por suas conversas: Use linguagem respeitosa e evite conteúdo ilegal ou ofensivo.
                  </li>
                  <li>
                    Estar ciente das limitações da tradução automática: As traduções podem não ser perfeitas e podem
                    conter erros.
                  </li>
                  <li>
                    Não compartilhar informações confidenciais ou sensíveis: O Talk-Talk! não garante a segurança de suas
                    conversas.
                  </li>
                </ul>
                <p>
                  O Talk-Talk! leva a sério a privacidade de seus usuários. Ao usar o Talk-Talk!, você concorda com os
                  termos acima.
                </p>
                <p>Obrigado por usar o Talk-Talk!</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="w-full"
                  color="success"
                  variant="solid"
                  onPress={onClose}
                  onClick={() =>
                    setCookieConsetiment('cookieAceito', true, {
                      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                      maxAge: 30 * 24 * 60 * 60,
                    })
                  }
                >
                  Aceitar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ aberto }) => {
  const [isOpen, setIsOpen] = useState(aberto);

  useEffect(() => {
    setIsOpen(aberto);
  }, [aberto]);

  return (
    <div>
      {isOpen && (
        <div className="modal z-50">
          <Bounce delay={500}>
            <div className="modal-content bg-default-400">
              <h2>Criando sala...</h2>
            </div>
          </Bounce>
        </div>
      )}
    </div>
  );
};
