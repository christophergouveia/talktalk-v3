import moment from 'moment-timezone';
import Image from 'next/image';
import { Moment } from 'moment-timezone';
import { supportedLanguages } from '@/app/api/translate/languages';
import { useState } from 'react';
interface MessageProps {
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

export default function Message({
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
  const formattedDate = moment(date).toDate().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={`relative mb-2 flex items-start gap-2 ${
        compact ? 'py-0.5' : 'py-2'
      } ${ownMessage ? 'flex-row-reverse' : 'flex-row'}`}
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
              <span className="font-medium" style={{ color: senderColor }}>
                {senderApelido}
              </span>
              <span className="text-xs text-gray-500">{formattedDate}</span>
            </div>
            <div
              className={`relative mt-1 max-w-full rounded-lg p-2 ${ownMessage ? 'setinha-own bg-blue-500 text-white' : 'setinha bg-gray-200 dark:bg-zinc-800'}`}
            >
              <p className="text-sm">{showOriginal ? originalMessage : children}</p>
              {!ownMessage && (
                <>
                  <span className="text-xs text-gray-500">
                    Traduzido do {supportedLanguages[lingua]} ({lingua})
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
  );
}
