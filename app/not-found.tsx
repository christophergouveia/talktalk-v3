'use client';

import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'errors' });
  
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        {t('not_found')}
      </p>
    </div>
  );
} 