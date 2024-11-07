'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import imagemLogo from '@/public/images/icon/logo-ifpr.png';
import { useTranslations } from 'next-intl';

export default function Footer({}) {

  const [commitSha, setCommitSha] = useState('');

  useEffect(() => {
    fetch('/api/lastCommit')
      .then((response) => response.json())
      .then((data) => (data.error ? setCommitSha("Erro ao obter o SHA") : setCommitSha(data.commitSha)));
  }, []);

  const t = useTranslations('footer');

  return (
    <footer className="relative mt-6 flex flex-col items-center justify-center gap-2 px-2 py-4 text-center text-gray-500 sm:flex-row sm:px-0">
      <Image
        className="left-2 top-2 w-[5rem] sm:w-[7rem]"
        src={imagemLogo}
        alt="Logotipo do Instituto Federal do Paraná"
        width={500}
      />
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-center">
          {t('copyright')}
          {t.rich('desenvolvido_por', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}
        </span>
        <span className="text-sm text-center">
          {t('campus')}
        </span>
        <span className="absolute bottom-2 right-2 -z-10 text-sm text-gray-600/20 dark:text-gray-300/10">
          {commitSha.slice(0, 20)}
        </span>
      </div>
    </footer>
  );
}
