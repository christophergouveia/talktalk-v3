import { Button, Input, Switch } from '@nextui-org/react';
import { CountryFlag } from '/app/components/countryFlags';
import Image from 'next/image';
import { useRef } from 'react';

interface ChatOptionsProps {
  isOpen: boolean;
  linguaSelecionada: {
    label: string;
    value: string;
    flag: string;
  };
  isLanguageDropdownOpen: boolean;
  selectedIndex?: number;
  filteredLanguages: Array<{
    value: string;
    flag: string;
    label: string;
    description: string;
  }>;
  usersRoomData: {
    [key: string]: {
      apelido: string;
      avatar: string;
      color: string;
      token: string;
      userToken: string;
      host: boolean;
      isTyping?: boolean;
    };
  };
  onLanguageFilterChange: (value: string) => void;
  onLanguageSelect: (value: string) => void;
  onLanguageDropdownToggle: () => void;
  onLanguageDropdownClose: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export default function ChatOptions({
  isOpen,
  linguaSelecionada,
  isLanguageDropdownOpen,
  selectedIndex,
  filteredLanguages,
  usersRoomData,
  onLanguageFilterChange,
  onLanguageSelect,
  onLanguageDropdownToggle,
  onLanguageDropdownClose,
  onKeyDown
}: ChatOptionsProps) {
  const languagesFilterRef = useRef<HTMLInputElement>(null);

  return (
    <aside
      className={`ml-2 lg:h-full rounded-md bg-[var(--chat-bg-geral)] absolute lg:relative h-full flex flex-col lg:flex ${
        isOpen ? 'flex' : 'hidden'
      }`}
    >
      <h1 className="rounded-md bg-[var(--chat-bg-header)] p-2 text-center font-bold">CONFIGURAÇÕES DA SALA</h1>
      <section className="flex-1">
        <div className="m-2 flex flex-col gap-4">
          <Switch
            classNames={{
              base: 'inline-flex flex-row-reverse gap-2 w-full max-w-md bg-[--chat-bg-buttons] hover:bg-content2 items-center cursor-pointer p-4 border-2 border-transparent rounded-md transition-all duration-200',
              wrapper: '',
            }}
          >
            <div className="flex flex-col gap-1">
              <p className="text-medium font-semibold">Chat compacto</p>
              <p className="text-tiny text-default-600">
                Ative o modo compacto do chat. Os espaçamentos são menores.
              </p>
            </div>
          </Switch>
          <div className="flex w-full flex-col gap-2 rounded-md bg-[--chat-bg-buttons] p-4">
            <div className="flex flex-col gap-1">
              <p className="text-medium font-semibold">Idioma de tradução</p>
              <p className="text-tiny text-default-600">Selecione para qual idioma as mensagens serão traduzidas</p>
            </div>
            <div className="relative">
              <button
                onClick={onLanguageDropdownToggle}
                className="relative z-10 w-full rounded-md bg-[--chat-bg-buttons-secondary] px-4 py-3 pr-8 text-left hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm flex gap-2 items-center"
              >
                <CountryFlag flag={linguaSelecionada?.flag} />
                {linguaSelecionada?.label}
              </button>
              <div
                className={`absolute z-20 w-full rounded-md bg-white dark:bg-[var(--chat-bg-buttons)] shadow-lg ${
                  isLanguageDropdownOpen ? 'block' : 'hidden'
                }`}
                style={{ zIndex: 100 }}
              >
                {isLanguageDropdownOpen && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <Input
                      type="text"
                      className="p-4"
                      placeholder="Pesquise uma língua..."
                      onChange={(e) => onLanguageFilterChange(e.target.value)}
                      ref={languagesFilterRef}
                      onKeyDown={onKeyDown}
                    />
                    <ul className="py-1 h-[17rem] overflow-y-scroll custom-scrollbars text-small text-gray-700">
                      {filteredLanguages.map((idioma, index) => (
                        <li key={idioma.value}>
                          <button
                            onClick={() => onLanguageSelect(idioma.value)}
                            className={`block w-full px-4 py-2 hover:bg-gray-600 ${
                              index === selectedIndex ? 'bg-zinc-600 text-white' : ''
                            }`}
                          >
                            <div className="flex items-center">
                              <CountryFlag flag={idioma.flag} />
                              <span className="ml-2 text-default-800">{idioma.label}</span>
                              <p className="ml-2 text-tiny text-default-600">{idioma.description}</p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {isLanguageDropdownOpen && (
                <div className="fixed inset-0" onClick={onLanguageDropdownClose} style={{ zIndex: 99 }} />
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="bg-white dark:bg-zinc-900 m-2 rounded-md shadow-sm border border-gray-200 dark:border-zinc-800">
        <h2 className="text-medium bg-gray-50 dark:bg-zinc-800 rounded-t-md p-3 font-semibold flex items-center gap-2 border-b border-gray-200 dark:border-zinc-700">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Usuários Online
        </h2>
        <div className="flex flex-col gap-3 p-3">
          {Object.entries(usersRoomData).length > 0 ? (
            Object.values(usersRoomData).map((user) => (
              <div
                key={user.userToken}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors duration-200"
              >
                <Image
                  src={user.avatar}
                  alt={user.apelido}
                  width={60}
                  height={60}
                  className={`rounded-full border-2 p-2 bg-white dark:bg-transparent`}
                  style={{ borderColor: user.color, backgroundColor: user.color }}
                />
                <div className="flex flex-col">
                  <span className="text-medium font-medium flex items-center gap-1" style={{ color: user.color }}>
                    {user.apelido} {user.host && <span>👑</span>}
                  </span>
                  <span className="text-tiny text-gray-600 dark:text-gray-400">
                    {user.host ? 'Anfitrião' : 'Convidado'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-gray-500 dark:text-gray-400">
              Nenhum usuário conectado
            </div>
          )}
        </div>
      </div>
    </aside>
  );
} 