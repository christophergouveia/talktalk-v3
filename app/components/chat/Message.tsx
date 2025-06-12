import moment from 'moment-timezone';
import Image from 'next/image';
import { Moment } from 'moment-timezone';
import { supportedLanguages } from '@/app/api/translate/languages';
import { useState, useEffect } from 'react';
import { Play, Pause, AlertCircle } from 'lucide-react';
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpeech } from '@/app/contexts/SpeechContext';
import { useTranslation } from '@/app/contexts/TranslationContext';
import { useFontSize } from '@/app/contexts/FontSizeContext';

interface MessageProps {
  isAudio: boolean;
  children: React.ReactNode;
  date: string | Moment | Date;
  lingua: string;
  ownMessage: boolean;
  originalMessage: string;
  senderApelido: string;
  senderAvatar: string;
  senderColor: string;
  compact?: boolean;
}

function MicComponent({ text, isOwnMessage = false }: { text: string | React.ReactNode; isOwnMessage?: boolean }) {
  const { settings } = useSpeech();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isNewMessage, setIsNewMessage] = React.useState(true);
  const speechRef = React.useRef<SpeechSynthesisUtterance | null>(null);
  
  // Referência para armazenar metadados do componente de áudio
  const micDataRef = React.useRef({
    isNewMessage: true,
    hasBeenRead: false,
    textKey: typeof text === 'string' ? text.slice(0, 20) : 'message'
  });

  // Gerar um ID seguro para o componente
  const micId = `mic-${Math.random().toString(36).substring(2, 7)}`;

  // Referência para o elemento DOM
  const micElementRef = React.useRef<HTMLDivElement>(null);

  const getSpeechContent = React.useCallback((input: string | React.ReactNode): string => {
    if (!input) return '';
    if (typeof input === 'string') return input;
    if (typeof input === 'object' && input !== null) {
      if ('messageTraduzido' in input) return (input as any).messageTraduzido;
      if ('message' in input) return (input as any).message;
      if (typeof (input as any).toString === 'function') return (input as any).toString();
    }
    return '';
  }, []);
  
  const speechText = React.useMemo(() => getSpeechContent(text), [text, getSpeechContent]);
  
  const handlePlayPause = React.useCallback(() => {
    if (!speechRef.current) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
    } else {
      if (progress === 0) {
        window.speechSynthesis.speak(speechRef.current);
      } else {
        window.speechSynthesis.resume();
      }
    }
  }, [isPlaying, progress]);
    // Configure speech utterance
  React.useEffect(() => {
    if (!speechText) return;

    const utterance = new SpeechSynthesisUtterance(speechText);
    speechRef.current = utterance;

    // Apply speech settings
    utterance.volume = settings.volume / 100;
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;

    if (settings.voice) {
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.name === settings.voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setProgress(0);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    utterance.onpause = () => setIsPlaying(false);
    utterance.onresume = () => setIsPlaying(true);    
    utterance.onboundary = (event) => {
      const { charIndex } = event;
      const progressValue = speechText ? (charIndex / speechText.length) * 100 : 0;
      setProgress(progressValue);
    };
      // Auto-read somente se autoRead estiver habilitado, for uma mensagem nova E NÃO for mensagem própria
    if (settings.autoRead && micDataRef.current.isNewMessage && !micDataRef.current.hasBeenRead && !isOwnMessage) {
      window.speechSynthesis.speak(utterance);
      // Marcar como já lida para evitar releituras
      micDataRef.current.hasBeenRead = true;
      micDataRef.current.isNewMessage = false;
    }
      return () => {
      window.speechSynthesis.cancel();
    };
  }, [speechText, settings, isOwnMessage]); // Adicionando isOwnMessage nas dependências

  // Sincronizar os dados com o elemento DOM para acesso externo
  React.useEffect(() => {
    if (micElementRef.current) {
      (micElementRef.current as any).__micData = micDataRef.current;
    }
  }, []);
  // If there's no text to speak, return null
  if (!speechText) return null;

  return (
    <div id={micId} ref={micElementRef} className="flex items-center gap-1.5 rounded-full bg-gray-100/50 dark:bg-gray-800/50 px-1.5 py-0.5">
      <button
        onClick={handlePlayPause}
        className="rounded-full p-1 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors"
        title={isPlaying ? 'Pausar' : 'Reproduzir'}
      >
        {isPlaying ? (
          <Pause size={14} className="text-gray-600 dark:text-gray-300" />
        ) : (
          <Play size={14} className="text-gray-600 dark:text-gray-300 ml-0.5" />
        )}
      </button>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '4rem', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative overflow-hidden"
          >
            <div className="w-16 h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-full bg-gray-400 dark:bg-gray-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AudioMessage({ src }: { src: string }) {
  const { settings } = useSpeech();
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    if (audioRef.current) {
      // Apply speech settings to audio element
      audioRef.current.volume = settings.volume / 100;
      audioRef.current.playbackRate = settings.rate;
      // Note: pitch cannot be adjusted for normal audio elements
    }
  }, [settings.volume, settings.rate]);

  return (
    <audio
      ref={audioRef}
      controls
      controlsList="nodownload"
      className="max-w-[300px] rounded-lg"
    >
      <source src={src} type="audio/webm" />
      Your browser does not support the audio element.
    </audio>
  );
}

