'use client';

import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { ReactNode } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import PNGCoins from '@/public/images/pictures/Coins-amico.png';
import SVGInterface from '@/public/images/svg/Interface.svg';
import SVGAccount from '@/public/images/svg/Account.svg';
import { GridMain, SubGrid } from '@/app/components/grids/grid';
import PNGSecurity from '@/public/images/pictures/security.png';
import Avatar from 'react-avatar';

export default function SobrePage() {
  return (
    <div>
      <section className="bg-blue-50 dark:bg-zinc-900 lg:pb-6">
        <div className="sm:items-normal mx-auto flex max-w-screen-xl items-center gap-4 px-4 py-12 lg:py-16 xl:gap-8">
          <div className="mr-auto mt-0 place-self-center sm:mt-36 lg:col-span-7">
            <h1 className="mb-4 max-w-3xl text-center text-[8vw] font-extrabold leading-none tracking-tight dark:text-white sm:text-start sm:text-4xl md:text-4xl xl:text-6xl">
              <span className="sm:whitespace-nowrap">
                Sua{' '}
                <span className="bg-gradient-to-r from-[#786FF2] to-[#A46FF2] bg-clip-text text-transparent">
                  privacidade,
                </span>
              </span>
              <br />
              <span className="sm:whitespace-nowrap">
                nossa{' '}
                <span className="bg-gradient-to-r from-[#6F90F2] to-[#38A3F5] bg-clip-text text-transparent">
                  responsabilidade.
                </span>
              </span>
            </h1>
            <p className="mb-6 max-w-2xl font-normal text-gray-700 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-2xl">
              Esta ferramenta tem interação totalmente anônima com todas as mensagens do usuário criptografadas e
              seguras.
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
      <svg xmlns="http://www.w3.org/2000/svg" className="li -mt-2 h-full w-full" viewBox="0 0 1440 320">
        <path
          className="fill-blue-50 dark:fill-zinc-900"
          fillOpacity="1"
          d="M0,192L80,176C160,160,320,128,480,128C640,128,800,160,960,165.3C1120,171,1280,149,1360,138.7L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>
      <section className="m-auto w-[90%] sm:w-[80%]">
        <h1 className="mb-8 text-center text-2xl font-semibold dark:text-gray-300 sm:mb-10 sm:text-4xl sm:font-bold">
          O que diferencia a nossa ferramenta para as outras ferramentas?
        </h1>
        <div className="Card mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <GridMain
            title="Segurança"
            description="A sua privacidade é prioridade para nós! Nossa plataforma utiliza criptografia avançada para garantir que suas conversas permaneçam confidenciais." 
            image={PNGSecurity}
          />
          <SubGrid
            className_Content="row-span-2 lg:row-span-1 sm:content-between"
            className_Title="text-[#1F6DF4] sm:text-center !m-4 lg:!text-start 2xl:!text-2xl sm:!text-xl lg:!mx-0 lg:!my-2"
            className_Text="sm:text-center lg:!text-start "
            title="Gratuidade"
            description="Diminua barreiras linguísticas sem gastar nada! Nossa ferramenta é totalmente gratuita, tornando a comunicação global acessível a todos."
            image={PNGCoins}
            id={1}
          />
          <SubGrid
            title="Interface intuitiva e fácil de usar"
            description="Conectar-se com pessoas de diferentes culturas nunca foi tão fácil! Nossa interface foi pensada para ser o mais simples e fácil de usar, inicie conversas com poucos clicks."
            className_Title="text-[#8359C2]"
            image={SVGInterface}
            id={1.3}
          />
          <SubGrid
            title="Sem necessidade de criação de contas"
            description="Contas? Registro? Esqueça cadastros complicados. Nossa ferramenta permite que você comece a conversar imediatamente, sem necessidade de criar uma conta."
            className_Title="text-[#38A3F5]"
            image={SVGAccount}
            id={1.6}
          />
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-s mb-12 text-center text-2xl font-bold sm:text-3xl">Desenvolvedores</h2>
          <div className="itens-center sm: -mx-3 flex flex-wrap justify-center">
            <CardContent
              nome="Kaike"
              altImagem="Foto de perfil de Kaike"
              cargo="CTO"
              tags={['React', 'FrontEnd']}
              icon={[<FaGithub key="github" />, <FaLinkedin key="linkedin" />]}
            />
            <CardContent
              nome="Christopher"
              altImagem="Foto de perfil de Christopher"
              cargo="CTO"
              tags={['React', 'BackEnd']}
              icon={[<FaGithub key="github" />, <FaLinkedin key="linkedin" />]}
            />
            <CardContent
              nome="Gustavo"
              altImagem="Foto de perfil de Gustavo"
              cargo="CTO"
              tags={['React', 'BackEnd']}
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
  srcImagem?: string;
  altImagem?: string;
  cargo: string;
  tags: string[];
  icon?: ReactNode[];
}

function CardContent({ nome, srcImagem, altImagem, cargo, tags, icon }: CardProps) {
  return (
    <div className="mb-6 px-3 md:w-1/2 lg:w-1/3">
      <div className="rounded-lg border-1 border-sky-100 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-transparent dark:shadow-none">
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
          <div className="absolute right-0">
            {icon?.map((value, index) => {
              return (
                <Button
                  key={index}
                  isIconOnly
                  radius={'full'}
                  className={'bg-transparent text-xl data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-gray-800'}
                >
                  {value}
                </Button>
              );
            })}
          </div>
        </div>

        <h3 className="font-heading mb-3 text-center text-xl">{nome}</h3>
        <p className="text-center text-gray-600">{cargo}</p>
        <p className="mt-4 text-center">
          {tags.map((value, index) => {
            return (
              <span
                key={index}
                className="mr-2 inline-block rounded-full bg-gray-100 px-2 py-1 dark:bg-neutral-800 [&:not(:last-child)]:mr-2"
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
