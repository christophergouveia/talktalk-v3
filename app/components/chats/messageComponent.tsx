import { Moment } from 'moment-timezone';
import { ReactNode } from 'react';
import Avatar from 'react-avatar';

interface MessageType {
  sender: string;
  ownMessage: boolean;
  date: Moment;
  children: ReactNode;
  className?: string;
}

export default function Message({
  sender,
  ownMessage,
  date,
  children,
  className,
}: MessageType & { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className={`flex items-center gap-2 ${ownMessage ? 'justify-end' : ''}`}>
        <Avatar name={sender} className={ownMessage ? 'order-2' : ''} round size="2.5rem" />
        <span>{sender}</span>
      </div>
      <div
        className={`w-fit min-w-[80px] ${ownMessage ? 'self-end text-right' : 'text-left'} m-2 rounded-lg p-4 pb-5 ${
          ownMessage ? 'bg-gradient-to-r from-[#38A3F5] to-[#6F90F2]' : 'bg-slate-300 dark:bg-slate-600'
        } relative w-[calc(100%-4rem)] break-all ${className}`}
      >
        <span className="whitespace-pre-line">{children}</span>
        <span className="absolute bottom-0 right-2 w-full text-right text-sm text-slate-600 dark:text-slate-300">
        {date?.format('HH:mm') ?? "N/A"}
        </span>
        <div className={`absolute h-0 w-0 ${ownMessage ? 'right-0' : 'left-0'} top-0 -mb-1 ml-2 mr-1.5 mt-2`}>
          <div
            className={`h-3 w-3 ${
              ownMessage ? 'bg-[#6F90F2]' : 'bg-slate-300 dark:bg-slate-600'
            } [clip-path:_polygon(100%_60%,_35%_3%,_8%_63%)]`}
          ></div>
        </div>
      </div>
    </div>
  );
}
