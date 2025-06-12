'use client';

import { ReactNode } from 'react';
import { 
  FaCode, 
  FaRocket, 
  FaUsers, 
  FaLightbulb, 
  FaBuilding, 
  FaStar, 
  FaGithub, 
  FaLinkedin,
  FaGlobe,
  FaComments,
  FaAccessibleIcon,
  FaShieldAlt,
  FaHeart,
  FaChartLine
} from 'react-icons/fa';
import { 
  BsBoxes, 
  BsTranslate, 
  BsLightningCharge, 
  BsPeople,
  BsShield,
  BsGlobe2,
  BsRocket
} from 'react-icons/bs';
import { 
  HiSparkles, 
  HiChatBubbleLeftRight, 
  HiGlobeAlt,
  HiUserGroup,
  HiCog6Tooth,
  HiMicrophone
} from 'react-icons/hi2';
import Avatar from 'react-avatar';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import Timeline from '@/app/components/timeline/Timeline';

interface CardProps {
  nome: string;
  srcImagem?: string | any;
  altImagem?: string;
  cargo: string;
  tags: string[];
  icon?: ReactNode[];
  linkGithub?: string;
  linkLinkedin?: string;
  description?: string;
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
  delay?: number;
}

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  color: string;
  delay?: number;
}

function FeatureCard({ icon, title, description, color, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div 
        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 text-white text-2xl shadow-lg"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
      <div 
        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}

function StatCard({ icon, value, label, color, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div 
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 text-white text-xl"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
        {label}
      </div>
    </motion.div>
  );
}

function CardContent({ nome, srcImagem, altImagem, cargo, tags, icon, linkGithub, linkLinkedin = '#', description }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Profile section */}
      <div className="relative flex flex-col items-center mb-6">
        <div className="relative">
          {srcImagem ? (
            <div className="relative">
              <Image
                src={srcImagem}
                width={120}
                height={120}
                alt={altImagem ?? 'Imagem'}
                className="rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg group-hover:shadow-xl transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <Avatar
              className="shadow-lg group-hover:shadow-xl transition-all duration-300 border-4 border-white dark:border-gray-700"
              name={nome}
              maxInitials={2}
              size="120"
              round
            />
          )}
          
          {/* Social media icons */}
          <div className="absolute -top-2 -right-2 flex flex-col space-y-2">
            {icon?.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
              >
                <Link
                  href={index === 0 ? (linkGithub ?? '#') : linkLinkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  {value}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.h3 
          className="text-2xl font-bold mt-4 mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
        >
          {nome}
        </motion.h3>
        
        <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
          {cargo}
        </p>

        {description && (
          <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed mb-4">
            {description}
          </p>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2">
        {tags.map((value, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.1, y: -2 }}
            className="inline-block px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-700/50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {value}
          </motion.span>
        ))}
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}

export default function SobrePage() {
  const t = useTranslation('', { keyPrefix: 'sobre' }).t;
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  const timelineItems = [
    {
      date: 'Janeiro 2024',
      title: 'Nascimento da Ideia',
      description:
        'A jornada começou com a visão de criar uma plataforma que pudesse conectar pessoas de diferentes culturas e idiomas de forma natural e inclusiva, quebrando barreiras linguísticas.',
      icon: <FaLightbulb size={20} />,
      color: '#4F46E5',
    },
    {
      date: 'Março 2024',
      title: 'Pesquisa e Planejamento',
      description:
        'Período intenso de pesquisa sobre tecnologias de tradução, acessibilidade e UX/UI, definindo os pilares fundamentais do projeto.',
      icon: <BsGlobe2 size={20} />,
      color: '#7C3AED',
    },
    {
      date: 'Maio 2024',
      title: 'Desenvolvimento Inicial',
      description:
        'Implementação das funcionalidades core: tradução em tempo real, chat em tempo real com Socket.IO e estabelecimento da arquitetura base do sistema.',
      icon: <FaCode size={20} />,
      color: '#8B5CF6',
    },
    {
      date: 'Julho 2024',
      title: 'Funcionalidades de Acessibilidade',
      description:
        'Implementação de recursos de acessibilidade como síntese de voz, suporte para daltônicos e configurações personalizáveis de interface.',
      icon: <FaAccessibleIcon size={20} />,
      color: '#06B6D4',
    },
    {
      date: 'Setembro 2024',
      title: 'Fase de Testes',
      description:
        'Período de testes intensivos com usuários reais, coleta de feedback e implementação de melhorias significativas baseadas na experiência do usuário.',
      icon: <FaUsers size={20} />,
      color: '#F59E0B',
    },
    {
      date: 'Outubro 2024',
      title: 'Refinamento do Design',
      description:
        'Melhorias significativas na interface de usuário, implementação de temas escuro/claro e otimização para garantir uma experiência intuitiva.',
      icon: <BsBoxes size={20} />,
      color: '#EC4899',
    },
    {
      date: 'Novembro 2024',
      title: 'Otimizações e Segurança',
      description: 'Implementação de medidas de segurança avançadas, otimização de performance e preparação para o lançamento público.',
      icon: <FaShieldAlt size={20} />,
      color: '#EF4444',
    },
    {
      date: 'Dezembro 2024',
      title: 'Lançamento Beta',
      description: 'Lançamento da versão beta para um grupo seleto de testadores, coletando feedback final e realizando ajustes finais.',
      icon: <BsRocket size={20} />,
      color: '#10B981',
    },
    {
      date: 'Janeiro 2025',
      title: 'Lançamento Oficial',
      description: 'O TalkTalk é disponibilizado ao público, marcando o início de uma nova era na comunicação global inclusiva.',
      icon: <FaRocket size={20} />,
      color: '#3B82F6',
    },
  ];

  const features = [
    {
      icon: <BsTranslate />,
      title: "Tradução em Tempo Real",
      description: "Comunicação instantânea entre pessoas de diferentes idiomas com tradução automática e precisa.",
      color: "#3B82F6"
    },
    {
      icon: <HiMicrophone />,
      title: "Síntese de Voz",
      description: "Transforme texto em fala com vozes naturais e configurações personalizáveis para máxima acessibilidade.",
      color: "#8B5CF6"
    },
    {
      icon: <FaAccessibleIcon />,
      title: "Acessibilidade Total",
      description: "Design inclusivo com suporte para daltonismo, múltiplos tamanhos de fonte e navegação simplificada.",
      color: "#10B981"
    },
    {
      icon: <BsLightningCharge />,
      title: "Velocidade Extrema",
      description: "Chat em tempo real com latência mínima, garantindo conversas fluidas e naturais.",
      color: "#F59E0B"
    },
    {
      icon: <BsShield />,
      title: "Segurança Avançada",
      description: "Criptografia de ponta a ponta e proteção de dados para manter suas conversas sempre seguras.",
      color: "#EF4444"
    },
    {
      icon: <HiCog6Tooth />,
      title: "Personalização Total",
      description: "Customize a interface, cores, temas e configurações para criar sua experiência única.",
      color: "#EC4899"
    }
  ];

  const stats = [
    {
      icon: <BsGlobe2 />,
      value: "50+",
      label: "Idiomas Suportados",
      color: "#3B82F6"
    },
    {
      icon: <FaUsers />,
      value: "1000+",
      label: "Usuários Ativos",
      color: "#10B981"
    },
    {
      icon: <HiChatBubbleLeftRight />,
      value: "10K+",
      label: "Mensagens Traduzidas",
      color: "#8B5CF6"
    },
    {
      icon: <FaChartLine />,
      value: "99.5%",
      label: "Uptime",
      color: "#F59E0B"
    }
  ];
  const teamMembers = [
    {
      nome: "Gustavo Preti",
      srcImagem: "/images/pictures/imagemGustavo.png",
      altImagem: "Foto do Gustavo",
      cargo: "Full Stack Developer & Product Owner",
      description: "Especialista em desenvolvimento web moderno, com foco em React, Next.js e tecnologias de tradução. Responsável pela arquitetura completa do sistema e experiência do usuário.",
      tags: ["React", "Next.js", "TypeScript", "Node.js", "Socket.IO", "UX/UI"],
      icon: [<FaGithub key="github" />, <FaLinkedin key="linkedin" />],
      linkGithub: "https://github.com/GustavoPreti",
      linkLinkedin: "https://linkedin.com/in/gustavo-preti"
    },
    {
      nome: "Christopher Oliveira",
      srcImagem: "/images/pictures/imagemChristopher.png",
      altImagem: "Foto do Christopher",
      cargo: "Backend Developer & DevOps Engineer",
      description: "Especialista em infraestrutura, segurança e otimização de performance. Responsável pela implementação do backend robusto e deployment escalável da aplicação.",
      tags: ["Node.js", "Docker", "AWS", "MongoDB", "Security", "DevOps"],
      icon: [<FaGithub key="github" />, <FaLinkedin key="linkedin" />],
      linkGithub: "https://github.com/ChristopherOliveira",
      linkLinkedin: "https://linkedin.com/in/christopher-oliveira"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section with Parallax */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-40 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"
        />
        
        <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-8 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50"
            >
              <HiSparkles className="w-4 h-4" />
              Conectando o mundo através da comunicação
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-7xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Nossa Jornada
              </span>
              <br />
              <span className="text-gray-900 dark:text-white text-5xl md:text-6xl">
                no TalkTalk
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Descobra como estamos revolucionando a comunicação global com tecnologia de ponta, 
              design inclusivo e uma paixão genuína por conectar pessoas de todas as culturas.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Link 
                href="/conversar"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-lg"
              >
                <HiChatBubbleLeftRight className="w-5 h-5" />
                Começar a Conversar
              </Link>
              <Link 
                href="#equipe"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-lg"
              >
                <HiUserGroup className="w-5 h-5" />
                Conhecer a Equipe
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Números que <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Impressionam</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Veja o impacto que estamos criando na comunicação global
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                {...stat}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Recursos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Inovadores</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Tecnologias de ponta que tornam a comunicação global acessível, rápida e segura para todos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Nossa <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Evolução</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Acompanhe cada etapa da nossa jornada, desde a ideia inicial até o produto revolucionário de hoje
            </p>
          </motion.div>

          <Timeline events={timelineItems} />
        </div>
      </section>

      {/* Team Section */}
      <section id="equipe" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Conheça Nossa <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Equipe</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Os visionários e desenvolvedores por trás da revolução na comunicação global
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex justify-center">
                <CardContent {...member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-8 text-gray-900 dark:text-white">
                Nossa <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Missão</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-gray-900 dark:text-white">Quebrar barreiras linguísticas</strong> e conectar pessoas de todas as culturas através de uma comunicação instantânea, inclusiva e acessível.
                </p>
                <p>
                  Acreditamos que a <strong className="text-blue-600 dark:text-blue-400">tecnologia deve servir a humanidade</strong>, tornando a comunicação global mais natural e eliminando as limitações impostas pelos idiomas.
                </p>
                <p>
                  Nosso compromisso é com a <strong className="text-purple-600 dark:text-purple-400">acessibilidade total</strong>, garantindo que pessoas com diferentes necessidades possam se comunicar livremente.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
                <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm"></div>
                <div className="relative">
                  <FaHeart className="w-12 h-12 mb-6 text-white/90" />
                  <h3 className="text-2xl font-bold mb-4">Nossos Valores</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Inclusividade e acessibilidade</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Inovação tecnológica responsável</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Privacidade e segurança</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Experiência do usuário excepcional</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para Quebrar Barreiras?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Junte-se a milhares de pessoas que já estão experimentando uma nova forma de se comunicar globalmente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/conversar"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-lg"
              >
                <HiChatBubbleLeftRight className="w-5 h-5" />
                Começar Agora
              </Link>
              <Link 
                href="/configuracoes"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white rounded-2xl border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-lg"
              >
                <HiCog6Tooth className="w-5 h-5" />
                Personalizar
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
