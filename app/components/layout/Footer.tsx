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

  const { t } = useTranslation('', { keyPrefix: 'footer' });

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
          <span dangerouslySetInnerHTML={{ __html: t("desenvolvido_por") }} />
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
