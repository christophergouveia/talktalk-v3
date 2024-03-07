"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import { ReactNode } from "react";
import { FaFacebook, FaGithub, FaLinkedin, MdOutlineTranslate  } from "react-icons/fa";

export default function SobrePage() {
  return (
    <div>
      <section className="bg-blue-50 dark:bg-zinc-900">
        <div className="flex max-w-screen-xl px-4 py-8 mx-auto xl:gap-8 gap-4 lg:py-16 items-center sm:items-normal">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-3xl mb-4 sm:text-4xl text-[8vw] font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl text-center sm:text-start dark:text-white">
              <span className={"whitespace-nowrap"}>
                Sua{" "}
                <span
                  className={
                    "bg-clip-text text-transparent bg-gradient-to-r from-[#786FF2] to-[#A46FF2]"
                  }
                >
                  privacidade,
                </span>
              </span>
              <br />
              <span className={"whitespace-nowrap"}>
                nossa{" "}
                <span
                  className={
                    "bg-clip-text text-transparent bg-gradient-to-r from-[#6F90F2] to-[#38A3F5]"
                  }
                >
                  responsabilidade.
                </span>
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
      <section>
          <div className="grid grid-cols-3 p-6 gap-8">
            <div className=" row-span-4 border rounded shadow-lg p-5 text-justify">
              <h1 className="text-[#6F90F2] text-3xl m-2 font-bold">Idealização</h1>
              <p> Surgiu a partir da ideia de facilitar a comunicação entre duas pessoas que falam idiomas distintos e não conseguem ter uma conversa eficiente.</p>
            </div>
            <div className="border row-span-8 col-span-1  rounded shadow-lg p-5 text-justify">
            <h1 className="text-[#6F90F2] text-3xl m-2 font-bold">Proplemática</h1>
              <p> Surgiu a partir da ideia de facilitar a comunicação entre duas pessoas que falam idiomas distintos e não conseguem ter uma conversa eficiente.</p>
            </div>
            <div className=" row-span-3 border rounded bg-gradient-to-r from-[#786FF2] to-[#A46FF2] p-5 text-justify">
            <h1 className="text-white text-3xl m-2 font-bold">Motivação</h1>
              <p> Surgiu a partir da ideia de facilitar a comunicação entre duas pessoas que falam idiomas distintos e não conseguem ter uma conversa eficiente.</p>
            </div>
            <div className=" row-span-3 border rounded   p-5 text-justify bg-gradient-to-r from-[#6F90F2] to-[#38A3F5]">
            <h1 className="text-white text-3xl m-2 font-bold ">Solução</h1>
              <p> Surgiu a partir da ideia de facilitar a comunicação entre duas pessoas que falam idiomas distintos e não conseguem ter uma conversa eficiente.</p>
            </div>
            <div className=" row-span-3 border rounded shadow-lg p-5 text-justify">
            <h1 className="text-[#6F90F2] text-3xl m-2 font-bold">Por que essas Cores?</h1>
              <p> Surgiu a partir da ideia de facilitar a comunicação entre duas pessoas que falam idiomas distintos e não conseguem ter uma conversa eficiente.</p>
            </div>
          </div>
      </section>
      <section className="py-12 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl text-center font-heading mb-12 font-bold text-s">
            Desenvolvedores
          </h2>
          <div className="flex flex-wrap -mx-3 itens-center justify-center sm:">
            <CardContent
              nome="Kaike"
              srcImagem="/images/pictures/imagem2.jpg"
              altImagem="Foto de perfil de Kaike"
              cargo="CTO"
              tags={["React", "FrontEnd", "Dev amador"]}
              icon={[<FaGithub key="github" />, <FaLinkedin key="linkedin" />]}
            />
            <CardContent
              nome="Christopher"
              srcImagem="/images/pictures/imagem1.jpg"
              altImagem="Foto de perfil de Kaike"
              cargo="CTO"
              tags={["React", "BackEnd", "Dev avançado"]}
              icon={[<FaGithub key="github" />, <FaLinkedin key="linkedin" />]}
            />
            <CardContent
              nome="Christopher"
              srcImagem="/images/pictures/imagem1.jpg"
              altImagem="Foto de perfil de Kaike"
              cargo="CTO"
              tags={["React", "BackEnd", "Dev avançado"]}
              icon={[<FaGithub key="github" />, <FaLinkedin key="linkedin" />]}
            />
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
  icon?: ReactNode[];
}

function CardContent({
  nome,
  srcImagem,
  altImagem,
  cargo,
  tags,
  icon,
}: CardProps) {
  return (
    <div className="lg:w-1/3 md:w-1/2 px-3 mb-6 ">
      <div className="bg-white dark:bg-transparent border-1 dark:border-neutral-800 border-sky-100 rounded-lg dark:shadow-none shadow-lg p-6">
        <div className="flex relative w-full">
          <Image
            src={srcImagem}
            width={100}
            height={100}
            alt={altImagem ?? "Imagem"}
            className="w-30 h-30 rounded-full mx-auto mb-6"
          />
          <div className="absolute right-0 ">
            {icon?.map((value, index) => {
              return (
                <Button
                  key={index}
                  isIconOnly
                  radius={"full"}
                  className={
                    "bg-transparent data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-gray-800 text-xl"
                  }
                >
                  {value}
                </Button>
              );
            })}
          </div>
        </div>

        <h3 className="text-xl text-center font-heading mb-3">{nome}</h3>
        <p className="text-center text-gray-600">{cargo}</p>
        <p className="text-center mt-4">
          {tags.map((value, index) => {
            return (
              <span
                key={index}
                className="inline-block bg-gray-100 dark:bg-neutral-800 py-1 px-2 rounded-full mr-2 [&:not(:last-child)]:mr-2"
              >
                {value}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}
