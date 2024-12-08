'use client';

import Link from 'next/link';
import { ReactNode, useState, useEffect, useCallback, memo } from 'react';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { CountryFlag } from '../../components/countryFlags';
import linguagens from '../../locales/languages.json';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('pagina_inicial');

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
      )}

      <div className="flex h-[calc(100vh-20rem)] flex-col items-center">
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

        <section className="flex flex-1 items-center justify-center px-3 text-center">
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
    </>
  );
}
