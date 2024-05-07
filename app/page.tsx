import Link from "next/link";
import { ReactNode } from "react";
import Marquee from "react-fast-marquee";

function MarqueeText({ children }: { children: ReactNode }) {
  return <span className="mx-4">{children}</span>;
}

export default function Home({}) {
  return (
    <>
      <Marquee
        autoFill
        className="pt-6 h-fit overflow-hidden text-2xl 2xl:text-3xl"
      >
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
      <section className="flex items-center justify-center text-center px-3 h-full">
        <div>
          <h1
            className={`sm:text-7xl 2xl:text-8xl text-5xl  font-extrabold mb-4 bg-gradient-to-r from-[#38A3F5] to-[#6Fe3F2] !leading-[1.2] text-transparent bg-clip-text`}
          >
            TalkTalk !
          </h1>
          <p className="text-xl 2xl:text-2xl  mb-8 text-gray-600 dark:text-gray-400 sm:text-xl">
            Agora com essa ferramenta, converse com aquele seu amigo que não
            fala o mesmo idioma que você, e tenha uma comunicação eficiente
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <Link
              href="/conversar"
              className="bg-gradient-to-r sm:text-lg 2xl:text-xl text- from-[#38A3F5] to-[#6F90F2] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600 text-white py-2 px-8 rounded hover:scale-105"
            >
              Comece a conversar agora mesmo!
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
