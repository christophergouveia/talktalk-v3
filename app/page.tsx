import Link from "next/link";
import { ReactNode } from "react";
import Marquee from "react-fast-marquee";

function MarqueeText({ children }: { children: ReactNode }) {
  return (
    <span className="mx-4">{children}</span>
  )
}

export default function Home({}) {
  return (
    <>
      <style>{`
        .section {
          background-color: rgb(191, 204, 242);
        }
      `}</style>
      <Marquee autoFill className="pt-6 h-fit overflow-hidden text-4xl">
        <MarqueeText>Converse.</MarqueeText>
        <MarqueeText>Habla.</MarqueeText>
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
      <section className="flex items-center justify-center mt-44 px-3">
        <div className="text-center">
          <h1 className="sm:text-6xl text-2xl font-bold mb-4 bg-gradient-to-r from-[#38A3F5] to-[#6F90F2] !leading-[1.2] text-transparent bg-clip-text">
            TalkTalk! Uma ferramenta inovadora que permite a tradução instantânea de mensagens em tempo real
          </h1>
          <p className="text-xl mb-8">
            Agora com essa ferramenta, converse com aquele seu amigo que não fala o mesmo idioma que você, e tenha uma comunicação eficiente
          </p>
          <div className="flex gap-4 justify-center">
          <Link href="#" className="bg-blue-500 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-700 text-white font-bold py-2 px-8 rounded">
            Comece a conversar agora mesmo!
          </Link>
          </div>
        </div>
      </section>
    </>
  );
}
