"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { FaGithub } from "react-icons/fa";

export default function SobrePage() {
  return (
    <div>
      <section className="bg-blue-50 dark:bg-gray-900">
        <div className="flex max-w-screen-xl px-4 py-8 mx-auto xl:gap-8 gap-4 lg:py-16">
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
              width={450}
              height={450}
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center font-heading mb-12 font-bold text-s">
            Desenvolvedores da ferramenta
          </h2>
          <div className="flex flex-wrap -mx-3">
            <CardContent nome="Kaike" srcImagem="/images/pictures/imagem2.jpg" altImagem="Foto de perfil de Kaike" cargo="CTO" tags={["React", "FrontEnd", "Dev amador"]} />
            <CardContent nome="Christopher" srcImagem="/images/pictures/imagem1.jpg" altImagem="Foto de perfil de Kaike" cargo="CTO" tags={["React", "BackEnd", "Dev avançado"]} icon={<FaGithub />} />
          </div>
        </div>
      </section>
    </div>
  );
}

interface CardProps {
  nome: string;
  srcImagem: string;
  altImagem?: string;
  cargo: string;
  tags: string[];
  icon?: ReactNode
}

function CardContent({ nome, srcImagem, altImagem, cargo, tags, icon }: CardProps) {
  return (
    <div className="lg:w-1/3 md:w-1/2 px-3 mb-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex">
        <Image
          src={srcImagem}
          width={100}
          height={100}
          alt={altImagem ?? "Imagem"}
          className="w-32 h-32 rounded-full mx-auto mb-6"
        />
        <div>
          {icon}
        </div>
        </div>
       
        <h3 className="text-xl text-center font-heading mb-3">{nome}</h3>
        <p className="text-center text-gray-600">{cargo}</p>
        <p className="text-center mt-4">
          {tags.map((value, index) => {
            return (
              <span key={index} className="inline-block bg-gray-200 py-1 px-2 rounded-full mr-2 [&:not(:last-child)]:mr-2">
                {value}
              </span>
            )
          })}
        </p>
      </div>
    </div>
  );
}
