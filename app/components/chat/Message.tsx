import moment from 'moment-timezone';
import Image from 'next/image';
import { Moment } from 'moment-timezone';
import { supportedLanguages } from '@/app/api/translate/languages';
import { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpeech } from '@/app/contexts/SpeechContext';
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
  const { settings } = useSpeech();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const speechRef = React.useRef<SpeechSynthesisUtterance | null>(null);

  // Don't render if speech is disabled
  if (!settings.enabled) return null;

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

    // Auto-read if enabled and it's a new message
    if (settings.autoRead && progress === 0) {
      window.speechSynthesis.speak(utterance);
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [speechText, settings]);

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

  // Don't render anything if there's no text to speak
  if (!speechText) return null;

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-gray-100/50 dark:bg-gray-800/50 px-1.5 py-0.5">
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
  const [showOriginal, setShowOriginal] = useState(false);
  const { fontSize } = useFontSize();
  const languageLabel = supportedLanguages[lingua]?.label || lingua;

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
              </span>
              <span className="text-sm">
                {isAudio ? (
                  <AudioMessage src={originalMessage} />
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
