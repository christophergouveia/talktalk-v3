import { countries } from "country-flag-icons";
import Image from 'next/image';

//Só para não dar problema :)
type FlagComponent = {
  [key: string]: any;
};

const flagIcons: FlagComponent = countries

export function CountryFlag({ className, flag }: { className?: string, flag: string }) {
  return (
    <div className={`rounded-full overflow-hidden w-12 h-12 border-2 border-gray-200 dark:border-gray-700 ${className}`}>
      <Image
        src={`https://flagcdn.com/w80/${flag.toLowerCase()}.png`}
        alt={`Bandeira ${flag}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
