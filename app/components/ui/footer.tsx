'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import imagemLogo from '@/public/images/icon/logo-ifpr.png';

// import { ButtonGroup, Button } from '@nextui-org/react';
// import { FaMoon, FaSun } from 'react-icons/fa';
// import { useTheme } from 'next-themes';

export default function Footer({}) {
  // const { setTheme } = useTheme();

  // const toggleTheme = (tema: string) => {
  //   setTheme(tema);
  // };

  const [commitSha, setCommitSha] = useState('');
  useEffect(() => {
    fetch('/api/lastCommit')
      .then((response) => response.json())
      .then((data) => (data.error ? 'Não encontrado' : setCommitSha(data.commitSha)));
  }, []);

  return (
    <footer className="relative mt-6 flex flex-col items-center justify-center gap-2 px-2 py-4 text-center text-gray-500 sm:flex-row sm:px-0">
      <Image
        className="left-2 top-2 w-[5rem] sm:w-[7rem]"
        src={imagemLogo}
        alt="Logotipo do Instituto Federal do Paraná"
        width={500}
      />
      <div className="flex flex-col gap-2 sm:mr-[8rem]">
        <span className="text-sm">
          Copyright&copy; 2024 Todos os direitos reservados. Desenvolvido por <strong>Christopher</strong> e{' '}
          <strong>Kaike</strong>.
        </span>
        {/* <ButtonGroup>
          <Button isIconOnly radius="full" onClick={() => toggleTheme("dark")}>
            <FaMoon />
          </Button>
          <Button isIconOnly radius="full" onClick={() => toggleTheme("light")}>
            <FaSun />
          </Button>
        </ButtonGroup> */}
        <span className="absolute bottom-2 right-2 -z-10 text-sm text-gray-600/20 dark:text-gray-300/10">
          {commitSha.slice(0, 20)}
        </span>
      </div>
    </footer>
  );
}