export default function Message({
  isAudio,
  children,
  date,
  lingua,
  ownMessage,
  originalMessage,
  senderApelido,
  senderAvatar,
  senderColor,
  compact = false,
}: MessageProps) {  
  const { fontSize } = useFontSize();
  const { settings } = useSpeech();
  const { settings: translationSettings } = useTranslation();
  
  // Handle undefined or empty language properly
  const hasValidLanguage = lingua && lingua.trim() !== '' && supportedLanguages[lingua];
  const languageLabel = hasValidLanguage ? supportedLanguages[lingua]?.label || lingua : '';
  
  // Initialize state based on translationSettings.autoTranslate
  const [showOriginal, setShowOriginal] = useState(!translationSettings.autoTranslate);
  // Update showOriginal when translationSettings.autoTranslate changes
  useEffect(() => {
    if (!ownMessage && !isAudio) {
      setShowOriginal(!translationSettings.autoTranslate);
      
      // Quando a configuração de tradução automática é alterada, marcar todas as mensagens como não sendo mais novas
      // para evitar releituras
      setTimeout(() => {
        document.querySelectorAll('[id^="mic-"]').forEach((micComponent) => {
          if ((micComponent as any).__micData) {
            (micComponent as any).__micData.isNewMessage = false;
          }
        });
      }, 0);
    }
  }, [translationSettings.autoTranslate, ownMessage, isAudio]);

  const getMessageContent = (content: React.ReactNode): React.ReactNode => {
    return content;
  };
  const renderContent = () => {
    if (isAudio) {
      return <AudioMessage src={originalMessage} />;
    }
    return showOriginal ? originalMessage : getMessageContent(children);
  };

  const formattedDate = moment(date).toDate().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      <div
        className={`
          relative mb-2 flex items-start gap-2 
          ${compact ? 'py-0.5' : 'py-2'} 
          ${ownMessage ? 'flex-row-reverse' : 'flex-row'}
          font-size-${fontSize}
        `}
      >
        {!compact && (
          <Image
            src={senderAvatar}
            alt={senderApelido}
            width={40}
            height={40}
            className="rounded-full border-2 p-1"
            style={{ borderColor: senderColor }}
          />
        )}
        <div className={`select-text flex max-w-[80%] flex-col ${ownMessage ? 'items-end' : 'items-start'}`}>
          {compact ? (
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">{formattedDate}</span>
              <span className="font-medium" style={{ color: senderColor }}>
                {senderApelido}:
              </span>              <span className="text-sm">
                {isAudio ? (
                  <AudioMessage src={originalMessage} />
                ) : (
                  showOriginal ? originalMessage : getMessageContent(children)
                )}
              </span>
              {!ownMessage && !isAudio && (
                <>                  <span className="text-xs flex flex-col text-gray-500 mt-1">                    <div className="mt-1 flex">                      <p>
                        {showOriginal 
                          ? 'Mensagem original' 
                          : (hasValidLanguage 
                             ? `Traduzido do ${languageLabel} (${lingua})` 
                             : <span className="flex items-center gap-1"><AlertCircle size={12} /> Idioma não identificado</span>)}
                      </p>                      <button onClick={() => {
                        setShowOriginal(!showOriginal);
                        // Quando o usuário muda o idioma manualmente, não queremos releitura
                        // Procuramos por todos os componentes MIC na página
                        document.querySelectorAll('[id^="mic-"]').forEach((micComponent) => {
                          // Marcamos que não são mais mensagens novas
                          (micComponent as any).__micData = {
                            ...(micComponent as any).__micData,
                            isNewMessage: false
                          };
                        });
                      }} className="ml-1 text-xs text-blue-400 hover:underline">
                        {showOriginal ? 'Ver tradução' : 'Ver original'}
                      </button>
                    </div>
                  </span>
                </>
              )}
            </div>
          ) : (
            <>              <div className="flex items-center gap-2">
                {ownMessage && !isAudio && (
                  <>
                    <MicComponent text={originalMessage} isOwnMessage={true} />
                  </>
                )}
                <span className="font-medium" style={{ color: senderColor }}>
                  {senderApelido}
                </span>
                <span className="text-xs text-gray-500">{formattedDate}</span>
                {/* Only show MicComponent for text messages */}
                {!ownMessage && !isAudio && <MicComponent text={getMessageContent(children)} isOwnMessage={false} />}
              </div>
              <div
                className={`relative mt-1 max-w-full rounded-lg p-2 ${ownMessage ? 'setinha-own bg-blue-500 text-white' : 'setinha bg-gray-200 dark:bg-zinc-800'}`}
              >
                {renderContent()}
                {!ownMessage && !isAudio && (
                  <>                    <div className="text-xs text-gray-500 ">                      <div className="mt-1">                        
                        {showOriginal 
                          ? 'Mensagem original' 
                          : (hasValidLanguage 
                             ? `Traduzido do ${languageLabel} (${lingua})` 
                             : <span className="flex items-center gap-1"><AlertCircle size={12} /> Idioma não identificado</span>)}                        <button onClick={() => {
                          setShowOriginal(!showOriginal);
                          // Quando o usuário muda o idioma manualmente, não queremos releitura
                          // Procuramos por todos os componentes MIC na página
                          document.querySelectorAll('[id^="mic-"]').forEach((micComponent) => {
                            // Marcamos que não são mais mensagens novas
                            (micComponent as any).__micData = {
                              ...(micComponent as any).__micData,
                              isNewMessage: false
                            };
                          });
                        }} className="ml-2 text-xs text-blue-400 hover:underline">
                          {showOriginal ? 'Ver tradução' : 'Ver original'}
                        </button>
                      </div>
                    </div>{' '}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
