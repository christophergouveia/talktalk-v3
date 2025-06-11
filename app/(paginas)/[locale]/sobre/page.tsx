'use client';

import { ReactNode } from 'react';
import { FaCode, FaRocket, FaUsers, FaLightbulb, FaBuilding, FaStar, FaGithub, FaLinkedin } from 'react-icons/fa';
import { BsBoxes } from 'react-icons/bs';
import Avatar from 'react-avatar';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ImagemGustavo from '/public/images/pictures/foto-gustavo.jpg';
import ImagemChristopher from '/public/images/pictures/foto-christopher.jpg';
import Image from 'next/image';
import Link from 'next/link';
import Timeline from '@/app/components/timeline/Timeline';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="mb-6 px-3 w-full md:w-1/2 lg:w-1/3"
    >
      <div className="rounded-lg border border-sky-100 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-transparent dark:shadow-none hover:shadow-xl transition-all duration-300">
        <div className="relative flex w-full">
          {srcImagem ? (
            <Image
              src={srcImagem}
              width={100}
              height={100}
              alt={altImagem ?? 'Imagem'}
              className="mx-auto mb-6 h-24 w-24 rounded-full object-cover border-4 border-blue-500/20"
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
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={'bg-transparent text-xl hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-full'}
              >
                <Link
                  href={index === 0 ? (linkGithub ?? '#') : linkLinkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  {value}
                </Link>
              </motion.button>
            ))}
          </div>
        </div>

        <h3 className="font-heading mb-3 text-center text-xl">{nome}</h3>
        <p className="text-center text-gray-600 dark:text-gray-400">{cargo}</p>
        <p className="mt-4 text-center">
          {tags.map((value, index) => (
            <span
              key={index}
              className="mr-2 inline-block rounded-full bg-gray-100 px-2 py-1 text-sm dark:bg-neutral-800"
            >
              {value}
            </span>
          ))}
        </p>
      </div>
    </motion.div>
  );
}

export default function SobrePage() {
  const t = useTranslation('', { keyPrefix: 'sobre' }).t;

  const timelineItems = [
    {
      date: 'Outubro 2023',
      title: 'Nascimento da Ideia',
      description:
        'A jornada começou com a visão de criar uma plataforma que pudesse conectar pessoas de diferentes culturas e idiomas de forma natural e inclusiva.',
      icon: <FaLightbulb size={20} />,
      color: '#4F46E5',
    },
    {
      date: 'Agosto 2023',
      title: 'Desenvolvimento Inicial',
      image: 'https://imgs.extra.com.br/1559399417/3xg.jpg?imwidth=1000',
      description:
        'Implementação das funcionalidades core de tradução em tempo real e estabelecimento da arquitetura base do sistema.',
      icon: <FaCode size={20} />,
      color: '#8B5CF6',
    },
    {
      date: 'Outubro 2023',
      title: 'Fase de Testes',
      description:
        'Período de testes intensivos com usuários reais, coleta de feedback e implementação de melhorias significativas.',
      icon: <FaUsers size={20} />,
      color: '#F59E0B',
    },
    {
      date: 'Novembro 2023',
      title: 'Refinamento do Design',
      description:
        'Melhorias significativas na interface de usuário para garantir uma experiência intuitiva e acessível para todos os usuários.',
      icon: <BsBoxes size={20} />,
      color: '#EC4899',
    },
    {
      date: 'Dezembro 2023',
      title: 'Lançamento Oficial',
      description: 'O TalkTalk é disponibilizado ao público, marcando o início de uma nova era na comunicação global.',
      icon: <FaRocket size={20} />,
      color: '#10B981',
    },
    {
      date: 'Janeiro 2024',
      title: 'Expansão de Idiomas',
      description: 'Ampliação do suporte a novos idiomas e dialetos, tornando a plataforma ainda mais inclusiva.',
      icon: <FaBuilding size={20} />,
      color: '#3B82F6',
    },
    {
      date: 'Março 2024',
      title: 'Reconhecimento',
      description: 'A plataforma recebe prêmio de inovação em tecnologias de comunicação e acessibilidade digital.',
      icon: <FaStar size={20} />,
      color: '#F97316',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Nossa Jornada
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Acompanhe a evolução do TalkTalk desde sua concepção até o presente momento
        </p>
      </motion.div>

      {/* Timeline Section */}
      <section className="mb-24">
        <Timeline events={timelineItems} />
      </section>
    </div>
  );
}
