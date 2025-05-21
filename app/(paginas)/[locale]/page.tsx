'use client';

import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { CountryFlag } from '../../components/countryFlags';
import linguagens from '../../locales/languages.json';
import { Button } from '@heroui/react';
import Image from 'next/image';
import { memo, ReactNode, useCallback, useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import PNGCoins from '/public/images/pictures/Coins-amico.png';
import SVGInterface from '/public/images/svg/Interface.svg';
import SVGAccount from '/public/images/svg/Account.svg';
import { GridMain, SubGrid } from '@/app/components/grids/grid';
import PNGSecurity from '/public/images/pictures/security.png';
import Avatar from 'react-avatar';
import { useTranslation } from 'react-i18next';
import ImagemGustavo from '/public/images/pictures/foto-gustavo.jpg';
import ImagemChristopher from '/public/images/pictures/foto-christopher.jpg';
import Link from 'next/link';

function MarqueeText({ children }: { children: ReactNode }) {
  return <span className="mx-4">{children}</span>;
}

interface FlagData {
  flag: string;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

interface CardProps {
  nome: string;
  srcImagem?: string;
  altImagem?: string;
  cargo: string;
  tags: string[];
  icon?: ReactNode[];
  linkGithub?: string;
  linkLinkedin?: string;
}

function CardContent({ nome, srcImagem, altImagem, cargo, tags, icon, linkGithub, linkLinkedin = '#' }: CardProps) {
  return (
    <div className="mb-6 px-3 w-full md:w-1/2 lg:w-1/3">
      <div className="rounded-lg border border-sky-100 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-transparent dark:shadow-none">
        <div className="relative flex w-full">
          {srcImagem ? (
            <Image
              src={srcImagem}
              width={100}
              height={100}
              alt={altImagem ?? 'Imagem'}
              className="mx-auto mb-6 h-24 w-24 rounded-full"
            />
          ) : (
            <Avatar
              className="[text-shadow:_0_1px_1px_rgb(0_0_0_/_100%)] mx-auto mb-6 h-24 w-24"
              name={nome}
              maxInitials={2}
              round
            />
          )}
          <div className="absolute right-0 flex space-x-2">
            {icon?.map((value, index) => (
              <Button
                key={index}
                isIconOnly
                radius={'full'}
                className={'bg-transparent text-xl hover:bg-gray-200 dark:hover:bg-gray-800'}
              >
                <Link
                  href={index === 0 ? (linkGithub ?? '#') : linkLinkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  {value}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <h3 className="font-heading mb-3 text-center text-xl">{nome}</h3>
        <p className="text-center text-gray-600">{cargo}</p>
        <p className="mt-4 text-center">
          {tags.map((value, index) => (
            <span key={index} className="mr-2 inline-block rounded-full bg-gray-100 px-2 py-1 dark:bg-neutral-800">
              {value}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

const AnimatedFlag = memo(
  ({
    flagData,
    index,
    onAnimationComplete,
  }: {
    flagData: FlagData;
    index: number;
    onAnimationComplete: (index: number) => void;
  }) => {
    const handleAnimationUpdate = (progress: number) => {
      if (progress >= 0.99) {
        onAnimationComplete(index);
      }
    };

    return (
      <motion.div
        className="absolute text-3xl"
        style={{
          left: `${flagData.left}%`,
          top: `${flagData.top}%`,
        }}
        initial={{ y: 0, opacity: 0 }}
        animate={{
          y: -100,
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: flagData.duration,
          repeat: Infinity,
          delay: flagData.delay,
          ease: 'linear',
        }}
        onUpdate={(latest) => handleAnimationUpdate((latest.y as number) / -100)}
      >
        <CountryFlag flag={flagData.flag} />
      </motion.div>
    );
  }
);

AnimatedFlag.displayName = 'AnimatedFlag';

export default function Home({}) {
  const [flags, setFlags] = useState<FlagData[]>([]);
  const t = useTranslation('', { keyPrefix: 'pagina_inicial' }).t;

  useEffect(() => {
    const novasBandeiras = Array.from({ length: 20 }).map(() => ({
      flag: linguagens[Math.floor(Math.random() * linguagens.length)].flag,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
    setFlags(novasBandeiras);
  }, []);

  const atualizarBandeira = useCallback((index: number) => {
    setFlags((prev) => {
      const novaBandeira = linguagens[Math.floor(Math.random() * linguagens.length)].flag;
      if (prev[index].flag === novaBandeira) {
        return prev;
      }
      const novasBandeiras = [...prev];
      novasBandeiras[index] = {
        ...novasBandeiras[index],
        flag: novaBandeira,
      };
      return novasBandeiras;
    });
  }, []);

  return (
    <>
      {flags && (
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
            <div className="absolute inset-0 animate-float opacity-30">
              {flags.map((flagData, i) => (
                <AnimatedFlag
                  key={`${i}-${flagData.flag}`}
                  flagData={flagData}
                  index={i}
                  onAnimationComplete={atualizarBandeira}
                />
              ))}
            </div>
          </div>
        </div>
      )}      <div className="flex h-screen flex-col items-center">
        <Marquee autoFill className="h-20 pt-6 text-2xl 2xl:text-3xl">
          <MarqueeText>Converse.</MarqueeText>
          <MarqueeText>Talk.</MarqueeText>
          <MarqueeText>Hable.</MarqueeText>
          <MarqueeText>Plaudern.</MarqueeText>
          <MarqueeText>채팅.</MarqueeText>
          <MarqueeText>Xatejar.</MarqueeText>
          <MarqueeText>Чат.</MarqueeText>
          <MarqueeText>Chat.</MarqueeText>
          <MarqueeText>แชท.</MarqueeText>
          <MarqueeText>Snak.</MarqueeText>
          <MarqueeText>Sohbet.</MarqueeText>
          <MarqueeText>Razgovor.</MarqueeText>
          <MarqueeText>チャット.</MarqueeText>
          <MarqueeText>Comhrá.</MarqueeText>
          <MarqueeText>Chiacchierata.</MarqueeText>
          <MarqueeText>Ћаскање.</MarqueeText>
        </Marquee>

        <section className="flex flex-1 items-center justify-center px-3 text-center h-screen">
          <div className="relative align-middle">
            <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full"></div>
            <h1
              className={`mb-4 bg-gradient-to-r from-[#38A3F5] to-[#6Fe3F2] bg-clip-text text-5xl font-extrabold !leading-[1.2] text-transparent sm:text-7xl 2xl:text-8xl`}
            >
              Talk-Talk!
            </h1>
            <p className="mb-8 max-w-[750px] text-center text-xl text-gray-600 dark:text-gray-400 sm:text-xl 2xl:text-2xl">
              {t('descricao')}
            </p>
            <div className="mb-12 flex justify-center gap-4">
              <Link
          href="/conversar"
          className="text- rounded bg-gradient-to-r from-[#38A3F5] to-[#6F90F2] px-8 py-2 text-white shadow-2xl shadow-blue-600 transition-all hover:scale-105 hover:bg-blue-700 sm:text-lg 2xl:text-xl"
              >
          {t('comece_a_conversar')}
              </Link>
            </div>
          </div>
        </section>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <section className="bg-blue-50 dark:bg-zinc-900 lg:pb-6">
          <div className="sm:items-normal mx-auto flex max-w-screen-xl items-center gap-4 px-4 py-12 lg:py-16 xl:gap-8">
            <div className="mr-auto mt-0 place-self-center sm:mt-36 lg:col-span-7">
              <h1 className="mb-4 max-w-3xl text-center text-[8vw] font-extrabold leading-none tracking-tight dark:text-white sm:text-start sm:text-4xl md:text-4xl xl:text-6xl">
                <span className="sm:whitespace-nowrap">
                  {t('hero.privacidade.sua')}{' '}
                  <span className="bg-gradient-to-r from-[#786FF2] to-[#A46FF2] bg-clip-text text-transparent">
                    {t('hero.privacidade.privacidade')},
                  </span>
                </span>
                <br />
                <span className="sm:whitespace-nowrap">
                  {t('hero.responsabilidade.nossa')}
                  <span className="bg-gradient-to-r from-[var(--cor-azul)] to-[var(--cor-azul2)] bg-clip-text text-transparent">
                    {' '}
                    {t('hero.responsabilidade.responsabilidade')}.
                  </span>
                </span>
              </h1>
              <p className="mb-6 max-w-2xl font-normal text-gray-700 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-2xl">
                {t('hero.descricao')}
              </p>
            </div>
            <div className="hidden lg:flex">
              <Image
                src="/images/pictures/Conversation-s.png"
                alt={'Foto do Hero'}
                width={450}
                height={450}
                className="imagem-animation h-full w-[85%]"
                priority
              />
            </div>
          </div>
        </section>
        <svg xmlns="http://www.w3.org/2000/svg" className="li -mt-2 h-fit w-full" viewBox="0 0 1440 320">
          <path
            className="fill-blue-50 dark:fill-zinc-900"
            fillOpacity="1"
            d="M0,192L80,176C160,160,320,128,480,128C640,128,800,160,960,165.3C1120,171,1280,149,1360,138.7L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="m-auto w-[90%] sm:w-[80%]"
        >
          <h1 className="mb-8 text-center text-2xl font-semibold bg-gradient-to-r from-[var(--cor-azul)] to-[var(--cor-roxa)] bg-clip-text text-transparent sm:mb-10 sm:text-6xl sm:font-bold uppercase">
            {t('diferencial.titulo')}
          </h1>
          <div className="Card mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">            <GridMain
              title={t('diferencial.seguranca.titulo')}
              description={t('diferencial.seguranca.descricao')}
              image={PNGSecurity}
            />            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <SubGrid
                className_Content="row-span-2 lg:row-span-1 sm:content-between"
                className_Title="text-[#1F6DF4] sm:text-center !m-4 lg:!text-start 2xl:!text-2xl sm:!text-xl lg:!mx-0 lg:!my-2"
                className_Text=""
                title={t('diferencial.gratuidade.titulo')}
                description={t('diferencial.gratuidade.descricao')}
                image={PNGCoins}
                id={1}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <SubGrid
                title={t('diferencial.interface.titulo')}
                description={t('diferencial.interface.descricao')}
                className_Title="text-[#8359C2]"
                image={SVGInterface}
                id={1.3}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <SubGrid
                title={t('diferencial.sem_conta.titulo')}
                description={t('diferencial.sem_conta.descricao')}
                className_Title="text-[#38A3F5]"
                image={SVGAccount}
                id={1.6}
              />
            </motion.div>
          </div>
        </motion.section>
        <motion.section 
          className="py-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          
        >
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-s mb-12 text-center text-2xl font-bold sm:text-3xl">
              {t('desenvolvedores.titulo')}
            </h2>
            <div className="itens-center sm: -mx-3 flex flex-wrap justify-center">
              <CardContent
                nome="Kaike"
                altImagem="Foto de perfil de Kaike"
                cargo={t('desenvolvedores.cargos.frontend')}
                tags={['FrontEnd']}
                icon={[<FaGithub key="github" />, <FaLinkedin key="linkedin" />]}
                linkGithub="https://github.com/KaikeSathler"
              />
              <CardContent
                nome="Christopher"
                altImagem="Foto de perfil de Christopher"
                srcImagem={ImagemChristopher.src}
                cargo={t('desenvolvedores.cargos.backend')}
                tags={['BackEnd']}
                icon={[<FaGithub key="github" />, <FaLinkedin key="linkedin" />]}
                linkGithub="https://github.com/christophergouveia"
              />
              <CardContent
                nome="Gustavo"
                altImagem="Foto de perfil de Gustavo"
                srcImagem={ImagemGustavo.src}
                cargo={t('desenvolvedores.cargos.backend')}
                tags={['BackEnd']}
                icon={[<FaGithub key="github" />, <FaLinkedin key="linkedin" />]}
                linkGithub="https://github.com/GustavoGPreti"
              />
            </div>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
}
