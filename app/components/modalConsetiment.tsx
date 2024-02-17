"use client";

import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function ModalConsetimento() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
      <Modal isOpen={isOpen} scrollBehavior={"inside"} placement={"top"} isDismissable={false} backdrop={"blur"} hideCloseButton onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                TalkTalk! - Consentimento de Cookies e Responsabilidade
              </ModalHeader>
              <ModalBody>
                <p>
                  Obrigado por usar o TalkTalk!, um website de chat de
                  tradução em tempo real.
                </p>
                <p>O TalkTalk! usa cookies para:</p>
                <ul>
                  <li>
                    Lembrar suas preferências: idioma padrão, configurações de
                    interface, etc.
                  </li>
                  <li>
                    Melhorar o desempenho: analisar o uso do aplicativo e
                    otimizar a experiência do usuário.
                  </li>
                  <li>
                    Personalizar sua experiência: oferecer conteúdo e anúncios
                    relevantes.
                  </li>
                </ul>
                <p>
                  O TalkTalk! oferece um espaço para conversas em tempo real
                  traduzidas automaticamente. Ao usar o aplicativo, você
                  concorda em:
                </p>
                <ul>
                  <li>
                    Ser responsável por suas conversas: Use linguagem respeitosa
                    e evite conteúdo ilegal ou ofensivo.
                  </li>
                  <li>
                    Estar ciente das limitações da tradução automática: As
                    traduções podem não ser perfeitas e podem conter erros.
                  </li>
                  <li>
                    Não compartilhar informações confidenciais ou sensíveis: O
                    TalkTalk! não garante a segurança de suas conversas.
                  </li>
                </ul>
                <p>
                  O TalkTalk! leva a sério a privacidade de seus usuários. Ao
                  usar o TalkTalk!, você concorda com os termos acima.
                </p>
                <p>Obrigado por usar o TalkTalk!</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="w-full"
                  color="success"
                  variant="solid"
                  onPress={onClose}
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
