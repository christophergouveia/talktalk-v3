import moment from 'moment-timezone';
import Image from 'next/image';
import { ReactNode } from 'react';
import { Moment } from 'moment-timezone';
import { supportedLanguages } from '/app/api/translate/languages';

interface MessageType {
  ownMessage: boolean;
  date: string | Date | Moment;
  children: ReactNode;
  className?: string;
  originalMessage: string;
  senderApelido: string;
  senderAvatar: string;
  senderColor: string;
  lingua: string;
}

export default function Message({
  ownMessage,
  date,
  children,
  className,
  originalMessage,
  senderApelido,
  senderAvatar,
  senderColor,
  lingua,
}: MessageType) {
  const formattedDate = moment(date).format('HH:mm');
  return (
    <div className={`flex flex-col ${ownMessage ? 'items-end' : 'items-start'}`}>
      <div className={`flex items-center gap-2 ${ownMessage ? 'flex-row-reverse' : 'flex-row'}`}>
        <Image src={senderAvatar} alt={senderApelido} width={50} height={50} className="dark:border-2 dark:border-solid rounded-full dark:!bg-transparent p-2" style={{ borderColor: senderColor, backgroundColor: senderColor }} />
        <span className="text-sm">{senderApelido}</span>
      </div>
      <div
        className={`w-fit min-w-[80px] m-2 rounded-lg p-4 pb-5 ${
          ownMessage ? 'bg-gradient-to-r from-[#38A3F5] to-[#6F90F2] text-white' : 'bg-slate-300 dark:bg-slate-600'
        } relative max-w-[80%] ${className}`}
      >
        <span className="absolute bottom-0 right-2 w-full text-right text-sm text-slate-600 dark:text-slate-300">
          {formattedDate || 'N/A'}
        </span>
        <div className={`absolute h-0 w-0 ${ownMessage ? 'right-0' : 'left-0'} top-0 -mb-1 ml-2 mr-1.5 mt-2`}>
          <div
            className={`h-3 w-3 ${
              ownMessage ? 'bg-[#6F90F2]' : 'bg-slate-300 dark:bg-slate-600'
            } [clip-path:_polygon(100%_60%,_35%_3%,_8%_63%)]`}
          ></div>
        </div>
        <div className="flex flex-col">
          <span className="whitespace-pre-line">{children}</span>
          {!ownMessage && (
            <span className="text-sm text-slate-600 dark:text-slate-300">{originalMessage} ({supportedLanguages[lingua as keyof typeof supportedLanguages]})</span>
          )}
        </div>
      </div>
    </div>
  );
}
