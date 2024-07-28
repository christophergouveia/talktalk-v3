'use client';

import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mt-16 text-center">
      <h1 className="bg-gradient-to-r from-red-500 to-red-900 bg-clip-text text-9xl font-extrabold text-transparent">
        404
      </h1>
      <h2 className="mb-4 text-4xl font-bold">Página não encontrada</h2>
      <Button>
        <Link href="/">Voltar para a página principal</Link>
      </Button>
    </div>
  );
}
