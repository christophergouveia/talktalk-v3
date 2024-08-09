import Link from 'next/link';
import { ReactNode } from 'react';
import Marquee from 'react-fast-marquee';

function MarqueeText({ children }: { children: ReactNode }) {
  return <span className="mx-4">{children}</span>;
}

export default function Home({}) {
  return (
    <>
      <Marquee autoFill className="h-fit overflow-hidden pt-6 text-2xl 2xl:text-3xl">
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
      <section className="flex h-full items-center justify-center px-3 text-center">
        <div>
          <h1
            className={`mb-4 bg-gradient-to-r from-[#38A3F5] to-[#6Fe3F2] bg-clip-text text-5xl font-extrabold !leading-[1.2] text-transparent sm:text-7xl 2xl:text-8xl`}
          >
            Talk-Talk !
          </h1>
          <p className="mb-8 max-w-[750px] text-center text-xl text-gray-600 dark:text-gray-400 sm:text-xl 2xl:text-2xl">
            Comunique-se de maneira eficiente com pessoas que não falam o mesmo idioma que você. Sem dificuldade. Com
            praticidade.
          </p>
          <div className="mb-12 flex justify-center gap-4">
            <Link
              href="/conversar"
              className="text- rounded bg-gradient-to-r from-[#38A3F5] to-[#6F90F2] px-8 py-2 text-white shadow-2xl shadow-blue-600 transition-all hover:scale-105 hover:bg-blue-700 sm:text-lg 2xl:text-xl"
            >
              Comece a conversar agora mesmo!
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
