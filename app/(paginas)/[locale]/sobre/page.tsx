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



function FeatureCard({ icon, title, description, color, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 12
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0
      }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ 
        duration: 0.4, 
        delay,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -2,
        transition: { 
          duration: 0.15
        }
      }}
      className="group relative rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* Minimal icon */}
      <div 
        className="inline-flex items-center justify-center w-10 h-10 rounded-md mb-3 text-white text-lg"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}



function CardContent({ nome, srcImagem, altImagem, cargo, tags, icon, linkGithub, linkLinkedin = '#', description }: CardProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 16
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0
      }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ 
        duration: 0.4, 
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -3,
        transition: { 
          duration: 0.2
        }
      }}
      className="group relative rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* Profile section */}
      <div className="relative flex flex-col items-center mb-4">
        <div className="relative">
          {srcImagem ? (
            <Image
              src={srcImagem}
              width={64}
              height={64}
              alt={altImagem ?? 'Imagem'}
              className="rounded-full object-cover border border-gray-200 dark:border-gray-600"
            />
          ) : (
            <Avatar
              className="border border-gray-200 dark:border-gray-600"
              name={nome}
              maxInitials={2}
              size="64"
              round
            />
          )}
          
          {/* Social media icons */}
          <div className="absolute -top-1 -right-1 flex flex-col space-y-1">
            {icon?.map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-sm rounded-full p-1 border border-gray-200 dark:border-gray-600"
              >
                <Link
                  href={index === 0 ? (linkGithub ?? '#') : linkLinkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 text-xs"
                >
                  {value}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold mt-2 mb-1 text-gray-900 dark:text-white text-center">
          {nome}
        </h3>
        
        <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-2 text-center">
          {cargo}
        </p>

        {description && (
          <p className="text-gray-600 dark:text-gray-300 text-center text-xs leading-relaxed mb-3">
            {description}
          </p>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-1">
        {tags.map((value, index) => (
          <span
            key={index}
            className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
          >
            {value}
          </span>
        ))}
      </div>
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
const teamMembers = [
    {
      nome: "Gustavo Preti",
      srcImagem: "/images/pictures/imagemGustavo.png",
      altImagem: "Foto do Gustavo",
      cargo: "Full Stack Developer & Product Owner",
      description: "Especialista em desenvolvimento web moderno, com foco em React, Next.js e tecnologias de tradução. Responsável pela arquitetura completa do sistema e experiência do usuário.",
      tags: ["React", "Next.js", "TypeScript", "Node.js", "Socket.IO", "UX/UI"],
      icon: [<FaGithub key="github" />, <FaLinkedin key="linkedin" />],
      linkGithub: "https://github.com/GustavoGPreti",
      linkLinkedin: "https://linkedin.com/in/gustavo-preti"
    },
    {
      nome: "Christopher Gouveia",
      srcImagem: "/images/pictures/imagemChristopher.png",
      altImagem: "Foto do Christopher",
      cargo: "Backend Developer & DevOps Engineer",
      description: "Especialista em infraestrutura, segurança e otimização de performance. Responsável pela implementação do backend robusto e deployment escalável da aplicação.",
      tags: ["Node.js", "Docker", "AWS", "MongoDB", "Security", "DevOps"],
      icon: [<FaGithub key="github" />, <FaLinkedin key="linkedin" />],
      linkGithub: "https://github.com/christophergouveia",
      linkLinkedin: "https://linkedin.com/in/christopher-oliveira"
    },
    {
      nome: "Kaike Sathler",
      srcImagem: "/images/pictures/imagemKaike.png",
      altImagem: "Foto do Kaike",
      cargo: "Frontend Developer & UI/UX Designer",
      description: "Especialista em desenvolvimento frontend e design de interfaces, com foco em experiência do usuário e acessibilidade. Responsável pela criação de componentes reutilizáveis e design system.",
      tags: ["React", "CSS", "UI/UX", "Design", "Frontend", "Figma"],
      icon: [<FaGithub key="github" />, <FaLinkedin key="linkedin" />],
      linkGithub: "https://github.com/KaikeSathler",
      linkLinkedin: "https://linkedin.com/in/kaike-sathler"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">      {/* Hero Section with Parallax */}
      <section className="relative overflow-hidden">
        {/* Subtle background elements */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-blue-200/8 to-blue-300/10 rounded-full blur-xl"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute -top-10 -right-20 w-72 h-72 bg-gradient-to-br from-purple-200/8 to-purple-300/10 rounded-full blur-xl"
        />
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100/60 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6"
            >
              <HiSparkles className="w-4 h-4" />
              Conectando o mundo através da comunicação
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Nossa Jornada
              </span>
              <br />
              <span className="text-gray-900 dark:text-white text-4xl md:text-5xl">
                no TalkTalk
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Descobra como estamos revolucionando a comunicação global com tecnologia de ponta, 
              design inclusivo e uma paixão genuína por conectar pessoas de todas as culturas.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                href="/conversar"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
              >
                <HiChatBubbleLeftRight className="w-4 h-4" />
                Começar a Conversar
              </Link>
              <Link 
                href="#equipe"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
              >
                <HiUserGroup className="w-4 h-4" />
                Conhecer a Equipe
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>      {/* Privacy Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                <span className="text-gray-900 dark:text-white">
                  Sua{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Privacidade
                  </span>
                  ,
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  Nossa{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Responsabilidade
                  </span>
                  .
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Sua privacidade é nossa prioridade máxima. Implementamos as mais avançadas medidas de segurança 
                para garantir que suas conversas permaneçam completamente privadas e protegidas.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Criptografia de ponta a ponta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Dados nunca armazenados</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Conformidade com LGPD</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                <Image
                  src="/images/pictures/Conversation-s.png"
                  alt="Conversa Segura"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>      {/* Differentials Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nossos Diferenciais
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              O que nos torna únicos no mundo da comunicação global
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.3 }}
              className="group rounded-lg bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <FaShieldAlt className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Segurança Máxima
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-4">
                Proteção avançada com criptografia de ponta a ponta, garantindo que apenas você e seu interlocutor tenham acesso às mensagens.
              </p>
              <Image
                src="/images/pictures/security.png"
                alt="Segurança"
                width={150}
                height={100}
                className="w-full h-20 object-contain opacity-80"
              />
            </motion.div>

            {/* Free */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="group rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <FaHeart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">
                100% Gratuito
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-4">
                Acreditamos que a comunicação global deve ser acessível a todos. Nossa plataforma é completamente gratuita, sem taxas ocultas.
              </p>
              <Image
                src="/images/pictures/Coins-amico.png"
                alt="Gratuito"
                width={150}
                height={100}
                className="w-full h-20 object-contain opacity-80"
              />
            </motion.div>

            {/* No Account */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="group rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <HiUserGroup className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">
                Sem Cadastro
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-4">
                Entre e comece a conversar imediatamente. Não é necessário criar conta, fornecer email ou passar por processos burocráticos.
              </p>
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <HiChatBubbleLeftRight className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Recursos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Inovadores</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Tecnologias de ponta que tornam a comunicação global acessível, rápida e segura para todos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </section>      {/* Timeline Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
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
      </section>{/* Team Section */}
      <section id="equipe" className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Conheça Nossa <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Equipe</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Os visionários e desenvolvedores por trás da revolução na comunicação global
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex justify-center">
                <CardContent {...member} />
              </div>
            ))}
          </div>
        </div>
      </section>      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Nossa <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Missão</span>
              </h2>
              <div className="space-y-4 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
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
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                <FaHeart className="w-10 h-10 mb-4 text-white/90" />
                <h3 className="text-xl font-bold mb-3">Nossos Valores</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <span>Inclusividade e acessibilidade</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <span>Inovação tecnológica responsável</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <span>Privacidade e segurança</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <span>Experiência do usuário excepcional</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pronto para Quebrar Barreiras?
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Junte-se a milhares de pessoas que já estão experimentando uma nova forma de se comunicar globalmente.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/conversar"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
              >
                <HiChatBubbleLeftRight className="w-4 h-4" />
                Começar Agora
              </Link>
              <Link 
                href="/configuracoes"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-white rounded-lg border border-white hover:bg-white hover:text-blue-600 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
              >
                <HiCog6Tooth className="w-4 h-4" />
                Personalizar
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
