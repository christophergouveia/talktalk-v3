import moment from 'moment-timezone';
import Image from 'next/image';
import { Moment } from 'moment-timezone';
import { supportedLanguages } from '@/app/api/translate/languages';
import { useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

function MicComponent({ text }: { text: string | React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const speechRef = React.useRef<SpeechSynthesisUtterance | null>(null);

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

  React.useEffect(() => {
    if (!speechText) return;

    const utterance = new SpeechSynthesisUtterance(speechText);
    speechRef.current = utterance;

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

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [speechText]);

  const handlePlayPause = React.useCallback(() => {
    if (!speechRef.current) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
    } else {
      if (progress === 0) {
        speechRef.current.volume = volume / 100;
        window.speechSynthesis.speak(speechRef.current);
      } else {
        window.speechSynthesis.resume();
      }
    }
  }, [isPlaying, progress, volume]);

  const handleVolumeChange = React.useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (speechRef.current) {
      speechRef.current.volume = newVolume / 100;
    }
  }, []);

  // Don't render anything if there's no text to speak
  if (!speechText) return null;

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-gray-100/50 dark:bg-gray-800/50 px-1.5 py-0.5">
      <button
        onClick={handlePlayPause}
        className="rounded-full p-1 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors"
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

      {isPlaying && (
        <div className="relative">
          <button
            onClick={() => setShowVolumeControl(!showVolumeControl)}
            className="p-1 rounded-full hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors"
          >
            <Volume2 size={14} className="text-gray-600 dark:text-gray-300" />
          </button>

          {showVolumeControl && (
            <div className="absolute bottom-full right-0 mb-2 p-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700 animate-scaleIn">
              <div className="w-24 flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-full h-1 accent-gray-400 dark:accent-gray-500"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
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
  const [showOriginal, setShowOriginal] = useState(false);
  const formattedDate = moment(date).toDate().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Handle all possible language data formats
  const getLanguageLabel = (lang: string) => {
    const data = supportedLanguages[lang];
    if (!data) return lang;
    if (typeof data === 'string') return data;
    if (typeof data === 'object' && data !== null) {
      // Handle both {label, value, flag} format and any other object format
      return 'label' in data ? data.label : lang;
    }
    return lang;
  };

  const languageLabel = getLanguageLabel(lingua);

  const getMessageContent = (input: React.ReactNode): string => {
    if (typeof input === 'string') return input;
    if (input === null || input === undefined) return '';
    if (typeof input === 'object') {
      if ('label' in input && typeof input.label === 'string') return input.label;
      if ('message' in input && typeof input.message === 'string') return input.message;
      if ('messageTraduzido' in input && typeof input.messageTraduzido === 'string') return input.messageTraduzido;
      if (typeof (input as any).toString === 'function') return (input as any).toString();
    }
    return '';
  };

  const renderContent = () => {
    if (isAudio) {
      return <audio controls src={originalMessage} className="max-w-[300px] rounded-lg" />;
    }
    return showOriginal ? originalMessage : getMessageContent(children);
  };

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
              </span>
              <span className="text-sm">
                {isAudio ? (
                  <audio controls src={originalMessage} className="max-w-[300px] rounded-lg" />
                ) : (
                  showOriginal ? originalMessage : getMessageContent(children)
                )}
              </span>
              {!ownMessage && !isAudio && (
                <>
                  <span className="text-xs flex flex-col text-gray-500 mt-1">
                    <div className="mt-1 flex">
                      <p>
                        Traduzido do <span className="font-medium">{languageLabel}</span> ({lingua})
                      </p>
                      <button onClick={() => setShowOriginal(!showOriginal)} className="ml-1 text-xs text-blue-400">
                        {showOriginal ? 'Exibir traduzido' : 'Exibir original'}
                      </button>
                    </div>
                  </span>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                {ownMessage && !isAudio && (
                  <>
                    <MicComponent text={originalMessage} />
                  </>
                )}
                <span className="font-medium" style={{ color: senderColor }}>
                  {senderApelido}
                </span>
                <span className="text-xs text-gray-500">{formattedDate}</span>
                {/* Only show MicComponent for text messages */}
                {!ownMessage && !isAudio && <MicComponent text={getMessageContent(children)} />}
              </div>
              <div
                className={`relative mt-1 max-w-full rounded-lg p-2 ${ownMessage ? 'setinha-own bg-blue-500 text-white' : 'setinha bg-gray-200 dark:bg-zinc-800'}`}
              >
                {renderContent()}
                {!ownMessage && !isAudio && (
                  <>
                    <div className="text-xs text-gray-500 ">
                      <div className="mt-1">
                        Traduzido do <span className="font-medium">{languageLabel}</span> ({lingua})
                        <button onClick={() => setShowOriginal(!showOriginal)} className="ml-2 text-xs text-blue-400">
                          {showOriginal ? 'Exibir traduzido' : 'Exibir original'}
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
