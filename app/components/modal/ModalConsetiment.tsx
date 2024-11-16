'use client';

import React, { useEffect, useState } from 'react';
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
        <div className="fixed bottom-0 left-0 right-0 p-4 !z-[999] backdrop-blur-sm">
          <Fade triggerOnce={true} duration={300}>
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 bg-slate-800/90 dark:bg-slate-900/90 rounded-xl shadow-lg border border-slate-700/50">
                <div className='flex flex-col md:flex-row items-center gap-6 md:gap-4'>
                  <div className="bg-blue-600/20 p-4 rounded-full">
                    <FaCookieBite className="text-3xl text-blue-500" />
                  </div>
                  <p className="text-center md:text-left text-sm md:text-base text-slate-200">
                    Este site utiliza cookies para melhorar sua experiência e para garantir que suas mensagens sejam
                    seguras. Saiba mais acessando a{' '}
                    <a className="text-blue-400 hover:text-blue-300 underline transition-colors" href="/termos/cookies">
                      Política de Cookies
                    </a>{' '}
                    e{' '}
                    <a className="text-blue-400 hover:text-blue-300 underline transition-colors" href="/termos/privacidade">
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
                  className="whitespace-nowrap px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-blue-600/20"
                >
                  Aceitar todos os cookies
                </button>
              </div>
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
