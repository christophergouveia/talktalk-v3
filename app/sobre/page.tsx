"use client";

import Image from "next/image";
import CardComponent from "../components/cardComponent";

export default function SobrePage() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-3xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Sua&nbsp;
              <span
                className={
                  "bg-clip-text text-transparent bg-gradient-to-r from-[#786FF2] to-[#A46FF2]"
                }
              >
                privacidade.
              </span>
              <br />
              Nossa&nbsp;
              <span
                className={
                  "bg-clip-text text-transparent bg-gradient-to-r from-[#6F90F2] to-[#38A3F5]"
                }
              >
                responsabilidade.
              </span>
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Esta ferramenta tem interação totalmente anônima com todas as suas
              mensagens criptografadas e seguras.
            </p>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image
              src="/images/Conversation-s.png"
              alt={"Foto do Hero"}
              width={500}
              height={500}
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
      <section className=" h-80 grid grid-cols-3 gap-4 m-4">
         {/* <CardComponent imageSrc="/images/Conversation-s.png" titleButton="suddhsuds">
          <h1>Olá Mundo</h1>
         </CardComponent> */}
         <div className="w-50 h-50 bg-slate-500">oi</div>
         <div className="w-50 h-50 bg-slate-500 ">oi</div>
         <div className="w-50 h-50 bg-slate-500">oi</div>
         <div className="w-50 h-50 bg-slate-500">oi</div>
         <div className="w-50 h-50 bg-slate-500">oi</div>
         <div className="w-50 h-50 bg-slate-500">oi</div>
         <div className="w-50 h-50 bg-slate-500 col-span-2 ">oi</div>
         <div className="w-50 h-50 bg-slate-500">oi</div>
         <div className="w-50 h-50 bg-slate-500">oi</div>
         
      </section>
    </>
  );
}
