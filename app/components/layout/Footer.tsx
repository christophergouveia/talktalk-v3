'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import imagemLogo from '/public/images/icon/logo-ifpr.png';
import { useTranslation } from 'react-i18next';

export default function Footer({ className }: { className?: string }) {

  const [commitSha, setCommitSha] = useState('');

  useEffect(() => {
    fetch('/api/lastCommit')
      .then((response) => response.json())
      .then((data) => (data.error ? setCommitSha("Erro ao obter o SHA") : setCommitSha(data.commitSha)));
  }, []);

  const { t } = useTranslation('translation', { keyPrefix: 'footer' });

  return (    <footer className="relative mt-1 flex flex-col items-center justify-center gap-1 px-2 py-1 text-center text-gray-400 sm:flex-row sm:px-0">
      <Image
        className="left-2 top-2 w-[3rem] sm:w-[4rem]"
        src={imagemLogo}
        alt="Logotipo do Instituto Federal do Paraná"
        width={500}
      />
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-center">
          {t('copyright')}
          <span dangerouslySetInnerHTML={{ __html: t("desenvolvido_por") }} />
        </span>
        <span className="text-xs text-center">
          {t('campus')}
        </span>
        <span className="absolute bottom-1 right-2 -z-10 text-xs text-gray-600/20 dark:text-gray-300/10">
          {commitSha.slice(0, 20)}
        </span>
      </div>
    </footer>
  );
}
