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

function MicComponent({ text }: { text: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const speechRef = React.useRef<SpeechSynthesisUtterance | null>(null);

  React.useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(text);
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
      const { charIndex, charLength } = event;
      const progressValue = (charIndex / text.length) * 100;
      setProgress(progressValue);
    };

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text]);

  const handlePlayPause = () => {
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
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (speechRef.current) {
      speechRef.current.volume = newVolume / 100;
    }
  };

  

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
            animate={{ width: "4rem", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
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
  
  const renderContent = () => {
    if (isAudio) {
      return (
        <audio 
          controls 
          src={originalMessage}
          className="max-w-[300px] rounded-lg"
        />
      );
    }
    return showOriginal ? originalMessage : children;
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
              <span className="text-sm">{showOriginal ? originalMessage : children}</span>
              {!ownMessage && (
                <>
                  <span className="text-xs text-gray-500">
                    Traduzido do {supportedLanguages[lingua]} ({lingua})
                    
                  </span>
              
                  <button onClick={() => setShowOriginal(!showOriginal)} className="text-xs text-blue-400">
                    {showOriginal ? 'Exibir traduzido' : 'Exibir original'}
                  </button>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                {ownMessage && (
                  <>
                    <MicComponent text={originalMessage} />
                  </>
                )}
                <span className="font-medium" style={{ color: senderColor }}>
                  {senderApelido}
                </span>
                <span className="text-xs text-gray-500">{formattedDate}</span>
                {!ownMessage && (
                  <MicComponent text={children as string} />
                )}
              </div>
              <div
                className={`relative mt-1 max-w-full rounded-lg p-2 ${ownMessage ? 'setinha-own bg-blue-500 text-white' : 'setinha bg-gray-200 dark:bg-zinc-800'}`}
              >
                {renderContent()}
                {!ownMessage && (
                  <>
                    <span className="text-xs text-gray-500">
                      {console.log("lingua" + lingua)}
                      Traduzido do {supportedLanguages[lingua]} ({lingua})''
                    </span>{' '}
                    <button onClick={() => setShowOriginal(!showOriginal)} className="text-xs text-blue-400">
                      {showOriginal ? 'Exibir traduzido' : 'Exibir original'}
                    </button>
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




