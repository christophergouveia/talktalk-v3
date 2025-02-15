import moment from 'moment-timezone';
import Image from 'next/image';
import { Moment } from 'moment-timezone';
import { supportedLanguages } from '@/app/api/translate/languages';
import { useState } from 'react';
import { Ellipsis } from 'lucide-react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
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
      className={`relative mb-2 flex items-start gap-2 ${compact ? 'py-0.5' : 'py-2'
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
              {ownMessage && (
                <MicComponent />
              )}
              <span className="font-medium" style={{ color: senderColor }}>
                {senderApelido}
              </span>
              <span className="text-xs text-gray-500">{formattedDate}</span>
              {!ownMessage && (
                <MicComponent />
              )}
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
function MicComponent() {
  return (
    <Menu>
      <MenuButton className="inline-flex items-center gap-2 rounded-full cursor-pointer transition-all hover:bg-blue-300/50 p-px">
        <Ellipsis size={20} className='text-blue-600' />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom start"
        className="w-52 origin-top-right rounded-xl bg-gray-700 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-500">
            menu item #1
          </button>
        </MenuItem>
        <MenuItem>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-500">
          menu item #2
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}