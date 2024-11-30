import { CountryFlag } from '/app/components/countryFlags';
import { Input } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import linguagens from '/app/locales/languages.json';
import { ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  selectedLanguage: {
    label: string;
    value: string;
    flag: string;
  };
  onLanguageChange: (value: string) => void;
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredLanguages = filter.length > 0
    ? linguagens.filter((idioma) => 
        idioma.label.toLowerCase().includes(filter.toLowerCase()))
    : linguagens;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    setSelectedIndex(undefined);
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10 w-full rounded-md p-2 bg-[--chat-bg-buttons-secondary] px-4 py-2 pr-8 text-left focus:outline-none sm:text-sm flex gap-2 items-center"
      >
        <CountryFlag flag={selectedLanguage?.flag} />
        {selectedLanguage?.label}
        <ChevronDown />
      </button>

      <div
        className={`absolute z-20 w-full rounded-md bg-white dark:bg-[var(--chat-bg-buttons)] shadow-lg ${
          isOpen ? 'block' : 'hidden'
        }`}
        style={{ zIndex: 100 }}
      >
        {isOpen && (
          <div onClick={(e) => e.stopPropagation()}>
            <Input
              type="text"
              className="p-4"
              placeholder="Pesquise uma língua..."
              onChange={(e) => {
                setFilter(e.target.value);
                if (linguagens.length > 0) {
                  onLanguageChange(linguagens[0].value);
                }
              }}
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  const nextIndex = ((selectedIndex ?? 0) + 1) % filteredLanguages.length;
                  setSelectedIndex(nextIndex);
                  const list = document.querySelector('.custom-scrollbars');
                  const item = list?.children[nextIndex] as HTMLElement;
                  if (item) {
                    item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }
                } else if (e.key === 'ArrowUp') {
                  const prevIndex =
                    ((selectedIndex ?? 0) - 1 + filteredLanguages.length) % filteredLanguages.length;
                  setSelectedIndex(prevIndex);
                  const list = document.querySelector('.custom-scrollbars');
                  const item = list?.children[prevIndex] as HTMLElement;
                  if (item) {
                    item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }
                } else if (e.key === 'Enter' && selectedIndex !== undefined) {
                  onLanguageChange(filteredLanguages[selectedIndex].value);
                  setIsOpen(false);
                }
              }}
            />
            <ul className="py-1 h-[17rem] overflow-y-scroll custom-scrollbars text-small text-gray-700">
              {filteredLanguages.map((idioma, index) => (
                <li key={idioma.value}>
                  <button
                    onClick={() => {
                      onLanguageChange(idioma.value);
                      setIsOpen(false);
                    }}
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
      {isOpen && <div className="fixed inset-0" onClick={() => setIsOpen(false)} style={{ zIndex: 99 }} />}
    </div>
  );
} 