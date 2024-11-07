'use client';

import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { useCookies } from 'react-cookie';
import { Bounce, Fade } from 'react-awesome-reveal';
import { FaCookieBite } from 'react-icons/fa';

interface CreateRoomModalProps {
  aberto: boolean;
}

export default function CookieConsentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [cookieConsetiment, setCookieConsetiment] = useCookies(['cookieAceito']);

  useEffect(() => {
    if (!cookieConsetiment.cookieAceito) {
      setIsOpen(true);
    }
  }, [cookieConsetiment]);

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 p-4 !z-[999]">
          <Fade triggerOnce={true} duration={200}>
            <div className="flex justify-between gap-4 p-4 bg-slate-800 m-2 rounded">
              <div className='flex items-center gap-4'>
                <FaCookieBite className="text-2xl" />
                <p>
                  Este site utiliza cookies para melhorar sua experiência e para garantir que suas mensagens sejam
                  seguras. Saiba mais acessando a{' '}
                  <a className="text-blue-500 underline" href="#">
                    Politica de cookies
                  </a>{' '}
                  e{' '}
                  <a className="text-blue-500 underline" href="#">
                    Política de Privacidade
                  </a>
                  .
                </p>
              </div>
              <button
                onClick={() => {
                  setCookieConsetiment('cookieAceito', true, {
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    maxAge: 30 * 24 * 60 * 60,
                  });
                  setIsOpen(false);
                }}
                className="hover:bg-blue-900/80 p-2 bg-blue-900 rounded"
              >
                Aceitar todos os cookies
              </button>
            </div>
          </Fade>
        </div>
      )}
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
