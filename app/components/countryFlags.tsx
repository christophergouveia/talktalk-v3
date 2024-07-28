import linguagens from '@/app/locales/languages.json';
import { BR, US, ES } from 'country-flag-icons/react/1x1';

//Só para não dar problema :)
type FlagComponent = {
  [key: string]: any;
};

const flagIcons: FlagComponent = {
  BR,
  US,
  ES,
};

export function CountryFlag({ flag }: { flag: string }) {
  const flagIcon = linguagens.find((lang) => lang.flag === flag);
  const FlagIcon = flagIcons[flagIcon?.flag ?? 'BR'];
  return <FlagIcon className="w-8 rounded-full" />;
}
