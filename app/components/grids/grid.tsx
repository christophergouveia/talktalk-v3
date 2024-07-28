import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import ScrollAnimation from 'react-animate-on-scroll';

export function GridMain({ title, description, image }: { title: string; description: string; image: StaticImport }) {
  return (
    <ScrollAnimation
      animateIn="text-animation"
      className="Card_content__sobre row-span-1 !max-h-full !pb-0 !pt-6 sm:row-span-1 lg:row-span-3"
      animateOnce
    >
      <div className="flex flex-col">
        <div>
          <h2 className="m-4 text-2xl font-semibold text-[#6E91F2] sm:text-center lg:text-start lg:text-3xl 2xl:text-4xl">
            {title}
          </h2>
          <h3 className="m-4 text-base text-gray-800 dark:text-gray-400 sm:text-center lg:text-start lg:!text-lg 2xl:!text-2xl">
            {description}
          </h3>
        </div>
        <Image src={image} className="hidden w-[900px] sm:block" alt="Online illustrations by Storyset" />
      </div>
    </ScrollAnimation>
  );
}

export function SubGrid({
  title,
  description,
  image,
  className_Content,
  className_sobre,
  className_Title,
  className_Text,
  id,
}: {
  title: string;
  description: string;
  image: StaticImport;
  className_Content?: string;
  className_sobre?: string;
  className_Title?: string;
  className_Text?: string;
  id: number;
}) {
  return (
    <ScrollAnimation
      animateOnce
      animateIn="text-animation"
      className={`Card_content__sobre ${className_sobre}`}
      style={{
        animationDuration: `${id}s`,
      }}
    >
      <div className={`Card_content ${className_Content}`}>
        <h2 className={`Card_content__title ${className_Title}`}>{title}</h2>
        <h3 className={`${className_Text}`}>{description}</h3>
      </div>
      <div className="Card_content__image">
        <Image src={image} className="w-[250px]" alt="Online illustrations by Storyset" />
      </div>
    </ScrollAnimation>
  );
}
